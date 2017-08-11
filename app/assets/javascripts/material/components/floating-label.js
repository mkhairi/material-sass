function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * floating label:
 * when a user engages with the text input field,
 * the floating inline labels move to float above the field
 */

var FloatingLabel = function ($) {

  // constants >>>
  var DATA_KEY = 'md.floatinglabel';
  var EVENT_KEY = '.' + DATA_KEY;
  var NAME = 'floatinglabel';
  var NO_CONFLICT = $.fn[NAME];

  var ClassName = {
    IS_FOCUSED: 'is-focused',
    HAS_VALUE: 'has-value'
  };

  var Event = {
    CHANGE: 'change' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY
  };

  var Selector = {
    DATA_PARENT: '.floating-label',
    DATA_TOGGLE: '.floating-label .form-control'
  };
  // <<< constants

  var FloatingLabel = function () {
    function FloatingLabel(element) {
      _classCallCheck(this, FloatingLabel);

      this._element = element;
    }

    FloatingLabel.prototype.change = function change(relatedTarget) {
      if ($(this._element).val() || $(this._element).is('select') && $('option:first-child', $(this._element)).html().replace(' ', '') !== '') {
        $(relatedTarget).addClass(ClassName.HAS_VALUE);
      } else {
        $(relatedTarget).removeClass(ClassName.HAS_VALUE);
      }
    };

    FloatingLabel.prototype.focusin = function focusin(relatedTarget) {
      $(relatedTarget).addClass(ClassName.IS_FOCUSED);
    };

    FloatingLabel.prototype.focusout = function focusout(relatedTarget) {
      $(relatedTarget).removeClass(ClassName.IS_FOCUSED);
    };

    FloatingLabel._jQueryInterface = function _jQueryInterface(event) {
      return this.each(function () {
        var _event = event ? event : 'change';
        var data = $(this).data(DATA_KEY);

        if (!data) {
          data = new FloatingLabel(this);
          $(this).data(DATA_KEY, data);
        }

        if (typeof _event === 'string') {
          if (data[_event] === undefined) {
            throw new Error('No method named "' + _event + '"');
          }

          data[_event]($(this).closest(Selector.DATA_PARENT));
        }
      });
    };

    return FloatingLabel;
  }();

  $(document).on(Event.CHANGE + ' ' + Event.FOCUSIN + ' ' + Event.FOCUSOUT, Selector.DATA_TOGGLE, function (event) {
    FloatingLabel._jQueryInterface.call($(this), event.type);
  });

  $.fn[NAME] = FloatingLabel._jQueryInterface;
  $.fn[NAME].Constructor = FloatingLabel;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = NO_CONFLICT;
    return FloatingLabel._jQueryInterface;
  };

  return FloatingLabel;
}(jQuery);
