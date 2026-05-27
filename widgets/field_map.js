/* ============================================================================
   Field-Map widget — 2D gravitational potential and equipotentials
   ----------------------------------------------------------------------------
   Renders V(x, y) for one or more point masses, drawn as labelled equipotential
   contours. A draggable test point shows live readouts: x, y, V at the point,
   the magnitude of g, and the direction of g as a small arrow on the test
   point. This is the tool used for D.1.H.6 (equipotential surfaces) and
   D.1.H.7 (field lines vs equipotentials) questions.

   Config shape:
     {
       bodies: [
         { x: 0, y: 0, mass: 5.97e24, label: "Earth" },
         { x: 3.84e8, y: 0, mass: 7.34e22, label: "Moon" }
       ],
       domain: { x: [-1e8, 5e8], y: [-2e8, 2e8] },
       contourLevels: [-9e7, -6e7, -4e7, -2.5e7, -1.5e7, -8e6],  // J kg-1
       initialX: "random",   // or a number
       initialY: "random",   // or a number
       showFieldArrow: true,
       xLabel: "x", xUnits: "m",
       yLabel: "y", yUnits: "m"
     }

   API:
     mount(host, config)       — done by the factory
     getAnswer()               — { x, y, V, gMag, gx, gy }
     score(answer, cfg)        — optional, for backward-compat with type:"widget"
     destroy()                 — tears down
   ============================================================================ */
(function () {
  "use strict";
  const G_DEFAULT = 6.674e-11;

  function fieldMap(host, config) {
    if (!window.d3) {
      host.innerHTML = "<div class='qbroken'>D3 not loaded — cannot mount field-map.</div>";
      return { getAnswer: function () { return null; }, destroy: function () {} };
    }
    const d3 = window.d3;
    const G = config.G || G_DEFAULT;
    const bodies = Array.isArray(config.bodies) ? config.bodies : [];
    if (bodies.length === 0) {
      host.innerHTML = "<div class='qbroken'>Field-map: no bodies configured.</div>";
      return { getAnswer: function () { return null; }, destroy: function () {} };
    }

    // ── Physics ──
    // V at (x, y) in J kg^-1. Returns -Infinity at a singularity (so we can
    // clamp it in the readout).
    function V(x, y) {
      let v = 0;
      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        const dx = x - b.x, dy = y - b.y;
        const r = Math.sqrt(dx * dx + dy * dy);
        if (r < 1) return -Infinity;
        v -= G * b.mass / r;
      }
      return v;
    }
    function gVec(x, y) {
      let gx = 0, gy = 0;
      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        const dx = x - b.x, dy = y - b.y;
        const r2 = dx * dx + dy * dy;
        const r = Math.sqrt(r2);
        if (r < 1) continue;
        const k = -G * b.mass / (r2 * r); // such that g_vec = k * (dx, dy) since g points to mass
        gx += k * dx;
        gy += k * dy;
      }
      return { gx: gx, gy: gy, gMag: Math.sqrt(gx * gx + gy * gy) };
    }

    // ── Layout ──
    const W = 580, H = 400;
    const margin = { top: 24, right: 28, bottom: 48, left: 64 };
    const innerW = W - margin.left - margin.right;
    const innerH = H - margin.top - margin.bottom;

    const xDomain = (config.domain && config.domain.x) || [-1, 1];
    const yDomain = (config.domain && config.domain.y) || [-1, 1];

    // Equal aspect: adjust yDomain or innerH so x and y scale identically.
    // Cheapest: keep the configured domains, accept slight stretching.
    const xScale = d3.scaleLinear().domain(xDomain).range([0, innerW]);
    const yScale = d3.scaleLinear().domain(yDomain).range([innerH, 0]);

    // ── DOM scaffold ──
    host.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "fm-wrap";
    host.appendChild(wrap);
    const svg = d3.select(wrap).append("svg")
      .attr("viewBox", "0 0 " + W + " " + H)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .attr("class", "fm-svg");
    const root = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Axes
    const xAxis = d3.axisBottom(xScale).ticks(6).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(6).tickSizeOuter(0);
    root.append("g").attr("class", "fm-axis").attr("transform", "translate(0," + innerH + ")").call(xAxis);
    root.append("g").attr("class", "fm-axis").call(yAxis);
    root.append("text").attr("class", "fm-axlabel")
      .attr("x", innerW / 2).attr("y", innerH + 36)
      .attr("text-anchor", "middle")
      .text((config.xLabel || "x") + (config.xUnits ? "  /  " + config.xUnits : ""));
    root.append("text").attr("class", "fm-axlabel")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerH / 2).attr("y", -46)
      .attr("text-anchor", "middle")
      .text((config.yLabel || "y") + (config.yUnits ? "  /  " + config.yUnits : ""));

    // ── Compute V on a grid ──
    const gridN = 96;   // grid resolution; 96² = 9216 V-evaluations
    const dx = (xDomain[1] - xDomain[0]) / (gridN - 1);
    const dy = (yDomain[1] - yDomain[0]) / (gridN - 1);
    const values = new Array(gridN * gridN);
    let vmin = Infinity, vmax = -Infinity;
    for (let j = 0; j < gridN; j++) {
      for (let i = 0; i < gridN; i++) {
        const x = xDomain[0] + i * dx;
        const y = yDomain[0] + j * dy;
        let v = V(x, y);
        if (!isFinite(v)) v = -1e15; // singularity → very negative
        values[j * gridN + i] = v;
        if (v > vmax && v > -1e14) vmax = v;
        if (v < vmin && v > -1e14) vmin = v;
      }
    }

    // ── Contour levels ──
    // If user supplied, use them. Otherwise pick a log-ish spacing on the
    // negative side (gravity is always negative).
    let thresholds = config.contourLevels;
    if (!Array.isArray(thresholds) || thresholds.length === 0) {
      // 7 levels between vmin (deepest visible) and 0.7 * vmax (near zero)
      // Use geometric spacing in |V| so levels read nicely.
      const lo = Math.abs(vmin), hi = Math.abs(vmax) * 0.5;
      const N = 7;
      thresholds = [];
      for (let k = 0; k < N; k++) {
        const r = Math.pow(hi / lo, k / (N - 1));
        thresholds.push(-(lo * r));
      }
    }
    thresholds = thresholds.slice().sort(function (a, b) { return a - b; });

    // ── d3.contours ──
    // d3-contour expects values flattened with row-major order, and "size"
    // [width, height] is [gridN, gridN]. The contours come back in grid
    // coordinates [0, gridN] which we then rescale.
    const contourGen = d3.contours().size([gridN, gridN]).thresholds(thresholds);
    const contourData = contourGen(values);

    // Translate from grid coordinates to plot coordinates. Each contour is a
    // MultiPolygon in [0, gridN] x [0, gridN]. We render to plot pixels:
    //   plotX = xScale(xDomain[0] + (gridX/(gridN-1)) * (xDomain[1]-xDomain[0]))
    //         = xScale(xDomain[0] + gridX * dx)
    // Since xScale is linear, that's equivalent to a linear remapping.
    const gridXToPx = d3.scaleLinear().domain([0, gridN - 1]).range([0, innerW]);
    const gridYToPx = d3.scaleLinear().domain([0, gridN - 1]).range([0, innerH]);
    // Note: in d3-contour, y increases downward in the grid; our yScale also
    // happens to increase downward in pixels (since yScale is inverted), so
    // there's nothing more to flip if the data was filled with j increasing
    // in the +y direction. We DID fill that way (j = y index), but d3-contour
    // treats j=0 as the top of the image. So the contours come out flipped
    // vertically relative to our axes. We compensate by flipping the y of
    // each contour ring as we project.

    function projectAndPathify(geometry) {
      const polygons = geometry.coordinates;
      const parts = [];
      polygons.forEach(function (poly) {
        poly.forEach(function (ring) {
          const pts = ring.map(function (p) {
            return [gridXToPx(p[0]), innerH - gridYToPx(p[1])];
          });
          if (pts.length < 2) return;
          let s = "M" + pts[0][0] + "," + pts[0][1];
          for (let k = 1; k < pts.length; k++) {
            s += "L" + pts[k][0] + "," + pts[k][1];
          }
          s += "Z";
          parts.push(s);
        });
      });
      return parts.join(" ");
    }

    // ── Render contours ──
    const contourGroup = root.append("g").attr("class", "fm-contours");
    contourGroup.selectAll("path")
      .data(contourData)
      .enter().append("path")
      .attr("d", function (d) { return projectAndPathify(d); })
      .attr("fill", "none")
      .attr("class", "fm-contour")
      .attr("data-v", function (d) { return d.value; });

    // Contour labels (light)
    const labelGroup = root.append("g").attr("class", "fm-labels");
    contourData.forEach(function (d) {
      // Find a label position: project the first ring's "rightmost" point.
      const polys = d.coordinates;
      if (!polys.length || !polys[0].length) return;
      const ring = polys[0][0];
      let best = ring[0], bestX = -Infinity;
      for (let k = 0; k < ring.length; k++) {
        if (ring[k][0] > bestX) { bestX = ring[k][0]; best = ring[k]; }
      }
      const px = gridXToPx(best[0]);
      const py = innerH - gridYToPx(best[1]);
      labelGroup.append("text").attr("class", "fm-label")
        .attr("x", px + 2).attr("y", py - 2)
        .text(d3.format(".2g")(d.value));
    });

    // ── Bodies ──
    const bodyGroup = root.append("g").attr("class", "fm-bodies");
    bodies.forEach(function (b) {
      const cx = xScale(b.x), cy = yScale(b.y);
      bodyGroup.append("circle").attr("class", "fm-body").attr("cx", cx).attr("cy", cy).attr("r", 6);
      if (b.label) {
        bodyGroup.append("text").attr("class", "fm-body-label")
          .attr("x", cx + 9).attr("y", cy + 4).text(b.label);
      }
    });

    // ── Mode: probe (default) or sketch (sketchMode: true). ──
    // In probe mode there's one draggable test point with live V/|g|/gx/gy
    // readouts. In sketch mode the student clicks the plane to place markers
    // on a target equipotential, each marker showing the V at that point.
    const sketchMode = !!config.sketchMode;
    function rand(a, b) { return a + Math.random() * (b - a); }

    // Probe state (used only when !sketchMode)
    let tx, ty, probeGroup = null, fieldArrow = null, probeDot = null;
    if (!sketchMode) {
      if (typeof config.initialX === "number") tx = config.initialX;
      else tx = rand(xDomain[0] + (xDomain[1] - xDomain[0]) * 0.10,
                     xDomain[0] + (xDomain[1] - xDomain[0]) * 0.90);
      if (typeof config.initialY === "number") ty = config.initialY;
      else ty = rand(yDomain[0] + (yDomain[1] - yDomain[0]) * 0.10,
                     yDomain[0] + (yDomain[1] - yDomain[0]) * 0.90);

      probeGroup = root.append("g").attr("class", "fm-probe-group");
      fieldArrow = probeGroup.append("line").attr("class", "fm-field-arrow");
      probeDot = probeGroup.append("circle").attr("class", "fm-probe-dot").attr("r", 8);

      probeDot.call(d3.drag().on("drag", function (event) {
        tx = xScale.invert(event.x); ty = yScale.invert(event.y);
        if (tx < xDomain[0]) tx = xDomain[0];
        if (tx > xDomain[1]) tx = xDomain[1];
        if (ty < yDomain[0]) ty = yDomain[0];
        if (ty > yDomain[1]) ty = yDomain[1];
        render();
      }));
    }

    // Sketch state (used only when sketchMode)
    let sketchPoints = [];   // [{x, y, V}, ...]
    let sketchGroup = null;
    let sketchPolyline = null;
    if (sketchMode) {
      sketchGroup = root.append("g").attr("class", "fm-sketch-group");
      sketchPolyline = sketchGroup.append("path").attr("class", "fm-sketch-polyline").attr("d", "");
    }

    // Click handler: probe-move in probe mode, add-point in sketch mode.
    svg.on("click", function (event) {
      const target = event.target;
      if (target && target.classList && target.classList.contains("fm-probe-dot")) return;
      const [mx, my] = d3.pointer(event, root.node());
      if (mx < 0 || mx > innerW || my < 0 || my > innerH) return;
      const cx = xScale.invert(mx);
      const cy = yScale.invert(my);
      if (sketchMode) {
        // Click dedup: if this click lands within 6 px of an existing point,
        // ignore it. Protects against accidental double-clicks adding two
        // points at almost the same location.
        const DEDUP_PX = 6;
        for (let i = 0; i < sketchPoints.length; i++) {
          const p = sketchPoints[i];
          const dx = xScale(p.x) - mx, dy = yScale(p.y) - my;
          if (dx * dx + dy * dy < DEDUP_PX * DEDUP_PX) return;
        }
        sketchPoints.push({ x: cx, y: cy, V: V(cx, cy) });
      } else {
        tx = cx; ty = cy;
      }
      render();
    });

    // Hover cursor coords (sketch mode only). The student needs to know
    // where in the plot they are aiming before they click. We deliberately
    // don't show V at the cursor (that would hand them the answer); only
    // the (x, y) coordinates.
    let hoverX = null, hoverY = null;
    if (sketchMode) {
      svg.on("mousemove", function (event) {
        const [mx, my] = d3.pointer(event, root.node());
        if (mx < 0 || mx > innerW || my < 0 || my > innerH) {
          hoverX = null; hoverY = null;
        } else {
          hoverX = xScale.invert(mx);
          hoverY = yScale.invert(my);
        }
        render();
      });
      svg.on("mouseleave", function () {
        hoverX = null; hoverY = null;
        render();
      });
    }

    // ── Readout panel ──
    const readout = document.createElement("div");
    readout.className = "fm-readout";
    wrap.appendChild(readout);

    function formatSI(v, sig) {
      if (!isFinite(v) || v === 0) return (v === 0) ? "0" : "—";
      sig = sig || 3;
      const abs = Math.abs(v);
      if (abs >= 1e4 || abs < 1e-2) return v.toExponential(sig - 1);
      return v.toPrecision(sig);
    }

    // ── Fixed-exponent readout, matched to curve_probe ──
    // The student drags the test point and the readout values change quickly.
    // Locking an exponent per quantity (x, y, V, |g|) keeps the displayed
    // magnitudes legible across the drag, instead of the exponent jumping
    // every few pixels. We pick exponents from the configured domain (for
    // x/y) and from a 3×3 sample of V and |g| across the plane.
    const SUP_MAP_FM = { "0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵",
                        "6":"⁶","7":"⁷","8":"⁸","9":"⁹","-":"⁻","+":"⁺" };
    function fmToSuperscript(n) {
      return String(n).split("").map(function (c) { return SUP_MAP_FM[c] || c; }).join("");
    }
    function fmPickExp(typicalMagnitude) {
      if (!isFinite(typicalMagnitude) || typicalMagnitude === 0) return 0;
      return Math.floor(Math.log10(Math.abs(typicalMagnitude)));
    }
    function formatFixed(v, exp, sig) {
      sig = sig || 3;
      if (!isFinite(v)) return "—";
      if (v === 0) return "0";
      if (!exp || exp === 0) return v.toPrecision(sig);
      const mantissa = v / Math.pow(10, exp);
      if (Math.abs(mantissa) < 1e-6) return "0";
      return mantissa.toPrecision(sig) + " × 10" + fmToSuperscript(exp);
    }
    // Sample V and |g| across a coarse grid to find typical magnitudes.
    // Skip points within 5% of a body (singularity).
    const fmSampleVs = [];
    const fmSampleGs = [];
    for (let si = 0; si <= 4; si++) {
      for (let sj = 0; sj <= 4; sj++) {
        const sx = xDomain[0] + (xDomain[1] - xDomain[0]) * (si / 4);
        const sy = yDomain[0] + (yDomain[1] - yDomain[0]) * (sj / 4);
        let nearBody = false;
        for (let bi = 0; bi < bodies.length; bi++) {
          const dx = sx - bodies[bi].x, dy = sy - bodies[bi].y;
          const span = Math.max(xDomain[1] - xDomain[0], yDomain[1] - yDomain[0]);
          if (Math.sqrt(dx*dx + dy*dy) < span * 0.05) { nearBody = true; break; }
        }
        if (nearBody) continue;
        const sv = V(sx, sy);
        const sg = gVec(sx, sy);
        if (isFinite(sv)) fmSampleVs.push(Math.abs(sv));
        if (isFinite(sg.gMag)) fmSampleGs.push(sg.gMag);
      }
    }
    const fmXExp = (typeof config.xExp === "number") ? config.xExp
                 : fmPickExp(Math.max(Math.abs(xDomain[0]), Math.abs(xDomain[1])));
    const fmYExp = (typeof config.yExp === "number") ? config.yExp
                 : fmPickExp(Math.max(Math.abs(yDomain[0]), Math.abs(yDomain[1])));
    const fmVExp = (typeof config.vExp === "number") ? config.vExp
                 : fmPickExp(fmSampleVs.length ? d3.max(fmSampleVs) : 1);
    const fmGExp = (typeof config.gExp === "number") ? config.gExp
                 : fmPickExp(fmSampleGs.length ? d3.max(fmSampleGs) : 1);

    // ── Sketch-mode buttons (Undo / Clear) ──
    if (sketchMode) {
      const btnRow = document.createElement("div");
      btnRow.className = "fm-sketch-btns";
      const undoBtn = document.createElement("button");
      undoBtn.type = "button";
      undoBtn.className = "fm-sketch-btn";
      undoBtn.textContent = "Undo last point";
      undoBtn.addEventListener("click", function () {
        if (sketchPoints.length === 0) return;
        sketchPoints.pop();
        render();
      });
      const clearBtn = document.createElement("button");
      clearBtn.type = "button";
      clearBtn.className = "fm-sketch-btn fm-sketch-btn-danger";
      clearBtn.textContent = "Clear all";
      clearBtn.addEventListener("click", function () {
        sketchPoints = [];
        render();
      });
      btnRow.appendChild(undoBtn);
      btnRow.appendChild(clearBtn);
      wrap.appendChild(btnRow);
    }

    function rowHTML(key, val, units, cls) {
      return "<div class='fm-row" + (cls ? " " + cls : "") + "'>"
           + "<span class='fm-key'>" + key + "</span>"
           + "<span class='fm-val'>" + val + " " + (units || "") + "</span></div>";
    }

    function renderProbe() {
      const px = xScale(tx), py = yScale(ty);
      probeDot.attr("cx", px).attr("cy", py);

      const v = V(tx, ty);
      const gv = gVec(tx, ty);

      if (config.showFieldArrow !== false) {
        const len = 24;
        const ux = gv.gMag > 0 ? gv.gx / gv.gMag : 0;
        const uy_screen = gv.gMag > 0 ? -gv.gy / gv.gMag : 0;
        fieldArrow
          .attr("x1", px).attr("y1", py)
          .attr("x2", px + ux * len).attr("y2", py + uy_screen * len);
      } else {
        fieldArrow.attr("x2", px).attr("y2", py);
      }

      const xUnits = config.xUnits || "";
      const yUnits = config.yUnits || "";
      let html = "";
      html += "<div class='fm-readout-h'>Test point</div>";
      html += rowHTML(config.xLabel || "x", formatFixed(tx, fmXExp), xUnits);
      html += rowHTML(config.yLabel || "y", formatFixed(ty, fmYExp), yUnits);
      html += "<div class='fm-readout-h'>Field at point</div>";
      html += rowHTML("V", formatFixed(v, fmVExp), "J kg⁻¹", "fm-row-key");
      html += rowHTML("|g|", formatFixed(gv.gMag, fmGExp), "N kg⁻¹", "fm-row-key");
      html += rowHTML("g_x", formatFixed(gv.gx, fmGExp), "N kg⁻¹");
      html += rowHTML("g_y", formatFixed(gv.gy, fmGExp), "N kg⁻¹");
      readout.innerHTML = html;
    }

    function renderSketch() {
      // Re-render markers and labels (clear + redraw)
      sketchGroup.selectAll(".fm-sketch-marker").remove();
      sketchGroup.selectAll(".fm-sketch-label").remove();

      const targetV = config.expectedV;
      const tol = (typeof config.tolerancePerPoint === "number")
                  ? config.tolerancePerPoint
                  : (typeof targetV === "number" ? Math.abs(targetV) * 0.08 : 1);

      sketchPoints.forEach(function (p) {
        const px = xScale(p.x), py = yScale(p.y);
        const within = (typeof targetV === "number") && Math.abs(p.V - targetV) <= tol;
        sketchGroup.append("circle")
          .attr("class", "fm-sketch-marker " + (within ? "fm-sketch-in" : "fm-sketch-out"))
          .attr("cx", px).attr("cy", py).attr("r", 5);
        sketchGroup.append("text")
          .attr("class", "fm-sketch-label")
          .attr("x", px + 7).attr("y", py + 3)
          .text(formatFixed(p.V, fmVExp, 2));
      });

      // Polyline through points (in click order)
      if (sketchPoints.length >= 2) {
        const d = sketchPoints.map(function (p, i) {
          return (i === 0 ? "M" : "L") + xScale(p.x) + "," + yScale(p.y);
        }).join(" ");
        sketchPolyline.attr("d", d);
      } else {
        sketchPolyline.attr("d", "");
      }

      // Readout sidebar
      const xUnits = config.xUnits || "";
      const yUnits = config.yUnits || "";
      let html = "";
      html += "<div class='fm-readout-h'>Target</div>";
      if (typeof targetV === "number") {
        html += rowHTML("V_target", formatFixed(targetV, fmVExp), "J kg⁻¹", "fm-row-key");
        html += rowHTML("± tolerance", "±" + formatFixed(tol, fmVExp, 2), "J kg⁻¹");
      } else {
        html += "<div class='fm-row'><span class='fm-key'>(no target set)</span></div>";
      }
      html += "<div class='fm-readout-h'>Cursor</div>";
      if (hoverX != null && hoverY != null) {
        html += rowHTML(config.xLabel || "x", formatFixed(hoverX, fmXExp), xUnits);
        html += rowHTML(config.yLabel || "y", formatFixed(hoverY, fmYExp), yUnits);
      } else {
        html += "<div class='fm-row'><span class='fm-key'>(move mouse over plot)</span></div>";
      }
      html += "<div class='fm-readout-h'>Your points</div>";
      if (sketchPoints.length === 0) {
        html += "<div class='fm-row'><span class='fm-key'>Click to place a point.</span></div>";
      } else {
        let inTol = 0, sumV = 0;
        sketchPoints.forEach(function (p) {
          if (typeof targetV === "number" && Math.abs(p.V - targetV) <= tol) inTol++;
          sumV += p.V;
        });
        const mean = sumV / sketchPoints.length;
        html += rowHTML("Placed", String(sketchPoints.length));
        html += rowHTML("Within tolerance", inTol + " / " + sketchPoints.length);
        html += rowHTML("Mean V", formatFixed(mean, fmVExp), "J kg⁻¹");
      }
      readout.innerHTML = html;
    }

    function render() { sketchMode ? renderSketch() : renderProbe(); }
    render();

    function scoreSketch(answer, cfg) {
      const target = cfg.expectedV;
      const possible = (typeof cfg.marks === "number") ? cfg.marks : 2;
      const tol = (typeof cfg.tolerancePerPoint === "number")
                  ? cfg.tolerancePerPoint
                  : (typeof target === "number" ? Math.abs(target) * 0.08 : 1);
      const minPoints = (typeof cfg.minPoints === "number") ? cfg.minPoints : 5;
      const pts = (answer && Array.isArray(answer.sketchPoints)) ? answer.sketchPoints : [];

      if (typeof target !== "number") {
        return { marksAwarded: 0, marksPossible: possible, status: "none",
                 hits: [], misses: ["No expectedV configured"] };
      }
      if (pts.length < minPoints) {
        return {
          marksAwarded: 0, marksPossible: possible, status: "none",
          hits: [],
          misses: ["Place at least " + minPoints + " points along the contour. You placed " + pts.length + "."]
        };
      }
      const inTol = pts.filter(function (p) { return Math.abs(p.V - target) <= tol; });
      const fraction = inTol.length / pts.length;
      let awarded;
      if (fraction >= 0.85)      awarded = possible;
      else if (fraction >= 0.55) awarded = Math.ceil(possible / 2);
      else                       awarded = 0;
      const status = awarded === possible ? "full" : awarded > 0 ? "partial" : "none";
      const hits = [], misses = [];
      const outCount = pts.length - inTol.length;
      hits.push("You placed " + pts.length + " points; "
                + inTol.length + " were within ±" + formatSI(tol, 2)
                + " of V = " + formatSI(target) + ".");
      if (outCount > 0) {
        misses.push(outCount + " of your " + pts.length
                    + " points were outside the tolerance band of ±"
                    + formatSI(tol, 2) + " around V = " + formatSI(target) + ".");
      }
      return { marksAwarded: awarded, marksPossible: possible, status: status, hits: hits, misses: misses };
    }

    return {
      getAnswer: function () {
        if (sketchMode) {
          return {
            sketchMode: true,
            sketchPoints: sketchPoints.slice(),
            targetV: config.expectedV
          };
        }
        const v = V(tx, ty);
        const gv = gVec(tx, ty);
        return { x: tx, y: ty, V: v, gMag: gv.gMag, gx: gv.gx, gy: gv.gy };
      },
      score: function (answer, cfg) {
        if (cfg.sketchMode || (answer && answer.sketchMode)) {
          return scoreSketch(answer, cfg);
        }
        const possible = (typeof cfg.marks === "number") ? cfg.marks : 1;
        const mode = cfg.answerMode || "read-V";
        const expected = cfg.expected;
        if (typeof expected !== "number") {
          return { marksAwarded: 0, marksPossible: possible, status: "none",
                   hits: [], misses: ["No expected value configured"] };
        }
        let observed;
        switch (mode) {
          case "read-V":      observed = answer.V;    break;
          case "read-gMag":   observed = answer.gMag; break;
          case "find-x":      observed = answer.x;    break;
          case "find-y":      observed = answer.y;    break;
          default:            observed = answer.V;
        }
        const tol = (typeof cfg.tolerance === "number") ? cfg.tolerance
                  : Math.max(Math.abs(expected) * 0.05, 1e-9);
        const ok = Math.abs(observed - expected) <= tol;
        return {
          marksAwarded: ok ? possible : 0,
          marksPossible: possible,
          status: ok ? "full" : "none",
          hits: ok ? ["Within tolerance of " + formatSI(expected)] : [],
          misses: ok ? [] : ["Expected " + formatSI(expected) + " ± " + formatSI(tol)
                             + ", you read " + formatSI(observed)]
        };
      },
      destroy: function () {
        svg.on("click", null);
        host.innerHTML = "";
      }
    };
  }

  window.FIELDS_WIDGETS = window.FIELDS_WIDGETS || {};
  window.FIELDS_WIDGETS.field_map = fieldMap;
})();
