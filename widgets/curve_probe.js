/* ============================================================================
   Curve-and-Probe widget
   ----------------------------------------------------------------------------
   An interactive plot of f(r). The student drags a probe along the x-axis;
   the widget shows the value f(r), the local gradient as a tangent line, and
   a numeric read-off. Configurable answer modes drive what the student has
   to do to score:

     answerMode: "read-value"      — read the function value at a target r
     answerMode: "read-gradient"   — read the local gradient at a target r
     answerMode: "find-zero"       — drag the probe to where f(r) = target
                                     (or where the gradient is zero, etc.)
     answerMode: "read-area"       — drag two markers and read area between

   Curve types supported in v0.1:
     "V_radial"    : V(r) = -GM/r           — gravitational potential
     "g_radial"    : g(r) = GM/r^2          — gravitational field strength
     "Ep_radial"   : Ep(r) = -GMm/r         — gravitational PE
     "E_orbit"     : E(r) = -GMm/(2r)       — orbital total energy
     "Ek_orbit"    : Ek(r) = GMm/(2r)       — orbital KE
     "custom"      : user-supplied points {x, y} array via config.points

   Constants and units:
     G is read from config.G or defaults to 6.674e-11
     M is read from config.M (required for the named curves)
     m is read from config.m (required for the Ep_/E_/Ek_ curves)
     The plot is purely Cartesian. Axis labels come from config.xLabel/yLabel
     and unit suffixes via config.xUnits/yUnits.

   Scoring:
     The widget reports the student's submitted readout in getAnswer(), and
     score() compares to config.expected within config.tolerance.

   Dependencies:
     d3 (loaded as window.d3 from CDN by the host page).
   ============================================================================ */

(function () {
  "use strict";

  const G_DEFAULT = 6.674e-11;

  function curveFn(config) {
    const G = config.G || G_DEFAULT;
    const M = config.M;
    const m = config.m;
    switch (config.curve) {
      case "V_radial":  return function (r) { return -G * M / r; };
      case "g_radial":  return function (r) { return  G * M / (r * r); };
      case "Ep_radial": return function (r) { return -G * M * m / r; };
      case "E_orbit":   return function (r) { return -G * M * m / (2 * r); };
      case "Ek_orbit":  return function (r) { return  G * M * m / (2 * r); };
      case "orbital_energies":
        // Main curve = total mechanical energy. With showSeparateContributions
        // the widget also plots E_k (positive, dashed) and E_p (negative, dashed)
        // so the student SEES that E_p falls (becomes less negative) by twice
        // the amount E_k shrinks, and the net rises into less-negative territory.
        return function (r) { return -G * M * m / (2 * r); };
      case "two_mass_along_line": {
        // Two point masses on the same line. M1 at xM1 (default 0), M2 at xM2.
        // mode "magnitude": |g_net_x|, drops to zero at the equilibrium.
        // mode "signed_x":  g_net_x (negative toward M1, positive toward M2).
        const M1 = config.M1, M2 = config.M2;
        const xM1 = (typeof config.xM1 === "number") ? config.xM1 : 0;
        const xM2 = config.xM2;
        const mode = config.lineMode || "magnitude";
        return function (x) {
          const dx1 = xM1 - x;
          const r1 = Math.abs(dx1);
          const dx2 = xM2 - x;
          const r2 = Math.abs(dx2);
          if (r1 < 1 || r2 < 1) return 0;
          const gx1 = G * M1 * dx1 / (r1 * r1 * r1);
          const gx2 = G * M2 * dx2 / (r2 * r2 * r2);
          const net = gx1 + gx2;
          return (mode === "signed_x") ? net : Math.abs(net);
        };
      }
      case "two_mass_V_along_line": {
        // Gravitational potential along the line joining two point masses.
        // V is a scalar so there's no "signed" vs "magnitude" — values are
        // always negative for a bound system. Singularities at the masses
        // are clamped to a very negative number so contouring doesn't blow.
        const M1 = config.M1, M2 = config.M2;
        const xM1 = (typeof config.xM1 === "number") ? config.xM1 : 0;
        const xM2 = config.xM2;
        return function (x) {
          const r1 = Math.abs(xM1 - x), r2 = Math.abs(xM2 - x);
          if (r1 < 1 || r2 < 1) return -1e15;
          return -G * M1 / r1 - G * M2 / r2;
        };
      }
      case "custom":
        // Linear interpolation across provided points.
        const pts = (config.points || []).slice().sort(function (a, b) { return a.x - b.x; });
        return function (r) {
          if (pts.length === 0) return 0;
          if (r <= pts[0].x) return pts[0].y;
          if (r >= pts[pts.length - 1].x) return pts[pts.length - 1].y;
          for (let i = 0; i < pts.length - 1; i++) {
            if (r >= pts[i].x && r <= pts[i + 1].x) {
              const t = (r - pts[i].x) / (pts[i + 1].x - pts[i].x);
              return pts[i].y + t * (pts[i + 1].y - pts[i].y);
            }
          }
          return 0;
        };
      default:
        throw new Error("Unknown curve type: " + config.curve);
    }
  }

  // Numerical derivative; small relative step keeps it stable across magnitudes.
  function gradAt(f, r) {
    const h = Math.max(1e-6, Math.abs(r) * 1e-5);
    return (f(r + h) - f(r - h)) / (2 * h);
  }

  function formatSI(v, sig) {
    if (v === 0) return "0";
    sig = sig || 3;
    const abs = Math.abs(v);
    if (abs >= 1e4 || abs < 1e-2) return v.toExponential(sig - 1);
    return v.toPrecision(sig);
  }

  // ── Fixed-exponent readout helpers ──
  // The student reads numbers that drift across many orders of magnitude as
  // they drag the probe. If we format with toExponential() the exponent
  // changes every few pixels, which is disorienting. Instead, pick a single
  // "natural" exponent per readout type at mount time (based on the data's
  // magnitude) and format every value as `mantissa × 10ᴺ` with that exponent
  // locked. The mantissa may go below 1 or above 10 if the value is far from
  // the axis's typical scale — that's intentional, it makes very small or
  // very large values visually obvious.
  const SUP_MAP = { "0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵",
                    "6":"⁶","7":"⁷","8":"⁸","9":"⁹","-":"⁻","+":"⁺" };
  function toSuperscript(n) {
    return String(n).split("").map(function (c) { return SUP_MAP[c] || c; }).join("");
  }
  // Pick an exponent so a typical value's mantissa lands in [1, 10).
  function pickExp(typicalMagnitude) {
    if (!isFinite(typicalMagnitude) || typicalMagnitude === 0) return 0;
    return Math.floor(Math.log10(Math.abs(typicalMagnitude)));
  }
  // Format a number with a locked exponent. If `exp` is 0 (small magnitudes),
  // we fall back to plain toPrecision. Very-near-zero values render as "0".
  function formatFixed(v, exp, sig) {
    sig = sig || 3;
    if (!isFinite(v)) return "—";
    if (v === 0) return "0";
    if (!exp || exp === 0) {
      const abs = Math.abs(v);
      if (abs >= 1e4) return v.toPrecision(sig);
      return v.toPrecision(sig);
    }
    const mantissa = v / Math.pow(10, exp);
    if (Math.abs(mantissa) < 1e-6) return "0";
    return mantissa.toPrecision(sig) + " × 10" + toSuperscript(exp);
  }

  // ── Factory ────────────────────────────────────────────────────────────────
  function curveProbe(host, config) {
    if (!window.d3) {
      host.innerHTML = "<div class='qbroken'>D3 not loaded — cannot mount Curve-and-Probe.</div>";
      return { getAnswer: function () { return null; }, score: function () { return null; }, destroy: function () {} };
    }
    const d3 = window.d3;
    const f = curveFn(config);

    // For "two_mass_along_line" with showSeparateContributions, build
    // separate functions for each body's contribution. The widget draws
    // them as auxiliary curves and reports them as separate readouts.
    let contribFns = null;
    if (config.curve === "two_mass_along_line" && config.showSeparateContributions) {
      const G_ = config.G || G_DEFAULT;
      const M1 = config.M1, M2 = config.M2;
      const xM1 = (typeof config.xM1 === "number") ? config.xM1 : 0;
      const xM2 = config.xM2;
      const mode = config.lineMode || "magnitude";
      function gFrom(M, xMass) {
        return function (x) {
          const dx = xMass - x, r = Math.abs(dx);
          if (r < 1) return 0;
          const v = G_ * M * dx / (r * r * r);
          return (mode === "magnitude") ? Math.abs(v) : v;
        };
      }
      contribFns = [
        { label: "g₁ from M₁", color: "#5a9a5a", fn: gFrom(M1, xM1) },
        { label: "g₂ from M₂", color: "#c17034", fn: gFrom(M2, xM2) }
      ];
    }
    if (config.curve === "two_mass_V_along_line" && config.showSeparateContributions) {
      const G_ = config.G || G_DEFAULT;
      const M1 = config.M1, M2 = config.M2;
      const xM1 = (typeof config.xM1 === "number") ? config.xM1 : 0;
      const xM2 = config.xM2;
      function vFrom(M, xMass) {
        return function (x) {
          const r = Math.abs(xMass - x);
          if (r < 1) return -1e15;
          return -G_ * M / r;
        };
      }
      contribFns = [
        { label: "V₁ from M₁", color: "#5a9a5a", fn: vFrom(M1, xM1) },
        { label: "V₂ from M₂", color: "#c17034", fn: vFrom(M2, xM2) }
      ];
    }
    if (config.curve === "orbital_energies" && config.showSeparateContributions !== false) {
      // For the orbital-energies curve, default to showing both contributions
      // unless the author explicitly disables. The whole pedagogical point is
      // seeing all three.
      const G_ = config.G || G_DEFAULT;
      const M = config.M, m = config.m;
      contribFns = [
        { label: "E_k = +GMm/(2r)",  color: "#2d6a3f", fn: function (r) { return  G_ * M * m / (2 * r); } },
        { label: "E_p = -GMm/r",      color: "#b03030", fn: function (r) { return -G_ * M * m / r; } }
      ];
    }

    // Layout
    const W = 560, H = 320;
    const margin = { top: 24, right: 28, bottom: 48, left: 76 };
    const innerW = W - margin.left - margin.right;
    const innerH = H - margin.top - margin.bottom;

    // Domain
    const xDomain = config.domain || [1, 10];
    const xs = [];
    const N = 240;
    for (let i = 0; i <= N; i++) {
      xs.push(xDomain[0] + (xDomain[1] - xDomain[0]) * (i / N));
    }
    const ys = xs.map(f);

    // Y domain: include contribution curves too if present.
    let yMin = d3.min(ys), yMax = d3.max(ys);
    if (contribFns) {
      contribFns.forEach(function (c) {
        const cys = xs.map(c.fn);
        const lo = d3.min(cys), hi = d3.max(cys);
        if (lo < yMin) yMin = lo;
        if (hi > yMax) yMax = hi;
      });
    }
    const span = yMax - yMin || Math.max(1, Math.abs(yMax) || 1);
    yMin -= span * 0.08; yMax += span * 0.08;
    if (Array.isArray(config.yDomain)) { yMin = config.yDomain[0]; yMax = config.yDomain[1]; }

    // Pick fixed exponents for the readout panel.
    // - xExp:     scale of the x-axis (radius, distance, etc.)
    // - yExp:     scale of the y-axis (V, g, energy, etc.)
    // - slopeExp: scale of dy/dx (yExp - xExp)
    // - areaExp:  scale of ∫y dx (yExp + xExp), used in showArea mode
    // Authors can override via config.xExp / config.yExp etc.
    const xMagn = Math.max(Math.abs(xDomain[0]), Math.abs(xDomain[1]));
    const yMagn = Math.max(Math.abs(yMin), Math.abs(yMax));
    const xExp = (typeof config.xExp === "number") ? config.xExp : pickExp(xMagn);
    const yExp = (typeof config.yExp === "number") ? config.yExp : pickExp(yMagn);
    const slopeExp = (typeof config.slopeExp === "number") ? config.slopeExp : (yExp - xExp);
    const areaExp  = (typeof config.areaExp  === "number") ? config.areaExp  : (yExp + xExp);

    // Probe state. By default a random position in the domain — the student
    // has to actually navigate to the point the question asks about. Numeric
    // initialR pins it to a specific value (useful for "find-zero" answers).
    function rand(a, b) { return a + Math.random() * (b - a); }
    let probeR;
    if (typeof config.initialR === "number") {
      probeR = config.initialR;
    } else {
      // "random" or anything else: uniform in the middle 80% of the domain
      probeR = rand(xDomain[0] + (xDomain[1] - xDomain[0]) * 0.10,
                    xDomain[0] + (xDomain[1] - xDomain[0]) * 0.90);
    }
    if (probeR < xDomain[0]) probeR = xDomain[0];
    if (probeR > xDomain[1]) probeR = xDomain[1];

    // Second probe — only used when showArea: true. Randomised so the student
    // has to drag both.
    let probe2R;
    if (typeof config.initialR2 === "number") {
      probe2R = config.initialR2;
    } else {
      probe2R = rand(xDomain[0] + (xDomain[1] - xDomain[0]) * 0.10,
                     xDomain[0] + (xDomain[1] - xDomain[0]) * 0.90);
      // Avoid the probes coinciding
      if (Math.abs(probe2R - probeR) < (xDomain[1] - xDomain[0]) * 0.10) {
        probe2R += (xDomain[1] - xDomain[0]) * 0.25;
        if (probe2R > xDomain[1]) probe2R = xDomain[0] + (xDomain[1] - xDomain[0]) * 0.20;
      }
    }

    // ── DOM scaffold ──
    host.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "cp-wrap";
    host.appendChild(wrap);

    const svg = d3.select(wrap).append("svg")
      .attr("viewBox", "0 0 " + W + " " + H)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .attr("class", "cp-svg");

    const g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const xScale = d3.scaleLinear().domain(xDomain).range([0, innerW]);
    const yScale = d3.scaleLinear().domain([yMin, yMax]).range([innerH, 0]);

    // Axes
    const xAxis = d3.axisBottom(xScale).ticks(6).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(6).tickSizeOuter(0);

    g.append("g").attr("class", "cp-axis cp-axis-x")
      .attr("transform", "translate(0," + innerH + ")").call(xAxis);
    g.append("g").attr("class", "cp-axis cp-axis-y").call(yAxis);

    // Axis labels
    g.append("text").attr("class", "cp-axlabel")
      .attr("x", innerW / 2).attr("y", innerH + 36)
      .attr("text-anchor", "middle")
      .text((config.xLabel || "r") + (config.xUnits ? "  /  " + config.xUnits : ""));
    g.append("text").attr("class", "cp-axlabel")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerH / 2).attr("y", -56)
      .attr("text-anchor", "middle")
      .text((config.yLabel || "f(r)") + (config.yUnits ? "  /  " + config.yUnits : ""));

    // Zero line (y=0) if it's inside view
    if (yMin < 0 && yMax > 0) {
      g.append("line").attr("class", "cp-zero")
        .attr("x1", 0).attr("x2", innerW)
        .attr("y1", yScale(0)).attr("y2", yScale(0));
    }

    // Curve (main = net)
    const line = d3.line().x(function (d, i) { return xScale(xs[i]); }).y(function (d) { return yScale(d); });
    g.append("path").attr("class", "cp-curve").attr("d", line(ys));

    // Contribution curves (g1, g2) if requested
    if (contribFns) {
      contribFns.forEach(function (c) {
        const cys = xs.map(c.fn);
        g.append("path")
          .attr("class", "cp-curve cp-curve-contrib")
          .attr("d", line(cys))
          .attr("stroke", c.color);
      });
    }

    // Area shading (between probe and probe2 when in read-area mode)
    const areaPath = g.append("path").attr("class", "cp-area").attr("d", "");

    // Tangent group at probe. Crosshairs are drawn first (under the curve in
    // z-order), then the tangent, then the dot on top.
    const tg = g.append("g").attr("class", "cp-tangent-group");
    const probeLineH  = tg.append("line").attr("class", "cp-probeline cp-probeline-h");
    const probeLine   = tg.append("line").attr("class", "cp-probeline");
    const tangentLine = tg.append("line").attr("class", "cp-tangent");
    const probeDot    = tg.append("circle").attr("class", "cp-probedot").attr("r", 6);

    // Second probe (only visible when the question wants ΔV / area readouts).
    const showSecondProbe = !!config.showArea;
    const tg2 = g.append("g").attr("class", "cp-tangent-group cp-tg2");
    const probeLine2H = tg2.append("line").attr("class", "cp-probeline cp-probeline2 cp-probeline-h");
    const probeLine2  = tg2.append("line").attr("class", "cp-probeline cp-probeline2");
    const probeDot2   = tg2.append("circle").attr("class", "cp-probedot cp-probedot2").attr("r", 6);
    if (!showSecondProbe) tg2.style("display", "none");

    // Drag handlers
    function dragX(setter) {
      return d3.drag()
        .on("drag", function (event) {
          let r = xScale.invert(event.x);
          if (r < xDomain[0]) r = xDomain[0];
          if (r > xDomain[1]) r = xDomain[1];
          setter(r);
          render();
        });
    }
    probeDot.call(dragX(function (r) { probeR = r; }));
    probeLine.call(dragX(function (r) { probeR = r; }));
    probeDot2.call(dragX(function (r) { probe2R = r; }));
    probeLine2.call(dragX(function (r) { probe2R = r; }));

    // Click anywhere on the plot to move the probe
    svg.on("click", function (event) {
      const target = event.target;
      if (target && target.classList && (target.classList.contains("cp-probedot")
        || target.classList.contains("cp-probeline"))) return;
      const [mx, my] = d3.pointer(event, g.node());
      if (mx < 0 || mx > innerW) return;
      let r = xScale.invert(mx);
      if (r < xDomain[0]) r = xDomain[0];
      if (r > xDomain[1]) r = xDomain[1];
      probeR = r; render();
    });

    // Readout panel
    const readout = document.createElement("div");
    readout.className = "cp-readout";
    wrap.appendChild(readout);

    // ── Numeric trapezoid area between probe and probe2 ──
    function areaBetween(a, b) {
      if (a > b) { const t = a; a = b; b = t; }
      const steps = 200;
      let s = 0;
      let prev = f(a);
      for (let i = 1; i <= steps; i++) {
        const x = a + (b - a) * (i / steps);
        const cur = f(x);
        s += 0.5 * (prev + cur) * ((b - a) / steps);
        prev = cur;
      }
      return s;
    }

    function render() {
      const v = f(probeR);
      probeLine.attr("x1", xScale(probeR)).attr("x2", xScale(probeR))
               .attr("y1", 0).attr("y2", innerH);
      // Horizontal crosshair from the y-axis out to the probe dot, so the
      // student can read the y-value from the line's height as well as from
      // the readout panel.
      probeLineH.attr("x1", 0).attr("x2", xScale(probeR))
                .attr("y1", yScale(v)).attr("y2", yScale(v));
      probeDot.attr("cx", xScale(probeR)).attr("cy", yScale(v));

      // Tangent: length spans ~ 24% of inner width centred on probe
      const slope = gradAt(f, probeR);
      const halfWidthPx = innerW * 0.14;
      const halfWidthR = xScale.invert(halfWidthPx) - xScale.invert(0);
      const xL = Math.max(xDomain[0], probeR - halfWidthR);
      const xR = Math.min(xDomain[1], probeR + halfWidthR);
      const yL = v + slope * (xL - probeR);
      const yR = v + slope * (xR - probeR);
      tangentLine
        .attr("x1", xScale(xL)).attr("y1", yScale(yL))
        .attr("x2", xScale(xR)).attr("y2", yScale(yR));

      if (showSecondProbe) {
        const v2here = f(probe2R);
        probeLine2.attr("x1", xScale(probe2R)).attr("x2", xScale(probe2R))
                  .attr("y1", 0).attr("y2", innerH);
        probeLine2H.attr("x1", 0).attr("x2", xScale(probe2R))
                   .attr("y1", yScale(v2here)).attr("y2", yScale(v2here));
        probeDot2.attr("cx", xScale(probe2R)).attr("cy", yScale(v2here));
        const a = Math.min(probeR, probe2R), b = Math.max(probeR, probe2R);
        const polyPts = [[xScale(a), yScale(0)]];
        for (let i = 0; i <= 60; i++) {
          const r = a + (b - a) * (i / 60);
          polyPts.push([xScale(r), yScale(f(r))]);
        }
        polyPts.push([xScale(b), yScale(0)]);
        areaPath.attr("d", "M" + polyPts.map(function (p) { return p.join(","); }).join("L") + "Z");
      } else {
        areaPath.attr("d", "");
      }

      // Readout: always show r, value, gradient. If a second probe is in use,
      // also show its r, the difference Δvalue (ΔV in V-vs-r questions), and
      // the area under the curve between the probes. The area is intentionally
      // available even when the question's correct answer is something else,
      // so the student has to identify which readout matters.
      const xLabel = config.xLabel || "r";
      const yLabel = config.yLabel || "f(r)";
      const xUnits = config.xUnits || "";
      const yUnits = config.yUnits || "";
      const slopeUnits = (yUnits && xUnits) ? (yUnits + " / " + xUnits) : "";
      let html = "";
      function row(key, val, units, cls) {
        return "<div class='cp-row" + (cls ? " " + cls : "") + "'>"
             + "<span class='cp-key'>" + key + "</span>"
             + "<span class='cp-val'>" + val + " " + units + "</span></div>";
      }
      const isMulti = !!contribFns;
      html += "<div class='cp-readout-h'>At probe 1</div>";
      html += row(xLabel,                       formatFixed(probeR, xExp), xUnits);
      html += row(yLabel + (isMulti ? " (net)" : ""), formatFixed(v, yExp),    yUnits);
      html += row("d" + yLabel + "/d" + xLabel, formatFixed(slope, slopeExp), slopeUnits, "cp-row-grad");

      if (contribFns) {
        contribFns.forEach(function (c) {
          html += row(c.label, formatFixed(c.fn(probeR), yExp), yUnits);
        });
      }

      if (showSecondProbe) {
        const v2 = f(probe2R);
        const A = areaBetween(probeR, probe2R);
        const dV = v2 - v;
        const areaUnits = (yUnits && xUnits) ? (yUnits + " · " + xUnits) : "";
        html += "<div class='cp-readout-h'>At probe 2</div>";
        html += row(xLabel,    formatFixed(probe2R, xExp), xUnits);
        html += row(yLabel,    formatFixed(v2, yExp),      yUnits);
        html += "<div class='cp-readout-h'>Between the two probes</div>";
        html += row("Δ" + yLabel, formatFixed(dV, yExp),  yUnits, "cp-row-grad");
        html += row("Area",       formatFixed(A, areaExp), areaUnits);
      }
      readout.innerHTML = html;
    }

    render();

    // ── Public API ──
    return {
      getAnswer: function () {
        const v = f(probeR);
        const slope = gradAt(f, probeR);
        const ans = {
          r: probeR,
          value: v,
          gradient: slope,
          r2: probe2R,
          area: areaBetween(probeR, probe2R)
        };
        if (contribFns) {
          ans.contributions = contribFns.map(function (c) {
            return { label: c.label, value: c.fn(probeR) };
          });
        }
        return ans;
      },
      score: function (answer, cfg) {
        const possible = (typeof cfg.marks === "number") ? cfg.marks : 1;
        const mode = cfg.answerMode || "read-value";
        const expected = cfg.expected;
        if (typeof expected !== "number") {
          return { marksAwarded: 0, marksPossible: possible, status: "none",
                   hits: [], misses: ["No expected value configured"] };
        }
        const tol = (typeof cfg.tolerance === "number") ? cfg.tolerance : Math.max(Math.abs(expected) * 0.05, 1e-9);
        let observed;
        switch (mode) {
          case "read-value":    observed = answer.value;    break;
          case "read-gradient": observed = answer.gradient; break;
          case "find-zero":     observed = answer.r;        break;
          case "read-area":     observed = answer.area;     break;
          default:              observed = answer.value;
        }
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

  // Register
  window.FIELDS_WIDGETS = window.FIELDS_WIDGETS || {};
  window.FIELDS_WIDGETS.curve_probe = curveProbe;
})();
