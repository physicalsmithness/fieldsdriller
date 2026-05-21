/* ============================================================================
   Widgets registry
   ----------------------------------------------------------------------------
   Each widget module assigns a factory function to window.FIELDS_WIDGETS[name].
   The engine reads window.FIELDS_WIDGETS[q.widget] when rendering a question
   of type "widget".

   A widget factory has the signature:
     factory(hostDiv, config) → instance
   where instance has:
     getAnswer()              → structured answer (widget-defined shape)
     score(answer, config)    → { marksAwarded, marksPossible, status, hits, misses }
     destroy()                → optional teardown
   ============================================================================ */
window.FIELDS_WIDGETS = window.FIELDS_WIDGETS || {};
