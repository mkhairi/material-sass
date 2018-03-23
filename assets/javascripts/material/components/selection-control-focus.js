/*
 * Selection control plugin fixes the focus state problem with
 * Chrome persisting focus state on checkboxes/radio buttons after clicking
 */
var SelectionControlFocus = function ($) {
  // constants >>>
  var DATA_KEY = 'md.selectioncontrolfocus';
  var EVENT_KEY = "." + DATA_KEY;
  var ClassName = {
    FOCUS: 'focus'
  };
  var LastInteraction = {
    IS_MOUSEDOWN: false
  };
  var Event = {
    BLUR: "blur" + EVENT_KEY,
    FOCUS: "focus" + EVENT_KEY,
    MOUSEDOWN: "mousedown" + EVENT_KEY,
    MOUSEUP: "mouseup" + EVENT_KEY
  };
  var Selector = {
    CONTROL: '.custom-control',
    INPUT: '.custom-control-input' // <<< constants

  };
  $(document).on("" + Event.BLUR, Selector.INPUT, function () {
    $(this).removeClass(ClassName.FOCUS);
  }).on("" + Event.FOCUS, Selector.INPUT, function () {
    if (LastInteraction.IS_MOUSEDOWN === false) {
      $(this).addClass(ClassName.FOCUS);
    }
  }).on("" + Event.MOUSEDOWN, Selector.CONTROL, function () {
    LastInteraction.IS_MOUSEDOWN = true;
  }).on("" + Event.MOUSEUP, Selector.CONTROL, function () {
    setTimeout(function () {
      LastInteraction.IS_MOUSEDOWN = false;
    }, 1);
  });
}($);
