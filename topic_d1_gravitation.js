/* ============================================================================
   D.1 Gravitation question bank — v0.1 starter
   ----------------------------------------------------------------------------
   Sources: question types lifted from the user's "Q type summary from ppqs.txt"
   in the Fields Driller project, which categorises the past-paper question
   types under the new D.1 syllabus headings. Each question is tagged with at
   least one syllabus subtag (D.1.x or D.1.H.x).

   This file defines window.FIELDS_D1_QUESTIONS as a flat array of question
   objects. Schema is the PreIB v0.4 schema extended with the "widget" type.
   ============================================================================ */
window.FIELDS_D1_QUESTIONS = [

  // ── D.1.1-A1: Kepler ratio, period → radius ─────────────────────────────────
  {
    id: "D.1.1-A1.001",
    level: "SL",
    tags: ["D.1.1", "D.1.1-A1"],
    type: "numeric",
    marks: 2,
    prompt: "Planet Y has an orbital period that is twice that of planet X around the same star. The orbital radius of X is R. Find the orbital radius of Y, as a multiple of R, to 3 s.f.",
    expectedNumeric: 1.59,
    tolerance: 0.02,
    unitHint: "× R",
    explanation: "$T^2 \\propto r^3$, so $(T_Y/T_X)^2 = (r_Y/r_X)^3$. With $T_Y/T_X = 2$, $r_Y/r_X = 2^{2/3} = 1.587$.",
    examinerNote: "Common slip: writing $r_Y/r_X = 2^{3/2}$, which inverts the law."
  },

  // ── D.1.1-A3: table of moons style ─────────────────────────────────────────
  {
    id: "D.1.1-A3.001",
    level: "SL",
    tags: ["D.1.1", "D.1.1-A3"],
    type: "numeric",
    marks: 2,
    prompt: "Phobos orbits Mars with period 7.66 h at radius 9376 km. Deimos has period 30.35 h around the same planet. Find the orbital radius of Deimos in km, to 3 s.f.",
    expectedNumeric: 23500,
    tolerance: 200,
    unitHint: "km",
    explanation: "$r_D = r_P \\cdot (T_D/T_P)^{2/3} = 9376 \\cdot (30.35/7.66)^{2/3} \\approx 23{,}460 \\text{ km}$."
  },

  // ── D.1.2-A: state Newton's law in words ───────────────────────────────────
  {
    id: "D.1.2-A1.001",
    level: "SL",
    tags: ["D.1.2", "D.1.2-A1", "definition"],
    type: "short",
    marks: 2,
    prompt: "State Newton's universal law of gravitation in words.",
    markPoints: [
      { any: ["proportional to the product of", "product of the masses",
              "proportional to product", "proportional to m1 m2", "proportional to m_1 m_2",
              "proportional to each of the masses", "proportional to both masses",
              "proportional to the masses", "proportional to both of the masses",
              "proportional to both their masses", "proportional to their masses"], credit: 1 },
      { any: ["inversely proportional to the square", "inverse square of the distance",
              "inversely proportional to r squared", "inversely proportional to r^2",
              "inversely proportional to the square of their separation",
              "inversely proportional to the square of the distance"], credit: 1 }
    ],
    explanation: "The gravitational force between two point masses is proportional to the product of their masses and inversely proportional to the square of the distance between them.\n\nWhen IB marks this in words, the two marks are usually for: (a) recognising the dependence on BOTH masses (whether you say 'product of' or 'each of'), and (b) the inverse-square distance. Many candidates lose a mark by writing 'proportional to mass' (singular) instead of being explicit about both masses, so saying 'proportional to each of the masses' or 'proportional to the product of the masses' both count."
  },

  // ── D.1.2-B1: force scaling ────────────────────────────────────────────────
  {
    id: "D.1.2-B1.001",
    level: "SL",
    tags: ["D.1.2", "D.1.2-B1"],
    type: "numeric",
    marks: 2,
    prompt: "Two point masses experience gravitational force F when separated by distance d. One mass is doubled and the separation is tripled. The new force, in units of F, is:\n\n(Accepts a decimal like 0.5 or a fraction like 1/3.)",
    expectedNumeric: 0.2222,
    tolerance: 0.01,
    unitHint: "× F",
    explanation: "Doubling one mass multiplies F by 2. Tripling distance divides F by 9. New force = 2/9 F ≈ 0.222 F."
  },

  // ── D.1.4-A: definition of g ───────────────────────────────────────────────
  {
    id: "D.1.4-A1.001",
    level: "SL",
    tags: ["D.1.4", "D.1.4-A1", "definition"],
    type: "short",
    marks: 2,
    prompt: "Define gravitational field strength at a point.",
    markPoints: [
      { any: ["force per unit mass", "force on unit mass", "force divided by mass"], credit: 1 },
      { any: ["test mass", "small mass", "point mass"], credit: 1 }
    ],
    explanation: "Gravitational field strength is the force per unit mass on a small test mass placed at that point."
  },

  // ── D.1.4-D2: same density, different radius ───────────────────────────────
  {
    id: "D.1.4-D2.001",
    level: "SL",
    tags: ["D.1.4", "D.1.4-D2"],
    type: "mcq",
    marks: 1,
    prompt: "Two planets are made of the same density material. Planet B has twice the radius of planet A. The surface gravitational field strength on B compared with on A is:",
    choices: ["½ ×", "1 ×", "2 ×", "4 ×"],
    answerIndex: 2,
    distractorRationales: {
      "0": "You've used $g \\propto 1/R^2$ but forgotten the mass also scales.",
      "1": "Independent of R would be wrong — the field does depend on the source.",
      "3": "Probably $M \\propto R^3$ but missing the $1/R^2$ in g, so you've doubled twice."
    },
    explanation: "Step 1: at constant density, mass scales with volume, so $M \\propto R^3$ (since $M = \\rho \\cdot \\tfrac{4}{3}\\pi R^3$).\nStep 2: the surface field strength is $g = GM/R^2$.\nStep 3: substitute the proportionality. $g \\propto M / R^2 \\propto R^3 / R^2 = R$.\nSo doubling $R$ doubles $g$: $g_B = 2\\,g_A$."
  },

  // ── D.1.5-B1: field-line spacing ──────────────────────────────────────────
  {
    id: "D.1.5-B1.001",
    level: "SL",
    tags: ["D.1.5", "D.1.5-B1"],
    type: "mcq",
    marks: 1,
    prompt: "Far from a planet, the gravitational field lines (drawn as arrows) become further apart. This is because:",
    choices: [
      "the planet's gravitational pull strengthens at distance",
      "the field strength decreases with distance",
      "the field reverses direction at distance",
      "field lines repel each other"
    ],
    answerIndex: 1,
    explanation: "Line density represents field strength. Spreading out means the field is weaker."
  },

  // ── D.1.H.3-A1: define potential ───────────────────────────────────────────
  {
    id: "D.1.H.3-A1.001",
    level: "HL",
    tags: ["D.1.H.3", "D.1.H.3-A1", "definition"],
    type: "short",
    marks: 2,
    prompt: "Define gravitational potential at a point.",
    markPoints: [
      { any: ["work done per unit mass", "work per unit mass", "work done bringing unit mass"], credit: 1 },
      { any: ["from infinity", "from a point at infinity"], credit: 1 }
    ],
    explanation: "Gravitational potential at a point is the work done per unit mass in bringing a small test mass from infinity to that point. It is negative for a bound system; potential is taken as zero at infinity."
  },

  // ── D.1.H.8-C2: variables for escape speed ─────────────────────────────────
  {
    id: "D.1.H.8-C2.001",
    level: "HL",
    tags: ["D.1.H.8", "D.1.H.8-C2"],
    type: "mcq",
    marks: 1,
    prompt: "Which of the following affects the escape speed from the surface of a planet?",
    choices: [
      "the mass of the escaping rocket",
      "only the planet's mass",
      "only the planet's radius",
      "both the planet's mass and radius"
    ],
    answerIndex: 3,
    explanation: "$v_{esc} = \\sqrt{2GM/R}$. The rocket's mass cancels."
  },

  // ── D.1.H.4-A1: read g from gradient of V vs r (tool + numeric) ────────────
  {
    id: "D.1.H.4-A1.001",
    level: "HL",
    tags: ["D.1.H.4", "D.1.H.4-A1", "graph_read"],
    type: "numeric",
    marks: 2,
    prompt: "The graph below shows gravitational potential V against r outside a planet. Use it to find the magnitude of the gravitational field strength $g$ at $r = 7.0 \\times 10^6$ m, to 3 s.f.",
    tool: {
      name: "curve_probe",
      config: {
        curve: "V_radial",
        M: 5.97e24,
        domain: [6.4e6, 4.0e7],
        initialR: "random",
        showArea: false,
        xLabel: "r", xUnits: "m",
        yLabel: "V", yUnits: "J kg⁻¹"
      }
    },
    expectedNumeric: 8.13,
    tolerance: 0.4,
    unitHint: "N kg⁻¹",
    explanation: "g(r) = GM/r² at r = 7.0 × 10⁶ m and M = 5.97 × 10²⁴ kg gives 8.13 N kg⁻¹. The gradient dV/dr at that point reads +8.13 (J kg⁻¹/m), and g = -dV/dr, so the magnitude matches.",
    examinerNote: "Common slips: reading V instead of dV/dr (V is the potential itself, not the field); reading the area under the V-r curve (it has no direct physical meaning); forgetting to drag the probe to the target r."
  },

  // ── D.1.H.3-C: read V at a chosen r (tool + numeric) ──────────────────────
  {
    id: "D.1.H.3-C1.001",
    level: "HL",
    tags: ["D.1.H.3", "D.1.H.3-C1", "graph_read"],
    type: "numeric",
    marks: 1,
    prompt: "Use the V-r graph below to read off the gravitational potential V at r = 1.5 × 10⁷ m. Give your answer in J kg⁻¹ to 3 s.f.\n\n(The graph shows V outside a planet of mass 5.97 × 10²⁴ kg.)",
    tool: {
      name: "curve_probe",
      config: {
        curve: "V_radial",
        M: 5.97e24,
        domain: [6.4e6, 4.0e7],
        initialR: "random",
        showArea: false,
        xLabel: "r", xUnits: "m",
        yLabel: "V", yUnits: "J kg⁻¹"
      }
    },
    expectedNumeric: -2.66e7,
    tolerance: 4e5,
    misconceptions: [
      {
        id: "missed_negative_sign",
        label: "You submitted the positive magnitude. Gravitational potential is negative for a bound system — V is defined as zero at infinity, so it's negative everywhere closer.",
        expectedNumeric: 2.66e7,
        tolerance: 4e5,
        severity: "common"
      }
    ],
    unitHint: "J kg⁻¹",
    explanation: "V = -GM/r = -(6.674e-11)(5.97e24)/(1.5e7) = -2.66 × 10⁷ J kg⁻¹. Read directly from the V readout in the widget."
  },

  // ── D.1.H.2-A1: Ep from V + a given mass (compound read + multiply) ───────
  {
    id: "D.1.H.2-A1.001",
    level: "HL",
    tags: ["D.1.H.2", "D.1.H.2-A1", "D.1.H.3-C1", "graph_read"],
    type: "numeric",
    marks: 2,
    prompt: "A 1500 kg satellite is in orbit at $r = 1.0 \\times 10^7$ m above the centre of a planet of mass $5.97 \\times 10^{24}$ kg. The graph shows V against r. Find the gravitational potential energy $E_p$ of the satellite, to 3 s.f., in J.",
    tool: {
      name: "curve_probe",
      config: {
        curve: "V_radial",
        M: 5.97e24,
        domain: [6.4e6, 4.0e7],
        initialR: "random",
        showArea: false,
        xLabel: "r", xUnits: "m",
        yLabel: "V", yUnits: "J kg⁻¹"
      }
    },
    expectedNumeric: -5.98e10,
    tolerance: 6e8,
    unitHint: "J",
    explanation: "At r = 1.0 × 10⁷ m, V = -GM/r ≈ -3.98 × 10⁷ J kg⁻¹. Ep = mV = 1500 × (-3.98 × 10⁷) ≈ -5.98 × 10¹⁰ J. Negative because the satellite is bound.",
    examinerNote: "Two atoms in this question: D.1.H.3-C (read V from the graph) and D.1.H.2-A (combine with mass to get Ep). The widget gives you V; you do the multiplication."
  },

  // ── D.1.H.5-A1: work done moving between two orbits (two-probe ΔV) ───────
  {
    id: "D.1.H.5-A1.001",
    level: "HL",
    tags: ["D.1.H.5", "D.1.H.5-A1", "graph_read"],
    type: "numeric",
    marks: 2,
    prompt: "A $1500$ kg mass is slowly lifted from $r_1 = 1.0 \\times 10^7$ m to $r_2 = 2.0 \\times 10^7$ m (both measured from the planet's centre). Assume it has no kinetic energy at either end — this is a pure static-energy calculation, not an orbital transfer. Find the work that must be done by an external agent. Give your answer as a positive number to 3 s.f., in J.",
    tool: {
      name: "curve_probe",
      config: {
        curve: "V_radial",
        M: 5.97e24,
        domain: [6.4e6, 4.0e7],
        initialR: "random",
        showArea: true,
        xLabel: "r", xUnits: "m",
        yLabel: "V", yUnits: "J kg⁻¹"
      }
    },
    expectedNumeric: 2.99e10,
    tolerance: 3e9,
    unitHint: "J",
    misconceptions: [
      {
        id: "confused_V_with_W",
        label: "You submitted ΔV directly (a number around 2 × 10⁷ J kg⁻¹). That's the potential difference, not the work. To get work, multiply by the mass: W = mΔV.",
        expectedNumeric: 1.992e7,
        tolerance: 1e6,
        severity: "common"
      },
      {
        id: "submitted_single_V_not_delta",
        label: "Looks like you submitted V at one of the points (around 2 × 10⁷ or 4 × 10⁷ J kg⁻¹), not the difference ΔV. Work depends on the change in potential, not its value at a single point.",
        expectedNumeric: 3.984e7,
        tolerance: 2e6,
        severity: "noted"
      }
    ],
    explanation: "Read V at the two probes: V(1e7) ≈ -3.98 × 10⁷, V(2e7) ≈ -1.99 × 10⁷. ΔV = +1.99 × 10⁷ J kg⁻¹. W = mΔV = 1500 × 1.99 × 10⁷ ≈ 2.99 × 10¹⁰ J. Positive because the external agent does work against gravity.",
    examinerNote: "Two traps in this question. (1) Confusing V (per unit mass) with W (total) is the dominant error — students read 2×10⁷ off the graph and submit it without multiplying by the mass. (2) The 'Area' readout is a red herring — the area under V-r isn't a meaningful physical quantity. The right readout is ΔV (the difference between the two V values), times the mass."
  },

  // ── D.1.4-E1: find zero-field point along Earth-Moon line ─────────────────
  // Custom curve with a probe-style readout. Student drags to find where |g|≈0,
  // then types the corresponding x.
  {
    id: "D.1.4-E1.001",
    level: "SL",
    tags: ["D.1.4", "D.1.4-E1", "graph_read"],
    type: "numeric",
    marks: 2,
    prompt: "The graph below shows the magnitude of the resultant gravitational field along the Earth-Moon line as a function of distance $x$ from Earth's centre (Earth-Moon separation = $3.84 \\times 10^8$ m). Drag the probe along the graph until you find the point where the resultant field is zero. Type that distance $x$ in metres, to 2 s.f.\n\n(Decimals, scientific notation, and standard form are all accepted.)",
    tool: {
      name: "curve_probe",
      config: {
        curve: "two_mass_along_line",
        M1: 5.97e24, xM1: 0,
        M2: 7.34e22, xM2: 3.84e8,
        lineMode: "magnitude",
        domain: [3.0e7, 3.7e8],   // skip the singularities at Earth & Moon centres
        initialR: "random",
        showArea: false,
        xLabel: "x", xUnits: "m",
        yLabel: "|g|", yUnits: "N kg⁻¹"
      }
    },
    expectedNumeric: 3.5e8,
    tolerance: 1.5e7,
    unitHint: "m",
    explanation: "Setting the two contributions equal in magnitude: $GM_E/x^2 = GM_M/(D-x)^2$.\nRearranging gives $x/(D-x) = \\sqrt{M_E/M_M}$, so $x = D\\,\\sqrt{M_E}/(\\sqrt{M_E} + \\sqrt{M_M}) \\approx 3.46 \\times 10^8$ m. That's about 90% of the way to the Moon, because Earth is roughly 81 times more massive than the Moon.",
    examinerNote: "The widget computes $|g_{\\text{net},x}| = |GM_E/x^2 - GM_M/(D-x)^2|$ from the physics, so the curve is smooth. The dip approaches zero at the equilibrium x and rises again as the Moon's pull begins to dominate."
  },

  // ── D.1.4-E4: net force on a test mass at a NON-zero point ────────────────
  // Same Earth-Moon line, but g1 and g2 are shown as separate dashed curves
  // alongside the net. The student must read both contributions and combine
  // them with a mass to get a force.
  {
    id: "D.1.4-E4.001",
    level: "SL",
    tags: ["D.1.4", "D.1.4-E4", "graph_read"],
    type: "numeric",
    marks: 2,
    prompt: "A test mass of $100$ kg is placed at $x = 2.0 \\times 10^8$ m along the Earth-Moon line. The graph shows the gravitational field due to Earth ($M_1$) and the Moon ($M_2$) separately, as well as their net magnitude. Find the magnitude of the net gravitational force on the test mass, in N, to 3 s.f.",
    tool: {
      name: "curve_probe",
      config: {
        curve: "two_mass_along_line",
        M1: 5.97e24, xM1: 0,
        M2: 7.34e22, xM2: 3.84e8,
        lineMode: "magnitude",
        showSeparateContributions: true,
        domain: [5.0e7, 3.7e8],
        initialR: "random",
        xLabel: "x", xUnits: "m",
        yLabel: "|g|", yUnits: "N kg⁻¹"
      }
    },
    expectedNumeric: 0.981,
    tolerance: 0.05,
    unitHint: "N",
    explanation: "Step 1: read off the contributions at $x = 2.0 \\times 10^8$ m.\n$g_1 = GM_E/x^2 = (6.674 \\times 10^{-11})(5.97 \\times 10^{24})/(4.0 \\times 10^{16}) \\approx 9.96 \\times 10^{-3}$ N kg⁻¹ (toward Earth).\n$g_2 = GM_M/(D-x)^2$ with $D - x = 1.84 \\times 10^8$ m: $g_2 \\approx 1.45 \\times 10^{-4}$ N kg⁻¹ (toward the Moon).\nStep 2: take the net. They point in opposite directions, so $|g_{\\text{net}}| = g_1 - g_2 \\approx 9.81 \\times 10^{-3}$ N kg⁻¹.\nStep 3: multiply by the test mass. $F = m\\,g_{\\text{net}} = 100 \\times 9.81 \\times 10^{-3} \\approx 0.981$ N.",
    examinerNote: "Common slips: adding $g_1$ and $g_2$ as if they pointed the same way (gives a slightly bigger answer); reading the dashed contributions but forgetting which way each points; forgetting to multiply by the test mass (gives an answer in N kg⁻¹, not N)."
  },

  // ── D.1.4-E3: signed-x variant. Net field changes sign across the line,
  //  so the student MUST get the sign right. The widget plots the signed
  //  g_x with g1 (always negative for x>0) and g2 (always positive for x<D)
  //  as separate dashed curves, and the net crossing zero at the equilibrium.
  {
    id: "D.1.4-E3.001",
    level: "SL",
    tags: ["D.1.4", "D.1.4-E3", "graph_read"],
    type: "numeric",
    marks: 2,
    prompt: "A 100 kg test mass is at $x = 3.0 \\times 10^8$ m along the Earth-Moon line. The graph shows the **signed** x-component of the gravitational field, with the contributions from Earth ($g_{1x}$) and Moon ($g_{2x}$) drawn separately. Sign convention: positive $g_x$ points in $+x$ (toward the Moon), negative points in $-x$ (toward Earth).\n\nFind the signed net gravitational force on the test mass, in newtons, to 3 s.f. Include the sign.",
    tool: {
      name: "curve_probe",
      config: {
        curve: "two_mass_along_line",
        M1: 5.97e24, xM1: 0,
        M2: 7.34e22, xM2: 3.84e8,
        lineMode: "signed_x",
        showSeparateContributions: true,
        domain: [1.0e8, 3.7e8],
        initialR: "random",
        xLabel: "x", xUnits: "m",
        yLabel: "g_x", yUnits: "N kg⁻¹"
      }
    },
    expectedNumeric: -0.373,
    tolerance: 0.02,
    unitHint: "N",
    misconceptions: [
      {
        id: "magnitude_when_signed_expected",
        label: "Right magnitude, wrong sign. The prompt asked for a signed answer with $+x$ pointing toward the Moon. At this $x$, Earth still dominates, so the force is in $-x$ (negative).",
        expectedNumeric: 0.373,
        tolerance: 0.02,
        severity: "common"
      }
    ],
    explanation: "Step 1: read each contribution at $x = 3.0 \\times 10^8$ m.\nEarth: $g_{1x} = -GM_E/x^2 \\approx -4.43 \\times 10^{-3}$ N kg⁻¹ (negative because Earth pulls toward $-x$).\nMoon: $g_{2x} = +GM_M/(D-x)^2 \\approx +6.95 \\times 10^{-4}$ N kg⁻¹ (positive because the Moon pulls toward $+x$).\nStep 2: net. $g_x = g_{1x} + g_{2x} \\approx -3.73 \\times 10^{-3}$ N kg⁻¹.\nStep 3: $F_x = mg_x = 100 \\times (-3.73 \\times 10^{-3}) \\approx -0.373$ N.\nNegative because at $x = 3.0 \\times 10^8$ m we haven't yet crossed the equilibrium near $x = 3.46 \\times 10^8$ m, so the Earth's pull still dominates.",
    examinerNote: "The signed answer is the point of this question. If you read the magnitude correctly but dropped the sign, IB markschemes typically deduct one mark — and this Driller's marker is strict, so 'positive' answers are rejected outright. Move the probe past $x \\approx 3.46 \\times 10^8$ m and watch the net curve cross zero into positive territory: that's where the Moon takes over."
  },

  // ── D.1.H.6-A1: single-mass equipotentials ───────────────────────────────
  {
    id: "D.1.H.6-A1.001",
    level: "HL",
    tags: ["D.1.H.6", "D.1.H.6-A1", "graph_read"],
    type: "numeric",
    marks: 1,
    prompt: "The map below shows equipotential contours around a 5.97 × 10²⁴ kg planet at the origin. The contour values are in J kg⁻¹. Drag the test point to (x, y) = (1.0 × 10⁷, 0). Read off V to 3 s.f. and submit it.",
    tool: {
      name: "field_map",
      config: {
        bodies: [ { x: 0, y: 0, mass: 5.97e24, label: "M" } ],
        domain: { x: [-3e7, 3e7], y: [-2e7, 2e7] },
        contourLevels: [-1.6e8, -1e8, -7e7, -5e7, -3.5e7, -2.5e7, -1.8e7, -1.3e7],
        initialX: "random",
        initialY: "random",
        showFieldArrow: true,
        xLabel: "x", xUnits: "m",
        yLabel: "y", yUnits: "m"
      }
    },
    expectedNumeric: -3.98e7,
    tolerance: 1e6,
    unitHint: "J kg⁻¹",
    misconceptions: [
      {
        id: "missed_negative_sign",
        label: "You submitted the positive magnitude. Gravitational potential is negative for a bound system — taking V to be zero at infinity makes V < 0 anywhere closer.",
        expectedNumeric: 3.984e7,
        tolerance: 1e6,
        severity: "common"
      }
    ],
    explanation: "V = -GM/r where r = √(x² + y²). At (1.0×10⁷, 0), r = 1.0×10⁷ m, so V = -(6.674e-11)(5.97e24)/(1e7) ≈ -3.98×10⁷ J kg⁻¹.",
    examinerNote: "The equipotentials around a single point mass are concentric circles. The contour values are unequally spaced in radius (because V ∝ -1/r): doubling r halves |V|, so the contours bunch up close to the mass."
  },

  // ── D.1.H.6-B1: two equal masses, recognise the pattern (find V at midpoint)
  {
    id: "D.1.H.6-B1.001",
    level: "HL",
    tags: ["D.1.H.6", "D.1.H.6-B1", "graph_read"],
    type: "numeric",
    marks: 2,
    prompt: "Two identical point masses of 5.0 × 10²⁴ kg sit at (-1.5 × 10⁷, 0) and (+1.5 × 10⁷, 0). The map shows their combined equipotentials. Drag the test point to the midpoint (0, 0) and read off V there. Submit to 3 s.f.",
    tool: {
      name: "field_map",
      config: {
        bodies: [
          { x: -1.5e7, y: 0, mass: 5.0e24, label: "M₁" },
          { x:  1.5e7, y: 0, mass: 5.0e24, label: "M₂" }
        ],
        domain: { x: [-4e7, 4e7], y: [-2.5e7, 2.5e7] },
        contourLevels: [-8e7, -6e7, -4.5e7, -3.5e7, -2.7e7, -2e7, -1.4e7],
        initialX: "random",
        initialY: "random",
        showFieldArrow: true,
        xLabel: "x", xUnits: "m",
        yLabel: "y", yUnits: "m"
      }
    },
    expectedNumeric: -4.45e7,
    tolerance: 1e6,
    unitHint: "J kg⁻¹",
    explanation: "At (0,0), each mass is r = 1.5×10⁷ m away. V = -GM/r contributed by each, summed: V = -2 × (6.674e-11)(5.0e24)/(1.5e7) = -2 × 2.22×10⁷ ≈ -4.45×10⁷ J kg⁻¹.",
    examinerNote: "Potential is a scalar: just add the contributions. The two-mass equipotential pattern is peanut-shaped close to the masses and approximately circular far away (where the two masses act like a single mass at the centre)."
  },

  // ── D.1.H.7-B1: where does the released mass accelerate? ──────────────────
  // Two unequal masses; release at a point, ask for the sign of g_x (which way)
  {
    id: "D.1.H.7-B1.001",
    level: "HL",
    tags: ["D.1.H.7", "D.1.H.7-B1", "graph_read"],
    type: "numeric",
    marks: 2,
    prompt: "Two masses sit on the x-axis: M₁ = 5.97×10²⁴ kg at (-2.0 × 10⁸, 0), M₂ = 7.34×10²² kg at (+2.0 × 10⁸, 0). A test mass is released from rest at (0, 0). Use the widget to read |g| at (0, 0). Submit the magnitude of g to 3 s.f.",
    tool: {
      name: "field_map",
      config: {
        bodies: [
          { x: -2.0e8, y: 0, mass: 5.97e24, label: "M₁" },
          { x:  2.0e8, y: 0, mass: 7.34e22, label: "M₂" }
        ],
        domain: { x: [-3e8, 3e8], y: [-1.8e8, 1.8e8] },
        contourLevels: [-3.5e6, -2.5e6, -1.8e6, -1.4e6, -1.1e6, -9e5, -7.5e5],
        initialX: 0,
        initialY: 0,
        showFieldArrow: true,
        xLabel: "x", xUnits: "m",
        yLabel: "y", yUnits: "m"
      }
    },
    expectedNumeric: 9.84e-3,
    tolerance: 7e-4,
    unitHint: "N kg⁻¹",
    explanation: "|g| at the origin = |GM₁/r₁² - GM₂/r₂²| where r₁ = r₂ = 2×10⁸ m. GM₁/r² = (6.674e-11)(5.97e24)/(4e16) = 9.96×10⁻³, GM₂/r² = (6.674e-11)(7.34e22)/(4e16) = 1.22×10⁻⁴. Net = 9.84×10⁻³ N kg⁻¹, directed toward M₁ (negative x).",
    examinerNote: "The 'released-from-rest direction' question really asks two things: which direction does g point, and (sometimes) how big is it. The widget shows the arrow on the test point — note it points toward the larger mass, M₁."
  },

  // ── D.1.1-A2: Kepler ratio, radius → period ───────────────────────────────
  {
    id: "D.1.1-A2.001",
    level: "SL",
    tags: ["D.1.1", "D.1.1-A2"],
    type: "numeric",
    marks: 2,
    prompt: "Two planets orbit the same star. The orbital radius of planet Y is three times that of planet X. Find the ratio $T_Y/T_X$ to 3 s.f.",
    expectedNumeric: 5.20,
    tolerance: 0.03,
    unitHint: "× T_X",
    explanation: "$T^2 \\propto r^3$, so $T_Y/T_X = (r_Y/r_X)^{3/2} = 3^{3/2} = 3\\sqrt{3} \\approx 5.196$.",
    examinerNote: "If you got 1.732 you took $\\sqrt{3}$ — that's $T^{1/2}$ versus $r$, the wrong way round. If you got 27, you used $r^3$ directly without halving the exponent. The Kepler relation is $T \\propto r^{3/2}$, not $T \\propto r^3$."
  },

  // ── D.1.1-B1: select correct algebraic form of Kepler's third law ─────────
  {
    id: "D.1.1-B1.001",
    level: "SL",
    tags: ["D.1.1", "D.1.1-B1"],
    type: "mcq",
    marks: 1,
    prompt: "A planet of mass $m$ moves in a circular orbit of radius $r$ around a star of mass $M$, with period $T$. Which of the following expressions for $T^2$ is correct?",
    choices: [
      "T² = 4π²r³ / (GM)",
      "T² = 4π²r² / (GM)",
      "T  = 4π²r³ / (GM)",
      "T² = GM / (4π²r³)"
    ],
    answerIndex: 0,
    distractorRationales: {
      "1": "You probably wrote v² = 4π²r/T² instead of 4π²r²/T². The substitution v = 2πr/T gives v² = 4π²r²/T², so when you equate to GM/r you pick up an r³, not r².",
      "2": "You forgot to square the period. After equating gravity to centripetal force and substituting v = 2πr/T, both sides have T² — don't lose the square in the rearrangement.",
      "3": "You've inverted the equation. The constant on the right is 4π²/(GM), with GM in the denominator, so larger central mass means a shorter period for the same r — consistent with stronger gravity producing faster orbits."
    },
    explanation: "Equate gravity to centripetal force: $\\dfrac{GMm}{r^2} = \\dfrac{mv^2}{r}$, so $v^2 = \\dfrac{GM}{r}$.\n\nSubstitute $v = \\dfrac{2\\pi r}{T}$: $\\dfrac{4\\pi^2 r^2}{T^2} = \\dfrac{GM}{r}$, hence $T^2 = \\dfrac{4\\pi^2 r^3}{GM}$.\n\nNote that the orbiting mass $m$ cancels — Kepler's third law doesn't depend on the orbiting body. This is also why every satellite at a given $r$ around the same central mass has the same period."
  },

  // ── D.1.1-B2: derive T² ∝ r³ (PHASED) ─────────────────────────────────────
  {
    id: "D.1.1-B2.PHASED.001",
    level: "SL",
    tags: ["D.1.1", "D.1.1-B2"],
    marks: 3,
    prompt: "A planet of mass $m$ moves in a circular orbit of radius $r$ around a star of mass $M$, with orbital period $T$. Work through the derivation that establishes $T^2 \\propto r^3$.",
    phases: [
      {
        kind: "mcq",
        marks: 1,
        prompt: "What is the correct force-balance equation for the planet in circular orbit?",
        choices: [
          "$\\dfrac{GMm}{r^2} = \\dfrac{mv^2}{r}$",
          "$\\dfrac{GMm}{r^2} = mg$",
          "$\\dfrac{GMm}{r} = mv^2$",
          "$\\dfrac{GMm}{r^2} = mv$"
        ],
        answerIndex: 0,
        distractorRationales: {
          "1": "$mg$ is the weight near a surface — doesn't apply to orbital motion. The force needed for a circular orbit is centripetal, $mv^2/r$, not $mg$.",
          "2": "Lost a factor of $r$ in the gravity term. Gravity is $GMm/r^2$ (inverse-square), not $GMm/r$.",
          "3": "Lost the square in the centripetal term. Centripetal acceleration is $v^2/r$, not $v/r$."
        }
      },
      {
        kind: "mcq",
        marks: 1,
        prompt: "The orbital speed $v$ can be written in terms of $r$ and $T$ using the circumference of the orbit. Which substitution is correct?",
        choices: [
          "$v = 2\\pi r T$",
          "$v = \\dfrac{2\\pi r}{T}$",
          "$v = \\dfrac{r}{2\\pi T}$",
          "$v = 2\\pi r^2 / T$"
        ],
        answerIndex: 1,
        distractorRationales: {
          "0": "Wrong functional form. Speed should DECREASE if the period is longer (slower orbit). $v = 2\\pi r T$ would mean faster speed for longer periods, which is backwards.",
          "2": "Inverted. The distance travelled in one period is $2\\pi r$ (the circumference), so $v = $ distance/time = $2\\pi r / T$, not $r/(2\\pi T)$.",
          "3": "Inserted an extra factor of $r$. The circumference is $2\\pi r$, not $2\\pi r^2$."
        }
      },
      {
        kind: "mcq",
        marks: 1,
        prompt: "Substituting $v = 2\\pi r/T$ into the force balance and rearranging, what is $T^2$ proportional to?",
        choices: [
          "$T^2 \\propto r$",
          "$T^2 \\propto r^2$",
          "$T^2 \\propto r^3$",
          "$T^2 \\propto 1/r$"
        ],
        answerIndex: 2,
        distractorRationales: {
          "0": "Lost a factor of $r^2$ in the rearrangement.",
          "1": "Lost a factor of $r$. The force balance has $r^2$ in the denominator on the left and $r$ in the denominator on the right; after substitution $v^2 = 4\\pi^2 r^2/T^2$, you get $T^2 = 4\\pi^2 r^3/(GM)$.",
          "3": "Wrong direction. Bigger orbits have LONGER periods, not shorter. $T$ grows with $r$."
        }
      }
    ],
    explanation: "Three discrete steps:\n\nStep 1: gravity provides the centripetal force.\n$\\dfrac{GMm}{r^2} = \\dfrac{mv^2}{r}$\nso $v^2 = \\dfrac{GM}{r}$.\n\nStep 2: $v = \\dfrac{2\\pi r}{T}$, so $v^2 = \\dfrac{4\\pi^2 r^2}{T^2}$.\n\nStep 3: equate and rearrange.\n$\\dfrac{4\\pi^2 r^2}{T^2} = \\dfrac{GM}{r}$, hence $T^2 = \\dfrac{4\\pi^2}{GM}\\,r^3$. So $T^2 \\propto r^3$.",
    examinerNote: "Phased version of the canonical Kepler-3 derivation. Each phase tests one step; per-phase ✓/✗ tells the student exactly which step they fumbled.",
    sourcePack: "Refactored from long to phased per v2 brief rule 3."
  },

  // ── D.1.2-C1: calculate F between two masses ──────────────────────────────
  {
    id: "D.1.2-C1.001",
    level: "SL",
    tags: ["D.1.2", "D.1.2-C1"],
    type: "numeric",
    marks: 2,
    prompt: "Calculate the magnitude of the gravitational force between Earth (mass $5.97 \\times 10^{24}$ kg) and Mars (mass $6.42 \\times 10^{23}$ kg) when their centres are separated by $7.83 \\times 10^{10}$ m. Give your answer in newtons to 3 s.f.\n\n$G = 6.674 \\times 10^{-11}$ N m² kg⁻².",
    expectedNumeric: 4.17e16,
    tolerance: 6e13,
    unitHint: "N",
    explanation: "$F = \\dfrac{Gm_1m_2}{r^2} = \\dfrac{(6.674\\times10^{-11})(5.97\\times10^{24})(6.42\\times10^{23})}{(7.83\\times10^{10})^2} \\approx 4.17 \\times 10^{16}$ N.\n\nThis is the force at one snapshot of Mars's elliptical orbit; the actual force varies over the year as the separation changes.",
    examinerNote: "Common slips: forgetting to square the distance (gives $\\sim 3.3 \\times 10^{27}$ N, absurd); using radius instead of centre-to-centre separation; forgetting one of the masses. The exponent in the final answer is a fast sanity check: G ≈ 10⁻¹⁰, the masses multiply to ≈ 10⁴⁸, the distance squared is ≈ 10²¹, so F ≈ 10⁻¹⁰ × 10⁴⁸ / 10²¹ = 10¹⁷."
  },

  // ── D.1.3-A1: why we can treat bodies as point masses ────────────────────
  {
    id: "D.1.3-A1.001",
    level: "SL",
    tags: ["D.1.3", "D.1.3-A1"],
    type: "multi_select",
    marks: 4,
    prompt: "When we compute the gravitational force between two planets using $F = Gm_1m_2/r^2$, we treat each planet as a single point mass at its centre. Which of the following conditions are sufficient to justify this treatment? Tick all that apply.",
    statements: [
      { text: "The sizes of the bodies are negligible compared with the separation between their centres.",
        correct: true,
        rationale: "When the bodies look small from each other's perspective, the angular extent each subtends at the other is negligible — and the point-mass approximation works well." },
      { text: "Each body has spherical symmetry (concentric shells of uniform density).",
        correct: true,
        rationale: "By the shell theorem, the EXTERNAL field of any spherically symmetric mass distribution is identical to a point mass at its centre. So spherical symmetry alone is sufficient even for nearby spherical bodies." },
      { text: "The two bodies are far apart in absolute terms.",
        correct: false,
        rationale: "What matters is the RELATIVE size — separation compared with body size — not the absolute distance. Two galaxies are far apart in absolute terms but extended; two contacting marbles are close but small relative to their separation. The latter case is fine for point-mass treatment.",
        misconception: "absolute_vs_relative_distance" },
      { text: "Both bodies have the same density.",
        correct: false,
        rationale: "Same-density is irrelevant. The relevant material property is spherical symmetry, which is independent of how dense the body is.",
        misconception: "irrelevant_property_invoked" },
      { text: "The bodies are not rotating.",
        correct: false,
        rationale: "Rotation can deform a body (oblateness), which would break spherical symmetry — but rotation per se is not the condition. Earth rotates and is slightly oblate; for D.1 purposes we still treat Earth as a point mass.",
        misconception: "rotation_red_herring" }
    ],
    explanation: "Two sufficient conditions for treating an extended body as a point mass at its centre:\n\n• Sizes are small compared with separation (angular size negligible).\n• Spherical symmetry (the shell theorem makes the external field identical to a centred point mass).\n\nEither alone is sufficient. Both Earth and the Sun satisfy BOTH — they're approximately spherical, AND much smaller than the AU separation. The point-mass approximation in Newton's law is excellent for them.",
    examinerNote: "Note: the conditions are SUFFICIENT, not necessary. Two bodies in contact could still be treated as point masses if they're both spherical (e.g., two contacting marbles). The shell theorem is doing the heavy lifting.",
    sourcePack: "Refactored from short to multi_select per v2 brief rule 3."
  },

  // ── D.1.3-A2: MCQ on the point-mass condition ────────────────────────────
  {
    id: "D.1.3-A2.001",
    level: "SL",
    tags: ["D.1.3", "D.1.3-A2"],
    type: "mcq",
    marks: 1,
    prompt: "Which scenario most clearly cannot be modelled by treating the two bodies as point masses in Newton's law of gravitation?",
    choices: [
      "Earth and the Sun, separated by 1 AU",
      "A satellite of radius 5 m orbiting Earth at altitude 400 km",
      "Two galaxies separated by 10 million light-years",
      "Two contacting asteroids, each of radius 500 m"
    ],
    answerIndex: 3,
    distractorRationales: {
      "0": "Earth's radius and the Sun's radius are both << 1 AU, so the separation is much greater than the body sizes. Treating both as point masses is excellent here.",
      "1": "The satellite is tiny (5 m) compared with the centre-to-centre distance (~6.8 × 10⁶ m). Point-mass works fine, even though the satellite is close to a large body — the satellite being small is what matters for it.",
      "2": "Galaxies are extended objects, but at 10 million light-years separation the angular size each subtends at the other is negligible. Even though galaxies aren't spherically symmetric, the separation makes point-mass an excellent approximation."
    },
    explanation: "Two asteroids in contact have separation equal to the sum of their radii. The 'point mass at the centre' approximation requires the bodies to be small compared with their separation, or to be spherically symmetric (so the shell theorem applies). For irregular touching asteroids, neither condition holds, so the gravitational interaction depends on the actual mass distribution — not just the centre-to-centre distance. The other three scenarios all satisfy 'separation >> body size'.",
    examinerNote: "The trap is option (1) — students see 'close to Earth' and assume that defeats the point-mass model. But the relevant size is the satellite's size (5 m), not Earth's; and that is tiny compared with the orbit radius. Whether you can treat each body as a point depends on each body individually."
  },

  // ── D.1.4-C2: g above the surface (numeric, h = 800 km) ──────────────────
  {
    id: "D.1.4-C2.001",
    level: "SL",
    tags: ["D.1.4", "D.1.4-C2"],
    type: "numeric",
    marks: 2,
    prompt: "Earth has mass $M = 5.97 \\times 10^{24}$ kg and radius $R = 6.37 \\times 10^6$ m. Calculate the magnitude of the gravitational field strength $g$ at an altitude of 800 km above Earth's surface. Give your answer in N kg⁻¹ to 3 s.f.\n\n$G = 6.674 \\times 10^{-11}$ N m² kg⁻².",
    expectedNumeric: 7.75,
    tolerance: 0.05,
    unitHint: "N kg⁻¹",
    misconceptions: [
      {
        id: "radius_offset_forgotten",
        label: "Used $h$ instead of $r = R + h$. The gravitational field formula needs distance from Earth's centre, not altitude above the surface.",
        expectedNumeric: 622,
        tolerance: 5,
        severity: "common"
      }
    ],
    explanation: "$g = \\dfrac{GM}{(R+h)^2} = \\dfrac{(6.674\\times10^{-11})(5.97\\times10^{24})}{(6.37\\times10^6 + 8.00\\times10^5)^2} = \\dfrac{3.98\\times10^{14}}{(7.17\\times10^6)^2} \\approx 7.75$ N kg⁻¹.\n\nA reasonable cross-check: $g \\propto 1/r^2$, and the new $r$ is $(7.17/6.37) \\approx 1.126$ times the Earth radius, so $g$ drops by a factor of $1.126^2 \\approx 1.27$. From 9.81 N kg⁻¹ at the surface, that gives $\\approx 7.74$ N kg⁻¹.",
    examinerNote: "Common error: using $h$ (the altitude) instead of $R + h$ (centre-to-centre). At $h = 800$ km that gives $g \\approx 622$ N kg⁻¹ — obviously wrong, but easy to spot only if you sanity-check the magnitude. Always use distance from the centre, never height above the surface."
  },

  // ── D.1.4-C2: g at altitude h = R (MCQ, ratio form) ──────────────────────
  {
    id: "D.1.4-C2.002",
    level: "SL",
    tags: ["D.1.4", "D.1.4-C2"],
    type: "mcq",
    marks: 1,
    prompt: "An astronaut is at an altitude above Earth's surface equal to one Earth radius. The gravitational field strength at this altitude, expressed as a fraction of the surface value, is:",
    choices: [
      "1/2",
      "1/3",
      "1/4",
      "1/9"
    ],
    answerIndex: 2,
    distractorRationales: {
      "0": "You've used $g \\propto 1/r$, but $g = GM/r^2$ depends on the inverse square of $r$, not on $r$ itself.",
      "1": "You may have written $r = R + h$ as $3R$ in the denominator. Altitude equal to one Earth radius gives $r = 2R$, not $3R$.",
      "3": "You've used $r = 3R$ (treating altitude $h = R$ as a third radius rather than a second). $r$ is the centre-to-centre distance, so when $h = R$, $r = R + R = 2R$."
    },
    explanation: "At altitude $h = R$ above the surface, the centre-to-centre distance is $r = R + h = 2R$. So $g/g_{\\text{surface}} = (R/(2R))^2 = 1/4$.\n\nAt that altitude $g \\approx 9.81 / 4 \\approx 2.45$ N kg⁻¹."
  },

  // ── D.1.4-F1: deduce g from time to fall a known distance ──────────────
  {
    id: "D.1.4-F1.001",
    level: "SL",
    tags: ["D.1.4", "D.1.4-F1"],
    type: "numeric",
    marks: 2,
    prompt: "A small ball is released from rest near the surface of planet X. It falls 2.40 m in 1.50 s. Calculate the magnitude of the gravitational field strength at the surface of planet X. Give your answer in N kg⁻¹ to 3 s.f.\n\nAssume the field is uniform over the fall and that air resistance is negligible.",
    expectedNumeric: 2.13,
    tolerance: 0.02,
    unitHint: "N kg⁻¹",
    misconceptions: [
      {
        id: "forgot_factor_half",
        label: "Used $g = d/t^2$. The kinematic formula from rest is $d = \\tfrac{1}{2}gt^2$, so $g = 2d/t^2$. You're missing the factor of 2.",
        expectedNumeric: 1.067,
        tolerance: 0.02,
        severity: "common"
      }
    ],
    explanation: "An object released from rest with initial acceleration $g$ falls a distance $d = \\tfrac{1}{2}gt^2$. Rearranging: $g = 2d/t^2 = 2(2.40)/(1.50)^2 = 4.80/2.25 \\approx 2.13$ N kg⁻¹.\n\nThis is about the same gravitational field strength as on Mars (3.71 N kg⁻¹) or a slightly smaller body. The numerical equivalence between $g$ as 'field strength' (N kg⁻¹) and $g$ as 'free-fall acceleration' (m s⁻²) is exactly what you used here.",
    examinerNote: "Common slips: writing $g = d/t^2$ (forgetting the factor of 2); writing $g = d/t$ (treating it as constant velocity); using $d = gt^2$ (forgetting the half). The half comes from integrating $v = gt$ over time. Always start from $d = \\tfrac{1}{2}gt^2$ and rearrange."
  },

  // ── D.1.H.3-E1: add potentials at a point between two masses ─────────────
  {
    id: "D.1.H.3-E1.001",
    level: "HL",
    tags: ["D.1.H.3", "D.1.H.3-E1"],
    type: "numeric",
    marks: 2,
    prompt: "Jupiter (mass $1.898 \\times 10^{27}$ kg) and its moon Io (mass $8.93 \\times 10^{22}$ kg) are separated by $4.22 \\times 10^8$ m, centre to centre. Calculate the gravitational potential at the midpoint of the line joining their centres, in J kg⁻¹, to 3 s.f.\n\n$G = 6.674 \\times 10^{-11}$ N m² kg⁻². Treat both as point masses.",
    expectedNumeric: -6.00e8,
    tolerance: 1e7,
    unitHint: "J kg⁻¹",
    misconceptions: [
      {
        id: "missed_negative_sign",
        label: "Right magnitude, wrong sign. Gravitational potential is negative for any bound system (zero is taken at infinity).",
        expectedNumeric: 6.00e8,
        tolerance: 1e7,
        severity: "common"
      }
    ],
    explanation: "Potential is a scalar, so the contributions add directly. At the midpoint each body is at distance $r = 2.11 \\times 10^8$ m.\n\n$V = -\\dfrac{GM_J}{r} - \\dfrac{GM_{Io}}{r} = -\\dfrac{G}{r}(M_J + M_{Io}) = -\\dfrac{(6.674\\times10^{-11})(1.898\\times10^{27} + 8.93\\times10^{22})}{2.11\\times10^8}$.\n\nThe Io contribution is $\\sim 2 \\times 10^4$ J kg⁻¹, negligible against Jupiter's $\\sim 6 \\times 10^8$ J kg⁻¹. So $V \\approx -6.00 \\times 10^8$ J kg⁻¹.",
    examinerNote: "Common slips: trying to add the two potentials as vectors (potential is a scalar, just a number); using the full separation $D = 4.22 \\times 10^8$ m as the distance to each mass instead of half of it. Also: don't forget the negative sign — bound systems have negative potential."
  },

  // ── D.1.H.7-A1: field ⊥ equipotentials (PHASED) ─────────────────────────
  {
    id: "D.1.H.7-A1.PHASED.001",
    level: "HL",
    tags: ["D.1.H.7", "D.1.H.7-A1"],
    marks: 2,
    prompt: "Gravitational field lines and gravitational equipotential surfaces have a specific geometric relationship to each other. Work through the statement and its justification.",
    phases: [
      {
        kind: "mcq",
        marks: 1,
        prompt: "What is the geometric relationship between a gravitational field line and the equipotential surfaces it crosses?",
        choices: [
          "Parallel",
          "Perpendicular",
          "Unrelated geometrically",
          "At $45°$"
        ],
        answerIndex: 1,
        distractorRationales: {
          "0": "Parallel would mean moving ALONG a field line keeps you on the same equipotential. But moving along a field line is moving in the direction of strongest potential change — exactly the opposite.",
          "2": "They're tightly linked geometrically. Each set of curves determines the other.",
          "3": "Not a natural angle. The relationship is exact, not partial: 90°."
        }
      },
      {
        kind: "mcq",
        marks: 1,
        prompt: "Which is the BEST one-line justification for that geometric relationship, using the definition of work done by a gravitational force?",
        choices: [
          "Field lines are perpendicular to equipotentials by convention; no physics reason is needed.",
          "Moving along an equipotential gives $\\Delta V = 0$, so $W = m\\Delta V = 0$. Since $W = \\vec F \\cdot \\vec s$ and the displacement is non-zero, the force (along the field line) must be perpendicular to the displacement.",
          "The shell theorem requires it.",
          "Gravity always points toward the centre of mass, which is always perpendicular."
        ],
        answerIndex: 1,
        distractorRationales: {
          "0": "It's a derived consequence, not a convention. There's a real physics reason.",
          "2": "The shell theorem is about external fields of spherical mass distributions. It's not what establishes the field-equipotential perpendicularity (which holds for any geometry).",
          "3": "True for a single point mass, but field lines being perpendicular to equipotentials holds generally — for example in a two-mass system, the equipotentials are not concentric with either mass and the field doesn't 'point to the centre'. The right justification is energy-based."
        }
      }
    ],
    explanation: "Gravitational field lines are perpendicular (normal) to equipotential surfaces at every point.\n\nJustification: along an equipotential $\\Delta V = 0$, so $W = m\\Delta V = 0$. Since $W = \\vec F \\cdot \\vec s$ and $|\\vec s| \\neq 0$, the gravitational force (and therefore the field) must have zero component along the equipotential. That means the field is perpendicular to the equipotential.",
    examinerNote: "Phase 1 tests the geometric statement (definition-style). Phase 2 tests the energy-based justification. Splitting them lets the engine diagnose whether the student knows the FACT but not the REASON.",
    sourcePack: "Refactored from short to phased per v2 brief rule 3."
  },

  // ── D.1.H.7-A1: MCQ on the relationship ──────────────────────────────────
  {
    id: "D.1.H.7-A1.002",
    level: "HL",
    tags: ["D.1.H.7", "D.1.H.7-A1"],
    type: "mcq",
    marks: 1,
    prompt: "At a point P that lies on a gravitational equipotential surface, the local gravitational field vector $\\vec g$ is best described as:",
    choices: [
      "tangent to the equipotential surface at P",
      "perpendicular to the equipotential surface at P, pointing toward more negative potential",
      "perpendicular to the equipotential surface at P, pointing toward less negative potential",
      "parallel to the equipotential surface at P and pointing toward the body's centre"
    ],
    answerIndex: 1,
    distractorRationales: {
      "0": "If $\\vec g$ were tangent to the surface, moving along the surface would do work, contradicting $\\Delta V = 0$ on an equipotential.",
      "2": "Right that $\\vec g$ is perpendicular, but $\\vec g$ points toward decreasing (more negative) potential, not increasing. This is the direction in which a released mass accelerates: 'downhill' in V, i.e. toward more negative V.",
      "3": "$\\vec g$ does point toward the body for a single mass, but it's the perpendicularity to the equipotential that pins down the direction in general. In a multi-mass field, $\\vec g$ may not point toward any single body's centre — but it is always perpendicular to the local equipotential."
    },
    explanation: "$\\vec g$ is perpendicular to the equipotential because no work is done moving along an equipotential, so the force has no component along the surface.\n\nThe direction along the perpendicular is from less negative to more negative V (equivalently: from higher V to lower V, since V ≤ 0 for bound systems and zero at infinity). This is the direction a released mass accelerates — the system's potential energy decreases as the mass moves to more negative V."
  },

  // ── D.1.H.8-B1: escape speed from v_esc = √(2GM/R) (Mars) ────────────────
  {
    id: "D.1.H.8-B1.001",
    level: "HL",
    tags: ["D.1.H.8", "D.1.H.8-B1"],
    type: "numeric",
    marks: 2,
    prompt: "Mars has mass $6.42 \\times 10^{23}$ kg and radius $3.39 \\times 10^6$ m. Calculate the escape speed from the surface of Mars, in m s⁻¹, to 3 s.f.\n\n$G = 6.674 \\times 10^{-11}$ N m² kg⁻². The mass of the escaping rocket may be ignored.",
    expectedNumeric: 5030,
    tolerance: 30,
    unitHint: "m s⁻¹",
    misconceptions: [
      {
        id: "confused_v_orb_with_v_esc",
        label: "Used $v = \\sqrt{GM/R}$ — that's orbital speed at the surface, not escape speed. Escape needs the factor of 2: $v_{\\text{esc}} = \\sqrt{2GM/R}$.",
        expectedNumeric: 3554,
        tolerance: 20,
        severity: "common"
      }
    ],
    explanation: "$v_{\\text{esc}} = \\sqrt{\\dfrac{2GM}{R}} = \\sqrt{\\dfrac{2(6.674\\times10^{-11})(6.42\\times10^{23})}{3.39\\times10^6}} \\approx 5.03 \\times 10^3$ m s⁻¹.\n\nNote $v_{\\text{esc}}$ does not depend on the rocket's mass — the $m$ in the energy balance $\\tfrac{1}{2}mv^2 = GMm/R$ cancels. This is why a 1-kg rock and a 100-tonne rocket need exactly the same speed to escape.",
    examinerNote: "Common slips: forgetting the factor of 2 (gives orbital speed at the surface, $\\sim 3.55$ km/s — too small); using diameter instead of radius (gives $\\sim 3.55$ km/s by coincidence); using Earth's radius by mistake. Sanity check: Mars escape ($\\sim 5$ km/s) should be less than Earth ($\\sim 11.2$ km/s) since Mars is lighter."
  },

  // ── D.1.H.8-B2: escape speed via v_esc = √(2gR) (Earth) ──────────────────
  {
    id: "D.1.H.8-B2.001",
    level: "HL",
    tags: ["D.1.H.8", "D.1.H.8-B2"],
    type: "numeric",
    marks: 2,
    prompt: "Earth has surface gravitational field strength $g = 9.81$ N kg⁻¹ and radius $R = 6.37 \\times 10^6$ m. Calculate the escape speed from the surface of Earth, in m s⁻¹, to 3 s.f.\n\nThe mass of Earth and $G$ are not given.",
    hints: [
      "Escape speed depends on the central body's mass and radius. You have the radius. You don't have $M$ — what's the relationship between $g$ at the surface, $G$, $M$, and $R$ that lets you substitute?",
      "$g = GM/R^2$ at the surface, so $GM = gR^2$. Substitute that into the escape-speed expression.",
      "$v_{\\text{esc}} = \\sqrt{2GM/R} = \\sqrt{2gR^2/R} = \\sqrt{2gR}$. Plug in."
    ],
    expectedNumeric: 11200,
    tolerance: 50,
    unitHint: "m s⁻¹",
    explanation: "Start from $v_{\\text{esc}} = \\sqrt{2GM/R}$ and use $g = GM/R^2 \\Rightarrow GM = gR^2$. Substituting:\n\n$v_{\\text{esc}} = \\sqrt{2gR^2/R} = \\sqrt{2gR} = \\sqrt{2(9.81)(6.37\\times10^6)} \\approx 1.12 \\times 10^4$ m s⁻¹.\n\nThis form is useful when $g$ and $R$ are easier to obtain than $M$.",
    examinerNote: "The point of this question is the link $GM = gR^2$. Many students reach for $G$ and $M$ even when only $g$ and $R$ are given. Watch for: using just $\\sqrt{gR}$ (no factor of 2); using $\\sqrt{gR^2}$ or $\\sqrt{2g/R}$ (wrong substitution); plugging in $R = 6.37$ km by missing the $10^6$."
  },

  // ── D.1.H.9-A1: derive orbital speed v = √(GM/r) (PHASED) ────────────────
  {
    id: "D.1.H.9-A1.PHASED.001",
    level: "HL",
    tags: ["D.1.H.9", "D.1.H.9-A1"],
    marks: 3,
    prompt: "A satellite of mass $m$ moves in a circular orbit of radius $r$ around a planet of mass $M$. Work through the derivation of the orbital speed $v$.",
    phases: [
      {
        kind: "mcq",
        marks: 1,
        prompt: "Which equation correctly expresses the force balance for the satellite in its circular orbit?",
        choices: [
          "$\\dfrac{GMm}{r^2} = \\dfrac{mv^2}{r}$",
          "$\\dfrac{GMm}{r^2} = \\dfrac{m^2 v}{r}$",
          "$\\dfrac{GMm}{r} = mv^2$",
          "$GMm = \\dfrac{mv^2}{r}$"
        ],
        answerIndex: 0,
        distractorRationales: {
          "1": "Centripetal force is $mv^2/r$, not $m^2 v/r$. The satellite's mass appears once (in $m$), and the speed appears squared (from $a = v^2/r$).",
          "2": "Lost the $r^2$ in the gravity term. The inverse-square law gives $GMm/r^2$, not $GMm/r$.",
          "3": "Lost the $r^2$ in gravity AND kept $r$ on the right. Two errors compounding."
        }
      },
      {
        kind: "mcq",
        marks: 1,
        prompt: "After cancelling $m$ from both sides of the force balance, what does $v^2$ equal?",
        choices: [
          "$v^2 = GMm/r$",
          "$v^2 = GM/r$",
          "$v^2 = GM/r^2$",
          "$v^2 = GMm/r^2$"
        ],
        answerIndex: 1,
        distractorRationales: {
          "0": "$m$ should have cancelled. The satellite's mass appears on both sides of the force balance, so it drops out.",
          "2": "Kept $r^2$ in the denominator. After cancelling $r$ from both sides (gravity has $r^2$, centripetal has $r$), only ONE factor of $r$ remains in the denominator.",
          "3": "Neither $m$ nor one factor of $r$ cancelled. The result should have $GM/r$, not $GMm/r^2$."
        }
      },
      {
        kind: "mcq",
        marks: 1,
        prompt: "Therefore the orbital speed $v$ is:",
        choices: [
          "$v = GM/r$",
          "$v = \\sqrt{GM/r}$",
          "$v = GM/\\sqrt{r}$",
          "$v = \\sqrt{GMm/r}$"
        ],
        answerIndex: 1,
        distractorRationales: {
          "0": "Forgot the square root. $v^2 = GM/r$, so $v$ is the square root of that, not $GM/r$ itself.",
          "2": "Took the square root of $r$ only, not the whole expression. Should be $\\sqrt{GM/r}$, not $GM/\\sqrt{r}$.",
          "3": "Kept the satellite mass $m$, which had already cancelled in the previous phase."
        }
      }
    ],
    explanation: "Three steps:\n\nStep 1: gravity provides centripetal force. $\\dfrac{GMm}{r^2} = \\dfrac{mv^2}{r}$.\n\nStep 2: cancel $m$ and one factor of $r$. $v^2 = \\dfrac{GM}{r}$.\n\nStep 3: take the square root. $v = \\sqrt{\\dfrac{GM}{r}}$.\n\nThe orbiting body's mass $m$ cancels — every satellite at the same $r$ around the same central body orbits at the same speed, regardless of its own mass.",
    examinerNote: "Phased version replaces the substring-matched 'long' derivation. Three MCQ phases drill the three discrete algebraic steps; each phase tells the student which step they got right or wrong.",
    sourcePack: "Refactored from long to phased per v2 brief rule 3."
  },

  // ── D.1.H.9-A3: numerical orbital speed at LEO ───────────────────────────
  {
    id: "D.1.H.9-A3.001",
    level: "HL",
    tags: ["D.1.H.9", "D.1.H.9-A3"],
    type: "numeric",
    marks: 2,
    prompt: "A satellite is in a circular orbit at altitude 800 km above Earth's surface. Earth has mass $M = 5.97 \\times 10^{24}$ kg and radius $R = 6.37 \\times 10^6$ m. Calculate the orbital speed of the satellite in m s⁻¹, to 3 s.f.\n\n$G = 6.674 \\times 10^{-11}$ N m² kg⁻².",
    expectedNumeric: 7460,
    tolerance: 30,
    unitHint: "m s⁻¹",
    misconceptions: [
      {
        id: "confused_v_orb_with_v_esc",
        label: "Used $\\sqrt{2GM/r}$ — that's escape speed at this radius, not orbital. Orbital speed is $\\sqrt{GM/r}$, smaller by $\\sqrt{2}$.",
        expectedNumeric: 10542,
        tolerance: 40,
        severity: "common"
      },
      {
        id: "radius_offset_forgotten",
        label: "Used $h$ instead of $r = R + h$ in $v = \\sqrt{GM/r}$. Use the centre-to-centre distance.",
        expectedNumeric: 22326,
        tolerance: 100,
        severity: "common"
      }
    ],
    explanation: "Orbit radius $r = R + h = 6.37 \\times 10^6 + 8.00 \\times 10^5 = 7.17 \\times 10^6$ m.\n\n$v = \\sqrt{\\dfrac{GM}{r}} = \\sqrt{\\dfrac{(6.674\\times10^{-11})(5.97\\times10^{24})}{7.17\\times10^6}} \\approx 7.45 \\times 10^3$ m s⁻¹ $\\approx 7.45$ km s⁻¹.\n\nThe orbital period is $T = 2\\pi r/v \\approx 6040$ s, about 101 minutes — typical for low Earth orbit.",
    examinerNote: "Common slips: using $h$ instead of $r = R + h$ (gives an absurdly large speed); using $\\sqrt{2GM/r}$ — that's the escape speed at this radius, $\\sim 10.5$ km/s, exactly $\\sqrt{2}$ times the orbital speed; forgetting that 800 km = $8\\times10^5$ m. Sanity: any LEO speed should be in the 7–8 km/s ballpark."
  },

  // ── D.1.H.10-A1: drag paradox (PHASED) ──────────────────────────────────
  {
    id: "D.1.H.10-A1.PHASED.001",
    level: "HL",
    tags: ["D.1.H.10", "D.1.H.10-A1"],
    marks: 4,
    prompt: "A satellite in low Earth orbit passes through the very thin upper atmosphere and experiences a small viscous drag force. Over many orbits the satellite is observed to speed UP.",
    phases: [
      {
        kind: "mcq",
        marks: 1,
        prompt: "What does the drag force do to the satellite's total mechanical energy $E$ over time?",
        choices: [
          "$E$ stays constant.",
          "$E$ increases (becomes less negative).",
          "$E$ decreases (becomes more negative).",
          "$E$ remains zero throughout."
        ],
        answerIndex: 2,
        distractorRationales: {
          "0": "Drag is a dissipative force, not a conservative one. It removes energy from the satellite-plus-atmosphere system as heat. $E$ is not conserved here.",
          "1": "Wrong direction. Drag REMOVES energy from the satellite; it doesn't add it. The atmosphere isn't pushing the satellite forward.",
          "3": "Bound orbits have $E < 0$, not $E = 0$. $E = 0$ would mean the satellite has just enough energy to escape; orbits are bound and have $E < 0$ throughout."
        }
      },
      {
        kind: "mcq",
        marks: 1,
        prompt: "Given that the satellite's total energy decreases over time, what happens to its orbital radius $r$? (Recall: for a circular orbit, $E = -GMm/(2r)$.)",
        choices: [
          "$r$ increases.",
          "$r$ decreases.",
          "$r$ stays constant.",
          "$r$ first decreases, then increases as the satellite stabilises."
        ],
        answerIndex: 1,
        distractorRationales: {
          "0": "Wrong direction. The relation $E = -GMm/(2r)$ means smaller $r$ gives more negative $E$. So as $E$ falls, $r$ falls.",
          "2": "If $E$ depended only on speed, this would work. But $E$ depends on $r$ too (and on $r$ alone for circular orbits). Energy change → radius change.",
          "3": "Drag doesn't have a stable equilibrium orbit. The decay continues all the way down to re-entry."
        }
      },
      {
        kind: "mcq",
        marks: 1,
        prompt: "Given that the orbital radius decreases, what happens to the orbital speed $v$? (Recall: for a circular orbit, $v = \\sqrt{GM/r}$.)",
        choices: [
          "$v$ decreases.",
          "$v$ stays the same.",
          "$v$ increases.",
          "$v$ is undefined."
        ],
        answerIndex: 2,
        distractorRationales: {
          "0": "The intuitive answer, but wrong. Drag does decelerate the satellite locally at each point, but the net effect over many orbits is to drop into a lower orbit whose required speed is HIGHER. The lower orbit's faster speed wins.",
          "1": "Equilibrium would require no net energy change, which would require no drag. Drag exists, so the system isn't in equilibrium.",
          "3": "The orbit stays approximately circular as it shrinks (small drag, slow decay). It's not 'broken'."
        },
        misconceptions: [
          { id: "drag_decelerates_in_orbit",
            chosenIndex: 0,
            label: "You treated drag like friction on the ground — opposing motion, so slowing it. In orbit the rule is different: drag → energy out → smaller r → faster orbital speed." }
        ]
      },
      {
        kind: "mcq",
        marks: 1,
        prompt: "Which is the BEST one-line summary of the chain that resolves the paradox?",
        choices: [
          "Drag stops the satellite from escaping, so it speeds up to maintain orbit.",
          "Drag removes mechanical energy; this forces a smaller orbit, whose required speed (set by $v = \\sqrt{GM/r}$) is higher.",
          "Drag transfers KE into PE, which then converts back to faster KE.",
          "Drag is too small to slow the satellite, but it warms up the atmosphere."
        ],
        answerIndex: 1,
        distractorRationales: {
          "0": "'Stops escape' isn't relevant. The satellite isn't trying to escape; it's in orbit.",
          "2": "PE doesn't 'convert back' into KE; both go DOWN in magnitude as the orbit shrinks, but PE drops by more, which is why total E goes down. The net of all that is captured by 'smaller r, higher v'.",
          "3": "Drag IS too small to slow the satellite, but that's not because the atmosphere absorbs it 'instead'. The right resolution is the chain in option 1."
        }
      }
    ],
    explanation: "The paradox: drag opposes motion at each instant, yet over many orbits the satellite speeds up. Resolution in three steps:\n\n1. Drag does negative work → satellite's total mechanical energy $E$ decreases (becomes more negative).\n2. For a circular orbit, $E = -GMm/(2r)$. More negative $E$ means smaller $r$.\n3. For a circular orbit, $v = \\sqrt{GM/r}$. Smaller $r$ means larger $v$.\n\nNet: drag → energy out → smaller orbit → higher speed.\n\nWhere does the extra KE come from? The drop in $r$ liberates potential energy — $\\Delta E_p < 0$ — and that drop is bigger than what drag removes, so KE rises by the difference.",
    examinerNote: "Four phases of diagnostic feedback. A student who passes phases 1 and 2 but fails phase 3 has the energy logic but stumbles on the (intuitively wrong) speed direction — the most important misconception to surface. A student who passes phase 4 (summary) without passing phase 3 may have memorised the result without understanding the chain.",
    sourcePack: "Refactored from long to phased per v2 brief rule 3."
  },

  // ── D.1.H.10-A3: MCQ on the drag paradox ─────────────────────────────────
  {
    id: "D.1.H.10-A3.001",
    level: "HL",
    tags: ["D.1.H.10", "D.1.H.10-A3"],
    type: "mcq",
    marks: 1,
    prompt: "A satellite in a low circular orbit experiences a small viscous drag over many orbits. Over time, the orbital radius and orbital speed of the satellite respectively:",
    choices: [
      "decrease, decrease",
      "decrease, increase",
      "increase, decrease",
      "increase, increase"
    ],
    answerIndex: 1,
    distractorRationales: {
      "0": "Intuitively reasonable — drag opposes motion, so why wouldn't speed drop? But the orbit drops too, and the lower orbit's required orbital speed (set by gravity = centripetal) is higher than the original. Net effect: speed up.",
      "2": "Drag removes energy, not adds it. Total mechanical energy $E = -GMm/(2r)$ becomes more negative as energy is lost, which requires smaller $r$ — orbit shrinks, not expands.",
      "3": "Would require drag to add energy to the satellite — but drag does negative work and removes mechanical energy. Orbit shrinks."
    },
    explanation: "Drag does negative work, so total mechanical energy $E = -GMm/(2r)$ decreases (becomes more negative). For $E$ to become more negative, $r$ must decrease.\n\nAt the new smaller $r$, orbital speed $v = \\sqrt{GM/r}$ is higher. So $r$ decreases and $v$ increases — the paradox of drag-induced speed-up.\n\nThis is why the International Space Station periodically needs reboosts: atmospheric drag slowly lowers its orbit (and makes it faster), so engines must fire to push it back up to a higher, slower orbit."
  },

  // ── D.1.1-A3.PHASED.001: phased Kepler question ───────────────────────────
  // Demonstrates the phased-question architecture: choose method first,
  // then calculate, then justify. Each phase scored independently.
  {
    id: "D.1.1-A3.PHASED.001",
    level: "SL",
    tags: ["D.1.1", "D.1.1-A3"],
    marks: 4,
    prompt: "Phobos orbits Mars with period 7.66 h at orbital radius 9376 km. Deimos orbits the same planet with period 30.35 h. Find Deimos's orbital radius.",
    phases: [
      {
        kind: "mcq",
        marks: 1,
        prompt: "Which approach handles this in the fewest steps?",
        choices: [
          "Apply Kepler's third law as a ratio of $T$ and $r$ between the two moons",
          "Use $F = GMm/r^2$ and solve for $r$ directly from Mars's mass",
          "Use $v_{\\text{orbital}} = \\sqrt{GM/r}$ with the given periods",
          "I'm not sure — show me"
        ],
        answerIndex: 0,
        distractorRationales: {
          "1": "Possible if you know Mars's mass, but the question doesn't give it. Going through the ratio of two moons cancels it out and is cleaner.",
          "2": "Would work, but again needs Mars's mass and is more roundabout than the ratio.",
          "3": "Fine to use this if stuck — but the right approach is the Kepler ratio."
        }
      },
      {
        kind: "numeric",
        marks: 2,
        prompt: "Apply $T^2/r^3 = $ constant. Calculate $r_{\\text{Deimos}}$ to 3 s.f.",
        expectedNumeric: 23460,
        tolerance: 200,
        unitHint: "km"
      },
      {
        kind: "short",
        marks: 1,
        prompt: "In a sentence: why does the ratio $T^2/r^3$ have the same value for both moons?",
        markPoints: [
          { any: ["gravity provides the centripetal", "gravitational force is the centripetal",
                  "gravity is the centripetal force", "gravitational force provides",
                  "same central mass", "same parent planet", "both orbit mars",
                  "$T^2/r^3 = 4\\pi^2/GM$", "T squared over r cubed equals 4 pi squared over GM",
                  "constant for any object orbiting the same body"], credit: 1 }
        ]
      }
    ],
    explanation: "Kepler's third law follows from gravity providing the centripetal force for a circular orbit: $GMm/r^2 = m\\omega^2 r$, with $\\omega = 2\\pi/T$. Rearranging gives $T^2 = (4\\pi^2/GM) r^3$, so $T^2/r^3$ depends only on the central mass.\n\nFor Mars's two moons: $(T_D/T_P)^2 = (r_D/r_P)^3$, so $r_D = r_P\\,(T_D/T_P)^{2/3} = 9376 \\times (30.35/7.66)^{2/3} \\approx 23\\,460$ km.",
    examinerNote: "The phased version separates 'pick the method' from 'do the calculation' from 'know why it works.' Each is its own mark. In a real IB markscheme, these would also be discrete markpoints — the calculation alone doesn't get full marks if you can't justify why the law applies."
  },

  // ════════════════════════════════════════════════════════════════════════
  // Batch 4 — Kepler's first and second laws (D.1.1-C, D.1.1-D). New
  // syllabus content, mostly "[plausible]" in the past-paper taxonomy.
  // ════════════════════════════════════════════════════════════════════════

  // ── D.1.1-C1: state Kepler's first law (MCQ) ─────────────────────────────
  {
    id: "D.1.1-C1.001",
    level: "SL",
    tags: ["D.1.1", "D.1.1-C1", "definition"],
    type: "mcq",
    marks: 1,
    prompt: "Kepler's first law of planetary motion states that:",
    choices: [
      "every planet has a circular orbit centred on the Sun",
      "every planet moves in an ellipse with the Sun at one focus",
      "the period squared of a planet's orbit is proportional to the cube of its orbital radius",
      "every planet sweeps out equal areas in equal times"
    ],
    answerIndex: 1,
    distractorRationales: {
      "0": "Circular orbits are a special case of ellipses (zero eccentricity), not the law itself. Kepler's first law allows for ellipses of any eccentricity.",
      "2": "That's Kepler's third law.",
      "3": "That's Kepler's second law."
    },
    explanation: "Kepler's first law: planets move in elliptical orbits, with the Sun at one of the two foci (not the centre). The other focus is empty; it's a geometrical reference point only.\n\nEarth's orbit has an eccentricity of about 0.017, which is very close to circular but not exactly so. Mercury's eccentricity is about 0.21 (more obviously elliptical), and comet orbits can have eccentricities approaching 1 (highly elongated).",
    examinerNote: "Caveat: Kepler's first law is new syllabus content and isn't represented in older D.1 past papers. Probably unlikely to appear in this MCQ form on a real IB paper, though it could appear as part of a longer question. If you got it wrong because you haven't seen it tested, don't worry — it isn't the most-tested atom under D.1.1.",
    sourcePack: "original (plausible — new syllabus)"
  },

  // ── D.1.1-C2: Sun at focus, not centre (MCQ) ─────────────────────────────
  {
    id: "D.1.1-C2.001",
    level: "SL",
    tags: ["D.1.1", "D.1.1-C2"],
    type: "mcq",
    marks: 1,
    prompt: "For an elliptical planetary orbit, the position of the Sun is at:",
    choices: [
      "the centre of the ellipse",
      "the point of closest approach (perihelion)",
      "one of the two foci of the ellipse",
      "the geometric centre of the major axis"
    ],
    answerIndex: 2,
    distractorRationales: {
      "0": "The centre is the midpoint of the major axis. The Sun sits at a focus, which is offset from the centre along the major axis. The greater the eccentricity, the further the focus is from the centre.",
      "1": "Perihelion is where the planet is, not where the Sun is. The Sun is at a fixed focus; the planet moves around it.",
      "3": "Same as the geometric centre — wrong for the same reason as (a)."
    },
    explanation: "An ellipse has two foci; for a planetary orbit the Sun is at one and the other is empty. The closer the Sun is to the centre of the ellipse, the more circular the orbit looks. As eccentricity tends to zero, the two foci merge into the centre and the orbit becomes a circle.\n\nA common diagram trap: a textbook ellipse drawn with the Sun at the centre is wrong but easy to miss because the offset is small for most planets.",
    examinerNote: "Caveat: this is new syllabus content for D.1 and hasn't typically been tested in past IB papers. It's a genuine consequence of Kepler 1 and worth understanding, but don't worry if you've never seen it tested.",
    sourcePack: "original (plausible — new syllabus)"
  },

  // ── D.1.1-C3: circular orbit as special case of ellipse (MCQ pick-best) ──
  {
    id: "D.1.1-C3.001",
    level: "SL",
    tags: ["D.1.1", "D.1.1-C3"],
    type: "mcq",
    marks: 1,
    prompt: "Many gravitation problems treat planetary orbits as circular, even though Kepler's first law states that orbits are ellipses with the Sun at one focus. Which of the following is the BEST explanation of why circular orbits are consistent with Kepler's first law?",
    choices: [
      "A circle is the limiting case of an ellipse with eccentricity $e = 0$, in which the two foci merge into a single point at the centre.",
      "A circle and an ellipse are different shapes; Kepler's first law is just an approximation that doesn't apply to circular orbits.",
      "A circular orbit is not consistent with Kepler's first law, but it's a good enough approximation for most planets.",
      "A circle is what you get when the orbiting body is heavy enough that gravity becomes radially symmetric."
    ],
    answerIndex: 0,
    distractorRationales: {
      "1": "Kepler 1 absolutely applies to circles. The law says orbits are ellipses, and circles are a special case of ellipses (just with $e = 0$). No 'approximation' wiggle room needed.",
      "2": "Not just an approximation. A circle IS an ellipse — a degenerate one with $e = 0$ where both foci coincide. So it's exactly consistent with Kepler 1.",
      "3": "Gravity is always radially symmetric (it depends only on $r$ for a point mass). And the orbit shape depends on the orbiting body's energy and angular momentum, not on its mass."
    },
    explanation: "A circle is the limiting case of an ellipse where the eccentricity $e = 0$ and the two foci merge into a single point at the centre. So a circular orbit is a perfectly valid Kepler-1 ellipse; it just has the special property that the Sun sits at the geometric centre rather than off-centre at a focus.\n\nFor non-zero eccentricity ($0 < e < 1$) the foci are separated. Earth's orbit has $e \\approx 0.017$, close to but not exactly circular.",
    examinerNote: "Caveat: Kepler-1 detail isn't typically tested in past IB papers; this question is a plausible new-syllabus extension. The conceptual point — that a circle is a special-case ellipse — is the key one.",
    sourcePack: "Refactored from short to mcq pick-best per v2 brief rule 3."
  },

  // ── D.1.1-D1: state equal areas in equal times (MCQ) ─────────────────────
  {
    id: "D.1.1-D1.001",
    level: "SL",
    tags: ["D.1.1", "D.1.1-D1"],
    type: "mcq",
    marks: 1,
    prompt: "Kepler's second law of planetary motion states that:",
    choices: [
      "the line joining a planet to the Sun sweeps out equal areas in equal time intervals",
      "the planet's speed is constant throughout its orbit",
      "the gravitational force on the planet is the same at every point of its orbit",
      "the planet's angular velocity about the Sun is constant"
    ],
    answerIndex: 0,
    distractorRationales: {
      "1": "Speed is NOT constant in an elliptical orbit — the planet moves faster at perihelion (close to the Sun) and slower at aphelion. The law that's constant is the rate of area swept, not the speed.",
      "2": "Gravitational force varies as $1/r^2$, so it changes around an elliptical orbit. Strongest at perihelion, weakest at aphelion.",
      "3": "Also wrong: at perihelion the planet covers more angle per second (faster angular motion) than at aphelion. What IS constant is $r^2 \\dot{\\theta}$, the rate of area sweep, which is equivalent to angular momentum per unit mass."
    },
    explanation: "Kepler's second law: as a planet orbits, the line from the Sun to the planet sweeps out equal areas in equal time intervals. Equivalently, the rate of area sweep $dA/dt$ is constant.\n\nA consequence: when the planet is close to the Sun (small $r$), it has to be moving faster (large $v$) for the area sweep to keep up; when far from the Sun (large $r$), it moves more slowly. This makes elliptical orbits asymmetric in speed even though they're geometrically smooth.",
    examinerNote: "Caveat: Kepler's second law is new syllabus content for D.1 and isn't typically tested in past papers. It's worth knowing as a genuine consequence of Newton's gravitation, but it's not the most-tested atom under D.1.1.",
    sourcePack: "original (plausible — new syllabus)"
  },

  // ── D.1.1-D2: speed at periapsis vs apoapsis (numeric ratio) ─────────────
  // Borderline: not a typical IB question, but a genuine consequence of
  // Kepler's second law. Flagged in the examiner note.
  {
    id: "D.1.1-D2.001",
    level: "SL",
    tags: ["D.1.1", "D.1.1-D2"],
    type: "numeric",
    marks: 2,
    prompt: "A comet has a highly elliptical orbit around the Sun. At its closest approach (perihelion) it is at distance $r_p$; at its furthest point (aphelion) it is at distance $r_a = 50\\,r_p$. At aphelion its orbital speed is $v_a$. Find the ratio $v_p / v_a$ (the speed at perihelion divided by the speed at aphelion).",
    expectedNumeric: 50,
    tolerance: 0.5,
    unitHint: "× v_a",
    explanation: "Kepler's second law says the line from the Sun sweeps equal areas in equal times. At the apsides the velocity is perpendicular to the radial line, so the rate of area sweep is $\\tfrac{1}{2}rv$ at each.\n\nEqual area rates: $\\tfrac{1}{2}r_p v_p = \\tfrac{1}{2}r_a v_a$. So $v_p / v_a = r_a / r_p = 50$.\n\nIntuition: 50 times closer to the Sun, 50 times faster. A comet that crawls past Pluto at 5 km/s would whip past Earth's orbit at 250 km/s if its perihelion is 50 times closer than its aphelion.",
    examinerNote: "**Caveat: this hasn't been a typical IB question.** Probably unlikely to be asked in this form on a real paper. But it IS a genuine consequence of Kepler's second law, so the physics is correct and worth understanding. If you got it wrong because you've never seen this style before, don't worry — it isn't the most-tested atom under D.1.1.\n\nCommon slip: writing $v_p / v_a = r_p / r_a$ (gives 0.02). The faster-at-perihelion intuition should immediately flag that as wrong.",
    sourcePack: "original (plausible — new syllabus, borderline ask)"
  },

  // ── D.1.1-D3: link to angular momentum (short) ───────────────────────────
  // HL-only and cross-syllabus. Conservation of angular momentum belongs to
  // topic A4 (Rigid body mechanics, HL). The IB does not routinely test this
  // specific link in D.1; it's borderline out-of-syllabus and an unfair ask
  // for any student who hasn't covered A4. Keep but flag.
  {
    id: "D.1.1-D3.001",
    level: "HL",
    tags: ["D.1.1", "D.1.1-D3"],
    type: "short",
    marks: 1,
    prompt: "Kepler's second law (equal areas in equal times) is a consequence of which conservation principle?",
    markPoints: [
      { any: [
        "conservation of angular momentum", "angular momentum is conserved",
        "angular momentum conservation", "conserves angular momentum",
        "angular momentum stays constant", "angular momentum about the sun",
        "angular momentum is the conserved", "constant angular momentum"
      ], credit: 1 }
    ],
    explanation: "Kepler's second law is equivalent to the statement that the planet's angular momentum about the Sun is constant. The rate of area sweep $dA/dt = \\tfrac{1}{2}|\\vec r \\times \\vec v| = L/(2m)$, where $L$ is the angular momentum. Since the gravitational force on the planet is purely radial (along $\\vec r$), it exerts no torque about the Sun, so $L$ is conserved and $dA/dt$ is constant.\n\nThis is also the deep reason Kepler's second law holds for ANY central force, not just inverse-square gravity. Any radial force would give the same result.",
    examinerNote: "**Caveat: this question is borderline out-of-syllabus.** Angular momentum and its conservation belong to topic A4 (Rigid body mechanics), which is HL-only. The connection between Kepler's second law and angular momentum is real and beautiful, but the IB does not routinely test it in D.1 questions, and if you haven't covered A4 yet, this question may have felt unfair — apologies. Don't worry about it until you've done A4; come back to it then.",
    sourcePack: "original (plausible — new syllabus, cross-topic with A4)"
  },

  // ════════════════════════════════════════════════════════════════════════
  // Batch 5 — GPE concept (D.1.H.1). The "system not object" idea and the
  // negative-energy story. Includes a phased question for D.1.H.1-C1.
  // ════════════════════════════════════════════════════════════════════════

  // ── D.1.H.1-A1: define gravitational potential energy of a system ─────────
  {
    id: "D.1.H.1-A1.001",
    level: "HL",
    tags: ["D.1.H.1", "D.1.H.1-A1", "definition"],
    type: "short",
    marks: 2,
    prompt: "Define the gravitational potential energy of a two-body system.",
    markPoints: [
      { any: [
        "work done", "work required", "work needed",
        "energy required", "energy needed"
      ], credit: 1 },
      { any: [
        "bring the masses from infinity", "bring the bodies from infinity",
        "assemble the system from infinity", "from infinite separation",
        "from infinitely far apart", "from an infinite distance apart",
        "starting at infinity", "from rest at infinity", "from infinity to their"
      ], credit: 1 }
    ],
    explanation: "The gravitational potential energy of a two-body system is the work done by an external agent to assemble the system, starting with the two masses infinitely far apart and at rest, and ending with them at their current separation.\n\nBecause gravity is attractive, the external agent does negative work (or equivalently, gravity does positive work as the masses come together). The resulting $E_p$ is therefore negative: $E_p = -Gm_1m_2/r$.\n\nThe '$E_p$ is a property of the system' framing matters: it's not a property of either mass alone. You can't ask 'what is Earth's gravitational potential energy' without specifying the other mass.",
    examinerNote: "Two discrete marks: (i) it's the work done, (ii) starting from infinite separation. Students who just write 'energy of position' or 'mgh' miss both points because neither tells you where the energy is referenced from. The infinity reference is what gives $E_p$ its sign.",
    sourcePack: "original (plausible — new syllabus emphasis)"
  },

  // ── D.1.H.1-A2: system, not object (MCQ) ─────────────────────────────────
  {
    id: "D.1.H.1-A2.001",
    level: "HL",
    tags: ["D.1.H.1", "D.1.H.1-A2"],
    type: "mcq",
    marks: 1,
    prompt: "A small mass $m$ is held a height $h$ above Earth's surface. Strictly speaking, the gravitational potential energy $E_p$ is a property of:",
    choices: [
      "the small mass $m$ alone",
      "Earth alone",
      "the system formed by Earth AND the small mass together",
      "the gravitational field at the location of $m$"
    ],
    answerIndex: 2,
    distractorRationales: {
      "0": "Many introductory texts say '$m$'s potential energy', but this is loose: without specifying what mass $m$ is interacting with, '$mgh$' has no fixed reference. $E_p$ is a property of the configuration, not the object.",
      "1": "Same problem in reverse. Earth alone has no PE; you need a second mass for the PE to be defined.",
      "3": "Closer, but still not right: the field is a property of Earth (or whichever source), and PE is what you get when you ADD a second mass to that field. The PE belongs to the resulting system."
    },
    explanation: "Gravitational PE is a property of a system of two (or more) masses. The expression $E_p = -Gm_1m_2/r$ contains both masses; you can't drop either.\n\nIn introductory physics, '$E_p = mgh$' looks like a property of $m$ alone because $g$ has Earth's mass and radius implicitly baked in. The fuller HL view restores the system-symmetry: it's mutual potential energy. Doubling $m$ doubles $E_p$; doubling Earth's mass would also double $E_p$.\n\nA practical implication: a 1500 kg satellite at $r = 1.0\\times10^7$ m has $E_p \\approx -5.98\\times10^{10}$ J, and Earth has a corresponding $E_p$ change of equal magnitude when the satellite is moved. The 'system' framing makes this symmetric handling unambiguous.",
    sourcePack: "original (plausible — new syllabus emphasis)"
  },

  // ── D.1.H.1-B1: why GPE is negative for a bound system (PHASED) ──────────
  {
    id: "D.1.H.1-B1.PHASED.001",
    level: "HL",
    tags: ["D.1.H.1", "D.1.H.1-B1"],
    marks: 3,
    prompt: "Gravitational potential energy of a bound two-body system (e.g., Earth and the Moon) is conventionally a NEGATIVE quantity. The chain of reasoning that establishes this sign is the focus of this question.",
    phases: [
      {
        kind: "mcq",
        marks: 1,
        prompt: "What is the conventional value of the gravitational potential energy $E_p$ when the two masses are infinitely far apart?",
        choices: [
          "Equal to the sum of their kinetic energies.",
          "Zero.",
          "Infinite.",
          "Negative infinity."
        ],
        answerIndex: 1,
        distractorRationales: {
          "0": "PE doesn't depend on KE. They're independent quantities.",
          "2": "$E_p = -Gm_1m_2/r$. As $r \\to \\infty$, $E_p \\to 0$, not infinity. The convention chooses this limit as zero exactly because it makes the bookkeeping clean.",
          "3": "PE approaches zero from below, not minus infinity. Minus infinity would correspond to $r \\to 0$, not $r \\to \\infty$."
        }
      },
      {
        kind: "mcq",
        marks: 1,
        prompt: "If you slowly bring the two masses together (from infinity to some finite separation $r$), what kind of work does GRAVITY do?",
        choices: [
          "Positive work.",
          "Negative work.",
          "Zero work.",
          "Undefined."
        ],
        answerIndex: 0,
        distractorRationales: {
          "1": "Gravity is ATTRACTIVE: it pulls the masses toward each other. As they move toward each other (which is what 'bringing together' means), the force and the displacement point in the same direction, so the work is positive.",
          "2": "Slow motion doesn't imply zero force — gravity acts regardless of speed. (To 'move slowly' you'd actually need an external agent doing NEGATIVE work to oppose gravity and keep KE near zero. But gravity itself does positive work.)",
          "3": "Work is well-defined here, and the integral $\\int F \\cdot dr$ from infinity to $r$ converges to a finite value: $+Gm_1m_2/r$ (positive)."
        }
      },
      {
        kind: "mcq",
        marks: 1,
        prompt: "Combine the previous two facts. As the masses come together, the system's $E_p$ goes from zero (at infinity) to a value at separation $r$. What sign is that value?",
        choices: [
          "Positive.",
          "Zero.",
          "Negative.",
          "Depends on the masses involved."
        ],
        answerIndex: 2,
        distractorRationales: {
          "0": "Sign-flip trap. Positive WORK by gravity decreases the system's POTENTIAL ENERGY (because $\\Delta E_p = -W_{\\text{gravity}}$). So $E_p$ falls; starting from zero, it becomes negative.",
          "1": "Energy is conserved overall (kinetic + potential), but $E_p$ alone changes. The KE that gravity creates is exactly $-\\Delta E_p$.",
          "3": "The SIGN doesn't depend on the masses — it's always negative for a bound system. The MAGNITUDE does depend on the masses ($E_p = -Gm_1m_2/r$)."
        }
      }
    ],
    explanation: "The chain that establishes the negative sign of GPE:\n\n1. Convention: $E_p = 0$ at infinite separation.\n2. Gravity is attractive: as masses approach, gravity does POSITIVE work.\n3. Positive work by gravity decreases $E_p$: $\\Delta E_p = -W_{\\text{gravity}}$. Starting at zero and decreasing gives negative.\n\nFormally: $E_p = -Gm_1m_2/r$, which is negative for all real positive $r$.\n\nThe sign is physically meaningful: it tells you the system is BOUND. To unbind it (separate to infinity) you'd have to supply $|E_p|$ of external energy. This is the escape-energy condition.",
    examinerNote: "Refactored from a substring-matched long-form explanation. The phased version surfaces exactly which link of the chain a student is missing: do they know the convention? Do they get the work direction? Do they then read the sign correctly?",
    sourcePack: "Refactored from long to phased per v2 brief rule 3."
  },

  // ── D.1.H.1-B2: numeric — work to separate to infinity ───────────────────
  {
    id: "D.1.H.1-B2.001",
    level: "HL",
    tags: ["D.1.H.1", "D.1.H.1-B2"],
    type: "numeric",
    marks: 2,
    prompt: "A 1000 kg object is momentarily at rest at a distance $r = 6.77\\times10^6$ m from Earth's centre (about 400 km altitude). Earth has mass $5.97\\times10^{24}$ kg.\n\nCalculate the minimum work that must be done by an external agent to move the object from this position to infinity, in joules, to 3 s.f.\n\n$G = 6.674\\times10^{-11}$ N m² kg⁻².",
    expectedNumeric: 5.89e10,
    tolerance: 1e8,
    unitHint: "J",
    misconceptions: [
      {
        id: "missed_negative_sign",
        label: "Computed $E_p = -GMm/r$ but reported the signed value. Work BY the external agent against gravity is positive; the sign flip from $E_p$ matters.",
        expectedNumeric: -5.885e10,
        tolerance: 1e8,
        severity: "common"
      }
    ],
    explanation: "The system's gravitational PE at separation $r$ is $E_p = -Gm_1m_2/r$. At infinite separation $E_p = 0$. The external agent must supply $\\Delta E_p = 0 - E_p(r) = +Gm_1m_2/r$.\n\nNumerically: $W_{\\text{ext}} = \\dfrac{(6.674\\times10^{-11})(5.97\\times10^{24})(1000)}{6.77\\times10^6} \\approx 5.88\\times10^{10}$ J $\\approx 59$ GJ.\n\nFor comparison, a typical IB-style 'how much energy to send a satellite from Earth to deep space' calculation gives a number on this order — much more than the satellite's orbital KE (which is about half this magnitude). That's why escape isn't free even once you're already in orbit.",
    examinerNote: "The question excludes initial KE on purpose. In reality, to escape from a circular orbit you only need to add $\\sim |E_p|/2$ in KE, because you already have $|E_p|/2$ as orbital KE. That subtlety is the meat of D.1.H.8-H. Here the question is just: what's the work to undo the PE, ignoring KE? Answer = $|E_p|$.",
    sourcePack: "original (plausible — new syllabus emphasis)"
  },

  // ── D.1.H.1-C1: PHASED 3-mass system, total Ep is sum of pairwise terms ──
  {
    id: "D.1.H.1-C1.PHASED.001",
    level: "HL",
    tags: ["D.1.H.1", "D.1.H.1-C1"],
    marks: 4,
    prompt: "Three identical point masses of $M = 1.0\\times10^{24}$ kg sit at the vertices of an equilateral triangle with side length $d = 1.0\\times10^9$ m. The total gravitational potential energy of the system is the work needed to assemble it from infinitely separated masses.",
    phases: [
      {
        kind: "mcq",
        marks: 1,
        prompt: "Which expression gives the total gravitational potential energy of the three-mass system?",
        choices: [
          "$E_p = -GM^2/d$",
          "$E_p = -3GM^2/d$",
          "$E_p = -GM^2/(3d)$",
          "I'm not sure — show me"
        ],
        answerIndex: 1,
        distractorRationales: {
          "0": "That's the PE of just one pair of masses. There are three pairs in this system; the total is three times as negative.",
          "2": "Dividing the separation by 3 is incorrect. Each pair is separated by $d$, not $d/3$. There are three pairs at $d$, not one pair at $d/3$.",
          "3": "Fine to use this if you're stuck — the right answer is $-3GM^2/d$ because the system has three distinct pairs of masses, all at separation $d$."
        }
      },
      {
        kind: "numeric",
        marks: 2,
        prompt: "Using $G = 6.674\\times10^{-11}$ N m² kg⁻², $M = 1.0\\times10^{24}$ kg, $d = 1.0\\times10^9$ m, calculate the numerical value of the total gravitational potential energy, in joules, to 3 s.f.",
        expectedNumeric: -2.00e29,
        tolerance: 2e27,
        unitHint: "J"
      },
      {
        kind: "short",
        marks: 1,
        prompt: "In one sentence, why is the total energy the sum of three pairwise terms (and not, say, the sum of three single-mass terms or one global term)?",
        markPoints: [
          { any: [
            "each pair contributes its own potential energy",
            "potential energy is a property of pairs",
            "potential energy belongs to pairs of masses",
            "potential energy is defined between pairs",
            "ep is defined for pairs", "ep is between two masses",
            "interactions are pairwise", "gravity acts between pairs",
            "pe is per pair", "potential energy is per pair",
            "each pair has its own gravitational interaction",
            "each pair has a potential energy",
            "three pairs each contribute"
          ], credit: 1 }
        ]
      }
    ],
    explanation: "Gravitational potential energy is defined as the work to assemble a system from infinity. To assemble three masses you bring them in one at a time:\n\n• Mass 1 alone: no PE (no other mass to interact with).\n• Mass 2 brought in: now mass 1-2 pair has PE $-GM^2/d$.\n• Mass 3 brought in: now mass 1-3 pair adds $-GM^2/d$ AND mass 2-3 pair adds $-GM^2/d$.\n\nTotal: $E_p = 3 \\times (-GM^2/d) = -3GM^2/d$.\n\nNumerically: $E_p = -3(6.674\\times10^{-11})(1.0\\times10^{24})^2/(1.0\\times10^9) = -2.00\\times10^{29}$ J.\n\nFor $n$ masses there are $n(n-1)/2$ pairs, each contributing its own $-Gm_im_j/r_{ij}$. PE belongs to pairs, not to individual masses or to the system as a single global property.",
    examinerNote: "Caveat: three-body gravitational PE isn't a typical IB question — single-body and two-body cases dominate the past papers. It is a clean consequence of 'PE belongs to pairs', so the physics is worth understanding, but don't worry if it feels unfamiliar.\n\nThe pairwise structure is the conceptual heart of this question. Phase 1 sets up the structure (recognise three pairs); phase 2 just makes the student commit numbers; phase 3 articulates the underlying principle. A student who answers phase 2 correctly but can't articulate phase 3 has memorised a recipe, not understood it.",
    sourcePack: "original (plausible — new syllabus, multi-body extension)"
  },

  // ════════════════════════════════════════════════════════════════════════
  // D.1.H.6-C1 — sketch a specified equipotential surface
  // Uses field_map with sketchMode: true. Student clicks points where they
  // think the target V = -2 × 10⁷ J kg⁻¹ contour lies between the visible
  // -V (-1×10⁷) and -3V (-3×10⁷) contours around a single mass.
  // ════════════════════════════════════════════════════════════════════════
  {
    id: "D.1.H.6-C1.001",
    level: "HL",
    tags: ["D.1.H.6", "D.1.H.6-C1", "graph_read"],
    type: "widget",
    widget: "field_map",
    marks: 2,
    prompt: "The map shows two equipotential contours around a 5.97 × 10²⁴ kg planet at the origin: the inner one at $V = -3 \\times 10^7$ J kg⁻¹ and the outer one at $V = -1 \\times 10^7$ J kg⁻¹. Sketch the $V = -2 \\times 10^7$ J kg⁻¹ equipotential by clicking points where you think it lies. You'll need at least 6 points. Use Undo if you misclick; Clear all to start over.",
    widgetConfig: {
      sketchMode: true,
      bodies: [ { x: 0, y: 0, mass: 5.97e24, label: "M" } ],
      // Domain must extend beyond the outer reference contour at r ≈ 3.98×10⁷ m
      // so it renders as a closed loop. With these bounds, the corner at
      // (4.5e7, 3e7) sits at r = 5.4×10⁷ m where V ≈ -7.4×10⁶, less negative
      // than the -1e7 threshold, so the contour closes.
      domain: { x: [-4.5e7, 4.5e7], y: [-3e7, 3e7] },
      contourLevels: [-3e7, -1e7],  // the two reference contours (NOT the target)
      initialX: 0, initialY: 0,
      showFieldArrow: false,
      xLabel: "x", xUnits: "m",
      yLabel: "y", yUnits: "m",
      expectedV: -2e7,
      tolerancePerPoint: 1.5e6,    // ±7.5% of target
      minPoints: 6,
      marks: 2
    },
    explanation: "The $V = -GM/r$ equipotential at $V_{\\text{target}}$ is a circle around the mass with radius $r = -GM/V_{\\text{target}}$.\n\nFor $V_{\\text{target}} = -2 \\times 10^7$ J kg⁻¹ and Earth's mass: $r = (6.674 \\times 10^{-11})(5.97 \\times 10^{24})/(2 \\times 10^7) \\approx 1.99 \\times 10^7$ m.\n\nThe given contours are at $r \\approx 1.33 \\times 10^7$ m ($V = -3 \\times 10^7$) and $r \\approx 3.98 \\times 10^7$ m ($V = -1 \\times 10^7$). The target sits between them, slightly closer to the inner one (because $V \\propto -1/r$, equipotentials bunch up close to the mass).",
    examinerNote: "Common slip: placing the target halfway in RADIUS between the two given contours. That would give $r \\approx 2.66 \\times 10^7$ m and $V \\approx -1.5 \\times 10^7$, not $-2 \\times 10^7$. The contours are unequally spaced in radius for equal $V$ steps because $V \\propto -1/r$ is not linear in $r$.\n\nGreen markers mean your placed point is within tolerance of the target $V$; red markers mean it isn't. The widget shows you the $V$ at each point so you can adjust subsequent clicks.",
    sourcePack: "original (Pack C past-paper style)"
  },

  // ════════════════════════════════════════════════════════════════════════
  // Batch 6 — Non-standard orbits and drag variants. Covers tethered
  // satellites (D.1.H.9-G1), geostationary orbit (D.1.H.9-G2 phased), and
  // the instantaneous/atmospheric variants of D.1.H.10.
  // ════════════════════════════════════════════════════════════════════════

  // ── D.1.H.9-G1: tethered/coupled satellites (PHASED) ─────────────────────
  {
    id: "D.1.H.9-G1.PHASED.001",
    level: "HL",
    tags: ["D.1.H.9", "D.1.H.9-G1"],
    marks: 3,
    prompt: "Two satellites of equal mass are connected by a long, rigid, light tether. The tether is aligned radially: one satellite is at orbital radius $r_1$ from Earth's centre, and the other at $r_2 > r_1$. Both are forced (by the tether) to move with the same angular velocity around Earth.",
    phases: [
      {
        kind: "mcq",
        marks: 1,
        prompt: "If the two satellites were NOT tethered, how would their free-orbit periods compare?",
        choices: [
          "The same.",
          "The inner one (at $r_1$) would have a shorter period; the outer one (at $r_2$) longer.",
          "The inner one would have a longer period; the outer one shorter.",
          "Both periods are infinite at this distance."
        ],
        answerIndex: 1,
        distractorRationales: {
          "0": "Kepler's third law: $T \\propto r^{3/2}$. The two satellites orbit the same planet, but at different $r$, so their natural periods are different.",
          "2": "Wrong direction. Smaller $r$ means stronger gravity AND shorter circumference, both of which give a SHORTER period. Inner = faster.",
          "3": "Both orbits are well-defined and have finite periods."
        }
      },
      {
        kind: "mcq",
        marks: 1,
        prompt: "Given that the tether forces them to share the SAME angular velocity $\\omega$, what must the tether do?",
        choices: [
          "Nothing.",
          "Exert a force on each satellite.",
          "Slowly heat up to dissipate energy.",
          "Become rigid only at one end."
        ],
        answerIndex: 1,
        distractorRationales: {
          "0": "They DON'T naturally share $\\omega$ at different $r$. So if a common $\\omega$ is being imposed, something must impose it — that's the tether.",
          "2": "Heat dissipation isn't relevant to the kinematics. The tether must EXERT FORCE, not absorb energy.",
          "3": "Rigid at one end only would let the other satellite fly away. Both ends are mechanically coupled."
        }
      },
      {
        kind: "mcq",
        marks: 1,
        prompt: "At the shared angular velocity $\\omega$ (somewhere between the two natural angular velocities), which describes each satellite's motion?",
        choices: [
          "Both satellites are at their natural orbital speeds; the tether is slack.",
          "The inner satellite is moving slower than its natural speed; the outer is moving faster than its natural speed. The tether is in tension.",
          "The inner satellite is moving faster than its natural speed; the outer is moving slower than its natural speed.",
          "Only the inner satellite is at its natural speed; the outer is being towed."
        ],
        answerIndex: 1,
        distractorRationales: {
          "0": "The natural orbital speeds differ at different $r$. They can't BOTH be at natural speed if they share $\\omega$.",
          "2": "Backwards. The shared $\\omega$ is between the two natural angular velocities; the inner one's natural $\\omega$ is LARGER (Kepler 3 again), so the shared $\\omega$ is LESS than the inner's natural — i.e., the inner is moving too slowly. The outer's natural $\\omega$ is SMALLER, so the shared $\\omega$ is MORE than the outer's natural — i.e., the outer is moving too fast.",
          "3": "Neither is at its natural speed; both are constrained by the tether."
        }
      }
    ],
    explanation: "For a free circular orbit, $v_{\\text{orb}} = \\sqrt{GM/r}$ and $\\omega = \\sqrt{GM/r^3}$. Smaller $r$ gives larger natural $\\omega$ — the inner satellite would naturally orbit faster than the outer.\n\nWhen the tether forces a shared $\\omega$ between the two natural values:\n• Inner satellite: shared $\\omega$ < natural $\\omega$. Gravity at $r_1$ exceeds the centripetal $\\omega^2 r_1$, so the tether must pull it OUTWARD (away from Earth).\n• Outer satellite: shared $\\omega$ > natural $\\omega$. Centripetal $\\omega^2 r_2$ exceeds gravity at $r_2$, so the tether must pull it INWARD.\n\nNet: tether in tension; inner pulled out, outer pulled in. Without the tether, the configuration would fall apart — the inner would speed up to a lower orbit and the outer would slow down to a higher orbit.",
    examinerNote: "Refactored from long to phased. The three claims (different natural periods → tether must act → each satellite is off its natural speed) become three MCQs whose ✓/✗ pattern diagnoses exactly which link breaks.\n\nObserved in Pack D. Underlies real engineering of space elevators and rotating tethers.",
    sourcePack: "Pack D. Refactored from long to phased per v2 brief rule 3."
  },

  // ── D.1.H.9-G2: geostationary orbit — phased ──────────────────────────────
  {
    id: "D.1.H.9-G2.PHASED.001",
    level: "HL",
    tags: ["D.1.H.9", "D.1.H.9-G2"],
    marks: 4,
    prompt: "A geostationary satellite orbits Earth with a period of exactly 24 hours, in the equatorial plane and in the same sense as Earth's rotation, so that it appears stationary above a fixed point on the ground. Earth's mass is $M = 5.97\\times10^{24}$ kg, radius $R = 6.37\\times10^6$ m. $G = 6.674\\times10^{-11}$ N m² kg⁻².",
    phases: [
      {
        kind: "mcq",
        marks: 1,
        prompt: "Which law would you use to find the orbital radius from the period?",
        choices: [
          "Newton's second law alone ($F = ma$ for one moment of motion)",
          "Kepler's third law applied to the satellite ($T^2 = 4\\pi^2 r^3/(GM)$)",
          "Energy conservation between the surface and the orbit",
          "I'm not sure — show me"
        ],
        answerIndex: 1,
        distractorRationales: {
          "0": "True but not enough on its own. You'd still need to set gravity equal to centripetal force AND substitute v = 2πr/T, which IS the derivation of Kepler's third law.",
          "2": "Energy conservation gives KE and PE at each radius but doesn't directly link r to T. Kepler 3 does that link in one step.",
          "3": "Fine to use this if you're stuck — but the cleanest path is Kepler's third law."
        }
      },
      {
        kind: "numeric",
        marks: 2,
        prompt: "With $T = 24$ hours $= 86400$ s, calculate the orbital radius $r$ of a geostationary satellite, in metres, to 3 s.f.",
        expectedNumeric: 4.22e7,
        tolerance: 5e4,
        unitHint: "m"
      },
      {
        kind: "numeric",
        marks: 1,
        prompt: "Calculate the satellite's altitude above Earth's SURFACE (not from the centre), in kilometres, to 3 s.f.",
        expectedNumeric: 35900,
        tolerance: 100,
        unitHint: "km"
      }
    ],
    explanation: "Kepler's third law: $T^2 = \\dfrac{4\\pi^2 r^3}{GM}$, so $r = \\left(\\dfrac{GMT^2}{4\\pi^2}\\right)^{1/3}$.\n\nWith $T = 86400$ s: $r = ((6.674\\times10^{-11})(5.97\\times10^{24})(86400)^2/(4\\pi^2))^{1/3} \\approx 4.22\\times10^7$ m.\n\nAltitude: $h = r - R = 4.22\\times10^7 - 6.37\\times10^6 \\approx 3.59\\times10^7$ m $\\approx 35\\,900$ km.\n\nA strictly-correct geostationary period is the sidereal day ($86\\,164$ s) rather than the solar day, which gives $r \\approx 4.216\\times10^7$ m. The 24-hour approximation lands within 0.2% and is fine at the level of this question.",
    examinerNote: "Caveat: geostationary orbits are discussed in the new D.1 syllabus but typically appear in IB papers as qualitative descriptions, not as full Kepler-3 calculations. This phased version is a plausible extension; the physics is correct and useful.\n\nPhase 1 forces explicit identification of Kepler 3 as the right tool; phase 2 is the calculation; phase 3 surfaces the centre-vs-surface trap (subtract R to get altitude).\n\nCommon slip: reporting $4.22\\times10^7$ m as the altitude — the question asked for altitude, which is centre-to-centre distance minus Earth's radius. Differs by 6370 km.",
    sourcePack: "original (plausible — new syllabus)"
  },

  // ── D.1.H.10-B1: sudden Δv vs continuous drag (PHASED) ───────────────────
  {
    id: "D.1.H.10-B1.PHASED.001",
    level: "HL",
    tags: ["D.1.H.10", "D.1.H.10-B1"],
    marks: 3,
    prompt: "A satellite is initially in a circular orbit around Earth. We compare two scenarios in which the same total mechanical energy is removed from the satellite:\n\n• Scenario A: a sudden retro-burn at ONE POINT of the orbit, instantly reducing the satellite's speed by $\\Delta v$.\n• Scenario B: gradual atmospheric drag, removing the same total energy continuously over many orbits.",
    phases: [
      {
        kind: "mcq",
        marks: 1,
        prompt: "In Scenario A (the retro-burn), what is the SHAPE of the satellite's new orbit?",
        choices: [
          "Still a circle, at a smaller radius.",
          "An ellipse, with the kick point as the apoapsis (highest point) of the new orbit.",
          "An ellipse, with the kick point as the periapsis (lowest point) of the new orbit.",
          "A parabola."
        ],
        answerIndex: 1,
        distractorRationales: {
          "0": "An instantaneous speed change at a single point breaks circular symmetry. The satellite is now moving slower than the circular-orbit speed at the kick point, so the orbit can't be circular at $r_{\\text{kick}}$.",
          "2": "Wrong end. At the kick point, the satellite is too slow for circular orbit at that $r$ — so gravity pulls it inward; it swings closer to Earth on the other side. The kick point is the highest point of the new orbit, not the lowest.",
          "3": "A parabolic orbit is the escape condition ($E = 0$). The satellite has LOST energy; it's more bound, not less. Still in a closed elliptical orbit."
        }
      },
      {
        kind: "mcq",
        marks: 1,
        prompt: "In Scenario B (gradual drag), what is the SHAPE of the satellite's orbit AT ANY MOMENT during the decay?",
        choices: [
          "Always approximately circular, but slowly shrinking.",
          "Increasingly elliptical, with eccentricity growing over time.",
          "Always perfectly circular at the original radius.",
          "A spiral that's neither circular nor elliptical."
        ],
        answerIndex: 0,
        distractorRationales: {
          "1": "Drag is DISTRIBUTED around the orbit (not localised at one point), so it doesn't inject eccentricity. The orbit stays close to circular throughout the decay.",
          "2": "Drag does remove energy and shrink the orbit. The orbit doesn't stay at the original radius.",
          "3": "While the long-time trajectory is a spiral, each individual orbit is approximately a circle. The spiral is the slow drift of the circle's radius, not a separate shape."
        }
      },
      {
        kind: "mcq",
        marks: 1,
        prompt: "What is the KEY difference between Scenario A and Scenario B that explains the different orbit shapes?",
        choices: [
          "Scenario A removes more energy than Scenario B.",
          "Scenario A removes energy at one point; Scenario B removes energy continuously around the orbit.",
          "Scenario A is faster than Scenario B.",
          "Scenario A changes the satellite's mass; Scenario B doesn't."
        ],
        answerIndex: 1,
        distractorRationales: {
          "0": "By construction, both scenarios remove the same total energy. The difference is HOW the energy is removed, not how much.",
          "2": "Speed of energy removal isn't the conceptual point. A slow retro-burn would still produce an ellipse if applied at one point; a fast widespread drag would still keep the orbit circular.",
          "3": "Neither scenario changes the mass. Mass cancels in orbital-speed formulas anyway."
        }
      }
    ],
    explanation: "Scenario A (kick at one point). The satellite's position $r$ is unchanged at the kick, but its speed drops. It can no longer move in a circle at that $r$ (the speed is now too low). The new orbit is an ellipse with the kick point as the APOAPSIS — the satellite then swings inward to a closer perihelion on the opposite side before returning, repeating the same elliptical orbit.\n\nScenario B (distributed drag). Each individual orbit is approximately circular; the radius decreases slowly over many orbits. There's no eccentricity build-up because the energy loss is symmetric around the orbit.\n\nThe principle: LOCALISED energy loss → eccentricity. DISTRIBUTED energy loss → circular spiral.",
    examinerNote: "Three phases. Phase 1 tests the shape after a single-point energy removal (ellipse, kick point at apoapsis). Phase 2 tests the shape under distributed drag (circular spiral). Phase 3 tests the conceptual distinction (LOCALISED vs DISTRIBUTED). A student who passes phases 1 and 2 but flubs phase 3 has the empirical results but not the principle.",
    sourcePack: "Pack D (asteroid-strike-style Q). Refactored from long to phased per v2 brief rule 3."
  },

  // ── D.1.H.10-C1: atmospheric spiral inward (multi_select) ─────────────────
  {
    id: "D.1.H.10-C1.001",
    level: "HL",
    tags: ["D.1.H.10", "D.1.H.10-C1"],
    type: "multi_select",
    marks: 5,
    prompt: "A low-orbit satellite experiences very small but continuous atmospheric drag over many revolutions. Which of the following statements describe the long-term behaviour of the satellite correctly? Tick all that apply.",
    statements: [
      { text: "The orbital altitude gradually decreases.",
        correct: true,
        rationale: "Drag removes mechanical energy, so $E = -GMm/(2r)$ becomes more negative, which requires $r$ to decrease." },
      { text: "The orbital speed gradually increases.",
        correct: true,
        rationale: "Even though drag opposes motion, the spiral inward reduces $r$. Since $v = \\sqrt{GM/r}$, smaller $r$ means larger $v$." },
      { text: "Eventually the satellite re-enters the denser atmosphere and burns up or fragments reach the surface.",
        correct: true,
        rationale: "As the orbit drops, atmospheric density rises rapidly, drag grows, and the decay accelerates. The satellite is destroyed at re-entry (small) or reaches the ground in pieces (large)." },
      { text: "The orbital speed gradually decreases because drag opposes motion.",
        correct: false,
        rationale: "Intuitively reasonable but wrong. Drag DOES oppose motion at each instant, but the net effect over many orbits is to lower the orbit, and the lower orbit's required orbital speed is HIGHER. The two effects produce a counter-intuitive net speed increase.",
        misconception: "drag_decelerates_in_orbit" },
      { text: "The orbital period gradually increases as the orbit decays.",
        correct: false,
        rationale: "Period $T = 2\\pi r/v$; the orbit drops AND speeds up, so $T$ DECREASES (shorter orbits). The ISS at lower altitude orbits faster than satellites at higher orbits — shorter period.",
        misconception: "period_grows_with_decay" }
    ],
    explanation: "Drag continuously removes mechanical energy. Total energy $E = -GMm/(2r)$ becomes more negative, so $r$ decreases: the orbit spirals inward. As $r$ decreases:\n• Orbital speed $v = \\sqrt{GM/r}$ INCREASES.\n• Orbital period $T = 2\\pi r/v$ DECREASES.\n• Atmospheric density rises sharply at lower altitude, so drag grows.\n\nEventual fate: re-entry. Small satellites burn up; large ones reach the surface as debris. This is why the ISS needs periodic reboosts.",
    examinerNote: "The two counter-intuitive parts: drag-induced SPEED UP, and orbital period SHRINKING during decay. Students often expect the opposite of both.",
    sourcePack: "Refactored from short to multi_select per v2 brief rule 3."
  },

  // ── D.1.H.10-C2: numeric speed increase from drag-induced altitude drop ──
  {
    id: "D.1.H.10-C2.001",
    level: "HL",
    tags: ["D.1.H.10", "D.1.H.10-C2"],
    type: "numeric",
    marks: 2,
    prompt: "A satellite initially orbits Earth at altitude $h_1 = 800$ km. Atmospheric drag gradually lowers it to altitude $h_2 = 200$ km. Calculate the increase in orbital speed, in m s⁻¹, to 3 s.f.\n\nEarth has $M = 5.97\\times10^{24}$ kg and $R = 6.37\\times10^6$ m. $G = 6.674\\times10^{-11}$ N m² kg⁻². Assume the orbit remains approximately circular at each stage.",
    expectedNumeric: 333,
    tolerance: 5,
    unitHint: "m s⁻¹",
    misconceptions: [
      {
        id: "reported_value_not_difference",
        label: "Reported the orbital speed at the lower altitude rather than the INCREASE. The question asks for $\\Delta v = v_2 - v_1$, not just $v_2$.",
        expectedNumeric: 7787,
        tolerance: 20,
        severity: "common"
      }
    ],
    explanation: "Orbital speed at each altitude:\n\n$v_1 = \\sqrt{GM/(R+h_1)} = \\sqrt{(6.674\\times10^{-11})(5.97\\times10^{24})/(7.17\\times10^6)} \\approx 7455$ m s⁻¹\n\n$v_2 = \\sqrt{GM/(R+h_2)} = \\sqrt{(6.674\\times10^{-11})(5.97\\times10^{24})/(6.57\\times10^6)} \\approx 7787$ m s⁻¹\n\nIncrease: $\\Delta v = v_2 - v_1 \\approx 333$ m s⁻¹.\n\nThis is the drag paradox: 600 km of altitude loss, $\\sim 333$ m s⁻¹ of speed GAIN, all while the satellite is steadily losing total mechanical energy to drag. The kinetic energy GOES UP; the potential energy goes down by more than enough to account for both the KE gain and the energy lost to drag.",
    examinerNote: "Common slips: subtracting incorrectly (forgetting to take the difference, just reporting $v_2$); using $r = h$ instead of $r = R + h$; forgetting to convert km to m for $h$. Sanity: any LEO speed is 7-8 km/s, so $\\Delta v$ of a few hundred m/s is the right scale for a 600 km altitude drop.",
    sourcePack: "original (plausible — drag speed comparison)"
  },

  // ════════════════════════════════════════════════════════════════════════
  // Batch 7 — Second variants on high-leverage SL atoms. Same atoms as
  // batches 1-3, different numbers, different contexts. Makes the random
  // pick non-trivial when a student filters to one of these atoms.
  // ════════════════════════════════════════════════════════════════════════

  // ── D.1.1-A1.002: Kepler ratio, Saturn moons ────────────────────────────
  {
    id: "D.1.1-A1.002",
    level: "SL",
    tags: ["D.1.1", "D.1.1-A1"],
    type: "numeric",
    marks: 2,
    prompt: "Titan orbits Saturn with a period of 15.95 days at orbital radius $1.22 \\times 10^9$ m. Iapetus, another moon of Saturn, has an orbital period of 79.32 days. Find the orbital radius of Iapetus, in metres, to 3 s.f.",
    expectedNumeric: 3.55e9,
    tolerance: 3e7,
    unitHint: "m",
    explanation: "Both moons orbit the same body (Saturn), so $T^2/r^3$ is the same for both. From Kepler's third law: $r_{\\text{Iap}} = r_{\\text{Tit}} \\cdot (T_{\\text{Iap}}/T_{\\text{Tit}})^{2/3} = 1.22\\times10^9 \\cdot (79.32/15.95)^{2/3} \\approx 3.55\\times10^9$ m.\n\nThe trick that lets us avoid Saturn's mass: when both moons orbit the same central body, the constant $4\\pi^2/(GM)$ cancels in the ratio. We only need the period and radius of one moon as a reference.",
    examinerNote: "Note: 79.32/15.95 ≈ 4.97, and $4.97^{2/3} \\approx 2.91$. Multiplied by $1.22 \\times 10^9$ gives $\\approx 3.55 \\times 10^9$ m. The real value of Iapetus's orbital radius is $3.56 \\times 10^9$ m, so the calculation is right to 3 sig fig.",
    sourcePack: "original (textbook problem)"
  },

  // ── D.1.2-C1.002: gravitational force Sun-Jupiter ───────────────────────
  {
    id: "D.1.2-C1.002",
    level: "SL",
    tags: ["D.1.2", "D.1.2-C1"],
    type: "numeric",
    marks: 2,
    prompt: "Calculate the magnitude of the gravitational force between the Sun (mass $1.989 \\times 10^{30}$ kg) and Jupiter (mass $1.898 \\times 10^{27}$ kg), when Jupiter is at its mean orbital distance of $7.78 \\times 10^{11}$ m from the Sun. Give your answer in newtons to 3 s.f.\n\n$G = 6.674 \\times 10^{-11}$ N m² kg⁻².",
    expectedNumeric: 4.16e23,
    tolerance: 1e21,
    unitHint: "N",
    explanation: "$F = \\dfrac{Gm_1m_2}{r^2} = \\dfrac{(6.674\\times10^{-11})(1.989\\times10^{30})(1.898\\times10^{27})}{(7.78\\times10^{11})^2} \\approx 4.16 \\times 10^{23}$ N.\n\nFor comparison, the Sun-Earth gravitational force is about $3.54 \\times 10^{22}$ N, so Jupiter feels about 12 times more pull from the Sun than Earth does — Jupiter is heavier than Earth by a factor of 318, but further away by a factor of 5.2 (which squares to 27), so the net ratio is $318/27 \\approx 12$.",
    examinerNote: "Sanity: G ≈ $10^{-10}$, masses multiply to $\\approx 10^{57}$, distance squared is $\\approx 10^{24}$. So $F \\approx 10^{-10} \\times 10^{57} / 10^{24} = 10^{23}$. The exponent should land at $10^{23}$.",
    sourcePack: "original (textbook problem)"
  },

  // ── D.1.4-C2.003: find altitude given target g ──────────────────────────
  {
    id: "D.1.4-C2.003",
    level: "SL",
    tags: ["D.1.4", "D.1.4-C2"],
    type: "numeric",
    marks: 3,
    prompt: "At what altitude above Earth's surface is the gravitational field strength reduced to $1.00$ N kg⁻¹? Give your answer in metres to 3 s.f.\n\nEarth: mass $M = 5.97 \\times 10^{24}$ kg, radius $R = 6.37 \\times 10^6$ m. $G = 6.674 \\times 10^{-11}$ N m² kg⁻².",
    expectedNumeric: 1.36e7,
    tolerance: 1e5,
    unitHint: "m",
    misconceptions: [
      {
        id: "radius_offset_forgotten",
        label: "Solved for $r$ (centre-to-centre distance) and reported that, but didn't subtract $R$ to convert to altitude.",
        expectedNumeric: 1.996e7,
        tolerance: 5e4,
        severity: "common"
      }
    ],
    misconceptions: [
      {
        id: "radius_offset_forgotten",
        label: "Looks like r = R + h was solved for r (≈ 2.00 × 10⁷ m), but R wasn't subtracted to convert centre-to-centre distance into altitude.",
        expectedNumeric: 1.996e7,
        tolerance: 1e5,
        severity: "common"
      }
    ],
    explanation: "Start from $g = GM/r^2$, solve for $r$: $r = \\sqrt{GM/g}$.\n\nWith $g = 1.00$ N kg⁻¹: $r = \\sqrt{(6.674\\times10^{-11})(5.97\\times10^{24})/1.00} \\approx 1.996\\times10^7$ m.\n\nAltitude $h = r - R = 1.996\\times10^7 - 6.37\\times10^6 \\approx 1.36\\times10^7$ m, or about 13\\,600 km.\n\nFor context: geostationary orbit is at $\\sim 35\\,800$ km, where $g \\approx 0.22$ N kg⁻¹. The lunar orbit is at $\\sim 3.84\\times10^5$ km, where Earth's pull is $\\sim 0.0027$ N kg⁻¹.",
    examinerNote: "This is the inverse of the usual 'find g at given altitude' problem. Students who plug numbers into $g = GM/(R+h)^2$ and then try to solve for $h$ algebraically usually do fine; the trap is forgetting to subtract $R$ at the end to convert centre-to-centre $r$ into altitude.",
    sourcePack: "original (textbook problem)"
  },

  // ── D.1.4-D2.002: same-density larger planet ────────────────────────────
  {
    id: "D.1.4-D2.002",
    level: "SL",
    tags: ["D.1.4", "D.1.4-D2"],
    type: "numeric",
    marks: 2,
    prompt: "An exoplanet has exactly the same average density as Earth, but its radius is four times Earth's radius. Earth's surface gravitational field strength is $9.81$ N kg⁻¹. Find the surface gravitational field strength on the exoplanet, in N kg⁻¹, to 3 s.f.",
    expectedNumeric: 39.2,
    tolerance: 0.1,
    unitHint: "N kg⁻¹",
    explanation: "At constant density, mass scales with volume: $M \\propto R^3$. Surface gravity is $g = GM/R^2 \\propto R^3/R^2 = R$.\n\nSo if the radius is 4 times Earth's, the surface gravity is 4 times Earth's: $g = 4 \\times 9.81 = 39.24$ N kg⁻¹.\n\nA 70 kg human would weigh $\\sim 2750$ N on this exoplanet, about 280 kg-force. Walking would be slow, and falls would be dangerous.",
    examinerNote: "The key step is $g \\propto R$ at constant density. Students who plug in $g \\propto 1/R^2$ alone get $9.81/16 = 0.61$, missing the mass scaling entirely. Students who plug in $g \\propto M$ alone get $9.81 \\times 64 = 628$, missing the radius scaling. The combination $g \\propto R^3/R^2 = R$ is the answer.",
    sourcePack: "original (textbook problem)"
  },

  // ── D.1.H.3-C1.002: read V from Moon's V-r graph ────────────────────────
  {
    id: "D.1.H.3-C1.002",
    level: "HL",
    tags: ["D.1.H.3", "D.1.H.3-C1", "graph_read"],
    type: "numeric",
    marks: 1,
    prompt: "The graph below shows gravitational potential $V$ versus $r$ outside the Moon (mass $7.34 \\times 10^{22}$ kg). Use the widget to read off $V$ at $r = 2.5 \\times 10^6$ m. Give your answer in J kg⁻¹ to 3 s.f.",
    tool: {
      name: "curve_probe",
      config: {
        curve: "V_radial",
        M: 7.34e22,
        domain: [1.74e6, 1.0e7],
        initialR: "random",
        showArea: false,
        xLabel: "r", xUnits: "m",
        yLabel: "V", yUnits: "J kg⁻¹"
      }
    },
    expectedNumeric: -1.96e6,
    tolerance: 5e4,
    unitHint: "J kg⁻¹",
    explanation: "$V = -GM/r = -(6.674\\times10^{-11})(7.34\\times10^{22})/(2.5\\times10^6) \\approx -1.96 \\times 10^6$ J kg⁻¹.\n\nThe Moon's potential is about 27 times shallower at any given $r$ than Earth's because the Moon is about 81 times less massive but at the same orbital radius the ratio is different.",
    examinerNote: "Drag the probe to $r = 2.5 \\times 10^6$ m and read $V$ off the live readout. The widget's gradient readout shows $dV/dr$ (the local slope), which is NOT what's asked here. The V readout is what's asked.",
    sourcePack: "original (textbook problem)"
  },

  // ════════════════════════════════════════════════════════════════════════
  // Batch 8 — New SL atoms. Earth/AU reference (A4), central mass from
  // orbital data (A5), gravity-as-centripetal (D1), units of g (B1), find
  // M from g/R (C3), different M and R (D1), two-source field ratio (E2),
  // g = v²/r in orbit (H1).
  // ════════════════════════════════════════════════════════════════════════

  // ── D.1.1-A4: Earth as reference orbit (1 AU, 1 yr) ─────────────────────
  {
    id: "D.1.1-A4.001",
    level: "SL",
    tags: ["D.1.1", "D.1.1-A4"],
    type: "numeric",
    marks: 2,
    prompt: "Mars orbits the Sun at a mean distance of $1.52$ AU. Calculate Mars's orbital period in Earth years, to 3 s.f.",
    hints: [
      "Both Mars and Earth orbit the same body. What does that tell you about $T^2/r^3$ for the two of them?",
      "Use a planet whose orbital data you already know as a reference. Earth: 1 AU, 1 year.",
      "Kepler's third law gives $T_{\\text{Mars}}$ (in Earth years) $= (r_{\\text{Mars}} \\text{ in AU})^{3/2}$. Plug in $1.52$."
    ],
    expectedNumeric: 1.87,
    tolerance: 0.02,
    unitHint: "years",
    explanation: "Earth and Mars both orbit the Sun, so $T^2/r^3$ is the same constant for both. Taking Earth as the reference (where $T = 1$ yr and $r = 1$ AU): $T_{\\text{Mars}}^2 / r_{\\text{Mars}}^3 = 1 \\text{ yr}^2 / 1 \\text{ AU}^3$.\n\nSo $T_{\\text{Mars}} = (r_{\\text{Mars}} \\text{ in AU})^{3/2}$ years. For Mars at 1.52 AU: $T = 1.52^{1.5} \\approx 1.87$ years.\n\nThe real value is 1.881 years (the actual Mars orbit has eccentricity 0.093, so 1.52 AU is the semi-major axis, not the constant radius — Kepler 3 still uses the semi-major axis, so the calculation is correct).",
    examinerNote: "The neat trick of D.1.1-A4 is that you can do Kepler-3 ratios without plugging in $G$ and the central mass, AS LONG AS both bodies orbit the same central body. Earth-as-reference is the cleanest case for inner solar-system problems because $T$ in years and $r$ in AU make the constant 1.\n\nCommon slip: cubing instead of taking the 3/2 power. $1.52^3 = 3.51$ is the wrong shape — that's $r^3$ on its own, not the period.",
    sourcePack: "original (textbook problem)"
  },

  // ── D.1.1-A5: find central mass from orbital data ────────────────────────
  {
    id: "D.1.1-A5.001",
    level: "SL",
    tags: ["D.1.1", "D.1.1-A5"],
    type: "numeric",
    marks: 3,
    prompt: "Earth orbits the Sun with a period of $3.156 \\times 10^7$ s at an orbital radius of $1.496 \\times 10^{11}$ m. Calculate the mass of the Sun, in kg, to 3 s.f.\n\n$G = 6.674 \\times 10^{-11}$ N m² kg⁻².",
    expectedNumeric: 1.99e30,
    tolerance: 1e28,
    unitHint: "kg",
    explanation: "Kepler's third law: $T^2 = \\dfrac{4\\pi^2 r^3}{GM}$. Rearranging for $M$:\n\n$M = \\dfrac{4\\pi^2 r^3}{GT^2} = \\dfrac{4\\pi^2 (1.496\\times10^{11})^3}{(6.674\\times10^{-11})(3.156\\times10^{7})^2} \\approx 1.99 \\times 10^{30}$ kg.\n\nThis is how Newton (in effect) showed that the Sun must be vastly more massive than Earth: given the radius and period of Earth's orbit, $M_{\\text{Sun}}$ is the only unknown in Kepler 3, and the answer comes out massive.",
    examinerNote: "Common slips: forgetting one of the $4$, $\\pi$, or $r$ factors. Sanity: $r^3 \\sim 3\\times 10^{33}$, $T^2 \\sim 10^{15}$, $4\\pi^2 \\sim 40$, $G \\sim 7\\times 10^{-11}$. So $M \\sim 40 \\times 3\\times 10^{33} / (7\\times 10^{-11} \\times 10^{15}) = 1.2\\times 10^{35} / 7\\times 10^4 \\sim 2\\times 10^{30}$ kg. Right exponent.",
    sourcePack: "original (textbook problem)"
  },

  // ── D.1.2-D1: gravity = centripetal force gives orbital speed ───────────
  {
    id: "D.1.2-D1.001",
    level: "SL",
    tags: ["D.1.2", "D.1.2-D1"],
    type: "numeric",
    marks: 2,
    prompt: "The Moon orbits Earth in an approximately circular orbit of radius $3.84 \\times 10^8$ m. Calculate the Moon's orbital speed, in m s⁻¹, to 3 s.f.\n\nEarth's mass $M = 5.97 \\times 10^{24}$ kg. $G = 6.674 \\times 10^{-11}$ N m² kg⁻².",
    hints: [
      "What sort of physical situation is this? A small body following a curved path around a much bigger one. What kind of force does that require?",
      "Earth's gravitational pull on the Moon is what bends the Moon's path into a circle — it's the centripetal force.",
      "Set the two expressions equal: $\\dfrac{GMm}{r^2} = \\dfrac{mv^2}{r}$, where $M$ is Earth's mass and $m$ is the Moon's. Notice anything?",
      "$m$ cancels from both sides, giving $v = \\sqrt{GM/r}$. Now just plug in the numbers."
    ],
    expectedNumeric: 1020,
    tolerance: 10,
    unitHint: "m s⁻¹",
    explanation: "Setting gravity equal to centripetal force: $\\dfrac{GM_Em}{r^2} = \\dfrac{mv^2}{r}$. The Moon's mass $m$ cancels, so $v = \\sqrt{GM_E/r}$.\n\nNumerically: $v = \\sqrt{(6.674\\times10^{-11})(5.97\\times10^{24})/(3.84\\times10^8)} \\approx 1019$ m s⁻¹ $\\approx 1.02$ km s⁻¹.\n\nFor context: the orbital period is $T = 2\\pi r/v \\approx 2.37 \\times 10^6$ s $\\approx 27.4$ days — close to the real lunar sidereal month of 27.3 days.",
    examinerNote: "This is essentially the same physics as D.1.H.9-A1 derivation, applied to the Moon. Common slips: confusing the Moon's mass with Earth's mass (the orbiting body's mass cancels; what enters is the CENTRAL body's mass); forgetting the square root.",
    sourcePack: "original (textbook problem)"
  },

  // ── D.1.4-B1: units of g (MCQ) ──────────────────────────────────────────
  {
    id: "D.1.4-B1.001",
    level: "SL",
    tags: ["D.1.4", "D.1.4-B1", "definition"],
    type: "mcq",
    marks: 1,
    prompt: "Gravitational field strength $g$ has SI units of:",
    choices: [
      "N m⁻¹",
      "N kg⁻¹",
      "J kg⁻¹",
      "N m² kg⁻²"
    ],
    answerIndex: 1,
    distractorRationales: {
      "0": "N m⁻¹ would be force per unit length (e.g., the units of a spring constant or surface tension). Not gravitational field strength.",
      "2": "J kg⁻¹ is the unit of gravitational POTENTIAL (energy per unit mass), not field strength. The two are related by $g = -dV/dr$.",
      "3": "N m² kg⁻² is the unit of the gravitational constant $G$, not of $g$. You can see it from $F = Gm_1m_2/r^2$: $G$ has units N × m² / (kg × kg)."
    },
    explanation: "Gravitational field strength is force per unit mass: $g = F/m$, so units are N kg⁻¹ (force in newtons, mass in kilograms).\n\nEquivalently, $g$ has units of acceleration (m s⁻²), since N = kg m s⁻² gives N/kg = m s⁻². The numerical value of $g$ at Earth's surface is therefore 9.81 N kg⁻¹ OR 9.81 m s⁻² — the two are the same quantity expressed in different unit conventions.\n\nThe J kg⁻¹ unit for potential $V$ is a slightly different thing: it's the energy per unit mass to bring a test mass from infinity. The relationship $g = -dV/dr$ confirms the dimensions: J kg⁻¹ / m = N m kg⁻¹ / m = N kg⁻¹. ✓",
    sourcePack: "original (textbook problem)"
  },

  // ── D.1.4-C3: find planet mass from surface g and radius ─────────────────
  {
    id: "D.1.4-C3.001",
    level: "SL",
    tags: ["D.1.4", "D.1.4-C3"],
    type: "numeric",
    marks: 2,
    prompt: "Mars has surface gravitational field strength $g = 3.71$ N kg⁻¹ and radius $R = 3.39 \\times 10^6$ m. Calculate the mass of Mars, in kg, to 3 s.f.\n\n$G = 6.674 \\times 10^{-11}$ N m² kg⁻².",
    expectedNumeric: 6.39e23,
    tolerance: 5e21,
    unitHint: "kg",
    misconceptions: [
      {
        id: "forgot_to_square_R",
        label: "Wrote $M = gR/G$ instead of $M = gR^2/G$. The surface-gravity formula $g = GM/R^2$ has $R$ squared in the denominator, so $R^2$ moves to the numerator when you rearrange.",
        expectedNumeric: 1.885e17,
        tolerance: 2e15,
        severity: "common"
      }
    ],
    explanation: "From $g = GM/R^2$, rearranging for $M$: $M = gR^2/G$.\n\n$M = (3.71)(3.39\\times10^6)^2 / (6.674\\times10^{-11}) \\approx 6.39 \\times 10^{23}$ kg.\n\nThe real value of Mars's mass is $6.42\\times10^{23}$ kg, so this calculation is right to 3 sig fig. This is exactly how the mass of any planet with a known surface gravity and radius can be inferred without needing satellite data.",
    examinerNote: "The trick is rearranging $g = GM/R^2$ to $M = gR^2/G$. Common slip: forgetting to square the radius, giving $M = gR/G \\approx 1.89\\times10^{17}$, off by a factor of $R$.",
    sourcePack: "original (textbook problem)"
  },

  // ── D.1.4-D1: different mass and radius (numeric) ───────────────────────
  {
    id: "D.1.4-D1.001",
    level: "SL",
    tags: ["D.1.4", "D.1.4-D1"],
    type: "numeric",
    marks: 2,
    prompt: "An exoplanet has three times Earth's mass and twice Earth's radius. Earth's surface gravitational field strength is $9.81$ N kg⁻¹. Find the surface gravitational field strength on the exoplanet, in N kg⁻¹, to 3 s.f.",
    expectedNumeric: 7.36,
    tolerance: 0.05,
    unitHint: "N kg⁻¹",
    explanation: "Surface gravity scales as $g \\propto M/R^2$. For an exoplanet with $M' = 3M_E$ and $R' = 2R_E$:\n\n$g'/g_E = (M'/M_E)/(R'/R_E)^2 = 3/4 = 0.75$.\n\nSo $g' = 0.75 \\times 9.81 = 7.36$ N kg⁻¹.\n\nThis exoplanet is more massive than Earth, but bigger too — and the inverse-square distance effect just outweighs the mass effect, so a person would weigh LESS on this exoplanet than on Earth.",
    examinerNote: "Three competing effects to track: (i) mass triples → $g$ triples; (ii) radius doubles → $g$ drops by $4$. Net: $3/4 = 0.75$. Common slip: only handling one of the two scaling effects.",
    sourcePack: "original (textbook problem)"
  },

  // ── D.1.4-E2: ratio of gravitational fields at a single point ───────────
  {
    id: "D.1.4-E2.001",
    level: "SL",
    tags: ["D.1.4", "D.1.4-E2"],
    type: "numeric",
    marks: 3,
    prompt: "A person stands on Earth's surface. Calculate the magnitude of the gravitational field at that person's location due to the Sun, and express it as a fraction of Earth's surface gravitational field strength. Give the dimensionless ratio to 3 s.f.\n\nSun's mass $M_S = 1.989 \\times 10^{30}$ kg. Sun-Earth distance $r = 1.496 \\times 10^{11}$ m. Earth's mass $M_E = 5.97 \\times 10^{24}$ kg, Earth's radius $R_E = 6.37 \\times 10^6$ m. $G = 6.674 \\times 10^{-11}$ N m² kg⁻².",
    expectedNumeric: 6.04e-4,
    tolerance: 5e-6,
    unitHint: "× g_Earth",
    explanation: "Sun's field at the Earth's location: $g_{\\text{Sun}} = GM_S/r^2 = (6.674\\times10^{-11})(1.989\\times10^{30})/(1.496\\times10^{11})^2 \\approx 5.93\\times10^{-3}$ N kg⁻¹.\n\nEarth's surface field: $g_{\\text{Earth}} = GM_E/R_E^2 \\approx 9.82$ N kg⁻¹.\n\nRatio: $g_{\\text{Sun}}/g_{\\text{Earth}} = 5.93\\times10^{-3}/9.82 \\approx 6.04 \\times 10^{-4}$.\n\nSo the Sun pulls each kilogram of you about $6\\times10^{-4}$ times as hard as Earth does. The Sun is enormously massive but enormously far. The combined effect over Earth's surface is what causes tides (in combination with the Moon's pull) but only a small perturbation on your weight.",
    examinerNote: "Most students don't realise how WEAK the Sun's pull on a person is, compared to Earth's. The intuition that 'the Sun is enormous so its pull must be huge' is mistakenly applied without dividing through by the squared distance. The answer is a four-orders-of-magnitude reminder of the $1/r^2$ factor.",
    sourcePack: "original (textbook problem)"
  },

  // ── D.1.4-H1: g = v²/r in circular orbit (numeric) ──────────────────────
  {
    id: "D.1.4-H1.001",
    level: "SL",
    tags: ["D.1.4", "D.1.4-H1"],
    type: "numeric",
    marks: 2,
    prompt: "A satellite is in a circular orbit at $r = 7.0 \\times 10^6$ m from Earth's centre. At that radius, Earth's gravitational field strength is $g = 8.13$ N kg⁻¹. Using $g = v^2/r$ (the centripetal-acceleration form), calculate the satellite's orbital speed, in m s⁻¹, to 3 s.f.",
    expectedNumeric: 7540,
    tolerance: 15,
    unitHint: "m s⁻¹",
    explanation: "In a circular orbit, gravity provides the centripetal acceleration: $g = v^2/r$, so $v = \\sqrt{gr}$.\n\nNumerically: $v = \\sqrt{(8.13)(7.0\\times10^6)} = \\sqrt{5.69\\times10^7} \\approx 7544$ m s⁻¹.\n\nCross-check using $v = \\sqrt{GM/r}$ directly: $\\sqrt{(6.674\\times10^{-11})(5.97\\times10^{24})/(7\\times10^6)} \\approx 7544$ m s⁻¹. ✓\n\nThis is the SAME physics, expressed two ways. Once you have $g$ at the orbital radius, $v = \\sqrt{gr}$ is the fastest path to orbital speed.",
    examinerNote: "The $g = v^2/r$ form is useful when $g$ at the orbit is known (e.g., given by a graph or by surface-gravity-scaled-down). The $v = \\sqrt{GM/r}$ form is useful when the central mass is known directly. Both give the same answer.\n\nCommon slip: writing $v = gr$ instead of $\\sqrt{gr}$ (forgetting the square root). Gives $5.69 \\times 10^7$ m/s, faster than light — obviously wrong.",
    sourcePack: "original (textbook problem)"
  },

  // ════════════════════════════════════════════════════════════════════════
  // Batch 9 — New HL atoms. Ep scaling and signs (D.1.H.2-B1, B3, D1),
  // V bridge from g and altitude (D.1.H.3-D1), local V max between two
  // masses using the new V tool (D.1.H.3-E2), escape from combined fields
  // as a phased question (D.1.H.8-G1), and weightlessness (D.1.H.9-D3).
  // ════════════════════════════════════════════════════════════════════════

  // ── D.1.H.2-B1: Ep ∝ -1/r (MCQ) ─────────────────────────────────────────
  {
    id: "D.1.H.2-B1.001",
    level: "HL",
    tags: ["D.1.H.2", "D.1.H.2-B1"],
    type: "mcq",
    marks: 1,
    prompt: "For two point masses separated by distance $r$, the gravitational potential energy of the system scales as:",
    choices: [
      "$E_p \\propto -1/r^2$",
      "$E_p \\propto -1/r$",
      "$E_p \\propto -r$",
      "$E_p \\propto r^2$"
    ],
    answerIndex: 1,
    distractorRationales: {
      "0": "You may be thinking of the FORCE $F = -Gm_1m_2/r^2$, which IS inverse-square. But potential energy integrates force over distance, which gives one less power of $r$.",
      "2": "Wrong direction: linear-in-$r$ would mean $E_p$ getting more negative without limit as $r$ grows, which is the opposite of how potential energy behaves in a $1/r$ system.",
      "3": "Same direction wrong, plus the wrong functional form. This would correspond to a Hooke's-law restoring potential (like a spring), not gravity."
    },
    explanation: "$E_p = -Gm_1m_2/r$ scales as $-1/r$. This is one power of $r$ shallower than the inverse-square FORCE $F = -dE_p/dr = -Gm_1m_2/r^2$.\n\nConsequence: doubling the separation HALVES the magnitude of $E_p$ (makes it less negative by a factor of 2), but QUARTERS the force. The two have different scaling because PE integrates force.\n\nAnother consequence: $E_p \\to 0$ as $r \\to \\infty$ (the reference convention), but it does so SLOWLY (only as $1/r$), so distant bodies still have appreciable PE even when far apart.",
    sourcePack: "Pack questions on Ep scaling"
  },

  // ── D.1.H.2-B3: compare weight and Ep at r = 2R ─────────────────────────
  {
    id: "D.1.H.2-B3.001",
    level: "HL",
    tags: ["D.1.H.2", "D.1.H.2-B3"],
    type: "numeric",
    marks: 3,
    prompt: "A satellite of mass $1000$ kg is in a circular orbit at $r = 2R$ from Earth's centre, where $R$ is Earth's radius ($R = 6.37 \\times 10^6$ m). Earth's mass is $M = 5.97 \\times 10^{24}$ kg.\n\nCalculate the gravitational potential energy of the satellite-Earth system at this orbit, in joules, to 3 s.f. (Express your answer as a negative number.)\n\n$G = 6.674 \\times 10^{-11}$ N m² kg⁻².",
    expectedNumeric: -3.13e10,
    tolerance: 1e8,
    unitHint: "J",
    explanation: "At $r = 2R$: $E_p = -GMm/r = -GMm/(2R)$.\n\nNumerically: $E_p = -(6.674\\times10^{-11})(5.97\\times10^{24})(1000)/(2 \\times 6.37\\times10^6) \\approx -3.13 \\times 10^{10}$ J.\n\nNote the relationship between weight and $E_p$ at this orbit:\n• Weight = $mg(2R) = m \\cdot GM/(2R)^2 = GMm/(4R^2) \\approx 2455$ N (a quarter of the satellite's surface weight).\n• $|E_p| = GMm/(2R) \\approx 3.13\\times10^{10}$ J (half the magnitude of $|E_p|$ at the surface).\n\nThe weight scales as $1/r^2$ (so at $2R$ it's $1/4$ of surface), but the PE scales as $1/r$ (so at $2R$ it's $1/2$ of surface). The factor-of-2 difference between weight scaling and PE scaling is exactly the one-power-of-$r$ shift.",
    examinerNote: "Common slips: using $r = R$ (giving twice the magnitude); using $r = 2$ (forgetting to multiply by $R$); confusing PE with PE/mass (potential $V$).\n\nThe deeper point: this question is testing the recognition that as you go further away, weight drops faster than PE magnitude. Students who claim 'both halve' or 'both quarter' have applied the wrong scaling to one of them.",
    sourcePack: "Pack D (satellite at 2R)"
  },

  // ── D.1.H.2-D1: derive total orbital energy E = -GMm/(2r) (PHASED) ──────
  {
    id: "D.1.H.2-D1.PHASED.001",
    level: "HL",
    tags: ["D.1.H.2", "D.1.H.2-D1"],
    marks: 3,
    prompt: "A satellite of mass $m$ is in a circular orbit of radius $r$ around a planet of mass $M$. Work through the derivation of the total mechanical energy.",
    phases: [
      {
        kind: "mcq",
        marks: 1,
        prompt: "How is the total mechanical energy $E$ of the satellite-planet system related to its kinetic energy $E_k$ and gravitational potential energy $E_p$?",
        choices: [
          "$E = E_k + E_p$",
          "$E = E_k - E_p$",
          "$E = E_k \\times E_p$",
          "$E = |E_k| + |E_p|$"
        ],
        answerIndex: 0,
        distractorRationales: {
          "1": "Energy adds, with each term carrying its own sign. Don't subtract $E_p$; just include its (negative) value.",
          "2": "Energies are added in mechanics, not multiplied.",
          "3": "Magnitudes don't simply add. $E_p$ is genuinely negative, and that sign matters when you add it to $E_k$."
        }
      },
      {
        kind: "mcq",
        marks: 1,
        prompt: "For a satellite in a circular orbit at radius $r$, what is the kinetic energy $E_k$? (You may use the orbital-speed result $v = \\sqrt{GM/r}$ from D.1.H.9-A1.)",
        choices: [
          "$E_k = GMm/r$",
          "$E_k = GMm/(2r)$",
          "$E_k = \\dfrac{1}{2}GM/r$",
          "$E_k = mGM/r^2$"
        ],
        answerIndex: 1,
        distractorRationales: {
          "0": "Forgot the factor of $\\tfrac{1}{2}$ from $E_k = \\tfrac{1}{2}mv^2$.",
          "2": "Lost the factor of $m$. Kinetic energy depends on the body's mass: $E_k = \\tfrac{1}{2}mv^2$, not $\\tfrac{1}{2}v^2$.",
          "3": "Wrong form. $E_k = \\tfrac{1}{2}m v^2$, and $v^2 = GM/r$, so $E_k = \\tfrac{1}{2}m \\cdot GM/r = GMm/(2r)$, not $mGM/r^2$."
        }
      },
      {
        kind: "mcq",
        marks: 1,
        prompt: "Adding the kinetic energy ($+GMm/(2r)$) and potential energy ($-GMm/r$), what is the total mechanical energy?",
        choices: [
          "$E = +GMm/(2r)$",
          "$E = -GMm/(2r)$",
          "$E = -GMm/r$",
          "$E = 0$"
        ],
        answerIndex: 1,
        distractorRationales: {
          "0": "Sign error on $E_p$. The PE is negative ($E_p = -GMm/r$), so adding it REDUCES the total below $E_k$. The total is less than $E_k$, not equal to it.",
          "2": "Forgot to add the KE term, kept only $E_p$. Adding $+GMm/(2r)$ to $-GMm/r$ gives $-GMm/(2r)$, not the full $E_p$.",
          "3": "If KE and PE cancelled exactly, the satellite would be at the boundary of being bound (the escape condition). For a circular orbit, KE = $|E_p|/2$, so KE doesn't cancel PE."
        }
      }
    ],
    explanation: "Three steps:\n\nStep 1. $E = E_k + E_p$.\n\nStep 2. $E_k = \\tfrac{1}{2}mv^2$ and $v^2 = GM/r$ (from the orbital-speed derivation), so $E_k = GMm/(2r)$.\n\nStep 3. Combine: $E = \\dfrac{GMm}{2r} + \\left(-\\dfrac{GMm}{r}\\right) = \\dfrac{GMm}{2r} - \\dfrac{2GMm}{2r} = -\\dfrac{GMm}{2r}$.\n\nThree elegant consequences:\n• $|E_p| = 2 E_k$ for any circular orbit.\n• $E = -E_k$ (same magnitude, opposite sign).\n• $E$ is negative, confirming the orbit is bound.",
    examinerNote: "Phased version of the derivation. Each step is a discrete MCQ; per-step diagnostic.",
    sourcePack: "Refactored from long to phased per v2 brief rule 3."
  },

  // ── D.1.H.3-D1: V = -g(R+h) bridge ──────────────────────────────────────
  {
    id: "D.1.H.3-D1.001",
    level: "HL",
    tags: ["D.1.H.3", "D.1.H.3-D1"],
    type: "numeric",
    marks: 3,
    prompt: "Earth has surface gravitational field strength $g_0 = 9.81$ N kg⁻¹ and radius $R = 6.37 \\times 10^6$ m. Calculate the gravitational potential $V$ at an altitude $h = 1.00 \\times 10^7$ m above Earth's surface, in J kg⁻¹, to 3 s.f.",
    hints: [
      "Two formulas describe surface gravity: $g = GM/R^2$, and the field-from-potential relation. Which combination lets you express $V$ in terms of the data given?",
      "From $g_0 = GM/R^2$ at the surface, $GM = g_0 R^2$. Now substitute that into $V = -GM/r$.",
      "$V = -g_0 R^2 / (R+h)$ at altitude $h$. Plug in."
    ],
    expectedNumeric: -2.43e7,
    tolerance: 5e4,
    unitHint: "J kg⁻¹",
    explanation: "Start from $g = GM/r^2$ at the surface: $GM = g_0 R^2$.\n\nGravitational potential at radial distance $r$: $V = -GM/r = -g_0 R^2/r$.\n\nAt $r = R + h$: $V = -g_0 R^2/(R + h) = -(9.81)(6.37\\times10^6)^2/(6.37\\times10^6 + 1.00\\times10^7)$.\n\nNumerator: $9.81 \\times 4.06\\times10^{13} \\approx 3.98 \\times 10^{14}$.\nDenominator: $1.637 \\times 10^7$.\nResult: $V \\approx -2.43\\times10^7$ J kg⁻¹.\n\nCross-check with $V = -GM/r$ directly using $M = 5.97\\times10^{24}$ kg: $V = -(6.674\\times10^{-11})(5.97\\times10^{24})/(1.637\\times10^7) \\approx -2.43\\times10^7$ J kg⁻¹. ✓",
    examinerNote: "The point of this question is the bridge $GM = g_0 R^2$. It lets you write potential, escape speed, and orbital speed in terms of surface gravity rather than $G$ and $M$ — useful when those quantities are easier to obtain or remember.\n\nCommon slips: using $g_0 \\cdot h$ (treating it as a flat-earth $mgh$); forgetting to square $R$; getting the sign wrong (writing $V = +g_0 R^2/r$). Sanity: any HL gravitational potential is large and negative; the answer should be $\\sim -10^7$ J kg⁻¹ for an orbit-altitude problem.",
    sourcePack: "Pack B/D V-from-g questions"
  },

  // ── D.1.H.3-E2: local V max along Earth-Moon line (uses new V tool) ─────
  {
    id: "D.1.H.3-E2.001",
    level: "HL",
    tags: ["D.1.H.3", "D.1.H.3-E2", "graph_read"],
    type: "numeric",
    marks: 2,
    prompt: "The graph below shows the gravitational potential $V$ along the Earth-Moon line (Earth at $x = 0$, Moon at $x = 3.84 \\times 10^8$ m), as a function of $x$. The dashed curves are the individual contributions from Earth ($V_1$) and the Moon ($V_2$); the solid curve is their sum.\n\nDrag the probe to find the position along the line where $V$ has its LOCAL MAXIMUM (least negative value). Submit that $x$ in metres, to 2 s.f.",
    tool: {
      name: "curve_probe",
      config: {
        curve: "two_mass_V_along_line",
        M1: 5.97e24, xM1: 0,
        M2: 7.34e22, xM2: 3.84e8,
        showSeparateContributions: true,
        domain: [3.0e7, 3.7e8],
        initialR: "random",
        xLabel: "x", xUnits: "m",
        yLabel: "V", yUnits: "J kg⁻¹"
      }
    },
    expectedNumeric: 3.46e8,
    tolerance: 1e7,
    unitHint: "m",
    explanation: "On the line joining two attractive bodies, $V$ has a LOCAL maximum where the gradient is zero, which is exactly where the gravitational field magnitudes from the two bodies cancel (the same x as the zero-field point of D.1.4-E1).\n\nSetting magnitudes equal: $GM_E/x^2 = GM_M/(D-x)^2$, so $x/(D-x) = \\sqrt{M_E/M_M}$, giving $x \\approx 3.46 \\times 10^8$ m.\n\nAt that location $V_{\\text{max}} \\approx -1.28 \\times 10^6$ J kg⁻¹ (the local max value of $V$ on the line — still negative, but less negative than at any nearby point on the line). To the left of $x_{\\text{max}}$, Earth's deeper potential dominates and pulls $V$ more negative; to the right, the Moon's contribution increasingly dominates.\n\nWhy is this a maximum and not a minimum? Because $V \\to -\\infty$ near each mass (the singularities at the body locations), and the local extremum between them — where neither body fully dominates — is therefore a local MAX of $V$, i.e., the SHALLOWEST point on the line.",
    examinerNote: "Common confusion: 'V should be MOST negative between the two masses, where both pull on you.' Wrong intuition: $V$ is large and negative close to either mass, but the midpoint-type position is where the contributions are most balanced and partially cancel each other's depth. The local max sits at the field-zero point — same x as D.1.4-E1.\n\nThe widget shows the separate $V_1$ and $V_2$ dashed curves. The sum (solid) crosses through a local maximum at $x \\approx 3.46 \\times 10^8$ m. Drag the probe along the line and watch the V readout; the max is where moving in either direction makes V more negative.",
    sourcePack: "Pack C two-mass V questions"
  },

  // ── D.1.H.8-G1.PHASED.001: escape from Io including Jupiter's potential ──
  {
    id: "D.1.H.8-G1.PHASED.001",
    level: "HL",
    tags: ["D.1.H.8", "D.1.H.8-G1"],
    marks: 4,
    prompt: "A rocket sits on Io's surface (Io: mass $8.93 \\times 10^{22}$ kg, radius $1.82 \\times 10^6$ m). Io orbits Jupiter (mass $1.898 \\times 10^{27}$ kg) at orbital radius $4.22 \\times 10^8$ m. To escape from Io to interplanetary space (far from BOTH Io and Jupiter), the rocket must do work against both gravitational fields.\n\n$G = 6.674 \\times 10^{-11}$ N m² kg⁻².",
    phases: [
      {
        kind: "mcq",
        marks: 1,
        prompt: "What is the gravitational potential at the rocket's starting position (Io's surface) that must be overcome?",
        choices: [
          "The potential due to Io alone, ignoring Jupiter",
          "The sum of Io's potential at its surface AND Jupiter's potential at Io's location",
          "Only Jupiter's potential at Io's location (Io's contribution is much smaller)",
          "I'm not sure — show me"
        ],
        answerIndex: 1,
        distractorRationales: {
          "0": "Ignores Jupiter, which actually dominates the potential at Io's location. Treating Io as isolated gives an escape speed of only 2.6 km/s — but the real value is much higher.",
          "2": "Almost right in magnitude (Jupiter's contribution does dominate) but you can't simply ignore Io's contribution; the rocket starts on Io's surface, so both contribute.",
          "3": "Fine — the right approach is to add the two potentials at the starting point because potential is a scalar quantity from multiple sources adds linearly."
        }
      },
      {
        kind: "numeric",
        marks: 2,
        prompt: "Calculate the combined gravitational potential at the rocket's starting position on Io's surface, in J kg⁻¹, to 3 s.f.\n\nApproximation: Io's radius is much smaller than its orbital distance from Jupiter, so the rocket's distance from Jupiter's centre may be taken as Io's orbital radius.",
        expectedNumeric: -3.03e8,
        tolerance: 5e6,
        unitHint: "J kg⁻¹"
      },
      {
        kind: "numeric",
        marks: 1,
        prompt: "Now find the minimum escape speed from Io's surface, in m s⁻¹, to 3 s.f.",
        expectedNumeric: 24600,
        tolerance: 100,
        unitHint: "m s⁻¹"
      }
    ],
    explanation: "Potentials add as scalars, so the combined potential at the rocket's starting position (on Io's surface, at the inner edge of Io's orbit around Jupiter) is:\n\n$V_{\\text{total}} = -\\dfrac{GM_{\\text{Io}}}{R_{\\text{Io}}} - \\dfrac{GM_J}{d_{JI}}$\n\nNumerically:\n• Io: $-G \\times 8.93\\times10^{22} / 1.82\\times10^6 \\approx -3.27\\times10^6$ J kg⁻¹\n• Jupiter: $-G \\times 1.898\\times10^{27} / 4.22\\times10^8 \\approx -3.00\\times10^8$ J kg⁻¹\n• Total: $\\approx -3.03 \\times 10^8$ J kg⁻¹\n\nThe rocket needs $\\tfrac{1}{2}mv_{\\text{esc}}^2 = -m V_{\\text{total}}$, so $v_{\\text{esc}} = \\sqrt{-2 V_{\\text{total}}} \\approx \\sqrt{6.07\\times10^8} \\approx 24\\,600$ m s⁻¹.\n\nThat's $\\sim 25$ km/s, nearly TEN TIMES Io's surface escape speed ($\\sim 2.6$ km/s) because Jupiter's deep potential well utterly dominates.\n\nWhy is this 'escape' so hard? Jupiter is huge AND Io is close to it. A rocket on Earth's surface 'only' needs to escape Earth (11 km/s, with the Sun's contribution being much smaller — just 30 km/s for the orbital motion, but the rocket inherits that). On Io there's nowhere to inherit angular momentum from to fight Jupiter, so the full Jupiter-potential cost has to be paid.",
    examinerNote: "Common slip: ignoring Jupiter's contribution. Gives $v_{\\text{esc}} \\approx 2.6$ km/s (Io alone), an order of magnitude too small.\n\nThe key recognition: at Io's surface the gravitational potential due to Jupiter is enormously deep (about $-3 \\times 10^8$ J kg⁻¹) compared to Io's own (about $-3 \\times 10^6$ J kg⁻¹). The Jupiter contribution dominates by a factor of $\\sim 100$.\n\nIn practice, real missions launched from Io would use Io's orbital motion (about 17 km/s) as a free contribution: a rocket on Io launched in the direction of Io's motion already has 17 km/s relative to Jupiter, so it 'only' needs $\\sim 8$ km/s more in the right direction. That orbital-motion shortcut is the D.1.H.8-H trick (escape from an orbiting platform) and is the principle behind interplanetary gravity assists.",
    sourcePack: "Pack questions on Jupiter-Io combined fields"
  },

  // ── D.1.H.9-D3: weightlessness in orbit (PHASED, per v2 brief canonical) ─
  {
    id: "D.1.H.9-D3.PHASED.001",
    level: "HL",
    tags: ["D.1.H.9", "D.1.H.9-D3"],
    marks: 4,
    prompt: "An astronaut on board the International Space Station (ISS) reports feeling weightless. The ISS orbits at about $400$ km altitude.",
    phases: [
      {
        kind: "mcq",
        marks: 1,
        prompt: "Earth's surface gravitational field strength is $9.81$ N kg⁻¹. At ISS altitude (about $400$ km), what is the gravitational field strength most nearly equal to?",
        choices: [
          "approximately zero",
          "about $1$ N kg⁻¹",
          "about $8.7$ N kg⁻¹",
          "$9.81$ N kg⁻¹"
        ],
        answerIndex: 2,
        distractorRationales: {
          "0": "The most common everyday misconception about astronauts. Gravity at $400$ km altitude is only ~12% smaller than at the surface — far from zero. If gravity were zero, the ISS would coast off in a straight line, not orbit.",
          "1": "An order of magnitude wrong. $g = GM/(R+h)^2$ at $h = 400$ km gives about $8.7$, not $1$.",
          "3": "Roughly right magnitude but not exact. Field DOES weaken with altitude; just very gradually for LEO."
        },
        misconceptions: [
          { id: "gravity_negligible_in_orbit",
            chosenIndex: 0,
            label: "You believed gravity at ISS altitude is approximately zero. It's actually about $8.7$ N kg⁻¹ — close to surface. The astronaut feeling weightless is not because gravity is gone." }
        ]
      },
      {
        kind: "mcq",
        marks: 1,
        prompt: "On Earth's surface, standing still, what physical interaction is responsible for the everyday sensation of HAVING weight?",
        choices: [
          "Gravity pulling the body down",
          "Atmospheric pressure pressing down on the body",
          "The contact (normal) force from the ground pushing UP on the body",
          "The body's inertia resisting gravitational acceleration"
        ],
        answerIndex: 2,
        distractorRationales: {
          "0": "Gravity is the force doing the pulling, but you don't directly sense the gravitational force itself. What you sense is the EQUAL-AND-OPPOSITE reaction force from the ground that prevents you from falling. Take away the ground and gravity still acts — but the sensation of weight vanishes.",
          "1": "Atmospheric pressure does exist (about 100 kPa) but you don't feel it because it acts equally in all directions. It's not the sensation of weight.",
          "3": "Inertia (Newton's first law: things resist acceleration) is a real concept, but it's not 'felt'. It's a property of mass, not a force you sense."
        }
      },
      {
        kind: "multi_select",
        marks: 1,
        prompt: "Which of the following statements about the astronaut on the ISS are TRUE? Tick all that apply.",
        statements: [
          { text: "The astronaut is in continuous free-fall around the Earth.",
            correct: true,
            rationale: "Both the astronaut and the ISS accelerate toward Earth's centre at $g \\approx 8.7$ m s⁻². Falling continuously with horizontal velocity gives an orbit." },
          { text: "The astronaut and the ISS share the same gravitational acceleration.",
            correct: true,
            rationale: "By the equivalence principle (or simply because $g$ depends only on Earth's mass and the position $r$), all objects at the same location accelerate at the same $g$ under gravity alone." },
          { text: "There is no contact force between the astronaut and the station's walls (in free flight).",
            correct: true,
            rationale: "Both falling at the same rate means no relative acceleration, so no contact needed. Hence no force." },
          { text: "The astronaut has no weight in the Newtonian-gravity sense ($W = mg$).",
            correct: false,
            rationale: "$W = mg$ with $g \\approx 8.7$ N kg⁻¹ gives a Newtonian weight that's about 88% of the surface value. The sensation of weight is what's missing, not the gravitational weight.",
            misconception: "weight_vs_apparent_weight" },
          { text: "There is no gravity in space.",
            correct: false,
            rationale: "Gravity is exactly what keeps the ISS in orbit. Without gravity it would fly off in a straight line. 'No gravity in space' is wrong about the physics; it's the apparent-weight sensation that's missing.",
            misconception: "gravity_negligible_in_orbit" }
        ]
      },
      {
        kind: "mcq",
        marks: 1,
        prompt: "Which is the BEST one-line summary of why the astronaut feels weightless?",
        choices: [
          "Gravity is too weak at $400$ km altitude to be noticeable.",
          "The astronaut and the station are both in free-fall at the same rate, so there is no contact force on the astronaut.",
          "Earth's gravity is cancelled by the centrifugal effect of the orbit.",
          "The astronaut's mass is reduced in orbit."
        ],
        answerIndex: 1,
        distractorRationales: {
          "0": "Gravity at ISS altitude is about 88% of the surface value — definitely noticeable, definitely not the reason for weightlessness.",
          "2": "There's no separate 'centrifugal force' that cancels gravity. In the ground frame, gravity IS the centripetal force keeping the ISS in orbit. The astronaut feels weightless because the astronaut shares the orbit, not because of a force balance.",
          "3": "Mass is invariant. The astronaut's mass is the same on Earth, on the ISS, and on the Moon."
        }
      }
    ],
    explanation: "Weight in the everyday sense is the contact force (normal force from a chair, floor, etc.) that opposes gravity. In orbit, gravity is still strong — but the ISS and everyone inside are all in free-fall toward Earth at the same rate. The station is moving sideways fast enough that it 'falls past' Earth indefinitely; that's what an orbit is.\n\nBecause the astronaut and the station share the same gravitational acceleration, the astronaut doesn't push against any surface and no surface pushes back. The contact force is zero. No contact force, no sensation of weight — even though the gravitational force is still doing its thing.\n\nThis is the equivalence principle: gravity and uniformly accelerating reference frames are locally indistinguishable.",
    examinerNote: "The brief's canonical example for the new 'no free-form explanations' rule. Four phases, four pieces of diagnostic feedback: (1) gravity is NOT zero at LEO altitude; (2) everyday weight sensation is the contact/normal force; (3) what's true and what's not for the astronaut; (4) the one-line summary.\n\nA student who fails the multi-select but passes the rest knows the conceptual chain but tripped on one definition. A student who passes the value-range MCQ but bombs the summary knows the numbers without understanding the principle. The diagnostic richness is the point.",
    sourcePack: "Refactored from long to phased per v2 brief rule 3 (canonical example)."
  },

  // ════════════════════════════════════════════════════════════════════════
  // Batch 10 — SL gaps in D.1.2 / D.1.3 / D.1.4. The conceptual MCQs and
  // a couple of basic numerics that round out the foundations.
  // ════════════════════════════════════════════════════════════════════════

  // ── D.1.2-A3: Newton's law predicts but doesn't explain (MCQ) ────────────
  {
    id: "D.1.2-A3.001",
    level: "SL",
    tags: ["D.1.2", "D.1.2-A3", "definition"],
    type: "mcq",
    marks: 1,
    prompt: "Newton's law of universal gravitation is best characterised as:",
    choices: [
      "an explanation of the mechanism by which masses attract each other",
      "a quantitative rule that PREDICTS the gravitational force between masses, but does not explain its underlying cause",
      "a definition of mass in terms of gravitational attraction",
      "an experimental confirmation that all forces in nature are inversely proportional to distance squared"
    ],
    answerIndex: 1,
    distractorRationales: {
      "0": "Newton himself was clear that he did not explain HOW gravity acts at a distance, only that it does, and according to which formula. The mechanism (curved spacetime, in modern terms) was Einstein's contribution.",
      "2": "Mass is defined independently (via inertia, $F = ma$). Newton's law of gravity uses mass as input; it doesn't define it.",
      "3": "The inverse-square law is specific to gravity (and electrostatics, separately). Other forces in nature (nuclear, friction) follow different distance dependences."
    },
    explanation: "Newton's law of gravitation is a predictive RULE: given two masses and their separation, it tells you the magnitude and direction of the gravitational force. It does not explain why masses attract each other, why the inverse-square form holds, or how the force is communicated across space.\n\nNewton famously wrote 'hypotheses non fingo' (I feign no hypotheses) when refusing to speculate about the mechanism. The mechanism question wasn't addressed until Einstein's general relativity reframed gravity as the curvature of spacetime caused by mass-energy.\n\nFor IB purposes: the law predicts. It doesn't explain.",
    sourcePack: "Pack B (predicts not explains)"
  },

  // ── D.1.2-B3: F-vs-r graph (MCQ) ─────────────────────────────────────────
  {
    id: "D.1.2-B3.001",
    level: "SL",
    tags: ["D.1.2", "D.1.2-B3"],
    type: "mcq",
    marks: 1,
    prompt: "Two point masses are separated by distance $r$. Which best describes how the gravitational force $F$ between them depends on $r$, on a graph of $F$ against $r$?",
    choices: [
      "a horizontal line (F is independent of r)",
      "a straight line through the origin with positive slope (F ∝ r)",
      "a hyperbola-like curve falling toward zero (F ∝ 1/r²)",
      "a parabola opening upward (F ∝ r²)"
    ],
    answerIndex: 2,
    distractorRationales: {
      "0": "Independence of $r$ would contradict Newton's law of gravitation, where $F$ explicitly depends on the separation.",
      "1": "$F \\propto r$ is linear-in-$r$, which would mean force INCREASES with separation. Gravity is attractive and decreases with distance.",
      "3": "$F \\propto r^2$ also increases with distance, opposite to gravity. This is the form of a spring force ($F = kx$ scaled), not gravity."
    },
    explanation: "Newton's law gives $F = Gm_1m_2/r^2$. Plotted against $r$, this gives a curve that:\n\n• Is very large for small $r$ (diverges as $r \\to 0$);\n• Falls quickly as $r$ increases;\n• Approaches zero (but never reaches) as $r \\to \\infty$.\n\nThe shape is a 'hyperbola-like' inverse-square decay. At $r = 2$ × original, $F$ drops to 1/4. At $r = 10$ ×, $F$ drops to 1/100.\n\nA related but distinct graph: $F$ vs $1/r^2$ (i.e. with the independent axis transformed) would be a STRAIGHT LINE through the origin with positive slope $Gm_1m_2$. That linearised form is often more useful for fitting data.",
    sourcePack: "Pack A (F-vs-r graph)"
  },

  // ── D.1.2-C2: weight at altitude using F = mg ────────────────────────────
  {
    id: "D.1.2-C2.001",
    level: "SL",
    tags: ["D.1.2", "D.1.2-C2"],
    type: "numeric",
    marks: 3,
    prompt: "A $75$ kg astronaut is at an altitude of $400$ km above Earth's surface. Calculate the astronaut's weight (the gravitational force on the astronaut from Earth) at that altitude, in newtons, to 3 s.f.\n\nEarth's mass $M = 5.97\\times10^{24}$ kg, radius $R = 6.37\\times10^6$ m. $G = 6.674\\times10^{-11}$ N m² kg⁻².",
    expectedNumeric: 652,
    tolerance: 3,
    unitHint: "N",
    explanation: "Step 1: find $g$ at the relevant altitude. $g = GM/(R+h)^2$ at $h = 4.00\\times10^5$ m, so $r = 6.77\\times10^6$ m. $g = (6.674\\times10^{-11})(5.97\\times10^{24})/(6.77\\times10^6)^2 \\approx 8.69$ N kg⁻¹.\n\nStep 2: apply $F = mg$. $F = 75 \\times 8.69 \\approx 652$ N.\n\nFor comparison, the astronaut's surface weight would be $75 \\times 9.81 = 736$ N. At LEO altitude they weigh about 88% of their surface weight, despite feeling weightless in orbit (because they and the station fall together, see D.1.H.9-D3).",
    examinerNote: "Two-step problem testing both 'g at altitude' (D.1.4-C2) and 'F = mg' (D.1.2-C2). Common slips: confusing weight with mass (gives 75 N — orders of magnitude off); using surface $g$ instead of altitude $g$ (gives 736 N — slightly too high but plausible-looking); forgetting that weight in 'orbit' is still nonzero even though the astronaut feels weightless.",
    sourcePack: "Pack questions on F=mg at altitude"
  },

  // ── D.1.3-B2: add R to altitude (numeric) ────────────────────────────────
  {
    id: "D.1.3-B2.001",
    level: "SL",
    tags: ["D.1.3", "D.1.3-B2"],
    type: "numeric",
    marks: 2,
    prompt: "A satellite is at an altitude of $h = 2.0\\times10^7$ m above Earth's surface. Earth's radius is $R = 6.37\\times10^6$ m. State the distance $r$ from the satellite to the centre of Earth that you would use in the formula $F = GMm/r^2$, in metres, to 3 s.f.\n\n(The answer is NOT $h$.)",
    expectedNumeric: 2.64e7,
    tolerance: 5e4,
    unitHint: "m",
    explanation: "Newton's law of gravitation uses the centre-to-centre distance between two point-mass-like bodies, not the height above the surface. So $r = R + h = 6.37\\times10^6 + 2.0\\times10^7 \\approx 2.64\\times10^7$ m.\n\nThe atom D.1.3-B (use centre-to-centre separation) is critical for orbital problems, where 'altitude' and 'orbital radius' differ by exactly $R$. Mixing them is the most common single error in $g$-at-altitude problems.",
    examinerNote: "Trivial if you remember the rule, easy to mess up if you don't. The pedagogical purpose is to drill the substitution $r = R + h$ explicitly, separate from any numerical calculation, so the student internalises the distinction.\n\nSanity: $r$ should be larger than $R$, and much larger than $R$ for high altitudes. $2.64\\times10^7$ is about $4R$ — checks out for $h = R + 3R \\approx 4R$ from centre.",
    sourcePack: "original (foundational drill)"
  },

  // ── D.1.3-C1: data consistent with point-mass behaviour (MCQ pick-best) ──
  {
    id: "D.1.3-C1.001",
    level: "SL",
    tags: ["D.1.3", "D.1.3-C1"],
    type: "mcq",
    marks: 1,
    prompt: "Astronomers measure the gravitational potential $V$ at many distances $r$ from Earth's centre (outside Earth's surface) and find that the product $rV$ is constant across all measurements. Which statement BEST explains why this observation supports the claim that Earth behaves as a point mass for external observers?",
    choices: [
      "It shows that Earth's mass is concentrated at a single point.",
      "It matches the form $V = -GM/r$, since rearranging gives $rV = -GM$ — a constant that depends only on Earth's mass.",
      "It shows that $V$ is the same at every $r$, which means the gravitational field outside Earth is uniform.",
      "It shows that the gravitational field outside Earth is zero, which is what a point mass would produce."
    ],
    answerIndex: 1,
    distractorRationales: {
      "0": "Earth is NOT concentrated at a single point — it's a real extended body with mass distributed throughout. The observation shows that EXTERNALLY the body BEHAVES like a point mass; it doesn't say the body IS one.",
      "2": "Misreads the data. $V$ is NOT the same at every $r$ — only the product $rV$ is constant. $V$ itself varies as $-1/r$, getting less negative as you move further away.",
      "3": "The gravitational field outside Earth is not zero — it's $g = GM/r^2$, which is small but nonzero at large distances. A point mass also doesn't have zero external field."
    },
    explanation: "A point mass produces gravitational potential $V = -GM/r$ at external distance $r$. Rearranging: $rV = -GM$, a constant that depends only on the central mass.\n\nObserving $rV = $ constant for Earth, across many $r$, is exactly the signature of point-mass behaviour. The shell theorem (any spherically symmetric mass distribution looks like a point mass externally) is the underlying reason.\n\nFor Earth, $rV = -GM \\approx -3.98 \\times 10^{14}$ J m kg⁻¹, the same value whether you measure $V$ at the surface or at the Moon's orbit.",
    examinerNote: "Common confusion (option a): students think the observation proves Earth is literally a point mass. It doesn't. It proves Earth EXTERNALLY produces the same field as a point mass — which is what the shell theorem guarantees for a sphere.",
    sourcePack: "Pack D (rV evidence). Refactored from short to mcq pick-best per v2 brief rule 3."
  },

  // ── D.1.4-B2: g in m s⁻² (MCQ) ───────────────────────────────────────────
  {
    id: "D.1.4-B2.001",
    level: "SL",
    tags: ["D.1.4", "D.1.4-B2"],
    type: "mcq",
    marks: 1,
    prompt: "Gravitational field strength $g$ is conventionally given units of N kg⁻¹, but it is equivalent to which other SI unit?",
    choices: [
      "m s⁻²",
      "kg m s⁻²",
      "J kg⁻¹",
      "N m"
    ],
    answerIndex: 0,
    distractorRationales: {
      "1": "kg m s⁻² is the unit of FORCE (a newton), not gravitational field strength.",
      "2": "J kg⁻¹ is the unit of gravitational POTENTIAL $V$, not field strength. Closely related but a different quantity.",
      "3": "N m is the unit of ENERGY (or torque), not field strength."
    },
    explanation: "N kg⁻¹ and m s⁻² are dimensionally equivalent because 1 newton = 1 kg m s⁻², so N/kg = (kg m s⁻²)/kg = m s⁻².\n\nThis equivalence reflects the dual nature of $g$: it's both the gravitational force per unit mass (a field strength) AND the acceleration of a freely-falling object (in m s⁻²). Both readings give the same number at Earth's surface: 9.81.\n\nThe two units are interchangeable in calculations; choice between them is usually contextual. 'Field strength' problems use N kg⁻¹; 'free-fall acceleration' problems use m s⁻².",
    sourcePack: "Pack B (g unit equivalence)"
  },

  // ── D.1.4-C1: basic surface g (Mercury) ──────────────────────────────────
  {
    id: "D.1.4-C1.001",
    level: "SL",
    tags: ["D.1.4", "D.1.4-C1"],
    type: "numeric",
    marks: 2,
    prompt: "Mercury has mass $3.29 \\times 10^{23}$ kg and radius $2.44 \\times 10^6$ m. Calculate the gravitational field strength at Mercury's surface, in N kg⁻¹, to 3 s.f.\n\n$G = 6.674 \\times 10^{-11}$ N m² kg⁻².",
    expectedNumeric: 3.69,
    tolerance: 0.02,
    unitHint: "N kg⁻¹",
    explanation: "$g = GM/R^2 = (6.674\\times10^{-11})(3.29\\times10^{23})/(2.44\\times10^6)^2 \\approx 3.69$ N kg⁻¹.\n\nFor comparison: Mercury (~3.7), Venus (8.87), Earth (9.81), Mars (3.71), Moon (1.62), Jupiter (24.79). Mercury and Mars are coincidentally similar despite being very different in mass and radius — Mercury is more dense, Mars is bigger.",
    examinerNote: "Direct application of $g = GM/R^2$. Common slips: not squaring the radius; using diameter instead of radius. Sanity: any rocky planet's surface gravity is order-of-magnitude 1-10 N kg⁻¹.",
    sourcePack: "original (textbook problem)"
  },

  // ── D.1.4-D3: mass ratio from g and R (numeric) ──────────────────────────
  {
    id: "D.1.4-D3.001",
    level: "SL",
    tags: ["D.1.4", "D.1.4-D3"],
    type: "numeric",
    marks: 3,
    prompt: "An exoplanet has surface gravitational field strength $g = 3.27$ N kg⁻¹ (one-third of Earth's) and radius $1.40$ times Earth's. Earth's surface $g_E = 9.81$ N kg⁻¹.\n\nFind the ratio $M_{\\text{planet}}/M_{\\text{Earth}}$ to 3 s.f.",
    expectedNumeric: 0.653,
    tolerance: 0.01,
    unitHint: "× M_Earth",
    explanation: "From $g = GM/R^2$, $M = gR^2/G$. Taking the ratio with Earth:\n\n$\\dfrac{M_{\\text{planet}}}{M_E} = \\dfrac{g_{\\text{planet}}}{g_E} \\cdot \\left(\\dfrac{R_{\\text{planet}}}{R_E}\\right)^2 = \\dfrac{3.27}{9.81} \\cdot (1.4)^2 = \\dfrac{1}{3} \\cdot 1.96 \\approx 0.653$.\n\nSo this exoplanet has 65% of Earth's mass, but is 1.4 times its radius. The lower surface gravity follows from the inverse-square dilution outweighing the slight mass reduction.\n\nA planet at constant density (D.1.4-D2 territory) with 1.4× Earth's radius would have $1.4^3 \\approx 2.7$ times Earth's mass and $1.4$ times Earth's $g$. Our planet has LESS mass than that, so it must be LESS dense than Earth.",
    examinerNote: "Three-mark question because it requires (i) using $g = GM/R^2$ to set up the ratio, (ii) plugging in $g$ ratio, (iii) plugging in $R$ ratio squared. Common slips: forgetting to square the radius ratio; inverting the radius ratio.",
    sourcePack: "original (textbook problem)"
  },

  // ════════════════════════════════════════════════════════════════════════
  // Batch 11 — D.1.5 field lines (six new atoms) plus the D.1.4-H2 phased
  // question (orbital g → orbital speed → orbital period chain).
  // ════════════════════════════════════════════════════════════════════════

  // ── D.1.5-A1: radial field lines around an isolated mass (MCQ) ──────────
  {
    id: "D.1.5-A1.001",
    level: "SL",
    tags: ["D.1.5", "D.1.5-A1"],
    type: "mcq",
    marks: 1,
    prompt: "An isolated spherical mass produces a gravitational field. The field lines around the mass are best drawn as:",
    choices: [
      "circles concentric with the mass, going around it",
      "straight lines radiating outward from the mass",
      "straight lines pointing radially INWARD toward the mass",
      "parallel straight lines going downward through the region"
    ],
    answerIndex: 2,
    distractorRationales: {
      "0": "Circles AROUND the mass would imply a force perpendicular to the radial direction. Gravity pulls TOWARD the mass, not around it. (Circles are the right shape for an equipotential AROUND a single mass, but not for the field lines themselves.)",
      "1": "Outward arrows would mean the field repels a test mass. Gravity is attractive, so arrows go IN, not out.",
      "3": "Parallel downward lines describe an approximately uniform field near a flat surface (e.g., Earth's near-surface field on small scales). For an isolated mass viewed as a whole, the field is RADIAL, not uniform."
    },
    explanation: "Around an isolated spherical mass, the gravitational field is radial and points INWARD (toward the mass) at every point in the surrounding space. Field lines are drawn as straight lines from infinity pointing toward the mass.\n\nThe line density (closeness of lines) drops with distance because the field magnitude is $g \\propto 1/r^2$. So lines are bunched up close to the mass and spread out far from it.\n\nThis is the canonical 'point-mass field map' — the same shape (but reversed in arrow direction) as the electric field around a positive charge.",
    sourcePack: "Pack textbook field lines"
  },

  // ── D.1.5-A2: direction of force from field line (MCQ) ──────────────────
  {
    id: "D.1.5-A2.001",
    level: "SL",
    tags: ["D.1.5", "D.1.5-A2"],
    type: "mcq",
    marks: 1,
    prompt: "A gravitational field line passes through a point P. A small test mass is placed at P. The gravitational force on the test mass is directed:",
    choices: [
      "along the tangent to the field line at P, in the direction of motion if released",
      "along the tangent to the field line at P, against the direction of the field arrow",
      "perpendicular to the field line at P",
      "in a randomly determined direction"
    ],
    answerIndex: 0,
    distractorRationales: {
      "1": "Against the field arrow would mean the field repels, but gravity is attractive (toward the source). The force matches the field arrow direction.",
      "2": "Perpendicular would be the direction along an equipotential surface, where the force is zero by construction. Not the force direction.",
      "3": "Field lines are precisely the lines that give you the direction unambiguously."
    },
    explanation: "Field lines are defined to be tangent to the gravitational field $\\vec g$ at every point. The field is force per unit mass on a test mass, so the force on a test mass at point P is along the tangent to the field line at P, in the direction the line is drawn (the arrow points toward the source for gravity).\n\nA released mass accelerates along the field line, but only in the limit of infinitesimal motion — over finite distances, the mass curves along a trajectory because the field direction itself changes as the mass moves.\n\nField lines are a tool for visualisation, not trajectories of motion: don't confuse 'mass moves along a field line' (true only instantaneously) with 'mass moves along a field line' (over time, generally false unless the field is constant along the line).",
    sourcePack: "Pack questions on field-line tangent"
  },

  // ── D.1.5-B2: field strength from line density (MCQ) ────────────────────
  {
    id: "D.1.5-B2.001",
    level: "SL",
    tags: ["D.1.5", "D.1.5-B2"],
    type: "mcq",
    marks: 1,
    prompt: "At two points P and Q in a gravitational field, the gravitational field lines are bunched closer together at P than at Q. Compared with Q, the gravitational field strength at P is:",
    choices: [
      "weaker than at Q",
      "the same as at Q",
      "stronger than at Q",
      "indeterminate without more information"
    ],
    answerIndex: 2,
    distractorRationales: {
      "0": "Reverses the convention. Line bunching means STRONGER field, not weaker.",
      "1": "Line density IS what represents field strength in a field-line diagram. By convention, more lines per unit area = stronger field.",
      "3": "Line density is sufficient to compare field strengths qualitatively. P (more bunched) is stronger than Q."
    },
    explanation: "The standard convention for field-line diagrams: the closeness (line density) of the lines represents the field strength. Bunched lines = strong field; spread-out lines = weak field.\n\nThis is why, around a point mass, the field lines are densest close to the mass (where $g$ is largest) and increasingly spread out at greater $r$ (where $g$ is smaller). For an inverse-square law in three dimensions, the line density falls as $1/r^2$ — exactly matching the $g \\propto 1/r^2$ dependence.\n\nFor a uniform field (e.g., near Earth's surface on local scales), field lines are equally spaced and parallel, reflecting a constant field strength.",
    sourcePack: "Pack C (line density convention)"
  },

  // ── D.1.5-C1: uniform field near a flat surface (MCQ) ───────────────────
  {
    id: "D.1.5-C1.001",
    level: "SL",
    tags: ["D.1.5", "D.1.5-C1"],
    type: "mcq",
    marks: 1,
    prompt: "Consider a small region close to Earth's surface (much smaller than Earth's radius). The gravitational field in this region is best described as:",
    choices: [
      "radial, pointing toward Earth's centre",
      "approximately uniform: roughly equal in magnitude and parallel direction throughout the region",
      "zero, because surface effects cancel out",
      "varying linearly with horizontal position"
    ],
    answerIndex: 1,
    distractorRationales: {
      "0": "Strictly speaking yes, but the variation in direction across a SMALL region (e.g., a 100 m × 100 m area) is negligible — the field looks essentially uniform. This is why we treat 'down' as the same direction across a room or a small experiment.",
      "2": "Surface gravity isn't zero. The 9.81 N kg⁻¹ value is exactly what surface field strength is.",
      "3": "Horizontal variation IS roughly zero over small regions, but that's because the field is constant (uniform), not linear."
    },
    explanation: "Over a region much smaller than Earth's radius, the field-line geometry is well approximated as parallel and equally spaced, pointing 'down' (toward Earth's centre, but the centre is so far away that the direction barely changes across the region).\n\nThis local-uniform approximation is what justifies using simple constant-$g$ formulae like:\n• $W = mgh$ for change in PE near the surface (works to high accuracy over a few km)\n• Projectile motion with $a = g$ pointing straight down\n• $d = \\tfrac{1}{2}gt^2$ for falling objects\n\nOver larger scales (>$\\sim 100$ km vertical or horizontal), the radial nature of the field reasserts and the uniform approximation breaks down.",
    sourcePack: "Pack textbook (near-surface uniform)"
  },

  // ── D.1.5-C2: contrast uniform near-surface with radial (multi_select) ──
  {
    id: "D.1.5-C2.001",
    level: "SL",
    tags: ["D.1.5", "D.1.5-C2"],
    type: "multi_select",
    marks: 4,
    prompt: "Earth's gravitational field is depicted on two different spatial scales: (a) zoomed out to show Earth as a sphere in space, and (b) zoomed in to a small region near the surface, much smaller than Earth's radius. Which of the following statements about how the field lines are drawn at each scale are correct? Tick all that apply.",
    statements: [
      { text: "At the large scale, the lines are radial and point inward toward Earth's centre.",
        correct: true,
        rationale: "Gravity pulls toward Earth's centre. Field arrows point inward; the lines converge at the centre." },
      { text: "At the small scale, the lines are approximately parallel and equally spaced.",
        correct: true,
        rationale: "Near a single point on Earth, both the direction and magnitude of $g$ vary negligibly across the region, giving a near-uniform field." },
      { text: "At the large scale, the lines are equally spaced.",
        correct: false,
        rationale: "Line density represents field strength. Since $g \\propto 1/r^2$, the lines bunch up close to Earth and spread out far away. Not equally spaced.",
        misconception: "uniform_spacing_in_radial_field" },
      { text: "At the small scale, the lines diverge slightly because they're really radial.",
        correct: false,
        rationale: "Strictly true (the lines ARE radial at all scales), but the deviation is negligible across a region small compared with Earth's radius. The whole point of the small-scale picture is that we treat the field as uniform there.",
        misconception: "over_literal_radial_field" },
      { text: "At the large scale, the lines point outward (away from Earth's centre).",
        correct: false,
        rationale: "Gravity is attractive. Arrows point inward, not outward. Outward arrows would describe a repulsive field, like positive electric charge.",
        misconception: "wrong_field_direction" }
    ],
    explanation: "Two complementary pictures of Earth's gravitational field:\n\n• **Large scale**: radial lines pointing toward Earth's centre, with density falling as $1/r^2$ (so lines spread out as you move away).\n\n• **Small scale**: a zoomed-in patch near the surface, where the field is approximately uniform — lines parallel, equally spaced, pointing 'down'. This is the local-uniform approximation that justifies using $mgh$ for PE changes near the surface.\n\nNeither picture is wrong; they're the same field at different scales. The small-scale parallel pattern is what you get if you zoom in far enough that the radial divergence is invisible.",
    examinerNote: "Common confusion: students try to reconcile 'radial' and 'uniform' as if they're contradictory. They're not — they're descriptions at different magnifications.",
    sourcePack: "Refactored from short to multi_select per v2 brief rule 3."
  },

  // ── D.1.5-D2: map field-line pattern from equipotentials (multi_select) ──
  {
    id: "D.1.5-D2.001",
    level: "SL",
    tags: ["D.1.5", "D.1.5-D2"],
    type: "multi_select",
    marks: 4,
    prompt: "You're given a diagram showing gravitational equipotential surfaces around a complicated mass distribution (such as a binary star system) and asked to construct the gravitational field-line pattern over the same region. Which of the following rules are correct to use? Tick all that apply.",
    statements: [
      { text: "Field lines cross each equipotential at right angles (perpendicular).",
        correct: true,
        rationale: "No work is done moving along an equipotential, so the force component along the surface is zero. This forces the field to be perpendicular." },
      { text: "Field lines point in the direction of decreasing potential (toward more negative $V$).",
        correct: true,
        rationale: "Since $g = -dV/dr$, the field points in the direction of steepest decrease in $V$. A released mass accelerates that way." },
      { text: "Field lines connect points of equal potential.",
        correct: false,
        rationale: "Points of equal potential lie ON the same equipotential SURFACE. Field lines CROSS equipotentials at right angles — they don't connect points along them.",
        misconception: "field_lines_along_equipotentials" },
      { text: "Field lines should be equally spaced everywhere.",
        correct: false,
        rationale: "Field-line density represents field STRENGTH. Lines bunch up where the field is strong (and equipotentials are closely packed) and spread out where it's weak. Equal spacing would only hold in a uniform field.",
        misconception: "uniform_spacing_in_radial_field" },
      { text: "Field lines point toward LESS negative (more positive) potential.",
        correct: false,
        rationale: "Direction is wrong. Field points 'downhill' in $V$ — from less negative to more negative, NOT the other way.",
        misconception: "field_direction_inverted" }
    ],
    explanation: "Two rules suffice to construct the field-line pattern from a set of equipotentials:\n\n1. Perpendicular to each equipotential. (From the work-zero argument on an equipotential.)\n2. Toward more negative $V$. (From $g = -dV/dr$.)\n\nPractical method: start at any equipotential, draw a short arrow perpendicular to it, pointed toward the nearby equipotential with lower $V$. Continue along, rotating to stay perpendicular to each equipotential the line crosses.",
    examinerNote: "Both true statements are needed for a full construction. Either alone fixes orientation OR direction but not both; you need both.",
    sourcePack: "Pack C (mapping field from V). Refactored from short to multi_select per v2 brief rule 3."
  },

  // ── D.1.4-H2 PHASED: orbital g → speed → period ─────────────────────────
  {
    id: "D.1.4-H2.PHASED.001",
    level: "SL",
    tags: ["D.1.4", "D.1.4-H2"],
    marks: 4,
    prompt: "A satellite orbits Earth in a circular orbit at an altitude of $600$ km above the surface. Earth has mass $M = 5.97\\times10^{24}$ kg and radius $R = 6.37\\times10^6$ m. $G = 6.674\\times10^{-11}$ N m² kg⁻². Work through the orbital quantities in turn.",
    phases: [
      {
        kind: "numeric",
        marks: 2,
        prompt: "Calculate the gravitational field strength at the orbital radius, in N kg⁻¹, to 3 s.f.",
        expectedNumeric: 8.20,
        tolerance: 0.03,
        unitHint: "N kg⁻¹"
      },
      {
        kind: "numeric",
        marks: 1,
        prompt: "Using your value of $g$ at the orbital radius, find the satellite's orbital speed, in m s⁻¹, to 3 s.f.",
        expectedNumeric: 7560,
        tolerance: 20,
        unitHint: "m s⁻¹"
      },
      {
        kind: "numeric",
        marks: 1,
        prompt: "Now find the orbital period, in seconds, to 3 s.f.",
        expectedNumeric: 5790,
        tolerance: 30,
        unitHint: "s"
      }
    ],
    explanation: "Phase 1. $r = R + h = 6.37\\times10^6 + 6.00\\times10^5 = 6.97\\times10^6$ m.\n$g = GM/r^2 = (6.674\\times10^{-11})(5.97\\times10^{24})/(6.97\\times10^6)^2 \\approx 8.20$ N kg⁻¹.\n\nPhase 2. In circular orbit, $g$ provides the centripetal acceleration: $g = v^2/r$, so $v = \\sqrt{gr} = \\sqrt{8.20 \\times 6.97\\times10^6} \\approx 7561$ m s⁻¹.\n\nPhase 3. $T = 2\\pi r/v = 2\\pi (6.97\\times10^6)/7561 \\approx 5790$ s ≈ 96.5 minutes.\n\nThis is the canonical low-Earth-orbit time of about 90-100 minutes, which gives you ~16 orbits per day. Many real spy and Earth-imaging satellites operate at this altitude for that reason: enough that you cover the whole Earth each day, low enough that the ground resolution is good.",
    examinerNote: "Three phases drilling the orbital chain. The point of phasing this question: each step is one mark in an IB markscheme, and a student can score partially even if they get an early phase wrong. With phased scoring, getting phase 1 wrong doesn't cost you phase 2 (which uses your own answer from phase 1 as input).\n\nCommon slips: phase 1 — using $r = R$ (gives surface $g$); phase 2 — forgetting the square root; phase 3 — using $T = 2\\pi v/r$ (inverted).",
    sourcePack: "original (textbook orbital chain)"
  },

  // ════════════════════════════════════════════════════════════════════════
  // Batch 12 — HL gaps in D.1.H.2 through D.1.H.9. Mix of MCQ, numeric,
  // long-form. Uses curve_probe for D.1.H.4-B1 (two-probe ΔV/Δr) and the
  // E_orbit curve for D.1.H.2-D2.
  // ════════════════════════════════════════════════════════════════════════

  // ── D.1.H.2-B2: less negative at larger r (MCQ pick-best) ────────────────
  {
    id: "D.1.H.2-B2.001",
    level: "HL",
    tags: ["D.1.H.2", "D.1.H.2-B2"],
    type: "mcq",
    marks: 1,
    prompt: "A satellite is moved from a circular orbit at radius $r$ to a higher circular orbit at radius $2r$. Which of the following best describes what happens to the gravitational potential energy $E_p$ of the satellite-Earth system?",
    choices: [
      "Magnitude halves; $E_p$ becomes less negative (closer to zero).",
      "Magnitude doubles; $E_p$ becomes more negative.",
      "Magnitude halves; $E_p$ becomes more negative.",
      "Magnitude doubles; $E_p$ becomes less negative."
    ],
    answerIndex: 0,
    distractorRationales: {
      "1": "Wrong scaling. $E_p \\propto -1/r$, not $-r$, so doubling $r$ HALVES the magnitude, not doubles it. You may have confused the scaling of $E_p$ with that of $E_k$ relative to $r$ — but $E_k$ ALSO scales as $1/r$, so it falls too.",
      "2": "Magnitude direction is right, sign direction is wrong. Moving to a higher orbit means less-bound, so $E_p$ moves TOWARD zero (less negative), not away from it.",
      "3": "Both wrong. Magnitude halves (not doubles), and direction is toward zero (less negative)."
    },
    explanation: "$E_p = -GMm/r$. Doubling $r$:\n• $|E_p|$ halves (from $GMm/r$ to $GMm/(2r)$).\n• $E_p$ becomes less negative (e.g. from $-10$ J to $-5$ J), which is the same as saying $E_p$ INCREASES (as a signed number).\n\nThe two ways of saying it ('magnitude halves' / 'becomes less negative') are equivalent. Both correct.",
    examinerNote: "The standard sign-convention trap: 'Ep decreases' is ambiguous in everyday English (more negative? smaller in magnitude?). Asking about magnitude and sign separately disambiguates.",
    sourcePack: "Refactored from short to mcq pick-best per v2 brief rule 3."
  },

  // ── D.1.H.2-C1: ΔEp between orbits (numeric) ─────────────────────────────
  {
    id: "D.1.H.2-C1.001",
    level: "HL",
    tags: ["D.1.H.2", "D.1.H.2-C1"],
    type: "numeric",
    marks: 3,
    prompt: "A $1500$ kg satellite is moved from a circular orbit at $r_1 = R_E + 800$ km to a lower circular orbit at $r_2 = R_E + 200$ km. Calculate the change in gravitational potential energy of the satellite-Earth system, $\\Delta E_p = E_p(r_2) - E_p(r_1)$, in joules to 3 s.f.\n\nEarth's mass $M = 5.97\\times10^{24}$ kg, radius $R_E = 6.37\\times10^6$ m. $G = 6.674\\times10^{-11}$ N m² kg⁻². Express your answer with the correct sign.",
    expectedNumeric: -7.61e9,
    tolerance: 5e7,
    unitHint: "J",
    explanation: "$\\Delta E_p = -GMm/r_2 - (-GMm/r_1) = GMm(1/r_1 - 1/r_2)$.\n\n$r_1 = 7.17\\times10^6$ m, $r_2 = 6.57\\times10^6$ m.\n\n$E_p(r_1) = -(6.674\\times10^{-11})(5.97\\times10^{24})(1500)/(7.17\\times10^6) \\approx -8.34\\times10^{10}$ J.\n$E_p(r_2) = -(6.674\\times10^{-11})(5.97\\times10^{24})(1500)/(6.57\\times10^6) \\approx -9.10\\times10^{10}$ J.\n\n$\\Delta E_p = E_p(r_2) - E_p(r_1) \\approx -7.61 \\times 10^9$ J.\n\nThe sign is NEGATIVE because moving to a smaller orbit makes the potential energy MORE negative (you've fallen into a deeper well).",
    examinerNote: "The sign is the whole point of this question. Many students:\n• Compute $|E_p(r_2)| - |E_p(r_1)|$ and report a positive answer (gives $+7.6 \\times 10^9$, wrong sign);\n• Confuse '$E_p$ decreased' (i.e., became more negative, so $\\Delta E_p < 0$) with 'magnitude decreased' (which it didn't — magnitude INCREASED).\n\nSanity: dropping to a lower orbit releases gravitational PE; that energy has gone somewhere (KE has increased, drag has dissipated it, etc.). The negative $\\Delta E_p$ reflects this release.",
    sourcePack: "Pack questions on ΔEp"
  },

  // ── D.1.H.2-D2: Ek, Ep, E vs r graph (numeric+tool) ──────────────────────
  {
    id: "D.1.H.2-D2.001",
    level: "HL",
    tags: ["D.1.H.2", "D.1.H.2-D2", "graph_read"],
    type: "numeric",
    marks: 2,
    prompt: "The graph below shows the total mechanical energy $E$ of a $1000$ kg satellite in a circular orbit around Earth, as a function of orbital radius $r$. Read off $E$ at $r = 1.0 \\times 10^7$ m. Give your answer in joules to 3 s.f.",
    tool: {
      name: "curve_probe",
      config: {
        curve: "E_orbit",
        M: 5.97e24,
        m: 1000,
        domain: [6.4e6, 4.0e7],
        initialR: "random",
        showArea: false,
        xLabel: "r", xUnits: "m",
        yLabel: "E", yUnits: "J"
      }
    },
    expectedNumeric: -1.992e10,
    tolerance: 2e8,
    unitHint: "J",
    explanation: "$E = -GMm/(2r) = -(6.674\\times10^{-11})(5.97\\times10^{24})(1000)/(2 \\times 10^7) \\approx -1.99 \\times 10^{10}$ J.\n\nRecall the relations for a circular orbit:\n• $E_k = +GMm/(2r) \\approx +1.99\\times10^{10}$ J (always positive)\n• $E_p = -GMm/r \\approx -3.98\\times10^{10}$ J (always negative)\n• $E = E_k + E_p = -GMm/(2r) \\approx -1.99\\times10^{10}$ J\n\nSo $E = E_p/2 = -E_k$ — three statements of the same fact for a circular orbit.\n\nThe widget shows the $E$ curve. To read $E_k$ or $E_p$ separately you'd need different widget configs (`Ek_orbit` or `Ep_radial`); these all share the same overall shape but differ in scale and sign.",
    examinerNote: "Drag the probe to $r = 1.0\\times10^7$ m and read $E$ from the live readout. Note this is the TOTAL energy, not just KE or PE. The fact that $E < 0$ for a bound orbit is a recurring point — a positive $E$ would mean unbound (escaping).",
    sourcePack: "Pack D (Ek, Ep, E graphs)"
  },

  // ── D.1.H.3-C3: rV = constant outside a point mass (numeric) ─────────────
  {
    id: "D.1.H.3-C3.001",
    level: "HL",
    tags: ["D.1.H.3", "D.1.H.3-C3"],
    type: "numeric",
    marks: 2,
    prompt: "For any gravitating body that behaves as a point mass (e.g., Earth from outside), the product $rV$ (radial distance times gravitational potential) is constant for all $r$ outside the body. Calculate the numerical value of $rV$ for Earth, in J m kg⁻¹, to 3 s.f.\n\nEarth's mass $M = 5.97\\times10^{24}$ kg. $G = 6.674\\times10^{-11}$ N m² kg⁻².",
    hints: [
      "What's the formula for $V$ at distance $r$ from a point mass? Multiply both sides by $r$.",
      "$V = -GM/r$, so $rV = -GM$. The $r$ cancels out — the value doesn't depend on where you measure.",
      "$rV = -GM \\approx -(6.674\\times10^{-11})(5.97\\times10^{24})$. Compute that."
    ],
    expectedNumeric: -3.98e14,
    tolerance: 1e12,
    unitHint: "J m kg⁻¹",
    explanation: "$V = -GM/r$, so $rV = -GM$, independent of $r$.\n\nNumerically: $rV = -(6.674\\times10^{-11})(5.97\\times10^{24}) \\approx -3.98 \\times 10^{14}$ J m kg⁻¹.\n\nThis means if you measure $V$ at the surface ($r = R_E$), at LEO altitude, at the Moon's orbital radius, or at any other external point, $rV$ comes out to the same constant. The constancy is a stringent test of point-mass behaviour: if you measured $rV$ in real data and found it constant across orders of magnitude in $r$, that's strong evidence that the source is well approximated as a point.\n\nThis links to D.1.3-C1 (data consistent with point-mass behaviour): observed constancy of $rV$ is exactly the test you'd perform.",
    examinerNote: "Common slips: getting the sign wrong (writing $+GM$ instead of $-GM$); using $r$ in km instead of m; multiplying $G$ and $M$ but forgetting to negate.\n\nThe units (J m kg⁻¹) are a hybrid of $r$'s (m) and $V$'s (J kg⁻¹), which often confuses students. Either keep them or drop them; they don't affect marking but they're informative.",
    sourcePack: "Pack D (rV constant)"
  },

  // ── D.1.H.4-B1: average g from ΔV/Δr (numeric+tool) ─────────────────────
  {
    id: "D.1.H.4-B1.001",
    level: "HL",
    tags: ["D.1.H.4", "D.1.H.4-B1", "graph_read"],
    type: "numeric",
    marks: 2,
    prompt: "The graph shows gravitational potential $V$ versus $r$ outside Earth. The two-probe widget lets you read $V$ at two positions and shows their difference. Estimate the magnitude of the gravitational field strength at $r \\approx 1.0 \\times 10^7$ m, using probe positions at $r_1 = 9.0 \\times 10^6$ m and $r_2 = 1.1 \\times 10^7$ m. Give your answer in N kg⁻¹, to 2 s.f.",
    hints: [
      "Field strength and potential are linked via a derivative. Over a short interval, you can approximate the local derivative by the average slope.",
      "$g \\approx -\\Delta V/\\Delta r$ (in magnitude: $|g| \\approx |\\Delta V/\\Delta r|$). The widget's $\\Delta V$ readout combined with the interval width gives you the answer.",
      "$|g| \\approx |V_2 - V_1| / (r_2 - r_1)$. Plug in the two readings."
    ],
    tool: {
      name: "curve_probe",
      config: {
        curve: "V_radial",
        M: 5.97e24,
        domain: [6.4e6, 4.0e7],
        initialR: "random",
        showArea: true,
        xLabel: "r", xUnits: "m",
        yLabel: "V", yUnits: "J kg⁻¹"
      }
    },
    expectedNumeric: 4.0,
    tolerance: 0.2,
    unitHint: "N kg⁻¹",
    explanation: "Read $V$ at the two probes (the widget shows both via the `showArea: true` mode):\n• $V_1 = V(9.0\\times10^6) = -GM/r_1 \\approx -4.42\\times10^7$ J kg⁻¹\n• $V_2 = V(1.1\\times10^7) = -GM/r_2 \\approx -3.62\\times10^7$ J kg⁻¹\n\nCompute the average gradient over the interval:\n$|g|_{\\text{avg}} \\approx |\\Delta V/\\Delta r| = |(-3.62\\times10^7) - (-4.42\\times10^7)| / (1.1\\times10^7 - 9.0\\times10^6) = (8.0\\times10^6)/(2.0\\times10^6) = 4.0$ N kg⁻¹.\n\nCompare to the exact value: $g(1.0\\times10^7) = GM/r^2 \\approx 3.98$ N kg⁻¹. The average over the symmetric interval gives the value at the midpoint to high accuracy because the function is locally well-approximated by its tangent.",
    examinerNote: "Test of the average-gradient method (as opposed to the instantaneous tangent of D.1.H.4-A1). Common slips: using $V_2 - V_1$ without taking absolute value (gives negative $g$, technically signed-$g$ but the question asked for magnitude); forgetting that $|g|$ has the absolute value sign and reporting $-4.0$.",
    sourcePack: "Pack D (g from ΔV/Δr)"
  },

  // ── D.1.H.5-C1: zero work in a full circular orbit (PHASED) ─────────────
  {
    id: "D.1.H.5-C1.PHASED.001",
    level: "HL",
    tags: ["D.1.H.5", "D.1.H.5-C1"],
    marks: 2,
    prompt: "A satellite completes one full circular orbit around Earth, returning to its starting position.",
    phases: [
      {
        kind: "numeric",
        marks: 1,
        prompt: "What is the work done by gravity on the satellite over one full orbit, in joules?",
        expectedNumeric: 0,
        tolerance: 0.001,
        unitHint: "J"
      },
      {
        kind: "mcq",
        marks: 1,
        prompt: "Which is the BEST single-sentence reason for that answer?",
        choices: [
          "The gravitational force is always perpendicular to the satellite's velocity in a circular orbit, so the instantaneous power $\\vec F \\cdot \\vec v$ is zero at every point.",
          "The satellite travels a long path, so the work cancels out by symmetry.",
          "Gravity does no work because the satellite is in vacuum.",
          "Work depends on displacement only when the force is constant; here the force varies in direction so work is undefined."
        ],
        answerIndex: 0,
        distractorRationales: {
          "1": "'Cancels by symmetry' is hand-waving. The right argument is more concrete: force perpendicular to motion at every point gives zero power, integrated to zero over any path. (Or equivalently: gravity is conservative and the path is closed.)",
          "2": "Vacuum is irrelevant. Drag (a friction-like force) requires a medium and acts opposite to motion. Gravity acts in vacuum just fine; the reason it does no work over a full orbit is force-perpendicular-to-velocity.",
          "3": "Force varies in direction but $W = \\int \\vec F \\cdot d\\vec s$ is perfectly well-defined for any force field along any path. Gravity is conservative, so over a closed loop $W = 0$ regardless."
        }
      }
    ],
    explanation: "Two equivalent ways to see that gravity does no work over a full circular orbit:\n\n1. **Force perpendicular to motion**. In a circular orbit, gravity points radially inward and the satellite's velocity is tangential. $\\vec F \\cdot \\vec v = 0$ at every point, so the instantaneous power is zero. Integrating gives total work zero.\n\n2. **Closed loop, conservative force**. Gravity is conservative, so $W = -\\Delta E_p$. A full orbit returns the satellite to its starting position, so $\\Delta E_p = 0$, and therefore $W = 0$. (Equivalently: a circular orbit lies on an equipotential surface, so $\\Delta V = 0$.)\n\nBoth arguments are valid; the first is the more elementary one.",
    examinerNote: "Refactored from short to phased (numeric + mcq pick-best). The numeric phase forces an unambiguous answer for the work value; the MCQ phase tests the reasoning. A student who gets the numeric right but picks distractor (b) knows the answer but not why.",
    sourcePack: "Refactored from short to phased per v2 brief rule 3."
  },

  // ── D.1.H.5-D2: work to move from r to 2r (numeric) ─────────────────────
  {
    id: "D.1.H.5-D2.001",
    level: "HL",
    tags: ["D.1.H.5", "D.1.H.5-D2"],
    type: "numeric",
    marks: 2,
    prompt: "A $1500$ kg satellite is moved from a circular orbit at radius $r = R_E$ (i.e., just skimming Earth's surface, ignoring atmosphere) to a circular orbit at radius $2R_E$. Calculate the work that must be done by an external agent on the satellite for this orbit change. Express as a positive number in joules to 3 s.f.\n\nEarth's mass $M = 5.97\\times10^{24}$ kg, $R_E = 6.37\\times10^6$ m. $G = 6.674\\times10^{-11}$ N m² kg⁻².",
    expectedNumeric: 2.35e10,
    tolerance: 5e8,
    unitHint: "J",
    misconceptions: [
      {
        id: "forgot_orbital_KE_change",
        label: "Computed only $\\Delta E_p = GMm/(2R)$, treating this as 'object at rest moves up the hill'. But both endpoints are CIRCULAR ORBITS, so kinetic energy changes too — and it DECREASES (slower orbit at bigger r). The external work is the change in TOTAL mechanical energy, which is half of $\\Delta E_p$.",
        expectedNumeric: 4.69e10,
        tolerance: 5e8,
        severity: "common"
      },
      {
        id: "computed_full_Ep_magnitude",
        label: "Computed $|E_p(R)| = GMm/R$ — that's the magnitude of the PE at the lower orbit, not a work or an energy change.",
        expectedNumeric: 9.38e10,
        tolerance: 1e9,
        severity: "common"
      }
    ],
    explanation: "Both states are circular orbits, so the total mechanical energy at each is $E = -GMm/(2r)$. The external work is the change in TOTAL energy:\n\n$W_{\\text{ext}} = \\Delta E = E(2R) - E(R) = -\\dfrac{GMm}{4R} - \\left(-\\dfrac{GMm}{2R}\\right) = +\\dfrac{GMm}{4R}$\n\nNumerically: $W = (6.674\\times10^{-11})(5.97\\times10^{24})(1500)/(4 \\times 6.37\\times10^6) \\approx 2.35\\times10^{10}$ J.\n\nWhy half of $\\Delta E_p$? Because in moving to the bigger orbit, the satellite's KINETIC energy DROPS too. The drop in KE pays for half of the gain in PE; the external agent only has to supply the other half. Concretely:\n• $\\Delta E_p = +GMm/(2R) \\approx +4.69\\times10^{10}$ J (PE rises — less negative)\n• $\\Delta E_k = -GMm/(4R) \\approx -2.35\\times10^{10}$ J (KE falls — slower at higher orbit)\n• $\\Delta E = \\Delta E_p + \\Delta E_k = +GMm/(4R) \\approx +2.35\\times10^{10}$ J — what the external agent has to supply.\n\nThis is the canonical 'moving between orbits' result. Use $\\Delta E = E_2 - E_1$ with $E = -GMm/(2r)$, not $\\Delta E_p$ alone.",
    examinerNote: "The IB markscheme convention for 'moving from one circular orbit to another' uses the change in TOTAL mechanical energy, $\\Delta E = -GMm/(2r_2) - (-GMm/(2r_1))$. Computing only $\\Delta E_p$ and reporting that gives an answer DOUBLE what's expected. The misconceptions panel flags exactly this slip.\n\nThe deeper insight: $E_k$ for a circular orbit equals $|E_p|/2$, so when you change orbit, $\\Delta E_k = -\\Delta E_p / 2$, and net $\\Delta E = \\Delta E_p / 2$. This is one of the most-tested HL gravitation ideas.",
    sourcePack: "Pack A (W from r to 2r, circular-to-circular)"
  },

  // ── D.1.H.8-E1: sub-escape launch height (numeric) ──────────────────────
  {
    id: "D.1.H.8-E1.001",
    level: "HL",
    tags: ["D.1.H.8", "D.1.H.8-E1"],
    type: "numeric",
    marks: 3,
    prompt: "A rocket is launched vertically from Earth's surface at a speed equal to $\\tfrac{3}{4}$ of Earth's escape speed. After launch, no further thrust is applied. Find the maximum altitude $h$ (above the surface) reached by the rocket, in metres, to 3 s.f.\n\nEarth: $R_E = 6.37\\times10^6$ m, $M = 5.97\\times10^{24}$ kg. $G = 6.674\\times10^{-11}$ N m² kg⁻². Treat the rocket as a point mass and ignore atmospheric drag.",
    expectedNumeric: 8.19e6,
    tolerance: 5e4,
    unitHint: "m",
    explanation: "Energy conservation from the surface to the apex (where the rocket is momentarily at rest):\n\n$\\tfrac{1}{2}mv^2 + E_p(R) = 0 + E_p(R+h)$\n\nUsing $v = \\tfrac{3}{4}v_{\\text{esc}}$, so $v^2 = (9/16)v_{\\text{esc}}^2 = (9/16)(2GM/R) = 9GM/(8R)$:\n\n$\\tfrac{1}{2}m \\cdot \\dfrac{9GM}{8R} - \\dfrac{GMm}{R} = -\\dfrac{GMm}{R+h}$\n\n$\\dfrac{9GMm}{16R} - \\dfrac{16GMm}{16R} = -\\dfrac{GMm}{R+h}$\n\n$-\\dfrac{7GMm}{16R} = -\\dfrac{GMm}{R+h}$\n\n$\\dfrac{R+h}{R} = \\dfrac{16}{7}$, so $h = \\dfrac{9R}{7}$.\n\nNumerically: $h = 9 \\times 6.37\\times10^6 / 7 \\approx 8.19 \\times 10^6$ m = $8190$ km.\n\nFor context: that's just above LEO ($\\sim 400-2000$ km) and below GEO ($\\sim 35\\,800$ km). A 3/4-escape rocket reaches about 1.3 Earth radii of altitude — not quite escape territory.",
    examinerNote: "The cleanest method is energy conservation: $\\tfrac{1}{2}v^2 - GM/R = -GM/(R+h)$. The trap is doing the constant-$g$ thing (using $\\tfrac{1}{2}v^2 = gh$, which assumes uniform field) — that's wrong over a height comparable to $R$. The full $1/r$ potential must be used.\n\nThe shortcut: $v^2 = (9/16) v_{\\text{esc}}^2 = (9/16)(2GM/R)$. Common slip: writing $v = (3/4)v_{\\text{esc}}$ but using it directly without squaring, getting the algebra wrong.",
    sourcePack: "Pack D (sub-escape height)"
  },

  // ── D.1.H.8-H1: escape from an orbiting platform (numeric) ──────────────
  {
    id: "D.1.H.8-H1.001",
    level: "HL",
    tags: ["D.1.H.8", "D.1.H.8-H1"],
    type: "numeric",
    marks: 3,
    prompt: "A spacecraft is in a circular orbit at altitude $800$ km above Earth's surface, moving at its orbital speed. The crew wants to escape Earth's gravity from this orbit. By how much must the spacecraft's speed increase (the velocity boost $\\Delta v$ applied along the direction of motion) to just reach Earth-escape speed at this radius? Give $\\Delta v$ in m s⁻¹, to 3 s.f.\n\nEarth's mass $M = 5.97\\times10^{24}$ kg, radius $R = 6.37\\times10^6$ m. $G = 6.674\\times10^{-11}$ N m² kg⁻².",
    expectedNumeric: 3090,
    tolerance: 15,
    unitHint: "m s⁻¹",
    misconceptions: [
      {
        id: "reported_value_not_difference",
        label: "Reported $v_{\\text{esc}}$ itself, not $\\Delta v = v_{\\text{esc}} - v_{\\text{orb}}$. The spacecraft is already moving at $v_{\\text{orb}}$; you only need to add the difference.",
        expectedNumeric: 10542,
        tolerance: 30,
        severity: "common"
      }
    ],
    explanation: "Both speeds depend on the same orbital radius $r = R + h = 6.77\\times10^6$ m:\n• $v_{\\text{orb}} = \\sqrt{GM/r} \\approx 7455$ m s⁻¹\n• $v_{\\text{esc}} = \\sqrt{2GM/r} = \\sqrt{2} \\cdot v_{\\text{orb}} \\approx 10\\,542$ m s⁻¹\n\n$\\Delta v = v_{\\text{esc}} - v_{\\text{orb}} = (\\sqrt{2} - 1) v_{\\text{orb}} \\approx 0.414 \\cdot 7455 \\approx 3088$ m s⁻¹.\n\nThe payoff of being in orbit is huge: from the surface you'd need $\\sim 11\\,200$ m s⁻¹ for escape, but from orbit you 'only' need an extra 3 km/s of $\\Delta v$ because the orbital motion has already paid for $\\sim 7.5$ km/s and the escape requirement is only $\\sqrt{2}$ times the orbital requirement at any $r$.\n\nThis is why real space missions almost never launch directly to escape — they stage: launch to LEO, then apply $\\Delta v$ from there. The total $\\Delta v$ budget for an interplanetary mission is much smaller when staged.",
    examinerNote: "The point of the question is the relation $v_{\\text{esc}}/v_{\\text{orb}} = \\sqrt{2}$ at any given $r$. Once you spot that, the answer is $(\\sqrt{2}-1) v_{\\text{orb}} \\approx 3.09$ km/s.\n\nCommon slip: computing $v_{\\text{esc}}$ at the surface (11.2 km/s) and subtracting the orbital speed at altitude (gives the wrong $\\Delta v$).",
    sourcePack: "Pack D (escape from orbit)"
  },

  // ── D.1.H.9-B1: T from v and r (numeric) ────────────────────────────────
  {
    id: "D.1.H.9-B1.001",
    level: "HL",
    tags: ["D.1.H.9", "D.1.H.9-B1"],
    type: "numeric",
    marks: 1,
    prompt: "A satellite in a circular orbit has orbital speed $v = 7000$ m s⁻¹ at orbital radius $r = 8.0\\times10^6$ m. Calculate its orbital period in seconds, to 3 s.f.",
    expectedNumeric: 7180,
    tolerance: 15,
    unitHint: "s",
    explanation: "In a circular orbit, the satellite travels a distance $2\\pi r$ per orbit at constant speed $v$, so the period is $T = 2\\pi r/v$.\n\n$T = 2\\pi (8.0\\times10^6)/7000 \\approx 7181$ s $\\approx 120$ minutes $\\approx 2.0$ hours.\n\nThis is a slightly higher orbit than LEO (which is typically 90-100 min). The 8 × 10⁶ m radius corresponds to an altitude of about 1630 km, somewhere between LEO and medium Earth orbit (MEO) territory.",
    examinerNote: "Trivial geometry. Common slip: forgetting the factor of $2\\pi$ (gives $T = r/v$ — way too small). Sanity: any orbit takes longer than a few minutes and less than a day (except GEO at exactly 24 h), so anything outside the 60-300 minute range for LEO/MEO is suspect.",
    sourcePack: "original (textbook problem)"
  },

  // ── D.1.H.9-F1: v_orb vs v_esc ratio at same r (numeric) ────────────────
  {
    id: "D.1.H.9-F1.001",
    level: "HL",
    tags: ["D.1.H.9", "D.1.H.9-F1"],
    type: "numeric",
    marks: 2,
    prompt: "At a given radial distance $r$ from a central body, a circular-orbit speed is $v_{\\text{orb}}$ and the escape speed is $v_{\\text{esc}}$. Find the ratio $v_{\\text{orb}}/v_{\\text{esc}}$ to 3 s.f. (The ratio is the same at every radius — work it out from the formulae.)",
    expectedNumeric: 0.707,
    tolerance: 0.005,
    unitHint: "× v_esc",
    explanation: "Orbital speed: $v_{\\text{orb}} = \\sqrt{GM/r}$.\nEscape speed: $v_{\\text{esc}} = \\sqrt{2GM/r}$.\n\nRatio: $v_{\\text{orb}}/v_{\\text{esc}} = \\sqrt{GM/r}/\\sqrt{2GM/r} = 1/\\sqrt{2} \\approx 0.707$.\n\nEquivalently, $v_{\\text{esc}} = \\sqrt{2} \\cdot v_{\\text{orb}}$ at any radius.\n\nThis ratio is the basis for several useful shortcuts:\n• An object in a circular orbit at radius $r$ needs $(\\sqrt{2}-1)v_{\\text{orb}} \\approx 0.414\\,v_{\\text{orb}}$ extra speed to escape from that orbit (D.1.H.8-H1).\n• An object falling from infinity into a circular orbit at $r$ would carry KE corresponding to $v_{\\text{esc}}$, but it needs to slow to $v_{\\text{orb}}$ to circularise — releasing about half its KE.",
    examinerNote: "The ratio $1/\\sqrt{2}$ pops up so often in orbit mechanics that it's worth committing to memory. Common slip: writing $\\sqrt{2}$ (the inverse, 1.414) instead of $1/\\sqrt{2}$ (0.707). The question specifically asks for the ratio in the form orbital-over-escape, which is less than 1.",
    sourcePack: "Pack A (orbital vs escape ratio)"
  },

  // ════════════════════════════════════════════════════════════════════════
  // Orbital energy atoms (D.1.H.9-E1, D.1.H.9-E3). The IB expects students
  // to handle ΔEk and ΔE for orbit-changing scenarios, not just ΔEp.
  // ════════════════════════════════════════════════════════════════════════

  // ── D.1.H.9-E1: kinetic energy of a satellite in circular orbit ─────────
  {
    id: "D.1.H.9-E1.001",
    level: "HL",
    tags: ["D.1.H.9", "D.1.H.9-E1"],
    type: "numeric",
    marks: 2,
    prompt: "A $1000$ kg satellite is in a circular orbit at $r = 1.0\\times10^7$ m from Earth's centre. Earth's mass $M = 5.97\\times10^{24}$ kg. $G = 6.674\\times10^{-11}$ N m² kg⁻².\n\nCalculate the satellite's kinetic energy, in joules, to 3 s.f.",
    expectedNumeric: 1.99e10,
    tolerance: 5e7,
    unitHint: "J",
    misconceptions: [
      {
        id: "computed_PE_not_KE",
        label: "Computed the magnitude of $E_p$ ($GMm/r$) — that's the potential energy magnitude, not the kinetic energy. For a circular orbit, $E_k = |E_p|/2$, half the magnitude.",
        expectedNumeric: 3.984e10,
        tolerance: 5e7,
        severity: "common"
      },
      {
        id: "missed_negative_sign",
        label: "Right magnitude but reported as negative. Kinetic energy is always positive — it's $\\tfrac{1}{2}mv^2$ with $v^2 > 0$.",
        expectedNumeric: -1.992e10,
        tolerance: 3e7,
        severity: "common"
      }
    ],
    explanation: "For a circular orbit, gravity provides the centripetal force: $\\dfrac{GMm}{r^2} = \\dfrac{mv^2}{r}$, so $v^2 = \\dfrac{GM}{r}$.\n\nKinetic energy: $E_k = \\tfrac{1}{2}mv^2 = \\dfrac{GMm}{2r}$.\n\nNumerically: $E_k = (6.674\\times10^{-11})(5.97\\times10^{24})(1000)/(2 \\times 10^7) \\approx 1.99\\times10^{10}$ J.\n\nUseful relations for the same orbit:\n• $E_k = +GMm/(2r)$ (positive, what we just computed)\n• $E_p = -GMm/r$ (negative, twice the magnitude of $E_k$)\n• $E = E_k + E_p = -GMm/(2r) = -E_k$ (negative, same magnitude as $E_k$)\n\nSo for a circular orbit, $|E_p| = 2 E_k$ and $E = -E_k$. Memorising these three relations makes orbital-energy problems much faster.",
    examinerNote: "The factor of $1/2$ in $E_k = GMm/(2r)$ comes from the orbital-speed result $v^2 = GM/r$ — the kinetic energy of a circular orbit is exactly half the magnitude of the (negative) potential energy. This is the foundational result that everything in D.1.H.9-E builds on.",
    sourcePack: "Pack D/E (orbital KE)"
  },

  // ── D.1.H.9-E3 PHASED: counterintuitive ΔEk vs ΔE going to higher orbit ─
  {
    id: "D.1.H.9-E3.PHASED.001",
    level: "HL",
    tags: ["D.1.H.9", "D.1.H.9-E3"],
    marks: 4,
    prompt: "A $1000$ kg satellite is moved from a circular orbit at $r_1 = 1.0\\times10^7$ m to a higher circular orbit at $r_2 = 2.0\\times10^7$ m. Earth's mass $M = 5.97\\times10^{24}$ kg. $G = 6.674\\times10^{-11}$ N m² kg⁻².\n\nThree quantities change in this process: kinetic energy $E_k$, potential energy $E_p$, and total mechanical energy $E$.",
    phases: [
      {
        kind: "mcq",
        marks: 1,
        prompt: "How does the satellite's KINETIC energy change in moving from the inner to the outer orbit?",
        choices: [
          "Increases",
          "Decreases",
          "Stays the same",
          "I'm not sure — show me"
        ],
        answerIndex: 1,
        distractorRationales: {
          "0": "External work is done on the satellite, but most of it goes into PE. The KE actually decreases because $v_{\\text{orb}} = \\sqrt{GM/r}$ gets smaller as $r$ gets bigger.",
          "2": "KE depends on $v^2$, and $v$ depends on $r$ in a circular orbit. So KE definitely changes with orbital radius.",
          "3": "Fine — the right answer is 'decreases' because orbital speed is lower at larger $r$."
        }
      },
      {
        kind: "numeric",
        marks: 2,
        prompt: "Calculate the magnitude of $\\Delta E_k$ (the size of the change in kinetic energy), in joules, to 3 s.f.",
        expectedNumeric: 9.96e9,
        tolerance: 1e8,
        unitHint: "J"
      },
      {
        kind: "short",
        marks: 1,
        prompt: "In one sentence: total mechanical energy $E$ INCREASES (becomes less negative) when the satellite is moved to a higher orbit, even though $E_k$ DECREASES. Briefly say what makes this consistent.",
        markPoints: [
          { any: [
            "ep increases", "potential energy increases",
            "potential energy becomes less negative", "ep becomes less negative",
            "ep increases by more than ek decreases",
            "gain in ep is bigger than the loss in ek",
            "increase in ep is greater than the decrease in ek",
            "increase in potential exceeds the loss in kinetic",
            "ep gain exceeds ek loss",
            "rise in ep outweighs the fall in ek",
            "ep changes by twice as much as ek",
            "|δep| is twice |δek|", "δep is twice δek in magnitude",
            "ep change is twice the magnitude of ek change",
            "ep changes more than ek", "ep change exceeds ek change",
            "external work raises ep more than it lowers ek",
            "external work goes mostly into ep"
          ], credit: 1 }
        ]
      }
    ],
    explanation: "Phase 1. For a circular orbit, $v_{\\text{orb}} = \\sqrt{GM/r}$ — speed DROPS as $r$ rises. So $E_k = \\tfrac{1}{2}mv^2 = GMm/(2r)$ decreases.\n\nPhase 2. $\\Delta E_k = E_k(r_2) - E_k(r_1) = \\dfrac{GMm}{2r_2} - \\dfrac{GMm}{2r_1} = \\dfrac{GMm}{2}(1/r_2 - 1/r_1)$.\n\nWith $r_1 = 10^7$, $r_2 = 2\\times10^7$: $|\\Delta E_k| = GMm/(2r_1) - GMm/(2r_2) = GMm/(4r_1) \\approx 9.96\\times10^9$ J.\n\nPhase 3. The seeming paradox: how can total $E$ INCREASE while KE DECREASES? The answer is that $E_p$ increases by TWICE as much as KE decreases.\n\nFor any circular orbit: $E_p = -GMm/r$, $E_k = +GMm/(2r)$. Comparing $\\Delta$s: $|\\Delta E_p| = GMm/(2r_1)$ (for the same orbit change), and $|\\Delta E_k| = GMm/(4r_1)$ — exactly half. The PE increase outweighs the KE decrease, and the net change in total $E$ is positive.\n\nNumerically: $\\Delta E_p = +1.99\\times10^{10}$ J (up by twice as much), $\\Delta E_k = -9.96\\times10^9$ J (down by half as much), $\\Delta E = +9.96\\times10^9$ J (net positive). The external agent supplied this net positive $\\Delta E$.",
    examinerNote: "This is the orbital-energy paradox that IB markschemes test repeatedly. The student must hold three numbers in their head: $\\Delta E_p$, $\\Delta E_k$, and $\\Delta E$ — and recognise that they're related by $\\Delta E = \\Delta E_p / 2 = -\\Delta E_k$.\n\nThe equality $|\\Delta E| = |\\Delta E_k|$ (same magnitude, opposite signs) is a useful shortcut: external work to move between orbits equals the size of the KE change.",
    sourcePack: "Pack D/E (orbital energy ladder)"
  },

  // ════════════════════════════════════════════════════════════════════════
  // Batch 13 — Fast ratio drills. Calculator-free. Clean integer or simple
  // fraction answers. Designed to keep the drilling rhythm going when the
  // student wants to grind reps, not work through a multi-step calculation.
  // ════════════════════════════════════════════════════════════════════════

  // ── D.1.1-A2.002: r_Y = 4 r_X → T_Y/T_X = 8 (clean integer) ─────────────
  {
    id: "D.1.1-A2.002",
    level: "SL",
    tags: ["D.1.1", "D.1.1-A2"],
    type: "numeric",
    marks: 1,
    prompt: "Two planets orbit the same star. Planet Y has four times the orbital radius of planet X. Find the ratio $T_Y/T_X$.",
    expectedNumeric: 8,
    tolerance: 0.05,
    unitHint: "× T_X",
    misconceptions: [
      { id: "inverted_kepler_ratio", label: "Used the wrong exponent. $T \\propto r^{3/2}$ gives 4^{3/2} = 8, not 4^{2/3} ≈ 2.52.", expectedNumeric: 2.52, tolerance: 0.1, severity: "common" },
      { id: "cubed_instead_of_3_2", label: "Cubed the ratio. $T \\propto r^{3/2}$, not $T \\propto r^3$. Answer would be 4^3 = 64.", expectedNumeric: 64, tolerance: 1, severity: "common" }
    ],
    explanation: "$T \\propto r^{3/2}$, so $T_Y/T_X = 4^{3/2} = (\\sqrt{4})^3 = 2^3 = 8$.",
    sourcePack: "original (ratio drill)"
  },

  // ── D.1.1-A2.003: r_Y = 9 r_X → T_Y/T_X = 27 ────────────────────────────
  {
    id: "D.1.1-A2.003",
    level: "SL",
    tags: ["D.1.1", "D.1.1-A2"],
    type: "numeric",
    marks: 1,
    prompt: "Planet Y orbits the same star as planet X at nine times the orbital radius. Find $T_Y/T_X$.",
    expectedNumeric: 27,
    tolerance: 0.1,
    unitHint: "× T_X",
    misconceptions: [
      { id: "inverted_kepler_ratio", label: "Used 9^{2/3} = 4.33 instead of 9^{3/2} = 27. Watch the exponent direction.", expectedNumeric: 4.33, tolerance: 0.1, severity: "common" }
    ],
    explanation: "$T_Y/T_X = 9^{3/2} = (\\sqrt{9})^3 = 3^3 = 27$.",
    sourcePack: "original (ratio drill)"
  },

  // ── D.1.1-A1.003: T_Y = 8 T_X → r_Y/r_X = 4 ─────────────────────────────
  {
    id: "D.1.1-A1.003",
    level: "SL",
    tags: ["D.1.1", "D.1.1-A1"],
    type: "numeric",
    marks: 1,
    prompt: "Planet Y has an orbital period eight times that of planet X around the same star. Find the ratio $r_Y/r_X$.",
    expectedNumeric: 4,
    tolerance: 0.05,
    unitHint: "× r_X",
    misconceptions: [
      { id: "inverted_kepler_ratio", label: "Cubed instead of raising to 2/3. $r \\propto T^{2/3}$, so $r_Y/r_X = 8^{2/3} = 4$, not $8^{3/2} \\approx 22.6$.", expectedNumeric: 22.6, tolerance: 0.5, severity: "common" }
    ],
    explanation: "$r \\propto T^{2/3}$, so $r_Y/r_X = 8^{2/3} = (\\sqrt[3]{8})^2 = 2^2 = 4$.",
    sourcePack: "original (ratio drill)"
  },

  // ── D.1.1-A1.004: T_Y = 27 T_X → r_Y/r_X = 9 ────────────────────────────
  {
    id: "D.1.1-A1.004",
    level: "SL",
    tags: ["D.1.1", "D.1.1-A1"],
    type: "numeric",
    marks: 1,
    prompt: "Planet Y has an orbital period twenty-seven times that of planet X around the same star. Find $r_Y/r_X$.",
    expectedNumeric: 9,
    tolerance: 0.1,
    unitHint: "× r_X",
    explanation: "$r_Y/r_X = 27^{2/3} = (\\sqrt[3]{27})^2 = 3^2 = 9$.",
    sourcePack: "original (ratio drill)"
  },

  // ── D.1.4-C2.004: altitude h = 2R, g/g_surface = 1/9 (MCQ) ──────────────
  {
    id: "D.1.4-C2.004",
    level: "SL",
    tags: ["D.1.4", "D.1.4-C2"],
    type: "mcq",
    marks: 1,
    prompt: "At an altitude equal to twice Earth's radius above the surface, what is the gravitational field strength as a fraction of the surface value?",
    choices: [
      "1/3",
      "1/4",
      "1/9",
      "1/16"
    ],
    answerIndex: 2,
    distractorRationales: {
      "0": "You may have used $r \\propto 1/g$ instead of $r^2 \\propto 1/g$. Inverse SQUARE law, so 1/(centre-to-centre distance squared) ratio.",
      "1": "1/4 is the answer for altitude equal to ONE Earth radius (so $r = 2R$). Here the altitude is two Earth radii, so $r = 3R$ and the ratio is $1/9$.",
      "3": "1/16 is the answer for altitude equal to THREE Earth radii (so $r = 4R$). Off by one in the altitude-to-r conversion."
    },
    explanation: "Altitude $h = 2R$ means centre-to-centre distance $r = R + h = 3R$. So $g/g_0 = (R/r)^2 = (1/3)^2 = 1/9$.",
    sourcePack: "original (ratio drill)"
  },

  // ── D.1.4-D1.002: 2× M, same R → g doubles (MCQ) ────────────────────────
  {
    id: "D.1.4-D1.002",
    level: "SL",
    tags: ["D.1.4", "D.1.4-D1"],
    type: "mcq",
    marks: 1,
    prompt: "Planet Y has twice the mass of Planet X but the same radius. The surface gravitational field strength on Y, compared with on X, is:",
    choices: [
      "half as strong",
      "the same",
      "twice as strong",
      "four times as strong"
    ],
    answerIndex: 2,
    explanation: "$g = GM/R^2$. Doubling $M$ at fixed $R$ doubles $g$.",
    sourcePack: "original (ratio drill)"
  },

  // ── D.1.4-D1.003: same M, 3× R → g/9 (MCQ) ──────────────────────────────
  {
    id: "D.1.4-D1.003",
    level: "SL",
    tags: ["D.1.4", "D.1.4-D1"],
    type: "mcq",
    marks: 1,
    prompt: "Planet Y has the same mass as Planet X but three times the radius. The surface gravitational field strength on Y, compared with on X, is:",
    choices: [
      "9 times as strong",
      "3 times as strong",
      "1/3 as strong",
      "1/9 as strong"
    ],
    answerIndex: 3,
    distractorRationales: {
      "0": "Wrong direction. Bigger radius means $g$ is SMALLER, since $g = GM/R^2$ decreases as $R$ grows.",
      "1": "Right direction (bigger R → smaller g) but you've used $g \\propto 1/R$ instead of $g \\propto 1/R^2$. The inverse-square law squares the ratio.",
      "2": "$1/3$ would be right if $g \\propto 1/R$. But the law is $g \\propto 1/R^2$, so it's $1/9$, not $1/3$."
    },
    explanation: "$g = GM/R^2$. Tripling $R$ at fixed $M$ divides $g$ by $3^2 = 9$.",
    sourcePack: "original (ratio drill)"
  },

  // ── D.1.4-D2.003: same density, R triples → g triples (MCQ) ─────────────
  {
    id: "D.1.4-D2.003",
    level: "SL",
    tags: ["D.1.4", "D.1.4-D2"],
    type: "mcq",
    marks: 1,
    prompt: "Two planets have the same average density. Planet B has three times the radius of Planet A. The surface gravitational field strength on B is:",
    choices: [
      "1/3 that of A",
      "the same as A",
      "3 times that of A",
      "9 times that of A"
    ],
    answerIndex: 2,
    distractorRationales: {
      "0": "Treated $g \\propto 1/R^2$ alone, ignoring that mass also scales with $R$ (at constant density, $M \\propto R^3$).",
      "1": "Treated as if mass and radius scaling cancel exactly. They don't: mass scales as $R^3$ and gravity scales as $M/R^2 \\propto R$, so $g$ grows linearly with $R$.",
      "3": "Squared instead of linear. $g \\propto M/R^2 \\propto R^3/R^2 = R$, so the scaling is linear in $R$, not quadratic."
    },
    explanation: "At constant density, $M \\propto R^3$ (volume scales as $R^3$). So $g = GM/R^2 \\propto R^3/R^2 = R$. Triple the radius, triple the surface $g$.",
    sourcePack: "original (ratio drill)"
  },

  // ── D.1.2-B1.002: both distances double → F/4 (MCQ) ─────────────────────
  {
    id: "D.1.2-B1.002",
    level: "SL",
    tags: ["D.1.2", "D.1.2-B1"],
    type: "mcq",
    marks: 1,
    prompt: "Two masses experience gravitational force $F$ at separation $d$. The separation is doubled, with the masses unchanged. The new force is:",
    choices: [
      "$F/2$",
      "$F/4$",
      "$2F$",
      "$4F$"
    ],
    answerIndex: 1,
    explanation: "$F \\propto 1/r^2$. Doubling $r$ gives $F/4$.",
    sourcePack: "original (ratio drill)"
  },

  // ── D.1.2-B1.003: m1 doubles, m2 triples, r same → F × 6 ────────────────
  {
    id: "D.1.2-B1.003",
    level: "SL",
    tags: ["D.1.2", "D.1.2-B1"],
    type: "numeric",
    marks: 1,
    prompt: "Two masses experience gravitational force $F$ at separation $d$. One mass is doubled, the other is tripled, and the separation is unchanged. The new force, in units of $F$, is:",
    expectedNumeric: 6,
    tolerance: 0.1,
    unitHint: "× F",
    explanation: "$F \\propto m_1 m_2$ at fixed $r$. Doubling one and tripling the other gives $\\times 2 \\times 3 = \\times 6$.",
    sourcePack: "original (ratio drill)"
  },

  // ── D.1.2-B1.004: m1×2, r×3 → F × 2/9 ────────────────────────────────────
  {
    id: "D.1.2-B1.004",
    level: "SL",
    tags: ["D.1.2", "D.1.2-B1"],
    type: "numeric",
    marks: 1,
    prompt: "Two masses experience gravitational force $F$ at separation $d$. One mass is doubled and the separation is tripled. The new force, in units of $F$, is:",
    expectedNumeric: 0.2222,
    tolerance: 0.01,
    unitHint: "× F",
    explanation: "$F \\propto m_1 m_2 / r^2$. One mass $\\times 2$ multiplies $F$ by 2. Separation $\\times 3$ divides $F$ by $9$. Net: $F \\times 2/9 \\approx 0.222$.",
    sourcePack: "original (ratio drill)"
  },

  // ── D.1.H.9-A3.002: same r, 4× M → v doubles (MCQ) ──────────────────────
  {
    id: "D.1.H.9-A3.002",
    level: "HL",
    tags: ["D.1.H.9", "D.1.H.9-A3"],
    type: "mcq",
    marks: 1,
    prompt: "Two satellites orbit at the same radius around different stars. Satellite A orbits a star of mass $M$; satellite B orbits a star of mass $4M$. The ratio of B's orbital speed to A's orbital speed is:",
    choices: [
      "1/4",
      "1/2",
      "2",
      "4"
    ],
    answerIndex: 2,
    distractorRationales: {
      "0": "Wrong direction. Bigger central mass means stronger pull, so faster orbital speed at the same radius.",
      "1": "Right direction but wrong factor. $v \\propto \\sqrt{M}$, so a 4× mass ratio is a $\\sqrt{4} = 2$× speed ratio.",
      "3": "Used $v \\propto M$ instead of $v \\propto \\sqrt{M}$. The square root comes from the $\\sqrt{}$ in the orbital-speed formula."
    },
    explanation: "$v = \\sqrt{GM/r}$, so at fixed $r$, $v \\propto \\sqrt{M}$. Quadrupling $M$ doubles $v$.",
    sourcePack: "original (ratio drill)"
  },

  // ── D.1.H.9-A3.003: same M, 4× r → v halves (MCQ) ───────────────────────
  {
    id: "D.1.H.9-A3.003",
    level: "HL",
    tags: ["D.1.H.9", "D.1.H.9-A3"],
    type: "mcq",
    marks: 1,
    prompt: "Two satellites orbit the same planet. Satellite B has four times the orbital radius of satellite A. The ratio of B's orbital speed to A's is:",
    choices: [
      "1/4",
      "1/2",
      "2",
      "4"
    ],
    answerIndex: 1,
    explanation: "$v = \\sqrt{GM/r}$, so at fixed $M$, $v \\propto 1/\\sqrt{r}$. Quadrupling $r$ halves $v$.",
    sourcePack: "original (ratio drill)"
  },

  // ── D.1.H.8-C2.003: 4× M, same R → v_esc doubles (MCQ) ──────────────────
  {
    id: "D.1.H.8-C2.003",
    level: "HL",
    tags: ["D.1.H.8", "D.1.H.8-C2"],
    type: "mcq",
    marks: 1,
    prompt: "Planet Y has four times the mass of Planet X but the same radius. The escape speed from the surface of Y, compared with from the surface of X, is:",
    choices: [
      "the same",
      "twice as large",
      "four times as large",
      "sixteen times as large"
    ],
    answerIndex: 1,
    explanation: "$v_{\\text{esc}} = \\sqrt{2GM/R}$, so $v_{\\text{esc}} \\propto \\sqrt{M}$ at fixed $R$. Quadrupling $M$ doubles $v_{\\text{esc}}$.",
    sourcePack: "original (ratio drill)"
  },

  // ── D.1.H.9-E1.002: E_k at r vs at 4r → ratio 4 (MCQ) ───────────────────
  {
    id: "D.1.H.9-E1.002",
    level: "HL",
    tags: ["D.1.H.9", "D.1.H.9-E1"],
    type: "mcq",
    marks: 1,
    prompt: "Two satellites of equal mass are in circular orbits around the same planet. Satellite A is at radius $r$; satellite B is at radius $4r$. The ratio of A's kinetic energy to B's is:",
    choices: [
      "1/4",
      "1/2",
      "2",
      "4"
    ],
    answerIndex: 3,
    distractorRationales: {
      "0": "Wrong direction. Inner orbit has HIGHER orbital speed and HIGHER kinetic energy. $E_k \\propto 1/r$ for circular orbits.",
      "1": "Wrong factor. $E_k = GMm/(2r) \\propto 1/r$, not $1/\\sqrt{r}$. The square root applies to speed, not kinetic energy.",
      "2": "Right direction but wrong factor. KE ratio = $r_B/r_A = 4$, not $\\sqrt{4} = 2$."
    },
    explanation: "$E_k = GMm/(2r)$ for a circular orbit. So $E_k(r)/E_k(4r) = (1/r)/(1/(4r)) = 4$.",
    sourcePack: "original (ratio drill)"
  },

  // ════════════════════════════════════════════════════════════════════════
  // Batch 14 — Ratio variants targeting the under-covered atoms per the
  // architect's BANK_AUDIT_RATIO_VS_CALC.md. Two-source field, escape ratios,
  // drag-induced ratio change, energy ratios in orbit.
  // ════════════════════════════════════════════════════════════════════════

  // ── D.1.4-E1.002: zero-field point for two EQUAL masses (MCQ) ───────────
  {
    id: "D.1.4-E1.002",
    level: "SL",
    tags: ["D.1.4", "D.1.4-E1"],
    type: "mcq",
    marks: 1,
    prompt: "Two equal point masses are separated by a distance $D$. Along the line joining their centres, where is the point at which the net gravitational field is zero?",
    choices: [
      "At one of the two masses",
      "One third of the way along, closer to one mass",
      "At the midpoint, exactly halfway between them",
      "There is no such point"
    ],
    answerIndex: 2,
    distractorRationales: {
      "0": "Field is infinite (or undefined) at a point mass, not zero.",
      "1": "The 'closer to the smaller mass' answer applies when the masses are UNEQUAL. For equal masses, the symmetry gives the midpoint.",
      "3": "The field IS zero somewhere on the line, by the intermediate-value theorem: the field reverses direction as you cross between the two attracting masses, so it must pass through zero in between."
    },
    explanation: "By symmetry, two equal masses produce equal-magnitude opposing fields exactly at the midpoint. The two contributions cancel, giving net field zero.\n\nFor unequal masses, the zero-field point lies closer to the lighter mass (per the existing D.1.4-E1.001 Earth-Moon example, where the zero-field point is much closer to the Moon).",
    sourcePack: "original (ratio drill)"
  },

  // ── D.1.4-E2.002: clean ratio of fields from two unequal masses (MCQ) ───
  {
    id: "D.1.4-E2.002",
    level: "SL",
    tags: ["D.1.4", "D.1.4-E2"],
    type: "mcq",
    marks: 1,
    prompt: "A test point lies at the same distance from two different stars: star X with mass $M$, and star Y with mass $16M$. The ratio of the gravitational field strength at the test point due to Y, to that due to X, is:",
    choices: [
      "4",
      "8",
      "16",
      "256"
    ],
    answerIndex: 2,
    distractorRationales: {
      "0": "Used $g \\propto \\sqrt{M}$. The relevant scaling is linear in $M$ at fixed $r$, not square root.",
      "1": "Wrong factor altogether.",
      "3": "Squared the mass ratio. $g \\propto M$ at fixed $r$, so the ratio is just $16$, not $16^2$."
    },
    explanation: "At fixed distance, $g \\propto M$ (from $g = GM/r^2$). So $g_Y/g_X = M_Y/M_X = 16$.\n\nIf the distances were different, you'd also need to factor in $1/r^2$. Here the distances are equal, so the radius cancels.",
    sourcePack: "original (ratio drill)"
  },

  // ── D.1.4-D1.004: 2M, 3R → g × 2/9 (numeric) ────────────────────────────
  {
    id: "D.1.4-D1.004",
    level: "SL",
    tags: ["D.1.4", "D.1.4-D1"],
    type: "numeric",
    marks: 1,
    prompt: "Planet X has twice Earth's mass and three times Earth's radius. The surface gravitational field strength on X, as a fraction of Earth's, is:",
    expectedNumeric: 0.2222,
    tolerance: 0.005,
    unitHint: "× g_Earth",
    misconceptions: [
      { id: "forgot_to_square_R_ratio", label: "Used $g \\propto M/R$ instead of $g \\propto M/R^2$. Gives $2/3 \\approx 0.667$.", expectedNumeric: 0.667, tolerance: 0.01, severity: "common" }
    ],
    explanation: "$g \\propto M/R^2$. So $g_X/g_E = (M_X/M_E)/(R_X/R_E)^2 = 2/9 \\approx 0.222$.\n\nDouble the mass means double the gravity; three times the radius means nine times less. Net: 2/9.",
    sourcePack: "original (ratio drill)"
  },

  // ── D.1.4-D1.005: 4M, 2R → g unchanged (MCQ, pedagogical surprise) ─────
  {
    id: "D.1.4-D1.005",
    level: "SL",
    tags: ["D.1.4", "D.1.4-D1"],
    type: "mcq",
    marks: 1,
    prompt: "Planet X has four times Earth's mass and twice Earth's radius. The surface gravitational field strength on X, compared to Earth's, is:",
    choices: [
      "half as strong",
      "the same",
      "twice as strong",
      "four times as strong"
    ],
    answerIndex: 1,
    distractorRationales: {
      "0": "Only counted the $1/R^2$ effect (4× radius reduction) but missed the mass increase.",
      "2": "Only counted the mass increase but missed the $1/R^2$ reduction.",
      "3": "Counted only the mass scaling. The radius doubling divides $g$ by 4, which cancels the mass quadrupling."
    },
    explanation: "$g \\propto M/R^2$. Here $M$ is multiplied by 4 and $R^2$ is multiplied by 4. The two effects cancel: $g_X/g_E = 4/4 = 1$.\n\nA planet with the right combination of more mass and more radius can have the same surface gravity as Earth.",
    sourcePack: "original (ratio drill)"
  },

  // ── D.1.H.8-B1.002: 9M, 4R → v_esc × 3/2 (numeric) ──────────────────────
  {
    id: "D.1.H.8-B1.002",
    level: "HL",
    tags: ["D.1.H.8", "D.1.H.8-B1"],
    type: "numeric",
    marks: 1,
    prompt: "Planet X has nine times Earth's mass and four times Earth's radius. The escape speed from the surface of X, as a multiple of Earth's escape speed, is:",
    expectedNumeric: 1.5,
    tolerance: 0.02,
    unitHint: "$\\times v_{\\text{esc}}(\\text{Earth})$",
    misconceptions: [
      { id: "forgot_sqrt_in_escape_ratio", label: "Used $9/4 = 2.25$ directly. The escape speed has a $\\sqrt{}$, so the ratio is $\\sqrt{9/4} = 3/2$.", expectedNumeric: 2.25, tolerance: 0.05, severity: "common" }
    ],
    explanation: "$v_{\\text{esc}} = \\sqrt{2GM/R}$, so $v_{\\text{esc}} \\propto \\sqrt{M/R}$.\n\n$v_{\\text{esc},X}/v_{\\text{esc},E} = \\sqrt{(9M)/(4R) \\cdot R/M} = \\sqrt{9/4} = 3/2 = 1.5$.",
    sourcePack: "original (ratio drill)"
  },

  // ── D.1.H.8-B1.003: 4M, 4R → v_esc unchanged (MCQ, surprise) ────────────
  {
    id: "D.1.H.8-B1.003",
    level: "HL",
    tags: ["D.1.H.8", "D.1.H.8-B1"],
    type: "mcq",
    marks: 1,
    prompt: "Planet X has four times Earth's mass and four times Earth's radius. The escape speed from the surface of X, compared to Earth's, is:",
    choices: [
      "half as large",
      "the same",
      "twice as large",
      "four times as large"
    ],
    answerIndex: 1,
    explanation: "$v_{\\text{esc}} \\propto \\sqrt{M/R}$. Here $M$ and $R$ both quadruple, so $M/R$ is unchanged, and $v_{\\text{esc}}$ is unchanged.\n\nIntuition: heavier-but-bigger can offset, and at the exact ratio of mass and radius, escape speed comes out the same.",
    sourcePack: "original (ratio drill)"
  },

  // ── D.1.H.9-A3.004: 4M, 9r → v_orb × 2/3 (numeric) ──────────────────────
  {
    id: "D.1.H.9-A3.004",
    level: "HL",
    tags: ["D.1.H.9", "D.1.H.9-A3"],
    type: "numeric",
    marks: 1,
    prompt: "Satellite A orbits a star of mass $M$ at radius $r$. Satellite B orbits a star of mass $4M$ at radius $9r$. The ratio of B's orbital speed to A's is:",
    expectedNumeric: 0.6667,
    tolerance: 0.01,
    unitHint: "× v_A",
    explanation: "$v_{\\text{orb}} = \\sqrt{GM/r}$. Ratio: $v_B/v_A = \\sqrt{(4M/9r) \\cdot r/M} = \\sqrt{4/9} = 2/3 \\approx 0.667$.\n\nFour times the mass quadruples the inside of the square root; nine times the radius divides the inside by 9. Net inside is 4/9, square-rooted to 2/3.",
    sourcePack: "original (ratio drill)"
  },

  // ── D.1.H.9-A3.005: M, R/4 → v_orb × 2 (MCQ) ────────────────────────────
  {
    id: "D.1.H.9-A3.005",
    level: "HL",
    tags: ["D.1.H.9", "D.1.H.9-A3"],
    type: "mcq",
    marks: 1,
    prompt: "Two satellites orbit the same star. Satellite B has one quarter the orbital radius of satellite A. The ratio of B's orbital speed to A's is:",
    choices: [
      "1/4",
      "1/2",
      "2",
      "4"
    ],
    answerIndex: 2,
    explanation: "$v_{\\text{orb}} \\propto 1/\\sqrt{r}$ at fixed $M$. Quartering $r$ multiplies $v$ by $\\sqrt{4} = 2$.",
    sourcePack: "original (ratio drill)"
  },

  // ── D.1.H.10-C2.002: r halves → v × √2 (MCQ) ────────────────────────────
  {
    id: "D.1.H.10-C2.002",
    level: "HL",
    tags: ["D.1.H.10", "D.1.H.10-C2"],
    type: "mcq",
    marks: 1,
    prompt: "Atmospheric drag gradually halves a satellite's orbital radius. By what factor does its orbital speed change?",
    choices: [
      "halves",
      "stays the same",
      "increases by a factor of $\\sqrt{2}$",
      "doubles"
    ],
    answerIndex: 2,
    distractorRationales: {
      "0": "Wrong direction. The orbit drops, so the satellite speeds UP, not slows down.",
      "1": "Orbital speed depends on $r$, so it changes when $r$ does.",
      "3": "Right direction but wrong factor. $v \\propto 1/\\sqrt{r}$, so halving $r$ multiplies $v$ by $\\sqrt{2}$, not by 2."
    },
    explanation: "$v_{\\text{orb}} = \\sqrt{GM/r}$. Halving $r$ multiplies $v$ by $1/\\sqrt{1/2} = \\sqrt{2} \\approx 1.414$.\n\nThis is the drag-induced speed-up taken to a non-physical extreme — drag wouldn't actually halve a satellite's orbit (re-entry would happen first), but the ratio holds for any orbit comparison.",
    sourcePack: "original (ratio drill)"
  },

  // ── D.1.H.5-D2.002: W to go r → 2r as fraction of |E_p(r)| (MCQ) ────────
  {
    id: "D.1.H.5-D2.002",
    level: "HL",
    tags: ["D.1.H.5", "D.1.H.5-D2"],
    type: "mcq",
    marks: 1,
    prompt: "A satellite is moved from a circular orbit at radius $r$ to a circular orbit at radius $2r$ around the same central body. The work done by an external agent, as a fraction of the magnitude of the satellite's potential energy at the inner orbit, is:",
    choices: [
      "$1/4$",
      "$1/2$",
      "$3/4$",
      "$1$"
    ],
    answerIndex: 0,
    distractorRationales: {
      "1": "Used $\\Delta E_p / |E_p(r)|$ instead of $\\Delta E / |E_p(r)|$. The PE change alone is half of $|E_p(r)|$, but the WORK done is half of that again because the KE also changes.",
      "2": "Doesn't correspond to any clean calculation.",
      "3": "Would be the work to take the satellite from $r$ to infinity (full magnitude of $|E_p(r)|$), not just to $2r$."
    },
    explanation: "For a circular orbit, $E = -GMm/(2r)$. Moving from $r$ to $2r$:\n\n$\\Delta E = -GMm/(4r) - (-GMm/(2r)) = GMm/(4r)$\n\n$|E_p(r)| = GMm/r$\n\nRatio: $\\Delta E / |E_p(r)| = (GMm/(4r)) / (GMm/r) = 1/4$.\n\nMnemonic: every doubling of orbital radius costs $1/4$ of the inner orbit's $|E_p|$ in external work. Going $r \\to 4r$ would cost ... let's see, $E(4r) - E(r) = GMm/r \\times (1/2 - 1/8) = 3GMm/(8r)$, or $3/8 \\times |E_p(r)|$.",
    sourcePack: "original (ratio drill)"
  },

  // ── D.1.H.9-E1.003: E_k vs |E_p| in circular orbit (MCQ) ────────────────
  {
    id: "D.1.H.9-E1.003",
    level: "HL",
    tags: ["D.1.H.9", "D.1.H.9-E1"],
    type: "mcq",
    marks: 1,
    prompt: "For a satellite in a circular orbit, the kinetic energy $E_k$ as a fraction of the magnitude of the potential energy $|E_p|$ is:",
    choices: [
      "$1/4$",
      "$1/2$",
      "$1$",
      "$2$"
    ],
    answerIndex: 1,
    distractorRationales: {
      "0": "Wrong factor.",
      "2": "Would be true if $|E_p| = E_k$. But in a circular orbit, KE is exactly HALF the magnitude of PE.",
      "3": "Reversed. $|E_p| = 2 E_k$, so $E_k = |E_p|/2$, not $2|E_p|$."
    },
    explanation: "$E_k = GMm/(2r)$ and $E_p = -GMm/r$. So $|E_p| = GMm/r = 2 \\cdot GMm/(2r) = 2 E_k$.\n\nEquivalently: $E_k/|E_p| = 1/2$.\n\nThis is one of the three foundational ratios for circular orbits: $E_k = |E_p|/2$, $E = -E_k$, $|E_p| = 2 E_k$.",
    sourcePack: "original (ratio drill)"
  },

  // ── D.1.H.9-E1.004: E (total) vs E_k in circular orbit (MCQ) ────────────
  {
    id: "D.1.H.9-E1.004",
    level: "HL",
    tags: ["D.1.H.9", "D.1.H.9-E1"],
    type: "mcq",
    marks: 1,
    prompt: "For a satellite in a circular orbit, the total mechanical energy $E$ in terms of the kinetic energy $E_k$ is:",
    choices: [
      "$E = +2 E_k$",
      "$E = +E_k$",
      "$E = -E_k$",
      "$E = -2 E_k$"
    ],
    answerIndex: 2,
    distractorRationales: {
      "0": "Wrong both in sign and magnitude. Total mechanical energy of a bound orbit is NEGATIVE.",
      "1": "Right magnitude but wrong sign. The total energy is negative (bound system), while $E_k$ is positive.",
      "3": "Right sign but wrong magnitude. $E = -GMm/(2r) = -E_k$, not $-2 E_k$. ($-2E_k$ would be $E_p$ itself, not the total.)"
    },
    explanation: "$E = E_k + E_p = GMm/(2r) + (-GMm/r) = -GMm/(2r)$. And $E_k = +GMm/(2r)$. So $E = -E_k$.\n\nThree-way summary for a circular orbit:\n• $E_k = +GMm/(2r)$\n• $E_p = -GMm/r = -2 E_k$\n• $E = -GMm/(2r) = -E_k$\n\nThe total energy and the (positive) kinetic energy have the same magnitude, opposite signs. Worth memorising.",
    sourcePack: "original (ratio drill)"
  },

  // ════════════════════════════════════════════════════════════════════════
  // D.1.H.9-E3 PHASED.002 — orbital-energies triple-curve widget question
  // Visually surfaces the KE-vs-PE-vs-total trap. Three curves plotted on
  // one r axis: total energy (solid), E_k (dashed positive), E_p (dashed
  // negative). The student drags a probe and watches them all move. Then
  // they pick the MCQ that describes the directions correctly.
  // ════════════════════════════════════════════════════════════════════════
  {
    id: "D.1.H.9-E3.PHASED.002",
    level: "HL",
    tags: ["D.1.H.9", "D.1.H.9-E3", "graph_read"],
    marks: 4,
    prompt: "The graph below shows kinetic energy $E_k$, gravitational potential energy $E_p$, and total mechanical energy $E$ for a 1000 kg satellite in circular orbit around Earth, as functions of orbital radius $r$. Drag the probe to explore how all three change with $r$.",
    tool: {
      name: "curve_probe",
      config: {
        curve: "orbital_energies",
        M: 5.97e24,
        m: 1000,
        showSeparateContributions: true,
        domain: [7e6, 5e7],
        initialR: "random",
        xLabel: "r", xUnits: "m",
        yLabel: "E", yUnits: "J"
      }
    },
    phases: [
      {
        kind: "mcq",
        marks: 1,
        prompt: "As the satellite moves to a higher orbit (r increases), which of these statements is correct?",
        choices: [
          "$E_k$ rises, $E_p$ rises, total $E$ rises.",
          "$E_k$ falls, $E_p$ rises (becomes less negative), total $E$ rises (becomes less negative).",
          "$E_k$ rises, $E_p$ falls (becomes more negative), total $E$ falls.",
          "$E_k$ and $E_p$ both fall (both become more negative), total $E$ falls.",
          "I'm not sure — show me"
        ],
        answerIndex: 1,
        distractorRationales: {
          "0": "Look at the dashed curve for $E_k$ as you drag right. It's a $1/r$ curve that DROPS as $r$ grows. $E_k$ doesn't rise with $r$.",
          "2": "Look at $E_p = -GMm/r$ on the graph. It's negative and approaches zero from below as $r$ grows — so it RISES (becomes less negative), not falls.",
          "3": "Both falling would mean both $E_k$ and $E_p$ getting more negative. But $E_p$ approaches zero from below as $r$ grows; it gets LESS negative, not more.",
          "4": "Fair to use — the right answer is (b). Drag the probe and watch: $E_k$ shrinks, $E_p$ rises by exactly twice $E_k$'s shrinkage, and the total $E$ rises by their difference."
        },
        misconceptions: [
          {
            id: "pe_up_means_all_up",
            chosenIndex: 0,
            label: "You read 'PE rises with r' as 'everything rises with r'. The trap is that PE and KE go in opposite directions: KE shrinks as r grows because v = √(GM/r) shrinks. The widget's three curves show this directly."
          }
        ]
      },
      {
        kind: "numeric",
        marks: 2,
        prompt: "At $r = 2.0 \\times 10^7$ m, read $E$ from the widget and submit the value in J, to 3 s.f.",
        expectedNumeric: -9.96e9,
        tolerance: 1e8,
        unitHint: "J",
        misconceptions: [
          {
            id: "submitted_pe_not_total",
            label: "You submitted $E_p$ (the deeper negative curve) instead of $E$ (the solid curve halfway up). $E_p = -GMm/r$; $E = -GMm/(2r)$.",
            expectedNumeric: -1.992e10,
            tolerance: 1e8,
            severity: "common"
          },
          {
            id: "submitted_ek_not_total",
            label: "You submitted $E_k$ (the positive dashed curve) instead of $E$ (which is negative).",
            expectedNumeric: 9.96e9,
            tolerance: 1e8,
            severity: "common"
          }
        ]
      },
      {
        kind: "short",
        marks: 1,
        prompt: "In one sentence: why does total energy rise as the satellite moves to a higher orbit, even though kinetic energy falls?",
        markPoints: [
          {
            any: [
              "potential energy rises by more than kinetic energy falls",
              "ep rises by twice ek shrinks",
              "ep grows by more than ek shrinks",
              "ep rises by twice the magnitude",
              "ep increases by twice",
              "potential energy rises by twice",
              "ep increases more than ek decreases",
              "pe rises by more than ke falls",
              "potential energy gain exceeds kinetic energy loss",
              "ep climbs by 2 times the amount",
              "the increase in ep is larger",
              "the rise in pe is twice the fall in ke"
            ],
            credit: 1
          }
        ]
      }
    ],
    explanation: "For a circular orbit, the three energies are linked by simple ratios:\n• $E_p = -GMm/r$ — negative, magnitude shrinks as r grows.\n• $E_k = +GMm/(2r)$ — positive, magnitude shrinks as r grows (half the magnitude of E_p).\n• $E = E_k + E_p = -GMm/(2r) = -E_k$ — negative, magnitude shrinks as r grows.\n\nThe key relation: $|E_p| = 2|E_k|$ at every $r$. So as $r$ grows:\n• $E_k$ falls (by some amount $\\Delta$).\n• $E_p$ rises (becomes less negative) by $2\\Delta$.\n• Net: $E = E_k + E_p$ rises by $-\\Delta + 2\\Delta = +\\Delta$.\n\nSo when you push a satellite to a higher orbit, you pay for it with engine work that goes into raising the total energy — the satellite ends up MORE energetic overall, even though it's slower.",
    examinerNote: "This is the trap behind every drag-induced-orbital-speed-up question (D.1.H.10) and every move-to-higher-orbit work question (D.1.H.5-D). The widget makes it visual instead of algebraic. Common authoring tip from the bank: students who think 'higher = more energetic' are right (about total E) AND wrong (about KE) AND right (about speed being slower); only the visual makes all three coherent.",
    sourcePack: "original (widget-led, addresses the famous PE-up-equals-everything-up trap)"
  }

];
