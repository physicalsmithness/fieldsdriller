# Fields Driller — IB Physics D.1 (Gravitation), v0.1

A static-site Driller for IB Physics topic D.1 Gravitation, forked from the
Pre-IB Topic 7 engine (`preibphysics/topic7_radioactivity`).

Same shape: one question at a time, mark-scheme-style feedback, a coverage map
by syllabus subtag, all client-side, no backend, no login, no build step.
Progress lives in `localStorage` under a fresh key, so it doesn't collide with
the PreIB tool's progress.

## What's new vs the PreIB engine

The only architectural change is a fifth question type, **`widget`**.

Where the PreIB engine knows about `mcq`, `short`, `long`, and `numeric`, this
fork adds a `widget` type that mounts a named interactive component into the
question card. The widget is responsible for rendering its own UI, collecting
the student's interaction, and scoring it against the question's
`widgetConfig`. Everything else (question selection, coverage map, attempt
logging, settings, drill-down) is unchanged.

This is what lets us build inherently visual questions for Fields, like
"read g from the gradient of this V-vs-r graph" or "drag the test mass to
where the resultant field is zero." Those are difficult to author as
multiple-choice over pre-rendered images, easy to author as parameterised
widgets.

## Files

- `index.html` — single page entry. Loads D3 from CDN, then widgets, then the
  question bank, then the engine.
- `styles.css` — copied from PreIB. Some widget-specific styles appended.
- `engine.js` — forked PreIB engine. Vocabulary replaced with D.1 syllabus.
  `widget` type added.
- `topic_d1_gravitation.js` — question bank. Defines `window.FIELDS_D1_QUESTIONS`.
- `widgets/curve_probe.js` — first widget. Interactive plot of f(r) with a
  draggable probe, live tangent, gradient read-off, optional area shading.
- `widgets/_registry.js` — exposes `window.FIELDS_WIDGETS` map. Widgets
  register themselves into this map; the engine looks them up by name.

## Widget API contract

Each widget is a function under `window.FIELDS_WIDGETS[name]`. It takes a host
`div` and a `config` object and returns an instance with these methods:

```
mount(div, config)     — already done by the factory; renders the UI
getAnswer()            — returns a structured answer (depends on widget)
score(answer, config)  — returns { marksAwarded, marksPossible, status,
                                   hits, misses }
destroy()              — tears down event listeners, removes from DOM
```

The engine calls these in this order:

1. On `renderQuestion`, the engine creates a `div` in the question card and
   asks the widget factory to mount itself.
2. The student interacts with the widget.
3. The engine's "Check answer" button calls `instance.getAnswer()` then
   `instance.score(answer, widgetConfig)`, then hands the result to the same
   `showFeedback` path used by all other question types.
4. On "Next question," the engine calls `instance.destroy()` before rendering
   the next question.

This contract keeps the engine ignorant of D3, ignorant of graph geometry,
ignorant of what a "tangent" is. The widget owns all of that. The engine just
holds the question bank, runs the loop, and logs attempts.

## Syllabus vocabulary

The coverage map's parent groups and subtags are taken from the user's
question-type summary, condensed slightly so the coverage map stays readable:

- **SL foundations** (D.1.1 Kepler, D.1.2 Newton's law, D.1.3 point-mass,
  D.1.4 field strength, D.1.5 field lines)
- **HL energy and potential** (D.1.H.1 GPE concept, D.1.H.2 GPE formula,
  D.1.H.3 potential V, D.1.H.4 g as V gradient, D.1.H.5 work)
- **HL equipotentials** (D.1.H.6 surfaces, D.1.H.7 surfaces and field lines)
- **HL escape and orbits** (D.1.H.8 escape speed, D.1.H.9 orbital speed,
  D.1.H.10 viscous drag)

Each question is tagged with one or more of these subtag ids. Cross-cutting
tags (`definition`, `extended_writing`, `graph_read`, `widget_interaction`)
are analytics-only and don't appear in the coverage map.

## What's in v0.1

A starter bank of about ten questions covering a mix of types, plus one
working `curve_probe` widget instance. Enough to prove the round-trip end to
end. Not enough to be a teaching tool yet. The next milestone is more
questions for each existing subtag and a second widget (2D potential field
map for the equipotential-style questions).

## Running it

Open `index.html` in any modern browser. D3 is loaded from a CDN, so the page
needs a network connection on first load (cached afterwards). If you want it
fully offline, download `d3.min.js` and serve locally; change the script src
in `index.html`.

## What this fork deliberately doesn't do, yet

The same things PreIB v1 doesn't: no login, no multi-device sync, no spaced
repetition, no per-question history view, no dark mode. The widget extension
is the only new capability. The Memoriser-style server-side logging is
explicitly deferred; when the time comes the attempt-record schema already
has everything that backend would need.
