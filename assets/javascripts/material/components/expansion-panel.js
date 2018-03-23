/*
 * Expansion panel plugins expands a collapsed panel in full upon selecting
 */
var ExpansionPanel = function ($) {
  // constants >>>
  var DATA_KEY = 'bs.collapse';
  var EVENT_KEY = "." + DATA_KEY;
  var ClassName = {
    SHOW: 'show',
    SHOW_PREDECESSOR: 'show-predecessor'
  };
  var Event = {
    HIDE: "hide" + EVENT_KEY,
    SHOW: "show" + EVENT_KEY
  };
  var Selector = {
    PANEL: '.expansion-panel',
    PANEL_BODY: '.expansion-panel .collapse' // <<< constants

  };
  $(document).on("" + Event.HIDE, Selector.PANEL_BODY, function () {
    var target = $(this).closest(Selector.PANEL);
    target.removeClass(ClassName.SHOW);
    var predecessor = target.prev(Selector.PANEL);

    if (predecessor.length) {
      predecessor.removeClass(ClassName.SHOW_PREDECESSOR);
    }
  }).on("" + Event.SHOW, Selector.PANEL_BODY, function () {
    var target = $(this).closest(Selector.PANEL);
    target.addClass(ClassName.SHOW);
    var predecessor = target.prev(Selector.PANEL);

    if (predecessor.length) {
      predecessor.addClass(ClassName.SHOW_PREDECESSOR);
    }
  });
}($);
