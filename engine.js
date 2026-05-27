/* ============================================================================
   Fields Driller — IB Physics D.1 Gravitation, v0.1
   ----------------------------------------------------------------------------
   Forked from the Pre-IB Topic 7 engine. Same single-file, no-build-step
   shape. Loads window.FIELDS_D1_QUESTIONS, presents one question at a time,
   marks mcq/short/long/numeric per substring/numeric schema, logs attempts in
   localStorage, renders a coverage map by syllabus subtag.

   The fifth question type, "widget", is the only architectural extension.
   Widget questions delegate rendering and scoring to a named module registered
   on window.FIELDS_WIDGETS. The engine treats them like any other question
   type for persistence and the coverage map.
   ============================================================================ */

(function () {
  "use strict";

  /* ──────────────────────────────────────────────────────────────────────────
     1. Syllabus vocabulary (D.1 Gravitation)
     ────────────────────────────────────────────────────────────────────────── */

  const VOCAB = {
    parentGroups: [
      {
        id: "sl_foundations",
        name: "SL",
        subtags: [
          { id: "D.1.1", name: "Kepler's laws" },
          { id: "D.1.2", name: "Newton's law of gravitation" },
          { id: "D.1.3", name: "Point-mass conditions" },
          { id: "D.1.4", name: "Field strength g" },
          { id: "D.1.5", name: "Field lines" }
        ]
      },
      {
        id: "hl_energy_potential",
        name: "HL energy & potential",
        subtags: [
          { id: "D.1.H.1", name: "GPE concept" },
          { id: "D.1.H.2", name: "GPE formula" },
          { id: "D.1.H.3", name: "Potential V" },
          { id: "D.1.H.4", name: "g as V-gradient" },
          { id: "D.1.H.5", name: "Work from ΔV" }
        ]
      },
      {
        id: "hl_equipotentials",
        name: "HL equipotentials",
        subtags: [
          { id: "D.1.H.6", name: "Equipotential surfaces" },
          { id: "D.1.H.7", name: "Surfaces ↔ field lines" }
        ]
      },
      {
        id: "hl_escape_orbits",
        name: "HL escape & orbits",
        subtags: [
          { id: "D.1.H.8", name: "Escape speed" },
          { id: "D.1.H.9", name: "Orbital speed" },
          { id: "D.1.H.10", name: "Viscous drag" }
        ]
      }
    ],
    crossCutting: ["definition", "extended_writing", "graph_read", "widget_interaction"]
  };

  const SUBTAG_INDEX = (function () {
    const m = {};
    VOCAB.parentGroups.forEach(function (g) {
      g.subtags.forEach(function (st) {
        m[st.id] = { parentId: g.id, parentName: g.name, name: st.name };
      });
    });
    return m;
  })();

  // Atoms: the question-type granularity below the subtag. Each atom belongs
  // to one subtag. Atom names come from the user's "Q type summary from ppqs"
  // and are deliberately short for tile labels. Add an entry here when a new
  // atom appears in the question bank.
  const ATOMS = {
    "D.1.1-A1":   { subtag: "D.1.1",   name: "Period → radius" },
    "D.1.1-A2":   { subtag: "D.1.1",   name: "Radius → period" },
    "D.1.1-A3":   { subtag: "D.1.1",   name: "Table of orbits" },
    "D.1.1-B1":   { subtag: "D.1.1",   name: "Algebraic form of Kepler 3" },
    "D.1.1-B2":   { subtag: "D.1.1",   name: "Derive T² ∝ r³" },
    "D.1.1-C1":   { subtag: "D.1.1",   name: "Kepler 1: ellipse" },
    "D.1.1-C2":   { subtag: "D.1.1",   name: "Focus vs centre" },
    "D.1.1-C3":   { subtag: "D.1.1",   name: "Circle as special case" },
    "D.1.1-D1":   { subtag: "D.1.1",   name: "Equal areas equal times" },
    "D.1.1-D2":   { subtag: "D.1.1",   name: "Speed at periapsis" },
    "D.1.1-D3":   { subtag: "D.1.1",   name: "Angular momentum" },
    "D.1.1-A4":   { subtag: "D.1.1",   name: "Earth/AU reference" },
    "D.1.1-A5":   { subtag: "D.1.1",   name: "Mass from orbital data" },
    "D.1.2-A1":   { subtag: "D.1.2",   name: "State Newton's law" },
    "D.1.2-A3":   { subtag: "D.1.2",   name: "Describes vs explains" },
    "D.1.2-B1":   { subtag: "D.1.2",   name: "Force scaling" },
    "D.1.2-B3":   { subtag: "D.1.2",   name: "F-vs-r graph" },
    "D.1.2-C1":   { subtag: "D.1.2",   name: "Calculate F" },
    "D.1.2-C2":   { subtag: "D.1.2",   name: "F via F = mg" },
    "D.1.2-D1":   { subtag: "D.1.2",   name: "Gravity = centripetal" },
    "D.1.3-A1":   { subtag: "D.1.3",   name: "Bodies as point masses" },
    "D.1.3-A2":   { subtag: "D.1.3",   name: "Size vs separation" },
    "D.1.3-B2":   { subtag: "D.1.3",   name: "Add R to altitude" },
    "D.1.3-C1":   { subtag: "D.1.3",   name: "Data shows point mass" },
    "D.1.4-A1":   { subtag: "D.1.4",   name: "Define g" },
    "D.1.4-B1":   { subtag: "D.1.4",   name: "Units of g" },
    "D.1.4-B2":   { subtag: "D.1.4",   name: "g in m s⁻²" },
    "D.1.4-C1":   { subtag: "D.1.4",   name: "g at surface" },
    "D.1.4-C2":   { subtag: "D.1.4",   name: "g above surface" },
    "D.1.4-C3":   { subtag: "D.1.4",   name: "Find M from g and R" },
    "D.1.4-D1":   { subtag: "D.1.4",   name: "Different M and R" },
    "D.1.4-D2":   { subtag: "D.1.4",   name: "Same-density ratio" },
    "D.1.4-D3":   { subtag: "D.1.4",   name: "M ratio from g and R" },
    "D.1.4-E1":   { subtag: "D.1.4",   name: "Zero-field point" },
    "D.1.4-E2":   { subtag: "D.1.4",   name: "Two-source field ratio" },
    "D.1.4-E3":   { subtag: "D.1.4",   name: "Direction of resultant field" },
    "D.1.4-E4":   { subtag: "D.1.4",   name: "Force from two-source field" },
    "D.1.4-F1":   { subtag: "D.1.4",   name: "g from falling object" },
    "D.1.4-H1":   { subtag: "D.1.4",   name: "g = v²/r in orbit" },
    "D.1.4-H2":   { subtag: "D.1.4",   name: "Orbital g → v → T" },
    "D.1.5-A1":   { subtag: "D.1.5",   name: "Radial field lines" },
    "D.1.5-A2":   { subtag: "D.1.5",   name: "Force along field line" },
    "D.1.5-B1":   { subtag: "D.1.5",   name: "Line spacing → field" },
    "D.1.5-B2":   { subtag: "D.1.5",   name: "Field from line density" },
    "D.1.5-C1":   { subtag: "D.1.5",   name: "Uniform near surface" },
    "D.1.5-C2":   { subtag: "D.1.5",   name: "Uniform vs radial" },
    "D.1.5-D2":   { subtag: "D.1.5",   name: "Map field from V" },
    "D.1.H.1-A1": { subtag: "D.1.H.1", name: "Define GPE" },
    "D.1.H.1-A2": { subtag: "D.1.H.1", name: "System not object" },
    "D.1.H.1-B1": { subtag: "D.1.H.1", name: "GPE is negative" },
    "D.1.H.1-B2": { subtag: "D.1.H.1", name: "Work to infinity" },
    "D.1.H.1-C1": { subtag: "D.1.H.1", name: "3-mass GPE" },
    "D.1.H.2-A1": { subtag: "D.1.H.2", name: "Ep from V + mass" },
    "D.1.H.2-B1": { subtag: "D.1.H.2", name: "Ep ∝ -1/r" },
    "D.1.H.2-B2": { subtag: "D.1.H.2", name: "Less negative at larger r" },
    "D.1.H.2-B3": { subtag: "D.1.H.2", name: "Weight + Ep at 2R" },
    "D.1.H.2-C1": { subtag: "D.1.H.2", name: "ΔEp between orbits" },
    "D.1.H.2-D1": { subtag: "D.1.H.2", name: "Derive E = -GMm/2r" },
    "D.1.H.2-D2": { subtag: "D.1.H.2", name: "Ek, Ep, E vs r" },
    "D.1.H.3-A1": { subtag: "D.1.H.3", name: "Define V" },
    "D.1.H.3-C1": { subtag: "D.1.H.3", name: "Read V at point" },
    "D.1.H.3-C3": { subtag: "D.1.H.3", name: "rV = constant" },
    "D.1.H.3-D1": { subtag: "D.1.H.3", name: "V = -g(R+h) bridge" },
    "D.1.H.3-E1": { subtag: "D.1.H.3", name: "Two-source V" },
    "D.1.H.3-E2": { subtag: "D.1.H.3", name: "V max between two masses" },
    "D.1.H.4-A1": { subtag: "D.1.H.4", name: "g from V-gradient" },
    "D.1.H.4-B1": { subtag: "D.1.H.4", name: "g from ΔV/Δr" },
    "D.1.H.5-A1": { subtag: "D.1.H.5", name: "Work between orbits" },
    "D.1.H.5-C1": { subtag: "D.1.H.5", name: "Zero work in orbit" },
    "D.1.H.5-D2": { subtag: "D.1.H.5", name: "Work from r to 2r" },
    "D.1.H.6-A1": { subtag: "D.1.H.6", name: "Single-mass equipotentials" },
    "D.1.H.6-B1": { subtag: "D.1.H.6", name: "Two-mass equipotentials" },
    "D.1.H.6-C1": { subtag: "D.1.H.6", name: "Sketch equipotential" },
    "D.1.H.7-A1": { subtag: "D.1.H.7", name: "Field ⊥ equipotential" },
    "D.1.H.7-B1": { subtag: "D.1.H.7", name: "Direction of acceleration" },
    "D.1.H.8-B1": { subtag: "D.1.H.8", name: "Escape from √(2GM/R)" },
    "D.1.H.8-B2": { subtag: "D.1.H.8", name: "Escape from √(2gR)" },
    "D.1.H.8-C2": { subtag: "D.1.H.8", name: "Escape-speed variables" },
    "D.1.H.8-E1": { subtag: "D.1.H.8", name: "Sub-escape max height" },
    "D.1.H.8-G1": { subtag: "D.1.H.8", name: "Escape from combined fields" },
    "D.1.H.8-H1": { subtag: "D.1.H.8", name: "Escape from orbit" },
    "D.1.H.9-A1": { subtag: "D.1.H.9", name: "Derive v = √(GM/r)" },
    "D.1.H.9-A3": { subtag: "D.1.H.9", name: "Orbital speed value" },
    "D.1.H.9-B1": { subtag: "D.1.H.9", name: "T from v and r" },
    "D.1.H.9-E1": { subtag: "D.1.H.9", name: "Orbital KE = GMm/2r" },
    "D.1.H.9-E3": { subtag: "D.1.H.9", name: "Higher orbit: ΔEk vs ΔE" },
    "D.1.H.9-D3": { subtag: "D.1.H.9", name: "Weightlessness in orbit" },
    "D.1.H.9-F1": { subtag: "D.1.H.9", name: "v_orb vs v_esc" },
    "D.1.H.9-G1": { subtag: "D.1.H.9", name: "Coupled satellites" },
    "D.1.H.9-G2": { subtag: "D.1.H.9", name: "Geostationary orbit" },
    "D.1.H.10-A1": { subtag: "D.1.H.10", name: "Drag → energy loss" },
    "D.1.H.10-A3": { subtag: "D.1.H.10", name: "Drag → speed up" },
    "D.1.H.10-B1": { subtag: "D.1.H.10", name: "Instant Δv vs drag" },
    "D.1.H.10-C1": { subtag: "D.1.H.10", name: "Atmospheric spiral" },
    "D.1.H.10-C2": { subtag: "D.1.H.10", name: "Lower orbit speed" }
  };

  function isSubtag(t)  { return Object.prototype.hasOwnProperty.call(SUBTAG_INDEX, t); }
  function isAtom(t)    { return Object.prototype.hasOwnProperty.call(ATOMS, t); }
  function isCoverageTag(t) { return isSubtag(t) || isAtom(t); }
  function parentGroupForSubtag(t) {
    return SUBTAG_INDEX[t] ? SUBTAG_INDEX[t].parentId : null;
  }
  function atomsForSubtag(subtagId) {
    const out = [];
    Object.keys(ATOMS).forEach(function (id) {
      if (ATOMS[id].subtag === subtagId) out.push(id);
    });
    return out;
  }

  // Resolve a tag id to a human label. Works for subtags, atoms, or returns
  // null if the id isn't a tracked coverage tag.
  function nameForTag(t) {
    if (SUBTAG_INDEX[t]) return SUBTAG_INDEX[t].name;
    if (ATOMS[t])        return ATOMS[t].name;
    return null;
  }

  /* ──────────────────────────────────────────────────────────────────────────
     2. Normalisation (carried over from PreIB v0.4 §10)
     ────────────────────────────────────────────────────────────────────────── */

  const CONTRACTIONS = [
    ["can't", "cannot"], ["doesn't", "does not"], ["isn't", "is not"],
    ["won't", "will not"], ["wouldn't", "would not"], ["shouldn't", "should not"],
    ["couldn't", "could not"], ["didn't", "did not"], ["haven't", "have not"],
    ["hasn't", "has not"], ["hadn't", "had not"], ["aren't", "are not"],
    ["weren't", "were not"]
  ];

  const SPELLING_FOLD = [
    [/\bionize/g, "ionise"], [/\bionizing/g, "ionising"], [/\bionization/g, "ionisation"],
    [/\bmeter\b/g, "metre"], [/\bmeters\b/g, "metres"],
    [/\bcenter\b/g, "centre"], [/\bcenters\b/g, "centres"],
    [/\bcolor\b/g, "colour"], [/\bcolors\b/g, "colours"],
    [/\bpolarized\b/g, "polarised"], [/\banalyze\b/g, "analyse"]
  ];

  function norm(s) {
    if (s == null) return "";
    let t = String(s).toLowerCase();
    t = t.replace(/[‘’‚‛]/g, "'").replace(/[“”„‟]/g, '"');
    t = t.replace(/-/g, " ");
    for (const [c, e] of CONTRACTIONS) {
      const re = new RegExp("(^|[^a-z'])" + c.replace("'", "'") + "(?=[^a-z']|$)", "g");
      t = t.replace(re, "$1" + e);
    }
    for (const [re, repl] of SPELLING_FOLD) t = t.replace(re, repl);
    t = t.replace(/([\.,;:!?])(?=\s|$)/g, " ");
    t = t.replace(/[\t\n\r]+/g, " ").replace(/\s+/g, " ").trim();
    t = t.replace(/^(the|a|an) /, "");
    return t;
  }

  function includesNeedle(haystack, needle) {
    const n = norm(needle);
    if (!n) return false;
    return haystack.indexOf(n) !== -1;
  }

  function textIncludesAny(haystackNormed, anyArr) {
    if (!Array.isArray(anyArr)) return false;
    for (const phrase of anyArr) {
      if (includesNeedle(haystackNormed, phrase)) return true;
    }
    return false;
  }

  /* ──────────────────────────────────────────────────────────────────────────
     3. Marking (mcq / short / long / numeric, plus widget delegation)
     ────────────────────────────────────────────────────────────────────────── */

  function statusFromFraction(awarded, possible) {
    if (possible <= 0) return "none";
    const f = awarded / possible;
    if (f >= 0.999) return "full";
    if (f <= 0.001) return "none";
    return "partial";
  }

  function markMCQ(q, chosenIndex) {
    const correct = chosenIndex === q.answerIndex;
    return {
      marksAwarded: correct ? (q.marks || 1) : 0,
      marksPossible: q.marks || 1,
      status: correct ? "full" : "none",
      correctIndex: q.answerIndex,
      chosenIndex: chosenIndex
    };
  }

  // Multi-select: "check all that apply."
  // Scoring: each correctly-ticked true statement = +1, each wrongly-ticked
  // false statement = -1, floor at 0. Unticked statements neither earn nor
  // deduct (we don't credit "didn't engage with a false"). Result is scaled
  // to fit q.marks if that overrides the natural total.
  function markMultiSelect(q, selected) {
    const statements = Array.isArray(q.statements) ? q.statements : [];
    const sel = Array.isArray(selected) ? selected : [];
    const trueCount = statements.filter(function (s) { return s && s.correct; }).length;
    const possible = (typeof q.marks === "number" && q.marks > 0) ? q.marks : Math.max(1, trueCount);
    let trueTicked = 0, falseTicked = 0;
    const statementResults = statements.map(function (s, i) {
      const ticked = sel.indexOf(i) !== -1;
      let status;
      if (s && s.correct && ticked) { trueTicked += 1; status = "correct_tick"; }
      else if (s && !s.correct && ticked) { falseTicked += 1; status = "wrong_tick"; }
      else if (s && s.correct && !ticked) { status = "missed_true"; }
      else { status = "correct_skip"; }
      return { index: i, correct: !!(s && s.correct), ticked: ticked, status: status,
               text: s ? s.text : "", rationale: s ? s.rationale : null };
    });
    const netRaw = Math.max(0, trueTicked - falseTicked);
    const scale = trueCount > 0 ? (possible / trueCount) : 0;
    let awarded = Math.round(netRaw * scale * 2) / 2;
    if (awarded > possible) awarded = possible;
    if (awarded < 0) awarded = 0;
    return {
      marksAwarded: awarded,
      marksPossible: possible,
      status: statusFromFraction(awarded, possible),
      statementResults: statementResults,
      trueTicked: trueTicked,
      falseTicked: falseTicked,
      trueCount: trueCount
    };
  }

  function markShortLong(q, raw) {
    const possible = q.marks || 1;
    const points = Array.isArray(q.markPoints) ? q.markPoints : [];
    const t = norm(raw);
    let awarded = 0;
    const hits = [];
    const misses = [];
    for (const mp of points) {
      const credit = (typeof mp.credit === "number") ? mp.credit : 1;
      let fired = false;
      // Substring matching against a list of acceptable phrases.
      if (Array.isArray(mp.any)) fired = textIncludesAny(t, mp.any);
      // Regex pattern: useful for algebraic-equivalence sets where listing
      // every phrasing in `any` would be tedious. Case-insensitive.
      if (!fired && typeof mp.pattern === "string") {
        try { fired = new RegExp(mp.pattern, "i").test(t); }
        catch (e) { console.warn("markShortLong: bad regex pattern '" + mp.pattern + "':", e); }
      }
      if (fired && Array.isArray(mp.mustNotInclude)) {
        if (textIncludesAny(t, mp.mustNotInclude)) fired = false;
      }
      const label = mp.label
        || (mp.any && mp.any[0] ? mp.any[0] : null)
        || (mp.pattern ? "pattern: " + mp.pattern : null)
        || "(point)";
      if (fired) { awarded += credit; hits.push(label); }
      else       { misses.push(label); }
    }
    if (awarded > possible) awarded = possible;
    return {
      marksAwarded: awarded, marksPossible: possible,
      status: statusFromFraction(awarded, possible),
      hits: hits, misses: misses
    };
  }

  // Parse a student's numeric answer, tolerating fractions, scientific
  // notation written with × / x / *, and Unicode superscripts. Returns a
  // finite number, or null if no usable number could be parsed.
  const SUPER_DIGITS = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4",
                         "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9",
                         "⁻": "-", "⁺": "+" };
  function parseNumericAnswer(raw) {
    if (raw == null) return null;
    let s = String(raw).replace(/[−–]/g, "-").trim();
    if (!s) return null;
    // Unicode superscript run → "^N". So "10⁸" → "10^8".
    s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]+/g, function (sup) {
      return "^" + sup.split("").map(function (c) { return SUPER_DIGITS[c] || c; }).join("");
    });
    // "3.48x10^8", "3.48 × 10^8", "3.48*10^8", "3.48·10^8" → "3.48e8".
    s = s.replace(
      /([+\-]?\d+(?:\.\d+)?)\s*[x×*·∙]\s*10\s*(?:\*\*|\^)\s*\{?\s*([+\-]?\d+)\s*\}?/gi,
      "$1e$2"
    );
    // "10^8" alone (no multiplier) → "1e8".
    s = s.replace(/^10\s*(?:\*\*|\^)\s*\{?\s*([+\-]?\d+)\s*\}?$/i, "1e$1");
    // a / b fraction
    const fm = s.match(/^([+\-]?[\d.]+(?:[eE][+\-]?\d+)?)\s*\/\s*([+\-]?[\d.]+(?:[eE][+\-]?\d+)?)\s*([a-zA-Zµμ°/\^\-\s]*)?$/);
    if (fm) {
      const a = parseFloat(fm[1]), b = parseFloat(fm[2]);
      if (isFinite(a) && isFinite(b) && b !== 0) return a / b;
    }
    // Plain number (possibly with trailing units)
    const m = s.match(/^[+\-]?[\d.]+(?:[eE][+\-]?\d+)?/);
    if (!m) return null;
    const v = parseFloat(m[0]);
    return isFinite(v) ? v : null;
  }

  function markNumeric(q, raw) {
    const possible = q.marks || 1;
    const v = parseNumericAnswer(raw);
    if (v == null) {
      return { marksAwarded: 0, marksPossible: possible, status: "none",
               hits: [], misses: ["Could not read a number from your answer."] };
    }
    const target = (typeof q.expectedNumeric === "number") ? q.expectedNumeric
                 : (typeof q.answer === "number") ? q.answer : null;
    if (target == null) {
      return { marksAwarded: 0, marksPossible: possible, status: "none", hits: [], misses: [] };
    }
    const tol = (typeof q.tolerance === "number") ? q.tolerance
              : Math.max(Math.abs(target) * 0.005, 0.0001);
    const ok = Math.abs(v - target) <= tol;
    return {
      marksAwarded: ok ? possible : 0,
      marksPossible: possible,
      status: ok ? "full" : "none",
      hits: ok ? ["Within tolerance of " + target] : [],
      misses: ok ? [] : ["Interpreted your answer as " + v + "; expected " + target + " ± " + tol + "."]
    };
  }

  // Predicted-misconception detection. Each question can declare a
  // `misconceptions` array; each entry has a signature that matches the
  // student's submitted answer when they've made a known mistake. Returns
  // a list of matched misconceptions (zero or more), which the engine logs
  // separately from the attempt and surfaces in the feedback panel.
  //
  // Misconception signatures:
  //   { id, label, chosenIndex }                              — MCQ
  //   { id, label, expectedNumeric, tolerance }               — numeric
  //   { id, label, any: [...] }  or  { id, label, pattern }   — short/long
  //
  // A misconception fires regardless of whether the overall question is
  // marked right or wrong — so a student who picks the right MCQ choice
  // doesn't get a misconception flag, but a student who picks the wrong
  // one DOES get flagged with the misconception assigned to that choice.
  function detectMisconceptions(q, payload) {
    const out = [];

    // Multi-select questions carry misconceptions per-statement rather than
    // in a question-level list. Fire when a false statement was ticked (the
    // student endorsed a misconception) OR a true statement was missed (the
    // student didn't recognise it). The misconception field on a statement
    // can be a plain id string or a full object. This block covers both
    // top-level multi-select questions (q.type) and multi-select phases
    // (where the kind lives on q.kind instead).
    const isMultiSelect = (q.type === "multi_select") || (q.kind === "multi_select")
                          || Array.isArray(q.statements);
    if (isMultiSelect && Array.isArray(q.statements) && Array.isArray(payload.selected)) {
      const sel = payload.selected;
      q.statements.forEach(function (s, i) {
        if (!s || !s.misconception) return;
        const ticked = sel.indexOf(i) !== -1;
        const fires = (!s.correct && ticked) || (s.correct && !ticked);
        if (!fires) return;
        const mc = (typeof s.misconception === "string") ? { id: s.misconception } : s.misconception;
        const id = mc.id;
        if (!id) return;
        out.push({
          id: id,
          category: mc.category || DEFAULT_CATEGORIES[id] || "other_error",
          label: mc.label || s.rationale || id,
          severity: mc.severity || "noted"
        });
      });
    }

    const list = Array.isArray(q.misconceptions) ? q.misconceptions : null;
    if (!list) return out;
    for (const m of list) {
      let fired = false;
      if (typeof m.chosenIndex === "number"
          && typeof payload.chosenIndex === "number"
          && payload.chosenIndex === m.chosenIndex) {
        fired = true;
      }
      if (!fired && typeof m.expectedNumeric === "number" && payload.rawResponse) {
        const v = parseNumericAnswer(payload.rawResponse);
        if (v != null) {
          const tol = (typeof m.tolerance === "number") ? m.tolerance
                    : Math.max(Math.abs(m.expectedNumeric) * 0.03, 1e-9);
          if (Math.abs(v - m.expectedNumeric) <= tol) fired = true;
        }
      }
      if (!fired && Array.isArray(m.any) && payload.rawResponse) {
        if (textIncludesAny(norm(payload.rawResponse), m.any)) fired = true;
      }
      if (!fired && typeof m.pattern === "string" && payload.rawResponse) {
        try {
          if (new RegExp(m.pattern, "i").test(norm(payload.rawResponse))) fired = true;
        } catch (e) {}
      }
      if (fired) out.push({
        id: m.id,
        category: m.category || DEFAULT_CATEGORIES[m.id] || "other_error",
        label: m.label,
        severity: m.severity || "noted"
      });
    }
    return out;
  }

  // Default category lookup for misconception ids that pre-date the category
  // field. New misconceptions should declare their own `category`; this map
  // keeps the existing bank's misconceptions sorted into the right buckets
  // without needing per-question edits.
  const DEFAULT_CATEGORIES = {
    "forgot_sqrt_in_escape_ratio":   "escape_ratio_error",
    "inverted_kepler_ratio":         "kepler_ratio_error",
    "cubed_instead_of_3_2":          "kepler_ratio_error",
    "radius_offset_forgotten":       "centre_vs_surface_error",
    "missed_negative_sign":          "sign_error",
    "magnitude_when_signed_expected":"sign_error",
    "confused_V_with_W":             "value_vs_scaled_error",
    "submitted_single_V_not_delta":  "value_vs_scaled_error",
    "submitted_pe_not_total":        "wrong_curve_read_error",
    "submitted_ek_not_total":        "wrong_curve_read_error",
    "pe_up_means_all_up":            "method_error"
  };

  // Tree of misconception categories. Each entry has a label and an optional
  // parent. Depth is arbitrary (currently three tiers: top → mid → leaf).
  // Authors can use any slug as `category` on a misconception. The engine
  // walks up `parent` links to build a full path, which the Mistakes panel
  // renders as a nested tree.
  const CATEGORY_TREE = {
    // Top tier
    calculation_error:        { label: "Calculation errors",       parent: null },
    setup_error:              { label: "Setup / scenario errors",  parent: null },
    interpretation_error:     { label: "Interpretation / value-class errors", parent: null },
    other_error:              { label: "Other",                    parent: null },

    // Mid tier
    ratio_error:              { label: "Ratio / exponent mistakes",     parent: "calculation_error" },
    sign_error:               { label: "Sign mistakes",                 parent: "calculation_error" },
    magnitude_error:          { label: "Wrong magnitude / factor",      parent: "calculation_error" },
    centre_vs_surface_error:  { label: "Centre-vs-surface mix-ups",     parent: "setup_error" },
    method_error:             { label: "Wrong method picked",           parent: "setup_error" },
    value_vs_scaled_error:    { label: "Value vs scaled-by-mass mix-ups", parent: "interpretation_error" },
    wrong_curve_read_error:   { label: "Read the wrong curve",          parent: "interpretation_error" },

    // Sub-mid tier (added as the bank justifies them)
    escape_ratio_error:       { label: "Escape-speed ratio mistakes",   parent: "ratio_error" },
    kepler_ratio_error:       { label: "Kepler ratio mistakes",         parent: "ratio_error" },
    orbital_ratio_error:      { label: "Orbital-speed ratio mistakes",  parent: "ratio_error" }
  };

  // Build the path from a category up to the root. Returns a list of
  // category ids in ROOT → leaf order. Unknown categories fall through to
  // "other_error".
  function categoryPath(catId) {
    const out = [];
    let cur = catId;
    const seen = {};
    while (cur && !seen[cur]) {
      seen[cur] = true;
      if (!CATEGORY_TREE[cur]) { cur = "other_error"; break; }
      out.unshift(cur);
      cur = CATEGORY_TREE[cur].parent;
    }
    if (out.length === 0) out.push("other_error");
    return out;
  }
  function categoryLabel(catId) {
    return (CATEGORY_TREE[catId] && CATEGORY_TREE[catId].label) || catId;
  }

  // Find every question in the bank whose misconceptions array (or any
  // phase's misconceptions array) declares the given error id.
  function questionsDeclaringMisconception(errorId) {
    return ALL_QUESTIONS.filter(function (q) {
      if (Array.isArray(q.misconceptions) && q.misconceptions.some(function (m) { return m.id === errorId; })) {
        return true;
      }
      if (Array.isArray(q.phases)) {
        return q.phases.some(function (ph) {
          return Array.isArray(ph.misconceptions) && ph.misconceptions.some(function (m) { return m.id === errorId; });
        });
      }
      return false;
    });
  }

  // Sequence of ✓/✗ for the last N attempts on questions that declared
  // this misconception. ✓ = student avoided the error on that attempt;
  // ✗ = student fired it.
  function sequenceForMisconception(errorId, N) {
    N = N || 10;
    const decl = questionsDeclaringMisconception(errorId);
    const declIds = {};
    decl.forEach(function (q) { declIds[q.id] = true; });
    const out = [];
    for (let i = 0; i < store.attempts.length; i++) {
      const a = store.attempts[i];
      if (!declIds[a.questionId]) continue;
      const fired = Array.isArray(a.misconceptions) && a.misconceptions.indexOf(errorId) !== -1;
      out.push(fired ? "x" : "v");  // 'v' = check, 'x' = cross; rendered as glyphs in CSS
    }
    return out.slice(-N);
  }

  // Widget marking is delegated. The widget's score() returns the same shape
  // as the other markers. We sanity-check the result before trusting it.
  function markWidget(q, widgetResult) {
    const possible = q.marks || 1;
    if (!widgetResult || typeof widgetResult.marksAwarded !== "number") {
      return { marksAwarded: 0, marksPossible: possible, status: "none",
               hits: [], misses: ["widget returned no answer"] };
    }
    const awarded = Math.max(0, Math.min(possible,
                    typeof widgetResult.marksAwarded === "number" ? widgetResult.marksAwarded : 0));
    return {
      marksAwarded: awarded,
      marksPossible: typeof widgetResult.marksPossible === "number" ? widgetResult.marksPossible : possible,
      status: widgetResult.status || statusFromFraction(awarded, possible),
      hits: Array.isArray(widgetResult.hits) ? widgetResult.hits : [],
      misses: Array.isArray(widgetResult.misses) ? widgetResult.misses : []
    };
  }

  /* ──────────────────────────────────────────────────────────────────────────
     4. Persistence (localStorage, per IMPLEMENTATION_BRIEF §3.6 of PreIB)
     ────────────────────────────────────────────────────────────────────────── */

  const STORAGE_KEY = "smithics_fields_v0_1";
  const IDENTITY_KEY = "smithics_fields_identity_v1";
  const SESSION_KEY = "smithics_fields_session_v1";
  const APP_VERSION = "v0.1.0";
  const TYPES = ["mcq", "short", "long", "numeric", "widget", "multi_select"];

  // Teacher reporting endpoint. Deploy teacher-setup.gs as a Google Apps
  // Script Web App, then paste the /exec URL here. While this stays empty
  // the Driller still works fully; reporting just silently no-ops.
  const REPORT_URL = 'https://script.google.com/macros/s/AKfycbw6gPnXyqfUw-UjbJRJKQzxscLR_24vVpMY9WH_FHcfAa1y59dm1ykznr662zTXSZ6n/exec';

  function defaultStore() {
    return {
      attempts: [],
      errors: [],            // parallel log to attempts: predicted-misconception events
      activeFilter: null,
      lastSeen: null,
      version: APP_VERSION,
      excludedTypes: [],
      coverageWindow: 2,
      // SL = show only level=SL questions. HL = show all (SL + HL).
      studyLevel: "HL",
      // Parent-group ids the user has collapsed in the coverage map. The
      // collapsed-state is persisted across sessions.
      collapsedGroups: [],
      // Shuffled-deck question picker state. `filterKey` captures the pool
      // scope (level + activeFilter + excludedTypes) so we can detect when
      // the deck is no longer valid and re-shuffle. `ids` is the remaining
      // question ids in play order. Pop from the front; refill when empty.
      // `lastServedId` is what we just dealt — used to avoid the obvious
      // boundary case where the last card of an old deck would be the
      // first card of the new one.
      deck: { filterKey: "", ids: [], lastServedId: null }
    };
  }

  function loadStore() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultStore();
      const p = JSON.parse(raw);
      return {
        attempts: Array.isArray(p.attempts) ? p.attempts : [],
        errors: Array.isArray(p.errors) ? p.errors : [],
        activeFilter: typeof p.activeFilter === "string" ? p.activeFilter : null,
        lastSeen: p.lastSeen || null,
        version: p.version || APP_VERSION,
        excludedTypes: Array.isArray(p.excludedTypes)
          ? p.excludedTypes.filter(function (t) { return TYPES.indexOf(t) !== -1; })
          : [],
        coverageWindow: (typeof p.coverageWindow === "number" && p.coverageWindow > 0) ? p.coverageWindow : 2,
        studyLevel: (p.studyLevel === "SL" || p.studyLevel === "HL") ? p.studyLevel : "HL",
        collapsedGroups: Array.isArray(p.collapsedGroups) ? p.collapsedGroups : [],
        deck: (function () {
          const d = p.deck;
          if (!d || typeof d !== "object") return { filterKey: "", ids: [], lastServedId: null };
          return {
            filterKey: typeof d.filterKey === "string" ? d.filterKey : "",
            ids: Array.isArray(d.ids) ? d.ids.filter(function (x) { return typeof x === "string"; }) : [],
            lastServedId: typeof d.lastServedId === "string" ? d.lastServedId : null
          };
        })()
      };
    } catch (e) {
      console.warn("Storage corrupt, resetting:", e);
      return defaultStore();
    }
  }

  let store = loadStore();

  function persist() {
    try {
      store.lastSeen = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch (e) { console.warn("Could not write to localStorage:", e); }
  }

  function recordAttempt(rec) {
    store.attempts.push(rec);
    persist();
    // Fire-and-forget POST to the teacher's sheet. Soft-fails if REPORT_URL
    // is unset or the network is down; the localStorage record above is the
    // source of truth either way.
    try { reportAttempt(rec); } catch (e) { /* never let reporting break the engine */ }
  }
  function clearProgress()    { store = defaultStore(); persist(); }

  /* ──────────────────────────────────────────────────────────────────────────
     4b. Student identity, session, and teacher reporting
     ────────────────────────────────────────────────────────────────────────── */

  function mintUUID() {
    if (window.crypto && typeof crypto.randomUUID === "function") return crypto.randomUUID();
    return "anon-" + Date.now() + "-" + Math.random().toString(36).slice(2, 10);
  }

  function defaultIdentity() {
    return { anonymous_id: mintUUID(), display_name: "", cohort: "", google_email: "" };
  }

  function loadIdentity() {
    try {
      const raw = localStorage.getItem(IDENTITY_KEY);
      if (!raw) return defaultIdentity();
      const p = JSON.parse(raw);
      return {
        anonymous_id: typeof p.anonymous_id === "string" && p.anonymous_id ? p.anonymous_id : mintUUID(),
        display_name: typeof p.display_name === "string" ? p.display_name : "",
        cohort: typeof p.cohort === "string" ? p.cohort : "",
        google_email: typeof p.google_email === "string" ? p.google_email : ""
      };
    } catch (e) { return defaultIdentity(); }
  }

  let IDENTITY = loadIdentity();

  function persistIdentity() {
    try { localStorage.setItem(IDENTITY_KEY, JSON.stringify(IDENTITY)); }
    catch (e) { /* same fall-back posture as persist() */ }
  }

  function isSignedIn() {
    return !!(IDENTITY.display_name && IDENTITY.cohort);
  }

  function getOrCreateSessionId() {
    let id = null;
    try { id = sessionStorage.getItem(SESSION_KEY); } catch (e) {}
    if (!id) {
      id = mintUUID();
      try { sessionStorage.setItem(SESSION_KEY, id); } catch (e) {}
    }
    return id;
  }

  // Build the per-attempt payload and POST it to the teacher's Apps Script
  // Web App. Uses mode:'no-cors' so the request reaches the script without a
  // CORS preflight; we can't read the response but the row gets appended.
  // text/plain content-type is CORS-safelisted, so no preflight is fired.
  function reportAttempt(rec) {
    if (!REPORT_URL || REPORT_URL.indexOf("script.google.com") === -1) return;
    if (!isSignedIn()) return;
    if (!rec || typeof rec !== "object") return;

    const atomTags = (Array.isArray(rec.subtags) ? rec.subtags : []).filter(function (t) {
      return ATOMS && Object.prototype.hasOwnProperty.call(ATOMS, t);
    });

    const payload = {
      timestamp: rec.timestamp || new Date().toISOString(),
      anonymous_id: IDENTITY.anonymous_id,
      display_name: IDENTITY.display_name,
      cohort: IDENTITY.cohort,
      google_email: IDENTITY.google_email || "",
      session_id: getOrCreateSessionId(),
      question_id: rec.questionId || "",
      level: rec.level || "",
      subtag: rec.syllabusCode || "",
      atoms: atomTags,
      type: rec.type || "",
      marks_awarded: rec.marksAwarded,
      marks_possible: rec.marksPossible,
      status: rec.status || "",
      raw_response: rec.rawResponse != null ? String(rec.rawResponse) : "",
      chosen_index: rec.chosenIndex != null ? rec.chosenIndex : "",
      hints_used: rec.hintsUsed || 0,
      peeked: rec.peekedAt ? 1 : 0,
      misconceptions_fired: Array.isArray(rec.misconceptions) ? rec.misconceptions : []
    };

    // Full phase breakdown for phased questions.
    if (Array.isArray(rec.phaseResults) && rec.phaseResults.length) {
      payload.phases = rec.phaseResults.map(function (pr) {
        return {
          kind: pr.kind || "",
          marks_awarded: pr.marksAwarded,
          marks_possible: pr.marksPossible,
          status: pr.status || "",
          raw_response: pr.raw != null ? String(pr.raw) : "",
          chosen_index: pr.chosenIndex != null ? pr.chosenIndex : "",
          misconceptions_fired: Array.isArray(pr.misconceptions) ? pr.misconceptions : []
        };
      });
    }

    try {
      fetch(REPORT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        keepalive: true
      }).then(function () { flashReportStatus("sent ✓", "ok"); })
        .catch(function () { flashReportStatus("offline", "bad"); });
    } catch (e) {
      flashReportStatus("offline", "bad");
    }
  }

  function flashReportStatus(text, cls) {
    const el = document.getElementById("report-status");
    if (!el) return;
    el.textContent = text;
    el.className = "report-status " + (cls || "");
    if (cls === "ok") setTimeout(function () {
      if (el.textContent === text) { el.textContent = ""; el.className = "report-status"; }
    }, 1400);
  }

  /* ──────────────────────────────────────────────────────────────────────────
     5. Question pool
     ────────────────────────────────────────────────────────────────────────── */

  const ALL_QUESTIONS = Array.isArray(window.FIELDS_D1_QUESTIONS) ? window.FIELDS_D1_QUESTIONS : [];

  function levelAllows(q) {
    // SL view hides questions tagged level: "HL". HL view shows all.
    return !(store.studyLevel === "SL" && q.level === "HL");
  }

  let SUBTAG_COUNTS = {};   // includes both subtags and atoms (keyed by tag id)
  function computeSubtagCounts() {
    const m = {};
    Object.keys(SUBTAG_INDEX).forEach(function (id) { m[id] = 0; });
    Object.keys(ATOMS).forEach(function (id) { m[id] = 0; });
    const excluded = store.excludedTypes || [];
    ALL_QUESTIONS.forEach(function (q) {
      if (q.parked === true) return;
      if (!levelAllows(q)) return;
      if (excluded.indexOf(q.type) !== -1) return;
      if (!Array.isArray(q.tags)) return;
      const seen = new Set();
      q.tags.forEach(function (t) {
        if (isCoverageTag(t) && !seen.has(t)) {
          m[t] = (m[t] || 0) + 1;
          seen.add(t);
        }
      });
    });
    SUBTAG_COUNTS = m;
    return m;
  }
  computeSubtagCounts();

  function poolForFilter(subtag) {
    let pool = ALL_QUESTIONS.filter(function (q) { return q.parked !== true && levelAllows(q); });
    if (subtag) pool = pool.filter(function (q) {
      return Array.isArray(q.tags) && q.tags.indexOf(subtag) !== -1;
    });
    const excluded = store.excludedTypes || [];
    if (excluded.length) pool = pool.filter(function (q) { return excluded.indexOf(q.type) === -1; });
    return pool;
  }

  function pickInstance(q) {
    const instances = Array.isArray(q.instances) ? q.instances : [];
    if (instances.length === 0) return { question: q, instanceIndex: null, view: q };
    const idx = Math.floor(Math.random() * (instances.length + 1));
    if (idx === 0) return { question: q, instanceIndex: null, view: q };
    const inst = instances[idx - 1];
    return { question: q, instanceIndex: idx - 1, view: Object.assign({}, q, inst) };
  }

  // Build a stable, comparable key for the current pool scope. When this
  // changes (level toggle, filter set/cleared, type filter changed), the
  // deck is no longer valid and gets re-shuffled on the next pick.
  function currentFilterKey(filter) {
    const f = filter || "(none)";
    const lvl = store.studyLevel || "HL";
    const exTypes = Array.isArray(store.excludedTypes) ? store.excludedTypes.slice().sort().join(",") : "";
    return lvl + "|" + f + "|" + exTypes;
  }

  // Fisher-Yates in place. Returns the same array.
  function shuffleInPlace(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  // Shuffled-deck picker. We maintain `store.deck = { filterKey, ids, lastServedId }`:
  // - When the deck is empty OR the scope key has changed, we reshuffle the
  //   eligible pool into `ids`.
  // - To avoid the obvious boundary repeat (last card of old deck = first
  //   card of new deck), we move `lastServedId` to the back of the new deck
  //   if it lands in the front half. Cheap and effective.
  // - We pop the front of `ids` and look the question up by id, skipping
  //   any id that's no longer in the eligible pool (e.g., parked since the
  //   deck was last shuffled, or the pool was filtered tighter).
  // - State is persisted on every pick so the deck survives reload.
  function pickNextQuestion(filter) {
    const pool = poolForFilter(filter);
    if (pool.length === 0) return null;

    const poolIds = pool.map(function (q) { return q.id; });
    const poolIdSet = {};
    poolIds.forEach(function (id) { poolIdSet[id] = true; });

    if (!store.deck || typeof store.deck !== "object") {
      store.deck = { filterKey: "", ids: [], lastServedId: null };
    }
    const wantKey = currentFilterKey(filter);

    function reshuffle() {
      const fresh = shuffleInPlace(poolIds.slice());
      const lastId = store.deck.lastServedId;
      if (lastId && fresh.length > 1) {
        const idx = fresh.indexOf(lastId);
        // If the just-served card landed in the front half of the new deck,
        // move it to the very back. Avoids "you just saw this" repeats at
        // the boundary without making the picker deterministic.
        if (idx !== -1 && idx < Math.floor(fresh.length / 2)) {
          fresh.splice(idx, 1);
          fresh.push(lastId);
        }
      }
      store.deck.filterKey = wantKey;
      store.deck.ids = fresh;
    }

    if (store.deck.filterKey !== wantKey || !Array.isArray(store.deck.ids) || store.deck.ids.length === 0) {
      reshuffle();
    }

    // Pop ids until we find one still in the eligible pool. If the deck
    // somehow drains entirely without yielding a live id, reshuffle once
    // and try again. After that, give up and return null.
    let q = null, tries = 0;
    while (!q && tries < 2) {
      while (store.deck.ids.length) {
        const id = store.deck.ids.shift();
        if (poolIdSet[id]) {
          q = pool.find(function (qq) { return qq.id === id; }) || null;
          if (q) break;
        }
      }
      if (!q) { reshuffle(); tries++; }
    }
    if (!q) return null;
    store.deck.lastServedId = q.id;
    persist();
    return pickInstance(q);
  }

  /* ──────────────────────────────────────────────────────────────────────────
     6. Coverage map model
     ────────────────────────────────────────────────────────────────────────── */

  const BAND = {
    untried:     { fill: "#ece4d2", text: "#1a1a17", textSoft: "#4d4943" },
    band_strong: { fill: "#2d6a3f", text: "#ffffff", textSoft: "#e8efe7" },
    band_mid:    { fill: "#5a9a5a", text: "#ffffff", textSoft: "#e8efe7" },
    band_yellow: { fill: "#d6a847", text: "#1a1a17", textSoft: "#3d3528" },
    band_orange: { fill: "#c17034", text: "#ffffff", textSoft: "#f3e3d6" },
    band_red:    { fill: "#b03030", text: "#ffffff", textSoft: "#f0d8d8" }
  };

  function bandKeyForAverage(avg) {
    if (avg >= 0.9)  return "band_strong";
    if (avg >= 0.7)  return "band_mid";
    if (avg >= 0.5)  return "band_yellow";
    if (avg >= 0.25) return "band_orange";
    return "band_red";
  }

  function mixWithWhite(hex, t) {
    const m = hex.replace("#", "");
    const r = parseInt(m.substring(0, 2), 16);
    const g = parseInt(m.substring(2, 4), 16);
    const b = parseInt(m.substring(4, 6), 16);
    const ch = function (n) { return Math.round(n + (255 - n) * t); };
    return "#" + [ch(r), ch(g), ch(b)].map(function (n) {
      const s = n.toString(16); return s.length === 1 ? "0" + s : s;
    }).join("");
  }

  function coverageForSubtag(subtag) {
    const matched = [];
    const win = (typeof store.coverageWindow === "number" && store.coverageWindow > 0) ? store.coverageWindow : 2;
    for (let i = store.attempts.length - 1; i >= 0; i--) {
      const a = store.attempts[i];
      if (Array.isArray(a.subtags) && a.subtags.indexOf(subtag) !== -1) {
        matched.push(a);
        if (matched.length === win) break;
      }
    }
    if (matched.length === 0) {
      return { attemptCount: 0, avg: null,
               fill: BAND.untried.fill, text: BAND.untried.text, textSoft: BAND.untried.textSoft };
    }
    let sum = 0;
    matched.forEach(function (a) {
      const possible = a.marksPossible > 0 ? a.marksPossible : 1;
      sum += a.marksAwarded / possible;
    });
    const avg = sum / matched.length;
    const band = BAND[bandKeyForAverage(avg)];
    let fill = band.fill;
    if (matched.length < win) {
      const fade = (win - matched.length) / win;
      fill = mixWithWhite(band.fill, Math.min(0.7, fade));
      return { attemptCount: matched.length, avg: avg, fill: fill, text: "#1a1a17", textSoft: "#4d4943" };
    }
    return { attemptCount: matched.length, avg: avg, fill: fill, text: band.text, textSoft: band.textSoft };
  }

  /* ──────────────────────────────────────────────────────────────────────────
     7. DOM helpers and prompt rendering
     ────────────────────────────────────────────────────────────────────────── */

  function el(tag, props, children) {
    const e = document.createElement(tag);
    if (props) Object.keys(props).forEach(function (k) {
      if (k === "class") e.className = props[k];
      else if (k === "style") e.setAttribute("style", props[k]);
      else if (k === "html")  e.innerHTML = props[k];
      else if (k === "text")  e.textContent = props[k];
      else if (k.indexOf("on") === 0) e.addEventListener(k.substring(2).toLowerCase(), props[k]);
      else if (k === "for")   e.htmlFor = props[k];
      else if (props[k] != null) e.setAttribute(k, props[k]);
    });
    if (children) {
      const arr = Array.isArray(children) ? children : [children];
      arr.forEach(function (c) {
        if (c == null || c === false) return;
        if (typeof c === "string" || typeof c === "number") e.appendChild(document.createTextNode(c));
        else e.appendChild(c);
      });
    }
    return e;
  }

  // Inline math rendering. $...$ blocks render through KaTeX (if it loaded
  // from the CDN) otherwise fall back to a <code> placeholder. Newlines in
  // the source text become <br>. Lines starting with "• " get a bullet.
  function renderPromptText(text, container) {
    if (!text) return;
    container.innerHTML = "";
    const lines = String(text).split("\n");
    lines.forEach(function (line, i) {
      if (i > 0) container.appendChild(document.createElement("br"));
      const isBullet = line.indexOf("• ") === 0;
      if (isBullet) {
        container.appendChild(el("span", { class: "prompt-bullet" }, "• "));
        line = line.substring(2);
      }
      const parts = line.split(/(\$[^$]+\$)/);
      parts.forEach(function (p) {
        if (p.length >= 2 && p.charAt(0) === "$" && p.charAt(p.length - 1) === "$") {
          const expr = p.substring(1, p.length - 1);
          const span = document.createElement("span");
          if (window.katex) {
            try {
              window.katex.render(expr, span, { throwOnError: false, output: "html" });
            } catch (e) {
              span.className = "prompt-math";
              span.textContent = expr;
            }
          } else {
            span.className = "prompt-math";
            span.textContent = expr;
          }
          container.appendChild(span);
        } else {
          container.appendChild(document.createTextNode(p));
        }
      });
    });
  }

  /* ──────────────────────────────────────────────────────────────────────────
     8. Question lifecycle
     ────────────────────────────────────────────────────────────────────────── */

  let current = null;
  let phase = "answering";
  let widgetInstance = null;            // for type:"widget" — widget IS the answer
  let toolInstance = null;              // for any type with q.tool — widget is a visual tool
  let peekedThisQuestion = false;       // set true when student clicks "Show topic"
  let hintsRevealed = 0;                // how many hints the student has opened

  // Phased-question state. For a question with a `phases` array, the engine
  // walks through them in order. phaseIndex points at the active phase;
  // phaseResults[i] holds the marked result for each completed phase.
  let phaseIndex = 0;
  let phaseResults = [];

  // Module-scoped reference to the document-level "press Enter to advance"
  // listener installed during feedback. We hoist it so renderQuestion can
  // detach it on the next question, otherwise the listener leaks if the
  // student advanced via the Next button (mouse) rather than Enter — and
  // then the next question's first Enter (e.g., submitting a phase) also
  // bumps to a fresh question.
  let pendingNextOnEnter = null;
  function detachPendingNextOnEnter() {
    if (pendingNextOnEnter) {
      try { document.removeEventListener("keydown", pendingNextOnEnter); }
      catch (e) {}
      pendingNextOnEnter = null;
    }
  }

  function destroyWidget() {
    if (widgetInstance && typeof widgetInstance.destroy === "function") {
      try { widgetInstance.destroy(); } catch (e) { console.warn("Widget destroy threw:", e); }
    }
    widgetInstance = null;
  }

  function destroyTool() {
    if (toolInstance && typeof toolInstance.destroy === "function") {
      try { toolInstance.destroy(); } catch (e) { console.warn("Tool destroy threw:", e); }
    }
    toolInstance = null;
  }

  function captureToolState() {
    if (toolInstance && typeof toolInstance.getAnswer === "function") {
      try { return toolInstance.getAnswer(); } catch (e) { return null; }
    }
    return null;
  }

  function renderQuestion() {
    detachPendingNextOnEnter();
    destroyWidget();
    destroyTool();
    peekedThisQuestion = false;
    hintsRevealed = 0;
    phaseIndex = 0;
    phaseResults = [];
    const card = document.getElementById("qcard");
    card.className = "qcard";
    card.innerHTML = "";

    try { window.scrollTo({ top: 0, behavior: "instant" }); }
    catch (e) { window.scrollTo(0, 0); }

    current = pickNextQuestion(store.activeFilter);
    phase = "answering";

    if (!current) {
      card.classList.add("empty");
      card.appendChild(el("div", { class: "qcard-empty" }, [
        el("div", { class: "qcard-empty-h", text: "No questions in this filter." }),
        el("div", { class: "qcard-empty-p", text: "Tap a different subtag, or clear the filter." })
      ]));
      renderPreviousPill(card);
      return;
    }

    // Previous-attempt pill (shows last answered question, click to review)
    renderPreviousPill(card);

    const v = current.view;

    // Meta strip. EVERYTHING that hints at the topic is hidden by default —
    // the level badge (SL/HL), the subtag pills, and the atom pills are all
    // spoilers because they identify which equation / law the question is
    // about. Pre-answer the student should see only the marks. A single
    // "Show topic" button reveals all of it and stamps peekedThisQuestion.
    //
    // Exception: if the student has explicitly filtered to a subtag/atom,
    // they already know the topic, so we render the hints inline.
    const meta = el("div", { class: "qmeta" });

    const topicTags = Array.isArray(v.tags)
      ? v.tags.filter(function (t) { return isCoverageTag(t) || VOCAB.crossCutting.indexOf(t) !== -1; })
      : [];

    function levelPill(peeked) {
      const cls = "qmeta-level " + (v.level === "HL" ? "qmeta-level-hl" : "qmeta-level-sl")
                + (peeked ? " qmeta-tag-peeked" : "");
      return el("span", { class: cls, text: v.level === "HL" ? "HL" : "SL" });
    }

    function appendAllTopicHints(parentEl, peeked) {
      parentEl.appendChild(levelPill(peeked));
      topicTags.forEach(function (t) {
        const isCov = isCoverageTag(t);
        const cls = (isCov ? "qmeta-tag" : "qmeta-tag qmeta-tag-cross")
                  + (peeked ? " qmeta-tag-peeked" : "");
        const name = nameForTag(t);
        const label = name ? (t + " · " + name) : t;
        parentEl.appendChild(el("span", { class: cls, text: label }));
      });
    }

    if (store.activeFilter) {
      // Filter is active — the student picked the topic, so it isn't a spoiler.
      appendAllTopicHints(meta, false);
    } else {
      // No filter — hide everything topic-related behind a single reveal.
      const showBtn = el("button", {
        class: "qmeta-show-topic", type: "button",
        title: "Reveal the topic and level of this question. Logged as a peek.",
        text: "Show topic"
      });
      showBtn.addEventListener("click", function () {
        peekedThisQuestion = true;
        showBtn.remove();
        appendAllTopicHints(meta, true);
      });
      meta.appendChild(showBtn);
    }

    if (typeof v.marks === "number") {
      meta.appendChild(el("span", { class: "qmeta-marks", text: v.marks + " " + (v.marks === 1 ? "mark" : "marks") }));
    }
    card.appendChild(meta);

    // Prompt
    const prompt = el("div", { class: "qprompt" });
    renderPromptText(v.prompt, prompt);
    card.appendChild(prompt);

    // Help-me hints. Optional `hints: [...]` array on the question. Each
    // click on "Help me" reveals one more. Doesn't deduct marks; it just
    // logs how many hints the student opened, so we can later see "this
    // question gets 'help me'd' 80% of the time — it's harder than its
    // marks suggest." Pre-answer only; once feedback is shown, the hints
    // disappear (the model answer supersedes them).
    if (Array.isArray(v.hints) && v.hints.length > 0) {
      const hintsWrap = el("div", { class: "hints-wrap", id: "hints-wrap" });
      const hintsList = el("div", { class: "hints-list", id: "hints-list" });
      const hintBtn = el("button", { class: "btn hint-btn", type: "button",
        text: "Help me — show a hint" });
      hintBtn.addEventListener("click", function () {
        if (hintsRevealed >= v.hints.length) return;
        const i = hintsRevealed;
        hintsRevealed++;
        const hintEl = el("div", { class: "hint hint-" + i });
        const head = el("div", { class: "hint-head",
          text: "Hint " + (i + 1) + " of " + v.hints.length });
        const body = el("div", { class: "hint-body" });
        renderPromptText(v.hints[i], body);
        hintEl.appendChild(head);
        hintEl.appendChild(body);
        hintsList.appendChild(hintEl);
        if (hintsRevealed >= v.hints.length) {
          hintBtn.textContent = "No more hints";
          hintBtn.disabled = true;
        } else {
          hintBtn.textContent = "Another hint (" + (v.hints.length - hintsRevealed) + " left)";
        }
      });
      hintsWrap.appendChild(hintsList);
      hintsWrap.appendChild(hintBtn);
      card.appendChild(hintsWrap);
    }

    // Phased questions: their own complete answer-and-feedback flow. The
    // engine renders the phases stack and (optionally) a tool above them,
    // and shows the aggregate model answer once all phases are done.
    // Single-phase questions continue past this branch to the existing logic.
    if (Array.isArray(v.phases) && v.phases.length > 0) {
      renderPhasedAnswering(card, v);
      return;
    }

    // Optional tool: any question type can mount a widget above its input as
    // a visualization. Unlike type:"widget" (where the widget IS the answer),
    // a tool is purely for reading values off and doesn't drive scoring.
    if (v.tool && v.tool.name) {
      if (window.FIELDS_WIDGETS && typeof window.FIELDS_WIDGETS[v.tool.name] === "function") {
        const toolHost = el("div", { class: "tool-host" });
        card.appendChild(toolHost);
        try {
          toolInstance = window.FIELDS_WIDGETS[v.tool.name](toolHost, v.tool.config || {});
        } catch (err) {
          toolHost.innerHTML = "<div class='qbroken'>Tool '" + v.tool.name + "' failed to mount: "
                             + (err && err.message ? err.message : err) + "</div>";
          console.error("Tool mount failed:", err);
        }
      } else {
        card.appendChild(el("div", { class: "qbroken",
          text: "Tool '" + v.tool.name + "' is not registered." }));
      }
    }

    // Input area
    const inputWrap = el("div", { class: "qinput" });
    const type = v.type;

    let brokenReason = null;
    if (!type) brokenReason = "Question has no type field.";
    else if (type === "mcq" && (!Array.isArray(v.choices) || v.choices.length === 0)) brokenReason = "MCQ question has no choices.";
    else if (type === "multi_select" && (!Array.isArray(v.statements) || v.statements.length === 0)) brokenReason = "Multi-select question has no statements.";
    else if (type === "multi_select" && !v.statements.some(function (s) { return s && s.correct; })) brokenReason = "Multi-select question has no true statements.";
    else if (type === "numeric" && typeof v.expectedNumeric !== "number" && typeof v.answer !== "number") brokenReason = "Numeric question has no expected answer.";
    else if (type === "widget") {
      if (!v.widget) brokenReason = "Widget question has no `widget` name.";
      else if (!window.FIELDS_WIDGETS || typeof window.FIELDS_WIDGETS[v.widget] !== "function") {
        brokenReason = "Widget '" + v.widget + "' is not registered.";
      }
    }

    if (brokenReason) {
      inputWrap.appendChild(el("div", { class: "qbroken" }, [
        el("div", { class: "qbroken-h", text: "Question can't be displayed" }),
        el("div", { class: "qbroken-b", text: brokenReason + " Question id: " + (current.question.id || "?") + "." }),
        el("button", { class: "btn btn-primary", type: "button",
                       onClick: function () { renderQuestion(); renderCoverage(); renderMistakes(); updateProgressLine(); },
                       text: "Skip  →" })
      ]));
      card.appendChild(inputWrap);
      console.warn("Broken question id=" + current.question.id + ":", brokenReason, v);
      return;
    }

    if (type === "mcq") {
      const choices = el("div", { class: "qchoices" });
      (v.choices || []).forEach(function (choice, i) {
        const btn = el("button", {
          class: "choice", type: "button",
          onClick: function () { submitMCQ(i); }
        });
        renderPromptText(choice, btn);   // KaTeX-aware
        choices.appendChild(btn);
      });
      inputWrap.appendChild(choices);
    } else if (type === "multi_select") {
      const list = el("div", { class: "qmulti", id: "qmulti-list" });
      (v.statements || []).forEach(function (s, i) {
        if (!s) return;
        const row = el("label", { class: "ms-row" });
        const cb = el("input", { type: "checkbox", class: "ms-cb",
          "data-ms-idx": String(i), id: "ms-cb-" + i });
        const txt = el("span", { class: "ms-txt" });
        renderPromptText(s.text || "", txt);
        row.appendChild(cb);
        row.appendChild(txt);
        list.appendChild(row);
      });
      inputWrap.appendChild(list);
      inputWrap.appendChild(el("button", { class: "btn btn-primary submit-btn",
        onClick: submitMultiSelect, text: "Check answer" }));
    } else if (type === "long") {
      const ta = el("textarea", { class: "ans-textarea", rows: "4",
                                  placeholder: "Type your answer…", id: "ans-input" });
      inputWrap.appendChild(ta);
      inputWrap.appendChild(el("button", { class: "btn btn-primary submit-btn",
                                            onClick: submitText, text: "Check answer" }));
      ta.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); submitText(); }
      });
      setTimeout(function () { ta.focus(); }, 30);
    } else if (type === "numeric") {
      const wrap = el("div", { class: "ans-numwrap" });
      const inp = el("input", { class: "ans-num", type: "text", inputmode: "decimal",
                                placeholder: "Number", id: "ans-input" });
      wrap.appendChild(inp);
      if (v.unitHint) {
        const u = el("span", { class: "ans-unitlabel" });
        renderPromptText(v.unitHint, u);
        wrap.appendChild(u);
      }
      inputWrap.appendChild(wrap);
      inputWrap.appendChild(el("button", { class: "btn btn-primary submit-btn",
                                            onClick: submitText, text: "Check answer" }));
      inp.addEventListener("keydown", function (e) {
        if (e.key === "Enter") { e.preventDefault(); submitText(); }
      });
      setTimeout(function () { inp.focus(); }, 30);
    } else if (type === "widget") {
      const widgetHost = el("div", { class: "widget-host", id: "widget-host" });
      inputWrap.appendChild(widgetHost);
      try {
        widgetInstance = window.FIELDS_WIDGETS[v.widget](widgetHost, v.widgetConfig || {});
      } catch (err) {
        widgetHost.innerHTML = "<div class='qbroken'>Widget '" + v.widget +
                               "' threw on mount: " + (err && err.message ? err.message : err) + "</div>";
        console.error("Widget mount failed:", err);
      }
      inputWrap.appendChild(el("button", { class: "btn btn-primary submit-btn submit-btn-widget",
                                            onClick: submitWidget,
                                            text: "Submit my reading  →" }));
    } else { // short
      const inp = el("input", { class: "ans-text", type: "text", placeholder: "Type your answer…",
                                id: "ans-input", autocomplete: "off", autocapitalize: "none", spellcheck: "false" });
      inputWrap.appendChild(inp);
      inputWrap.appendChild(el("button", { class: "btn btn-primary submit-btn",
                                            onClick: submitText, text: "Check answer" }));
      inp.addEventListener("keydown", function (e) {
        if (e.key === "Enter") { e.preventDefault(); submitText(); }
      });
      setTimeout(function () { inp.focus(); }, 30);
    }
    card.appendChild(inputWrap);

    // Scroll the coverage map (inside the sidebar) to the current atom so
    // the student sees where in the topic landscape they are. Delayed by
    // one frame so layout settles after the card finishes rendering.
    requestAnimationFrame(scrollCoverageToCurrent);
  }

  /* ──────────────────────────────────────────────────────────────────────────
     9. Submission and feedback
     ────────────────────────────────────────────────────────────────────────── */

  function submitMCQ(chosenIndex) {
    if (phase !== "answering") return;
    const result = markMCQ(current.view, chosenIndex);
    const misconceptions = detectMisconceptions(current.view, { rawResponse: null, chosenIndex: chosenIndex });
    showFeedback(result, { rawResponse: null, chosenIndex: chosenIndex, widgetAnswer: null,
                            toolState: captureToolState(), misconceptions: misconceptions });
  }

  function readMultiSelectChecked(rootEl) {
    if (!rootEl) return [];
    const out = [];
    const cbs = rootEl.querySelectorAll('input[type="checkbox"][data-ms-idx]');
    for (let i = 0; i < cbs.length; i++) {
      if (cbs[i].checked) out.push(parseInt(cbs[i].getAttribute("data-ms-idx"), 10));
    }
    return out;
  }

  function submitMultiSelect() {
    if (phase !== "answering") return;
    const v = current.view;
    const list = document.getElementById("qmulti-list");
    const selected = readMultiSelectChecked(list);
    const result = markMultiSelect(v, selected);
    const misconceptions = detectMisconceptions(v, { rawResponse: null, chosenIndex: null, selected: selected });
    showFeedback(result, {
      rawResponse: JSON.stringify(selected),
      chosenIndex: null,
      widgetAnswer: null,
      selected: selected,
      toolState: captureToolState(),
      misconceptions: misconceptions
    });
  }

  function submitText() {
    if (phase !== "answering") return;
    const v = current.view;
    const inp = document.getElementById("ans-input");
    if (!inp) return;
    const raw = inp.value;
    if (!raw || !raw.trim()) {
      inp.classList.add("ans-empty-flash");
      setTimeout(function () { inp.classList.remove("ans-empty-flash"); }, 350);
      return;
    }
    const result = (v.type === "numeric") ? markNumeric(v, raw) : markShortLong(v, raw);
    const misconceptions = detectMisconceptions(v, { rawResponse: raw, chosenIndex: null });
    showFeedback(result, { rawResponse: raw, chosenIndex: null, widgetAnswer: null,
                            toolState: captureToolState(), misconceptions: misconceptions });
  }

  function submitWidget() {
    if (phase !== "answering") return;
    if (!widgetInstance || typeof widgetInstance.getAnswer !== "function") {
      console.warn("No widget instance to query"); return;
    }
    const answer = widgetInstance.getAnswer();
    let scored;
    try {
      scored = (typeof widgetInstance.score === "function")
        ? widgetInstance.score(answer, current.view.widgetConfig || {})
        : null;
    } catch (err) {
      console.error("Widget score threw:", err);
      scored = null;
    }
    const result = markWidget(current.view, scored);
    showFeedback(result, { rawResponse: JSON.stringify(answer), chosenIndex: null,
                            widgetAnswer: answer, toolState: null });
  }

  function showFeedback(result, meta) {
    phase = "feedback";
    const v = current.view;
    const card = document.getElementById("qcard");

    card.classList.add("showing-feedback");
    card.classList.add("fb-" + (result.status === "full" ? "full" :
                                result.status === "partial" ? "partial" : "wrong"));

    const tags = Array.isArray(v.tags) ? v.tags.slice() : [];
    const coverageTags = tags.filter(isCoverageTag);
    const parentGroup = coverageTags.length ? parentGroupForSubtag(coverageTags[0]) : null;
    const ts = new Date().toISOString();
    recordAttempt({
      timestamp: ts,
      questionId: current.question.id,
      instanceId: current.instanceIndex,
      syllabusCode: coverageTags[0] || null,
      subtags: coverageTags,
      parentGroup: parentGroup,
      level: v.level || "SL",
      type: v.type,
      marksAwarded: result.marksAwarded,
      marksPossible: result.marksPossible,
      status: result.status,
      rawResponse: meta.rawResponse,
      chosenIndex: meta.chosenIndex,
      widgetAnswer: meta.widgetAnswer,
      toolState: meta.toolState || null,
      peekedAt: peekedThisQuestion,
      hintsUsed: hintsRevealed,
      misconceptions: Array.isArray(meta.misconceptions) ? meta.misconceptions.map(function (m) { return m.id; }) : []
    });
    // Mirror each fired misconception into the parallel errors log so we can
    // aggregate counts by error id independently of coverage.
    if (Array.isArray(meta.misconceptions)) {
      meta.misconceptions.forEach(function (m) {
        store.errors.push({
          timestamp: ts,
          questionId: current.question.id,
          syllabusCode: coverageTags[0] || null,
          errorId: m.id,
          category: m.category || "other_error",
          label: m.label,
          severity: m.severity || "noted"
        });
      });
      persist();
    }

    const fb = el("div", { class: "fb" });
    const scoreText = result.marksAwarded + " / " + result.marksPossible +
                      " " + (result.marksPossible === 1 ? "mark" : "marks");
    const scoreLabel = result.status === "full" ? "Full marks" :
                       result.status === "partial" ? "Partial credit" : "No marks";
    fb.appendChild(el("div", { class: "fb-score" }, [
      el("span", { class: "fb-score-label", text: scoreLabel }),
      el("span", { class: "fb-score-num", text: scoreText }),
      peekedThisQuestion
        ? el("span", { class: "fb-peeked-pill", title: "You revealed the topic before answering", text: "Peeked" })
        : null
    ]));

    // Always reveal the topic in feedback, so the student learns what they
    // just practised (even if they didn't peek pre-answer).
    if (Array.isArray(v.tags) && v.tags.length) {
      const tagList = el("div", { class: "fb-tags-list" });
      v.tags.forEach(function (t) {
        if (isCoverageTag(t)) {
          const name = nameForTag(t);
          tagList.appendChild(el("span", { class: "qmeta-tag",
            text: name ? (t + " · " + name) : t }));
        } else if (VOCAB.crossCutting.indexOf(t) !== -1) {
          tagList.appendChild(el("span", { class: "qmeta-tag qmeta-tag-cross", text: t }));
        }
      });
      if (tagList.children.length) {
        fb.appendChild(el("div", { class: "fb-block" }, [
          el("div", { class: "fb-h", text: "Topic" }),
          tagList
        ]));
      }
    }

    // Misconceptions: surface predicted errors that fired, with a per-error
    // count across the whole error log so the student sees the trend.
    if (Array.isArray(meta.misconceptions) && meta.misconceptions.length) {
      const mcList = el("div", { class: "fb-misconceptions" });
      meta.misconceptions.forEach(function (m) {
        const count = store.errors.filter(function (e) { return e.errorId === m.id; }).length;
        mcList.appendChild(el("div", { class: "fb-misconception fb-misconception-" + (m.severity || "noted") }, [
          el("div", { class: "fb-misconception-label", text: m.label }),
          el("div", { class: "fb-misconception-count",
            text: "You've made this kind of error " + count + " time" + (count === 1 ? "" : "s") + " so far." })
        ]));
      });
      fb.appendChild(el("div", { class: "fb-block fb-block-misc" }, [
        el("div", { class: "fb-h", text: "Likely error" + (meta.misconceptions.length === 1 ? "" : "s") }),
        mcList
      ]));
    }

    if (v.type === "mcq") {
      const correct = result.correctIndex, chose = result.chosenIndex;
      const yourChoiceText = (v.choices && v.choices[chose]) || "(no choice)";
      const yourEl = el("div", { class: "fb-your" });
      renderPromptText(yourChoiceText, yourEl);
      fb.appendChild(el("div", { class: "fb-block" }, [
        el("div", { class: "fb-h", text: "Your choice" }),
        yourEl
      ]));
      if (chose !== correct) {
        const correctEl = el("div", { class: "fb-correct" });
        renderPromptText((v.choices && v.choices[correct]) || "?", correctEl);
        fb.appendChild(el("div", { class: "fb-block" }, [
          el("div", { class: "fb-h", text: "Correct choice" }),
          correctEl
        ]));
        if (v.distractorRationales && v.distractorRationales[String(chose)]) {
          const rEl = el("div", { class: "fb-body" });
          renderPromptText(v.distractorRationales[String(chose)], rEl);
          fb.appendChild(el("div", { class: "fb-block" }, [
            el("div", { class: "fb-h", text: "Why that's wrong" }),
            rEl
          ]));
        }
      }
    } else if (v.type === "numeric") {
      fb.appendChild(el("div", { class: "fb-block" }, [
        el("div", { class: "fb-h", text: "Your answer" }),
        el("div", { class: "fb-your", text: meta.rawResponse || "(blank)" })
      ]));
      const target = (typeof v.expectedNumeric === "number") ? v.expectedNumeric : v.answer;
      if (target != null) {
        fb.appendChild(el("div", { class: "fb-block" }, [
          el("div", { class: "fb-h", text: "Expected value" }),
          (function () {
            const div = el("div", { class: "fb-correct" });
            div.appendChild(document.createTextNode(String(target) + " "));
            if (v.unitHint) {
              const u = el("span", { class: "fb-unit" }); renderPromptText(v.unitHint, u); div.appendChild(u);
            }
            return div;
          })()
        ]));
      }
    } else if (v.type === "multi_select") {
      const msList = el("div", { class: "fb-multi-list" });
      (result.statementResults || []).forEach(function (sr) {
        const row = el("div", { class: "fb-multi-row fb-multi-" + sr.status });
        const mark = el("span", { class: "fb-multi-mark" });
        // Glyph: ✓ for correct decisions (correct_tick, correct_skip),
        // ✗ for wrong_tick, … for missed_true (you should have ticked).
        if (sr.status === "correct_tick" || sr.status === "correct_skip") mark.textContent = "✓";
        else if (sr.status === "wrong_tick") mark.textContent = "✗";
        else if (sr.status === "missed_true") mark.textContent = "·";
        row.appendChild(mark);
        const body = el("div", { class: "fb-multi-body" });
        const t = el("div", { class: "fb-multi-text" });
        renderPromptText(sr.text || "", t);
        body.appendChild(t);
        // Show rationale on wrong_tick or missed_true so the student sees
        // the diagnosis. Always show the truth-state of the statement.
        const tag = el("div", { class: "fb-multi-tag" });
        if (sr.status === "correct_tick") tag.textContent = "True, and you ticked it.";
        else if (sr.status === "correct_skip") tag.textContent = "False, and you correctly didn't tick it.";
        else if (sr.status === "wrong_tick") tag.textContent = "False, but you ticked it.";
        else if (sr.status === "missed_true") tag.textContent = "True, but you didn't tick it.";
        body.appendChild(tag);
        if ((sr.status === "wrong_tick" || sr.status === "missed_true") && sr.rationale) {
          const rEl = el("div", { class: "fb-multi-rationale" });
          renderPromptText(sr.rationale, rEl);
          body.appendChild(rEl);
        }
        row.appendChild(body);
        msList.appendChild(row);
      });
      fb.appendChild(el("div", { class: "fb-block" }, [
        el("div", { class: "fb-h", text: "Your selections" }),
        msList
      ]));
    } else if (v.type === "widget") {
      fb.appendChild(el("div", { class: "fb-block" }, [
        el("div", { class: "fb-h", text: "Your answer (from the widget)" }),
        el("div", { class: "fb-your", text: meta.rawResponse || "(no answer)" })
      ]));
      if (Array.isArray(result.hits) && result.hits.length) {
        const list = el("ul", { class: "fb-mp fb-mp-hit" });
        result.hits.forEach(function (h) { list.appendChild(el("li", null, h)); });
        fb.appendChild(el("div", { class: "fb-block" }, [
          el("div", { class: "fb-h", text: "Mark points hit" }), list
        ]));
      }
      if (Array.isArray(result.misses) && result.misses.length) {
        const list = el("ul", { class: "fb-mp fb-mp-miss" });
        result.misses.forEach(function (h) { list.appendChild(el("li", null, h)); });
        fb.appendChild(el("div", { class: "fb-block" }, [
          el("div", { class: "fb-h", text: "Mark points missed" }), list
        ]));
      }
    } else {
      fb.appendChild(el("div", { class: "fb-block" }, [
        el("div", { class: "fb-h", text: "Your answer" }),
        el("div", { class: "fb-your", text: meta.rawResponse || "(blank)" })
      ]));
      if (Array.isArray(result.hits) && result.hits.length) {
        const list = el("ul", { class: "fb-mp fb-mp-hit" });
        result.hits.forEach(function (h) { list.appendChild(el("li", null, h)); });
        fb.appendChild(el("div", { class: "fb-block" }, [
          el("div", { class: "fb-h", text: "Markscheme points hit" }), list
        ]));
      }
      if (Array.isArray(result.misses) && result.misses.length) {
        const list = el("ul", { class: "fb-mp fb-mp-miss" });
        result.misses.forEach(function (h) { list.appendChild(el("li", null, h)); });
        fb.appendChild(el("div", { class: "fb-block" }, [
          el("div", { class: "fb-h", text: "Markscheme points missed" }), list
        ]));
      }
    }

    if (v.explanation) {
      const body = el("div", { class: "fb-body" });
      renderPromptText(v.explanation, body);
      fb.appendChild(el("div", { class: "fb-block fb-model" }, [
        el("div", { class: "fb-h", text: "Model answer" }),
        body
      ]));
    }
    if (v.examinerNote) {
      const body = el("div", { class: "fb-body" });
      renderPromptText(v.examinerNote, body);
      fb.appendChild(el("div", { class: "fb-block fb-examiner" }, [
        el("div", { class: "fb-h", text: "Examiner note" }),
        body
      ]));
    }

    const nextBtn = el("button", { class: "btn btn-primary next-btn",
      onClick: function () { renderQuestion(); renderCoverage(); renderMistakes(); updateProgressLine(); },
      text: "Next question  →" });
    fb.appendChild(nextBtn);
    card.appendChild(fb);

    const inputWrap = card.querySelector(".qinput");
    if (inputWrap) inputWrap.style.display = "none";

    detachPendingNextOnEnter();   // belt-and-braces in case a prior one leaked
    pendingNextOnEnter = function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        detachPendingNextOnEnter();
        nextBtn.click();
      }
    };
    setTimeout(function () {
      if (pendingNextOnEnter) document.addEventListener("keydown", pendingNextOnEnter);
    }, 0);

    // Scroll the feedback panel into view if it's below the fold (e.g. after
    // a tall widget). Smooth-scroll just enough to reveal the score line.
    requestAnimationFrame(function () {
      setTimeout(function () {
        const scoreEl = fb.querySelector(".fb-score");
        if (!scoreEl) return;
        const rect = scoreEl.getBoundingClientRect();
        const viewportH = window.innerHeight;
        if (rect.top >= 0 && rect.bottom <= viewportH) return;
        const header = document.querySelector(".app-header");
        const headerH = header ? header.getBoundingClientRect().height : 0;
        const targetTop = rect.top + window.scrollY - headerH - 12;
        try { window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" }); }
        catch (e) { window.scrollTo(0, Math.max(0, targetTop)); }
      }, 30);
    });

    renderCoverage();
    renderMistakes();
    updateProgressLine();
    // After the coverage repaints with the new attempt's colour, keep the
    // current atom in view so the student sees the change.
    requestAnimationFrame(scrollCoverageToCurrent);
  }

  /* ──────────────────────────────────────────────────────────────────────────
     10. Coverage map UI
     ────────────────────────────────────────────────────────────────────────── */

  /* ──────────────────────────────────────────────────────────────────────────
     Mistakes panel — aggregates store.errors by errorId and renders a sorted
     list of recurring mistakes. Sits below the coverage map on the side. The
     coverage map answers "what have I mastered"; this panel answers "what
     mistake keeps tripping me up?"
     ────────────────────────────────────────────────────────────────────────── */
  function renderMistakes() {
    const root = document.getElementById("mistakes");
    if (!root) return;
    root.innerHTML = "";

    root.appendChild(el("div", { class: "mistakes-hd" }, [
      el("div", { class: "mistakes-eyebrow", text: "Mistakes so far" })
    ]));

    if (!Array.isArray(store.errors) || store.errors.length === 0) {
      root.appendChild(el("div", { class: "mistakes-empty",
        text: "No predicted mistakes logged yet. They appear here once you make one." }));
      return;
    }

    // Build a hierarchical aggregation. For each error event, walk up the
    // category tree to get its full path (top → mid → leaf). Then nest the
    // counts so each tier shows its total.
    //
    // tree[catId] = { total, label, children: { childCatId: ... }, ids: { errorId: {count, label, severity} } }
    // The children at the leaf-category level point to error ids; intermediate
    // levels point to child categories.
    const tree = {};
    function ensureNode(catId) {
      if (!tree[catId]) {
        tree[catId] = {
          total: 0,
          label: categoryLabel(catId),
          parent: (CATEGORY_TREE[catId] && CATEGORY_TREE[catId].parent) || null,
          ids: {},
          children: {}
        };
      }
      return tree[catId];
    }

    store.errors.forEach(function (e) {
      const leafCat = e.category || "other_error";
      const path = categoryPath(leafCat);   // root → leaf
      // Bump the total on every level of the path
      path.forEach(function (catId) {
        const node = ensureNode(catId);
        node.total++;
      });
      // Stitch children
      for (let i = 0; i < path.length - 1; i++) {
        tree[path[i]].children[path[i + 1]] = true;
      }
      // Attach the error id to the leaf category
      const leafNode = ensureNode(leafCat);
      const id = e.errorId || "(unknown)";
      if (!leafNode.ids[id]) leafNode.ids[id] = { count: 0, label: e.label, severity: e.severity };
      leafNode.ids[id].count++;
      if (!leafNode.ids[id].label && e.label) leafNode.ids[id].label = e.label;
    });

    // Recursive render
    function renderNode(catId, depth) {
      const node = tree[catId];
      if (!node) return null;
      const wrap = el("div", { class: "mistake-node mistake-node-depth-" + depth });
      wrap.appendChild(el("div", { class: "mistake-cat-head mistake-cat-head-depth-" + depth }, [
        el("span", { class: "mistake-cat-name", text: node.label }),
        el("span", { class: "mistake-cat-count", text: node.total + "×" })
      ]));

      // Render child categories (sorted by total desc)
      const childKeys = Object.keys(node.children).sort(function (a, b) {
        return tree[b].total - tree[a].total;
      });
      childKeys.forEach(function (childKey) {
        wrap.appendChild(renderNode(childKey, depth + 1));
      });

      // Render leaf error ids attached to this node (sorted by count desc)
      const idEntries = Object.keys(node.ids).map(function (id) {
        return { id: id, count: node.ids[id].count, label: node.ids[id].label, severity: node.ids[id].severity };
      }).sort(function (a, b) { return b.count - a.count; });

      idEntries.forEach(function (e) {
        const item = el("div", { class: "mistake mistake-" + (e.severity || "noted") });
        const head = el("div", { class: "mistake-head" });
        head.appendChild(el("span", { class: "mistake-id", text: e.id }));
        head.appendChild(el("span", { class: "mistake-count", text: e.count + "×" }));
        item.appendChild(head);

        const seq = sequenceForMisconception(e.id, 10);
        if (seq.length) {
          const seqEl = el("div", { class: "mistake-seq",
            title: "Sequence on questions where this misconception was a possible answer. ✓ = avoided. ✗ = fired." });
          seq.forEach(function (mark) {
            seqEl.appendChild(el("span", {
              class: "mistake-mark mistake-mark-" + (mark === "v" ? "ok" : "bad"),
              text: mark === "v" ? "✓" : "✗"
            }));
          });
          item.appendChild(seqEl);
        }

        const labelEl = el("div", { class: "mistake-label" });
        renderPromptText(e.label || "(no label)", labelEl);
        item.appendChild(labelEl);

        wrap.appendChild(item);
      });

      return wrap;
    }

    // Top-level nodes are those with parent === null
    const rootKeys = Object.keys(tree).filter(function (k) {
      return tree[k].parent === null;
    }).sort(function (a, b) { return tree[b].total - tree[a].total; });

    const list = el("div", { class: "mistakes-cats" });
    rootKeys.forEach(function (k) {
      list.appendChild(renderNode(k, 0));
    });
    root.appendChild(list);
  }

  // Scroll the coverage sidebar so the current question's atom (or, failing
  // that, its subtag) is visible near the top of the visible area. Scrolls
  // the sidebar's own overflow container, NOT the page, so this is safe to
  // call from any render path.
  function scrollCoverageToCurrent() {
    if (!current || !current.view) return;
    const tags = Array.isArray(current.view.tags) ? current.view.tags : [];
    let target = null;
    // Prefer atom (more specific). Fall back to subtag.
    for (const t of tags) {
      if (ATOMS && ATOMS[t]) {
        target = document.querySelector('[data-atom-id="' + t.replace(/"/g, "") + '"]');
        if (target) break;
      }
    }
    if (!target) {
      for (const t of tags) {
        if (SUBTAG_INDEX && SUBTAG_INDEX[t]) {
          target = document.querySelector('[data-subtag-id="' + t.replace(/"/g, "") + '"]');
          if (target) break;
        }
      }
    }
    if (!target) return;
    const side = document.querySelector(".col-side");
    if (!side) return;
    const sideRect = side.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    // Where the target currently sits inside the sidebar's scroll content.
    const offsetWithin = targetRect.top - sideRect.top + side.scrollTop;
    // Park the target ~28% from the top of the visible area so the student
    // can see what's around it too.
    const desiredTop = Math.max(0, offsetWithin - side.clientHeight * 0.28);
    try { side.scrollTo({ top: desiredTop, behavior: "smooth" }); }
    catch (e) { side.scrollTop = desiredTop; }
  }

  function renderCoverage() {
    const root = document.getElementById("coverage");
    root.innerHTML = "";

    root.appendChild(el("div", { class: "cov-hd" }, [
      el("div", { class: "cov-eyebrow", text: "Coverage map" }),
      el("button", { class: "cov-clear" + (store.activeFilter ? "" : " is-passive"),
        type: "button", onClick: function () { setFilter(null); },
        text: store.activeFilter ? "Show all" : "All subtags shown" })
    ]));

    if (store.activeFilter) {
      const name = nameForTag(store.activeFilter);
      root.appendChild(el("div", { class: "cov-filter-strip" }, [
        el("span", { class: "cov-filter-eyebrow", text: "Filter:" }),
        el("span", { class: "cov-filter-name", text: name ? (name + " (" + store.activeFilter + ")") : store.activeFilter })
      ]));
    }

    VOCAB.parentGroups.forEach(function (group) {
      const groupTotal = group.subtags.reduce(function (s, st) { return s + (SUBTAG_COUNTS[st.id] || 0); }, 0);
      if (groupTotal === 0) return;

      const isCollapsed = Array.isArray(store.collapsedGroups) && store.collapsedGroups.indexOf(group.id) !== -1;

      // Per-atom blob strip for the header. Dots are GROUPED by subtag —
      // each subtag's atoms cluster together with a thin border, so the
      // user can see which subtag within the section is strong vs weak.
      // Colour lives only at the atom level; subtag and parent group are
      // aggregators that just display the contained dots.
      const blobStrip = el("span", { class: "cov-group-blobs" });
      group.subtags.forEach(function (st) {
        const stAtoms = atomsForSubtag(st.id).filter(function (id) { return (SUBTAG_COUNTS[id] || 0) > 0; });
        if (stAtoms.length === 0) return;
        const stBox = el("span", { class: "cov-blob-subtag",
          title: st.id + " · " + st.name + " · " + stAtoms.length + " atom" + (stAtoms.length === 1 ? "" : "s") });
        stAtoms.forEach(function (aid) {
          const acov = coverageForSubtag(aid);
          stBox.appendChild(el("span", {
            class: "cov-blob",
            title: aid + " · " + (nameForTag(aid) || "") + " · "
              + (acov.attemptCount === 0 ? "untried"
                 : Math.round(acov.avg * 100) + "% (last " + acov.attemptCount + ")"),
            style: "background:" + acov.fill + ";"
          }));
        });
        blobStrip.appendChild(stBox);
      });

      const groupEl = el("div", { class: "cov-group" + (isCollapsed ? " cov-group-collapsed" : "") });
      const groupHdr = el("button", {
        class: "cov-group-hd", type: "button",
        title: (isCollapsed ? "Expand " : "Collapse ") + group.name,
        onClick: function () { toggleGroupCollapsed(group.id); }
      }, [
        el("span", { class: "cov-group-disclosure", text: isCollapsed ? "▸" : "▾" }),
        el("span", { class: "cov-group-name", text: group.name }),
        blobStrip,
        el("span", { class: "cov-group-count", text: groupTotal + " q" })
      ]);
      groupEl.appendChild(groupHdr);

      if (isCollapsed) {
        root.appendChild(groupEl);
        return;   // skip rendering subtags + atoms when collapsed
      }

      group.subtags.forEach(function (st) {
        const count = SUBTAG_COUNTS[st.id] || 0;
        if (count === 0) return;
        const cov = coverageForSubtag(st.id);
        const isActive = (store.activeFilter === st.id);

        // Subtag row. The tile itself is now neutral — no fill colour from
        // its average. Per-atom dots live INSIDE the tile bar (right-aligned,
        // between the name and the count). The colour aggregation lives only
        // at the atom level; the subtag tile is just a container with dots.
        const subtagRow = el("div", { class: "cov-subtag-row" });
        const stAtoms = atomsForSubtag(st.id).filter(function (id) { return (SUBTAG_COUNTS[id] || 0) > 0; });
        const tileDots = el("span", { class: "tile-dots" });
        stAtoms.forEach(function (aid) {
          const acov = coverageForSubtag(aid);
          tileDots.appendChild(el("span", {
            class: "cov-blob",
            title: aid + " · " + (nameForTag(aid) || "") + " · "
              + (acov.attemptCount === 0 ? "untried"
                 : Math.round(acov.avg * 100) + "% (last " + acov.attemptCount + ")"),
            style: "background:" + acov.fill + ";"
          }));
        });
        const headBtn = el("button", {
          class: "tile tile-subtag" + (isActive ? " tile-active" : ""),
          type: "button",
          "data-subtag-id": st.id,
          title: st.id + " · " + st.name + " · " + count + " question" + (count === 1 ? "" : "s"),
          onClick: function () { setFilter(isActive ? null : st.id); }
        }, [
          el("span", { class: "tile-name", text: st.id + " · " + st.name }),
          tileDots,
          el("span", { class: "tile-num" }, [
            el("span", { class: "tile-q", text: String(count) + " q" })
          ])
        ]);
        subtagRow.appendChild(headBtn);

        // Atom chips inside this subtag.
        const atomIds = atomsForSubtag(st.id).filter(function (id) { return (SUBTAG_COUNTS[id] || 0) > 0; });
        if (atomIds.length) {
          const atomRow = el("div", { class: "cov-atom-row" });
          atomIds.forEach(function (aid) {
            const a = ATOMS[aid];
            const acount = SUBTAG_COUNTS[aid] || 0;
            const acov = coverageForSubtag(aid);
            const aActive = (store.activeFilter === aid);
            const aStyle =
              " --tile-fill:" + acov.fill + ";" +
              " --tile-text:" + acov.text + ";" +
              " --tile-text-soft:" + acov.textSoft + ";";
            atomRow.appendChild(el("button", {
              class: "atom-chip" + (aActive ? " atom-chip-active" : ""),
              type: "button",
              "data-atom-id": aid,
              title: aid + " · " + a.name + " · " + acount + " question" + (acount === 1 ? "" : "s")
                + (acov.attemptCount === 0 ? " · untried"
                   : (" · last " + acov.attemptCount + " avg " + Math.round(acov.avg * 100) + "%")),
              style: aStyle,
              onClick: function () { setFilter(aActive ? null : aid); }
            }, [
              el("span", { class: "atom-code", text: aid.split(/[-.]/).slice(-1)[0] }),
              el("span", { class: "atom-name", text: a.name }),
              acov.attemptCount > 0
                ? el("span", { class: "atom-pct", text: Math.round(acov.avg * 100) + "%" })
                : null
            ]));
          });
          subtagRow.appendChild(atomRow);
        }
        groupEl.appendChild(subtagRow);
      });
      root.appendChild(groupEl);
    });

    root.appendChild(el("div", { class: "cov-legend" }, [
      el("div", { class: "cov-legend-title", text: "Tile colour: average of last " + store.coverageWindow + " attempts in that subtag." }),
      el("div", { class: "cov-legend-bands" }, [
        ["Untried", BAND.untried.fill], ["<25%", BAND.band_red.fill], ["25-50%", BAND.band_orange.fill],
        ["50-70%", BAND.band_yellow.fill], ["70-90%", BAND.band_mid.fill], ["≥90%", BAND.band_strong.fill]
      ].map(function (pair) {
        return el("span", { class: "cov-legend-band" }, [
          el("span", { class: "cov-legend-swatch", style: "background:" + pair[1] }),
          el("span", { class: "cov-legend-label", text: pair[0] })
        ]);
      }))
    ]));
  }

  function setFilter(subtag) {
    store.activeFilter = subtag;
    persist();
    renderFilterBanner();
    renderQuestion();
    renderCoverage();
    renderMistakes();
    updateProgressLine();
  }

  function toggleGroupCollapsed(groupId) {
    if (!Array.isArray(store.collapsedGroups)) store.collapsedGroups = [];
    const idx = store.collapsedGroups.indexOf(groupId);
    if (idx === -1) store.collapsedGroups.push(groupId);
    else store.collapsedGroups.splice(idx, 1);
    persist();
    renderCoverage();
  }

  // Visible banner above the question card whenever a subtag/atom filter is
  // active. The coverage map already shows the filter in its header, but a
  // persisted filter from a previous session can otherwise sneak past the
  // student — especially since the topic chips are normally hidden. The
  // banner spans the page width so it's unmissable, and includes a clear
  // button.
  function renderFilterBanner() {
    const root = document.getElementById("filter-banner");
    if (!root) return;
    root.innerHTML = "";
    if (!store.activeFilter) {
      root.classList.remove("filter-banner-active");
      return;
    }
    root.classList.add("filter-banner-active");
    const name = nameForTag(store.activeFilter);
    root.appendChild(el("span", { class: "filter-banner-eyebrow", text: "Filtered to:" }));
    root.appendChild(el("span", { class: "filter-banner-name",
      text: (name ? name + " " : "") + "(" + store.activeFilter + ")" }));
    root.appendChild(el("button", {
      class: "filter-banner-clear", type: "button",
      title: "Clear filter and return to the full pool",
      onClick: function () { setFilter(null); },
      text: "Clear filter ×"
    }));
  }

  /* ──────────────────────────────────────────────────────────────────────────
     11. Progress line and settings
     ────────────────────────────────────────────────────────────────────────── */

  function updateProgressLine() {
    const line = document.getElementById("progress-line");
    if (!line) return;
    const n = store.attempts.length;
    if (n === 0) {
      line.textContent = "Welcome. Answer below, or pick a subtag in the coverage map.";
      return;
    }
    const last = store.attempts.slice(-10);
    let sum = 0;
    last.forEach(function (a) {
      const possible = a.marksPossible > 0 ? a.marksPossible : 1;
      sum += a.marksAwarded / possible;
    });
    const avg10 = Math.round((sum / last.length) * 100);
    const touched = new Set();
    store.attempts.forEach(function (a) { (a.subtags || []).forEach(function (s) { touched.add(s); }); });
    const totalSubtags = Object.keys(SUBTAG_INDEX).filter(function (id) { return SUBTAG_COUNTS[id] > 0; }).length;
    line.innerHTML = "<b>" + n + "</b> attempt" + (n === 1 ? "" : "s")
                   + " · last 10: <b>" + avg10 + "%</b>"
                   + " · subtags touched: <b>" + touched.size + "/" + totalSubtags + "</b>";
  }

  function openSettings()  { document.getElementById("settings-overlay").classList.add("open"); }
  function closeSettings() { document.getElementById("settings-overlay").classList.remove("open"); }

  /* ── Sign-in modal ───────────────────────────────────────────────────── */
  function openSignIn() {
    const overlay = document.getElementById("signin-overlay");
    if (!overlay) return;
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    const nameEl = document.getElementById("signin-name");
    const cohortEl = document.getElementById("signin-cohort");
    if (nameEl) nameEl.value = IDENTITY.display_name || "";
    if (cohortEl && IDENTITY.cohort) cohortEl.value = IDENTITY.cohort;
    // The close button is only available if the student is already signed
    // in (i.e., they opened this via "Switch"). First-time sign-in is a
    // hard gate.
    const closeBtn = document.getElementById("signin-close");
    if (closeBtn) closeBtn.hidden = !isSignedIn();
    setTimeout(function () { if (nameEl && !nameEl.value) nameEl.focus(); }, 30);
  }

  function closeSignIn() {
    if (!isSignedIn()) return;
    const overlay = document.getElementById("signin-overlay");
    if (!overlay) return;
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
  }

  function attachSignInHandlers() {
    const tabQuick  = document.getElementById("signin-tab-quick");
    const tabGoogle = document.getElementById("signin-tab-google");
    const paneQuick  = document.getElementById("signin-pane-quick");
    const paneGoogle = document.getElementById("signin-pane-google");
    if (!tabQuick || !tabGoogle || !paneQuick || !paneGoogle) return;

    function selectTab(which) {
      tabQuick.classList.toggle("is-active", which === "quick");
      tabGoogle.classList.toggle("is-active", which === "google");
      paneQuick.classList.toggle("is-active", which === "quick");
      paneGoogle.classList.toggle("is-active", which === "google");
    }
    tabQuick.addEventListener("click", function () { selectTab("quick"); });
    tabGoogle.addEventListener("click", function () { selectTab("google"); });

    const goBtn = document.getElementById("signin-quick-go");
    if (goBtn) goBtn.addEventListener("click", submitQuickSignIn);

    // Allow Enter to submit when name or cohort is focused.
    const nameEl = document.getElementById("signin-name");
    const cohortEl = document.getElementById("signin-cohort");
    function onEnter(e) { if (e.key === "Enter") { e.preventDefault(); submitQuickSignIn(); } }
    if (nameEl) nameEl.addEventListener("keydown", onEnter);
    if (cohortEl) cohortEl.addEventListener("keydown", onEnter);

    const closeBtn = document.getElementById("signin-close");
    if (closeBtn) closeBtn.addEventListener("click", closeSignIn);

    // Click outside the panel only closes if already signed in.
    const overlay = document.getElementById("signin-overlay");
    if (overlay) overlay.addEventListener("click", function (e) {
      if (e.target.id === "signin-overlay" && isSignedIn()) closeSignIn();
    });

    // Identity pill in the header opens the modal as a switch action.
    const pill = document.getElementById("identity-pill");
    if (pill) pill.addEventListener("click", openSignIn);
  }

  function submitQuickSignIn() {
    const nameEl = document.getElementById("signin-name");
    const cohortEl = document.getElementById("signin-cohort");
    const name = (nameEl && nameEl.value || "").trim();
    const cohort = (cohortEl && cohortEl.value || "").trim();
    if (!name || !cohort) {
      if (!name && nameEl) { nameEl.classList.add("ans-empty-flash"); setTimeout(function () { nameEl.classList.remove("ans-empty-flash"); }, 350); }
      if (!cohort && cohortEl) { cohortEl.classList.add("ans-empty-flash"); setTimeout(function () { cohortEl.classList.remove("ans-empty-flash"); }, 350); }
      return;
    }
    const wasSignedIn = isSignedIn();
    IDENTITY.display_name = name;
    IDENTITY.cohort = cohort;
    // anonymous_id stays the same across sign-in changes so history is preserved.
    persistIdentity();
    closeSignInAlways();
    renderIdentityPill();
    if (!wasSignedIn) {
      // First sign-in this session: refresh the question card so any
      // "(no question)" placeholder gets replaced with a real question.
      renderQuestion();
      renderCoverage();
      renderMistakes();
      updateProgressLine();
    }
  }

  // Same as closeSignIn but doesn't require isSignedIn (used after a fresh
  // sign-in submission where isSignedIn() has just become true).
  function closeSignInAlways() {
    const overlay = document.getElementById("signin-overlay");
    if (!overlay) return;
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
  }

  function renderIdentityPill() {
    const pill = document.getElementById("identity-pill");
    if (!pill) return;
    if (!isSignedIn()) { pill.hidden = true; return; }
    pill.hidden = false;
    const nameSpan = document.getElementById("identity-pill-name");
    const cohortSpan = document.getElementById("identity-pill-cohort");
    if (nameSpan) nameSpan.textContent = IDENTITY.display_name;
    if (cohortSpan) cohortSpan.textContent = "(" + IDENTITY.cohort + ")";
  }

  function resetProgressFlow() {
    if (!confirm("Delete every logged attempt? This can't be undone.")) return;
    if (!confirm("Really sure? Permanent.")) return;
    clearProgress();
    renderQuestion(); renderCoverage(); updateProgressLine(); renderLevelStrip();
    closeSettings();
  }

  /* ── Level strip ─────────────────────────────────────────────────────── */
  function setStudyLevel(lvl) {
    if (lvl !== "SL" && lvl !== "HL") return;
    if (store.studyLevel === lvl) return;
    store.studyLevel = lvl;
    persist();
    computeSubtagCounts();
    // Clear an active subtag filter if it no longer has any questions.
    if (store.activeFilter && (SUBTAG_COUNTS[store.activeFilter] || 0) === 0) {
      store.activeFilter = null;
    }
    renderLevelStrip();
    renderQuestion();
    renderCoverage();
    updateProgressLine();
  }

  function renderLevelStrip() {
    const root = document.getElementById("level-strip");
    if (!root) return;
    root.innerHTML = "";
    root.appendChild(el("span", { class: "level-strip-eyebrow", text: "Study level:" }));
    const counts = { SL: 0, HL: 0 };
    ALL_QUESTIONS.forEach(function (q) {
      if (q.parked === true) return;
      if (q.level === "HL") counts.HL++;
      else counts.SL++;
    });
    ["SL", "HL"].forEach(function (lvl) {
      const isActive = store.studyLevel === lvl;
      const label = lvl === "SL" ? "SL only" : "SL + HL";
      const num = lvl === "SL" ? counts.SL : (counts.SL + counts.HL);
      root.appendChild(el("button", {
        type: "button",
        class: "level-chip" + (isActive ? " is-active" : ""),
        title: lvl === "SL" ? "Show only SL questions (hide HL-only)" : "Show all questions (SL + HL)",
        onClick: function () { setStudyLevel(lvl); }
      }, [
        el("span", { class: "level-chip-label", text: label }),
        el("span", { class: "level-chip-count", text: String(num) })
      ]));
    });
  }

  /* ── Previous-attempt pill + review modal ────────────────────────────── */
  function renderPreviousPill(card) {
    const n = store.attempts.length;
    if (n === 0) return;
    const last = store.attempts[n - 1];
    const statusWord = last.status === "full" ? "Full marks"
                     : last.status === "partial" ? "Partial credit" : "No marks";
    const pill = el("div", { class: "last-pill lp-" + last.status }, [
      el("span", { class: "lp-eyebrow", text: "Previous: " }),
      el("span", { class: "lp-id", text: last.questionId || "(unknown)" }),
      el("span", { class: "lp-score", text: statusWord + " · " + last.marksAwarded + "/" + last.marksPossible }),
      el("button", {
        class: "lp-review-btn", type: "button",
        onClick: function () { openReview(n - 1); },
        text: "Review"
      })
    ]);
    card.appendChild(pill);
  }

  function openReview(attemptIndex) {
    const a = store.attempts[attemptIndex];
    if (!a) return;
    const q = ALL_QUESTIONS.find(function (qq) { return qq.id === a.questionId; });
    const overlay = document.getElementById("review-overlay");
    const content = document.getElementById("review-content");
    if (!overlay || !content) return;
    content.innerHTML = "";

    const subtagNames = q && Array.isArray(q.tags)
      ? q.tags.filter(isCoverageTag).map(function (t) { return nameForTag(t) || t; })
      : [];

    content.appendChild(el("div", { class: "review-hd" }, [
      el("div", null, [
        el("div", { class: "review-eyebrow", text: a.questionId + (a.type ? " · " + a.type : "") }),
        el("h2", { class: "review-title", text: subtagNames.length ? subtagNames.join(" · ") : a.questionId })
      ]),
      el("button", { class: "review-close", type: "button", "aria-label": "Close",
                     onClick: closeReview, text: "×" })
    ]));

    const statusLabel = a.status === "full" ? "Full marks"
                      : a.status === "partial" ? "Partial credit" : "No marks";
    content.appendChild(el("div", { class: "review-score review-score-" + a.status }, [
      el("span", { class: "review-score-label", text: statusLabel }),
      el("span", { class: "review-score-num", text: a.marksAwarded + " / " + a.marksPossible + " marks" }),
      el("span", { class: "review-time", text: (function () {
        try { return new Date(a.timestamp).toLocaleString(); }
        catch (e) { return a.timestamp || ""; }
      })() })
    ]));

    if (q) {
      const prompt = el("div", { class: "review-prompt" });
      renderPromptText(q.prompt, prompt);
      content.appendChild(el("div", { class: "review-block" }, [
        el("div", { class: "review-h", text: "Question" }), prompt
      ]));
    }

    content.appendChild(el("div", { class: "review-block" }, [
      el("div", { class: "review-h", text: "Your answer" }),
      el("div", { class: "review-body", text: a.rawResponse != null ? a.rawResponse : "(no answer recorded)" })
    ]));

    if (q && q.type === "mcq" && typeof a.chosenIndex === "number" && Array.isArray(q.choices)) {
      const chosenEl = el("div", { class: "review-body" });
      renderPromptText(q.choices[a.chosenIndex] || "(no choice)", chosenEl);
      content.appendChild(el("div", { class: "review-block" }, [
        el("div", { class: "review-h", text: "You chose" }),
        chosenEl
      ]));
      if (typeof q.answerIndex === "number" && a.chosenIndex !== q.answerIndex) {
        const correctEl = el("div", { class: "review-body" });
        renderPromptText(q.choices[q.answerIndex] || "(?)", correctEl);
        content.appendChild(el("div", { class: "review-block" }, [
          el("div", { class: "review-h", text: "Correct choice" }),
          correctEl
        ]));
      }
    }

    // Multi-select replay: parse the JSON-serialised selection and re-render
    // the per-statement breakdown.
    if (q && q.type === "multi_select" && typeof a.rawResponse === "string") {
      let sel = [];
      try { sel = JSON.parse(a.rawResponse) || []; } catch (e) { sel = []; }
      const rerun = markMultiSelect(q, sel);
      const msList = el("div", { class: "fb-multi-list" });
      (rerun.statementResults || []).forEach(function (sr) {
        const row = el("div", { class: "fb-multi-row fb-multi-" + sr.status });
        const mark = el("span", { class: "fb-multi-mark" });
        if (sr.status === "correct_tick" || sr.status === "correct_skip") mark.textContent = "✓";
        else if (sr.status === "wrong_tick") mark.textContent = "✗";
        else if (sr.status === "missed_true") mark.textContent = "·";
        row.appendChild(mark);
        const body = el("div", { class: "fb-multi-body" });
        const t = el("div", { class: "fb-multi-text" });
        renderPromptText(sr.text || "", t);
        body.appendChild(t);
        const tag = el("div", { class: "fb-multi-tag" });
        if (sr.status === "correct_tick") tag.textContent = "True, and you ticked it.";
        else if (sr.status === "correct_skip") tag.textContent = "False, correctly skipped.";
        else if (sr.status === "wrong_tick") tag.textContent = "False, but you ticked it.";
        else if (sr.status === "missed_true") tag.textContent = "True, but you didn't tick it.";
        body.appendChild(tag);
        if ((sr.status === "wrong_tick" || sr.status === "missed_true") && sr.rationale) {
          const rEl = el("div", { class: "fb-multi-rationale" });
          renderPromptText(sr.rationale, rEl);
          body.appendChild(rEl);
        }
        row.appendChild(body);
        msList.appendChild(row);
      });
      content.appendChild(el("div", { class: "review-block" }, [
        el("div", { class: "review-h", text: "Per-statement breakdown" }),
        msList
      ]));
    }

    // Mark-point breakdown for short/long: re-run the marker on the recorded
    // answer so the student sees which points fired and which didn't.
    if (q && (q.type === "short" || q.type === "long") && typeof a.rawResponse === "string") {
      const rerun = markShortLong(q, a.rawResponse);
      if (rerun.hits && rerun.hits.length) {
        const list = el("ul", { class: "fb-mp fb-mp-hit" });
        rerun.hits.forEach(function (h) { list.appendChild(el("li", null, h)); });
        content.appendChild(el("div", { class: "review-block" }, [
          el("div", { class: "review-h", text: "Mark points hit" }), list
        ]));
      }
      if (rerun.misses && rerun.misses.length) {
        const list = el("ul", { class: "fb-mp fb-mp-miss" });
        rerun.misses.forEach(function (h) { list.appendChild(el("li", null, h)); });
        content.appendChild(el("div", { class: "review-block" }, [
          el("div", { class: "review-h", text: "Mark points missed" }), list
        ]));
      }
    }

    if (q && q.explanation) {
      const body = el("div", { class: "review-body" });
      renderPromptText(q.explanation, body);
      content.appendChild(el("div", { class: "review-block review-model" }, [
        el("div", { class: "review-h", text: "Model answer" }), body
      ]));
    }
    if (q && q.examinerNote) {
      const body = el("div", { class: "review-body" });
      renderPromptText(q.examinerNote, body);
      content.appendChild(el("div", { class: "review-block review-examiner" }, [
        el("div", { class: "review-h", text: "Examiner note" }), body
      ]));
    }

    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
  }

  function closeReview() {
    const overlay = document.getElementById("review-overlay");
    if (!overlay) return;
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
  }

  /* ──────────────────────────────────────────────────────────────────────────
     Phased questions
     ----------------------------------------------------------------------------
     A question can declare a `phases` array; each phase has its own kind
     (mcq/short/long/numeric), prompt, marks, and type-specific fields. The
     student answers them in order. Earlier phases stay visible (collapsed)
     after they're answered. The tool (if any) mounts once at the top and
     persists across phase advances (only the phases container re-renders).
     Per-phase marks roll up into the question's total; per-phase results
     are logged so they can be reviewed later.
     ────────────────────────────────────────────────────────────────────────── */

  function renderPhasedAnswering(card, v) {
    if (v.tool && v.tool.name) {
      if (window.FIELDS_WIDGETS && typeof window.FIELDS_WIDGETS[v.tool.name] === "function") {
        const toolHost = el("div", { class: "tool-host" });
        card.appendChild(toolHost);
        try {
          toolInstance = window.FIELDS_WIDGETS[v.tool.name](toolHost, v.tool.config || {});
        } catch (err) {
          toolHost.innerHTML = "<div class='qbroken'>Tool '" + v.tool.name + "' failed: "
                             + (err && err.message ? err.message : err) + "</div>";
          console.error("Tool mount failed:", err);
        }
      } else {
        card.appendChild(el("div", { class: "qbroken",
          text: "Tool '" + v.tool.name + "' is not registered." }));
      }
    }
    const phasesEl = el("div", { class: "phases", id: "phases-container" });
    card.appendChild(phasesEl);
    renderPhases(v);
  }

  function renderPhases(v) {
    const container = document.getElementById("phases-container");
    if (!container) return;
    container.innerHTML = "";

    v.phases.forEach(function (ph, i) {
      const state = i < phaseIndex ? "done" : (i === phaseIndex ? "active" : "locked");
      const phaseEl = el("div", { class: "phase phase-" + state });

      const hdrChildren = [
        el("span", { class: "phase-num", text: "Part " + (i + 1) + " of " + v.phases.length })
      ];
      if (typeof ph.marks === "number") {
        hdrChildren.push(el("span", { class: "phase-marks",
          text: ph.marks + " " + (ph.marks === 1 ? "mark" : "marks") }));
      }
      if (state === "done") {
        const r = phaseResults[i].result;
        hdrChildren.push(el("span", { class: "phase-score phase-score-" + r.status,
          text: r.marksAwarded + " / " + r.marksPossible }));
      }
      phaseEl.appendChild(el("div", { class: "phase-hdr" }, hdrChildren));

      const promptEl = el("div", { class: "phase-prompt" });
      renderPromptText(ph.prompt, promptEl);
      phaseEl.appendChild(promptEl);

      if (state === "done") {
        phaseEl.appendChild(renderPhaseDoneSummary(ph, phaseResults[i]));
      } else if (state === "active") {
        phaseEl.appendChild(renderPhaseInput(ph, i));
      } else {
        phaseEl.appendChild(el("div", { class: "phase-locked-note",
          text: "Answer the previous parts to unlock this." }));
      }
      container.appendChild(phaseEl);
    });

    if (phaseIndex >= v.phases.length) {
      showPhasedAggregateFeedback(v, container);
    }
  }

  function renderPhaseDoneSummary(ph, pr) {
    const summary = el("div", { class: "phase-done-summary" });
    const r = pr.result;
    if (ph.kind === "mcq") {
      const chose = pr.chosenIndex;
      const correct = r.correctIndex;
      const choseEl = el("span", { class: "phase-done-val" });
      renderPromptText((ph.choices && ph.choices[chose]) || "(no choice)", choseEl);
      summary.appendChild(el("div", { class: "phase-done-row" }, [
        el("span", { class: "phase-done-key", text: "You chose: " }),
        choseEl
      ]));
      if (chose !== correct) {
        const correctEl = el("span", { class: "phase-done-correct" });
        renderPromptText((ph.choices && ph.choices[correct]) || "(?)", correctEl);
        summary.appendChild(el("div", { class: "phase-done-row" }, [
          el("span", { class: "phase-done-key", text: "Correct: " }),
          correctEl
        ]));
      }
    } else if (ph.kind === "multi_select") {
      const msList = el("div", { class: "fb-multi-list phase-multi-list" });
      (r.statementResults || []).forEach(function (sr) {
        const row = el("div", { class: "fb-multi-row fb-multi-" + sr.status });
        const mark = el("span", { class: "fb-multi-mark" });
        if (sr.status === "correct_tick" || sr.status === "correct_skip") mark.textContent = "✓";
        else if (sr.status === "wrong_tick") mark.textContent = "✗";
        else if (sr.status === "missed_true") mark.textContent = "·";
        row.appendChild(mark);
        const body = el("div", { class: "fb-multi-body" });
        const t = el("div", { class: "fb-multi-text" });
        renderPromptText(sr.text || "", t);
        body.appendChild(t);
        const tag = el("div", { class: "fb-multi-tag" });
        if (sr.status === "correct_tick") tag.textContent = "True, and you ticked it.";
        else if (sr.status === "correct_skip") tag.textContent = "False, correctly skipped.";
        else if (sr.status === "wrong_tick") tag.textContent = "False, but you ticked it.";
        else if (sr.status === "missed_true") tag.textContent = "True, but you didn't tick it.";
        body.appendChild(tag);
        if ((sr.status === "wrong_tick" || sr.status === "missed_true") && sr.rationale) {
          const rEl = el("div", { class: "fb-multi-rationale" });
          renderPromptText(sr.rationale, rEl);
          body.appendChild(rEl);
        }
        row.appendChild(body);
        msList.appendChild(row);
      });
      summary.appendChild(msList);
    } else if (ph.kind === "numeric") {
      summary.appendChild(el("div", { class: "phase-done-row" }, [
        el("span", { class: "phase-done-key", text: "Your answer: " }),
        el("span", { class: "phase-done-val", text: pr.raw || "(blank)" })
      ]));
      if (r.status !== "full") {
        const target = (typeof ph.expectedNumeric === "number") ? ph.expectedNumeric : ph.answer;
        if (target != null) {
          const expEl = el("span", { class: "phase-done-correct" });
          expEl.appendChild(document.createTextNode(String(target) + " "));
          if (ph.unitHint) {
            const u = el("span", { class: "fb-unit" }); renderPromptText(ph.unitHint, u); expEl.appendChild(u);
          }
          summary.appendChild(el("div", { class: "phase-done-row" }, [
            el("span", { class: "phase-done-key", text: "Expected: " }),
            expEl
          ]));
        }
      }
    } else {
      summary.appendChild(el("div", { class: "phase-done-row" }, [
        el("span", { class: "phase-done-key", text: "Your answer: " }),
        el("span", { class: "phase-done-val", text: pr.raw || "(blank)" })
      ]));
      if (Array.isArray(r.hits) && r.hits.length) {
        const list = el("ul", { class: "fb-mp fb-mp-hit" });
        r.hits.forEach(function (h) { list.appendChild(el("li", null, h)); });
        summary.appendChild(list);
      }
      if (Array.isArray(r.misses) && r.misses.length) {
        const list = el("ul", { class: "fb-mp fb-mp-miss" });
        r.misses.forEach(function (h) { list.appendChild(el("li", null, h)); });
        summary.appendChild(list);
      }
    }
    // Fired misconceptions for this phase (KaTeX-rendered).
    if (Array.isArray(pr.misconceptions) && pr.misconceptions.length) {
      pr.misconceptions.forEach(function (m) {
        const mEl = el("div", { class: "phase-misconception" });
        const head = el("div", { class: "phase-misconception-head", text: "Likely error" });
        const body = el("div", { class: "phase-misconception-body" });
        renderPromptText(m.label || m.id, body);
        mEl.appendChild(head); mEl.appendChild(body);
        summary.appendChild(mEl);
      });
    }
    return summary;
  }

  function renderPhaseInput(ph, idx) {
    const input = el("div", { class: "qinput phase-input" });
    if (ph.kind === "mcq") {
      const choices = el("div", { class: "qchoices" });
      (ph.choices || []).forEach(function (c, ci) {
        const btn = el("button", { class: "choice", type: "button",
          onClick: function () { submitPhase(idx, { chosenIndex: ci }); } });
        renderPromptText(c, btn);   // KaTeX-aware
        choices.appendChild(btn);
      });
      input.appendChild(choices);
    } else if (ph.kind === "multi_select") {
      const list = el("div", { class: "qmulti", id: "phase-multi-list" });
      (ph.statements || []).forEach(function (s, i) {
        if (!s) return;
        const row = el("label", { class: "ms-row" });
        const cb = el("input", { type: "checkbox", class: "ms-cb",
          "data-ms-idx": String(i), id: "phase-ms-cb-" + idx + "-" + i });
        const txt = el("span", { class: "ms-txt" });
        renderPromptText(s.text || "", txt);
        row.appendChild(cb);
        row.appendChild(txt);
        list.appendChild(row);
      });
      input.appendChild(list);
      input.appendChild(el("button", { class: "btn btn-primary submit-btn",
        text: "Check this part",
        onClick: function () {
          const sel = readMultiSelectChecked(list);
          submitPhase(idx, { selected: sel });
        } }));
    } else if (ph.kind === "long") {
      const ta = el("textarea", { class: "ans-textarea", rows: "3",
        placeholder: "Type your answer…", id: "phase-input" });
      input.appendChild(ta);
      input.appendChild(el("button", { class: "btn btn-primary submit-btn",
        text: "Check this part",
        onClick: function () { submitPhase(idx, { raw: ta.value }); } }));
      ta.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
          e.preventDefault(); submitPhase(idx, { raw: ta.value });
        }
      });
      setTimeout(function () { ta.focus(); }, 30);
    } else if (ph.kind === "numeric") {
      const wrap = el("div", { class: "ans-numwrap" });
      const inp = el("input", { class: "ans-num", type: "text", inputmode: "decimal",
        placeholder: "Number", id: "phase-input" });
      wrap.appendChild(inp);
      if (ph.unitHint) {
        const u = el("span", { class: "ans-unitlabel" });
        renderPromptText(ph.unitHint, u);
        wrap.appendChild(u);
      }
      input.appendChild(wrap);
      input.appendChild(el("button", { class: "btn btn-primary submit-btn",
        text: "Check this part",
        onClick: function () { submitPhase(idx, { raw: inp.value }); } }));
      inp.addEventListener("keydown", function (e) {
        if (e.key === "Enter") { e.preventDefault(); submitPhase(idx, { raw: inp.value }); }
      });
      setTimeout(function () { inp.focus(); }, 30);
    } else {
      const inp = el("input", { class: "ans-text", type: "text",
        placeholder: "Type your answer…", id: "phase-input",
        autocomplete: "off", autocapitalize: "none", spellcheck: "false" });
      input.appendChild(inp);
      input.appendChild(el("button", { class: "btn btn-primary submit-btn",
        text: "Check this part",
        onClick: function () { submitPhase(idx, { raw: inp.value }); } }));
      inp.addEventListener("keydown", function (e) {
        if (e.key === "Enter") { e.preventDefault(); submitPhase(idx, { raw: inp.value }); }
      });
      setTimeout(function () { inp.focus(); }, 30);
    }
    return input;
  }

  function submitPhase(idx, payload) {
    if (idx !== phaseIndex) return;
    const v = current.view;
    const ph = v.phases[idx];
    let result;
    if (ph.kind === "mcq") {
      if (typeof payload.chosenIndex !== "number") return;
      result = markMCQ(ph, payload.chosenIndex);
    } else if (ph.kind === "numeric") {
      if (!payload.raw || !payload.raw.trim()) return;
      result = markNumeric(ph, payload.raw);
    } else if (ph.kind === "multi_select") {
      // Allow submitting with zero selections (the student might genuinely
      // believe no statement is true). The marker handles it.
      result = markMultiSelect(ph, Array.isArray(payload.selected) ? payload.selected : []);
    } else {
      if (!payload.raw || !payload.raw.trim()) return;
      result = markShortLong(ph, payload.raw);
    }
    // Detect misconceptions on this phase. The phase carries its own
    // `misconceptions: [...]` array (independent of the question's). For
    // multi-select phases the misconceptions live on each statement (via
    // ph.statements[i].misconception); detectMisconceptions handles that
    // branch when we pass `selected`. Fired misconceptions are stored
    // per-phase, surfaced in the phase-done summary, and rolled up into the
    // attempt log at the end.
    const fired = detectMisconceptions(ph, {
      rawResponse: payload.raw || null,
      chosenIndex: typeof payload.chosenIndex === "number" ? payload.chosenIndex : null,
      selected: Array.isArray(payload.selected) ? payload.selected : null
    });
    phaseResults[idx] = {
      kind: ph.kind,
      raw: payload.raw || null,
      chosenIndex: typeof payload.chosenIndex === "number" ? payload.chosenIndex : null,
      selected: Array.isArray(payload.selected) ? payload.selected : null,
      result: result,
      misconceptions: fired
    };
    phaseIndex++;
    renderPhases(v);
  }

  function showPhasedAggregateFeedback(v, container) {
    let totalAwarded = 0, totalPossible = 0;
    phaseResults.forEach(function (pr) {
      totalAwarded += pr.result.marksAwarded;
      totalPossible += pr.result.marksPossible;
    });
    const status = (totalAwarded >= totalPossible - 0.001) ? "full"
                 : (totalAwarded > 0.001 ? "partial" : "none");

    const card = document.getElementById("qcard");
    card.classList.add("showing-feedback");
    card.classList.add("fb-" + (status === "full" ? "full" : status === "partial" ? "partial" : "wrong"));

    const tags = Array.isArray(v.tags) ? v.tags.slice() : [];
    const coverageTags = tags.filter(isCoverageTag);
    const parentGroup = coverageTags.length ? parentGroupForSubtag(coverageTags[0]) : null;
    recordAttempt({
      timestamp: new Date().toISOString(),
      questionId: current.question.id,
      instanceId: current.instanceIndex,
      syllabusCode: coverageTags[0] || null,
      subtags: coverageTags,
      parentGroup: parentGroup,
      level: v.level || "SL",
      type: "phased",
      marksAwarded: totalAwarded,
      marksPossible: totalPossible,
      status: status,
      rawResponse: null,
      chosenIndex: null,
      widgetAnswer: null,
      toolState: captureToolState(),
      peekedAt: peekedThisQuestion,
      phaseResults: phaseResults.map(function (pr) {
        return {
          kind: pr.kind,
          marksAwarded: pr.result.marksAwarded,
          marksPossible: pr.result.marksPossible,
          status: pr.result.status,
          raw: pr.raw,
          chosenIndex: pr.chosenIndex,
          misconceptions: Array.isArray(pr.misconceptions) ? pr.misconceptions.map(function (m) { return m.id; }) : []
        };
      }),
      // Roll up all per-phase misconceptions to the attempt level so the
      // error log and sequence aggregations see them.
      misconceptions: phaseResults.reduce(function (acc, pr) {
        if (Array.isArray(pr.misconceptions)) {
          pr.misconceptions.forEach(function (m) { acc.push(m.id); });
        }
        return acc;
      }, [])
    });
    // Mirror each fired misconception (across all phases) into store.errors.
    const ts2 = new Date().toISOString();
    phaseResults.forEach(function (pr) {
      if (!Array.isArray(pr.misconceptions)) return;
      pr.misconceptions.forEach(function (m) {
        store.errors.push({
          timestamp: ts2,
          questionId: current.question.id,
          syllabusCode: coverageTags[0] || null,
          errorId: m.id,
          category: m.category || "other_error",
          label: m.label,
          severity: m.severity || "noted"
        });
      });
    });
    persist();

    const fb = el("div", { class: "fb phase-agg" });
    const scoreLabel = status === "full" ? "Full marks"
                     : status === "partial" ? "Partial credit" : "No marks";
    fb.appendChild(el("div", { class: "fb-score" }, [
      el("span", { class: "fb-score-label", text: scoreLabel }),
      el("span", { class: "fb-score-num",
        text: totalAwarded + " / " + totalPossible + " marks" }),
      peekedThisQuestion
        ? el("span", { class: "fb-peeked-pill",
            title: "Revealed the topic before answering", text: "Peeked" })
        : null
    ]));

    if (Array.isArray(v.tags) && v.tags.length) {
      const tagList = el("div", { class: "fb-tags-list" });
      v.tags.forEach(function (t) {
        if (isCoverageTag(t)) {
          const name = nameForTag(t);
          tagList.appendChild(el("span", { class: "qmeta-tag",
            text: name ? (t + " · " + name) : t }));
        } else if (VOCAB.crossCutting.indexOf(t) !== -1) {
          tagList.appendChild(el("span", { class: "qmeta-tag qmeta-tag-cross", text: t }));
        }
      });
      if (tagList.children.length) {
        fb.appendChild(el("div", { class: "fb-block" }, [
          el("div", { class: "fb-h", text: "Topic" }), tagList
        ]));
      }
    }

    if (v.explanation) {
      const body = el("div", { class: "fb-body" });
      renderPromptText(v.explanation, body);
      fb.appendChild(el("div", { class: "fb-block fb-model" }, [
        el("div", { class: "fb-h", text: "Model answer" }), body
      ]));
    }
    if (v.examinerNote) {
      const body = el("div", { class: "fb-body" });
      renderPromptText(v.examinerNote, body);
      fb.appendChild(el("div", { class: "fb-block fb-examiner" }, [
        el("div", { class: "fb-h", text: "Examiner note" }), body
      ]));
    }

    const nextBtn = el("button", { class: "btn btn-primary next-btn",
      onClick: function () { renderQuestion(); renderCoverage(); renderMistakes(); updateProgressLine(); },
      text: "Next question  →" });
    fb.appendChild(nextBtn);
    container.appendChild(fb);

    phase = "feedback";

    detachPendingNextOnEnter();   // belt-and-braces in case a prior one leaked
    pendingNextOnEnter = function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        detachPendingNextOnEnter();
        nextBtn.click();
      }
    };
    setTimeout(function () {
      if (pendingNextOnEnter) document.addEventListener("keydown", pendingNextOnEnter);
    }, 0);

    requestAnimationFrame(function () {
      setTimeout(function () {
        const scoreEl = fb.querySelector(".fb-score");
        if (!scoreEl) return;
        const rect = scoreEl.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) return;
        const header = document.querySelector(".app-header");
        const headerH = header ? header.getBoundingClientRect().height : 0;
        const targetTop = rect.top + window.scrollY - headerH - 12;
        try { window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" }); }
        catch (e) { window.scrollTo(0, Math.max(0, targetTop)); }
      }, 30);
    });

    renderCoverage();
    renderMistakes();
    updateProgressLine();
    requestAnimationFrame(scrollCoverageToCurrent);
  }

  /* ──────────────────────────────────────────────────────────────────────────
     12. Bootstrap
     ────────────────────────────────────────────────────────────────────────── */

  function init() {
    if (ALL_QUESTIONS.length === 0) {
      const card = document.getElementById("qcard");
      if (card) card.innerHTML = "<div class='qcard-empty'><div class='qcard-empty-h'>No questions loaded.</div>"
        + "<div class='qcard-empty-p'>Make sure topic_d1_gravitation.js is included before engine.js.</div></div>";
      return;
    }
    document.getElementById("settings-btn").addEventListener("click", openSettings);
    document.getElementById("settings-close").addEventListener("click", closeSettings);
    document.getElementById("settings-overlay").addEventListener("click", function (e) {
      if (e.target.id === "settings-overlay") closeSettings();
    });
    document.getElementById("reset-progress").addEventListener("click", resetProgressFlow);
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      const rv = document.getElementById("review-overlay");
      const stg = document.getElementById("settings-overlay");
      const si  = document.getElementById("signin-overlay");
      if (rv && rv.classList.contains("open"))      closeReview();
      else if (stg && stg.classList.contains("open")) closeSettings();
      else if (si && si.classList.contains("open") && isSignedIn()) closeSignIn();
    });
    const reviewOverlay = document.getElementById("review-overlay");
    if (reviewOverlay) reviewOverlay.addEventListener("click", function (e) {
      if (e.target.id === "review-overlay") closeReview();
    });
    document.getElementById("settings-version").textContent = APP_VERSION;

    // Sign-in setup: bind handlers once, then either show the pill (if
    // returning student) or hard-gate with the modal (if first time).
    attachSignInHandlers();
    renderIdentityPill();
    if (!isSignedIn()) openSignIn();

    renderLevelStrip();
    renderFilterBanner();
    renderQuestion();
    renderCoverage();
    renderMistakes();
    updateProgressLine();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  // Dev hooks
  window.SmithicsDev = {
    norm: norm, markShortLong: markShortLong, markMCQ: markMCQ, markNumeric: markNumeric,
    store: function () { return store; }, coverageForSubtag: coverageForSubtag,
    SUBTAG_COUNTS: SUBTAG_COUNTS, VOCAB: VOCAB,
    seedFake: function (n) {
      const ids = Object.keys(SUBTAG_INDEX).filter(function (id) { return SUBTAG_COUNTS[id] > 0; });
      for (let i = 0; i < n; i++) {
        const st = ids[Math.floor(Math.random() * ids.length)];
        const possible = 1 + Math.floor(Math.random() * 3);
        const awarded = Math.floor(Math.random() * (possible + 1));
        store.attempts.push({
          timestamp: new Date(Date.now() - (n - i) * 60000).toISOString(),
          questionId: "fake_" + i, instanceId: null, syllabusCode: st,
          subtags: [st], parentGroup: parentGroupForSubtag(st), type: "numeric",
          marksAwarded: awarded, marksPossible: possible,
          status: statusFromFraction(awarded, possible),
          rawResponse: null, chosenIndex: null, widgetAnswer: null
        });
      }
      persist(); renderCoverage(); updateProgressLine();
    }
  };

})();
