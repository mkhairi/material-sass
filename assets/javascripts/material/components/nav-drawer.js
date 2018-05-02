function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Navigation drawer plguin
 * Based on Bootstrap's (v4.1.X) `modal.js`
 */
var NavDrawer = function ($) {
  // constants >>>
  var DATA_API_KEY = '.data-api';
  var DATA_KEY = 'md.navdrawer';
  var ESCAPE_KEYCODE = 27;
  var EVENT_KEY = "." + DATA_KEY;
  var NAME = 'navdrawer';
  var NO_CONFLICT = $.fn[NAME];
  var ClassName = {
    BACKDROP: 'navdrawer-backdrop',
    OPEN: 'navdrawer-open',
    SHOW: 'show'
  };
  var Default = {
    breakpoint: '',
    keyboard: true,
    show: true,
    type: 'default'
  };
  var DefaultType = {
    keyboard: 'boolean',
    show: 'boolean',
    type: 'string'
  };
  var Event = {
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY,
    FOCUSIN: "focusin" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    HIDE: "hide" + EVENT_KEY,
    KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY,
    MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY,
    MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY,
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY
  };
  var Selector = {
    CONTENT: '.navdrawer-content',
    DATA_DISMISS: '[data-dismiss="navdrawer"]',
    DATA_TOGGLE: '[data-toggle="navdrawer"]' // <<< constants

  };

  var NavDrawer =
  /*#__PURE__*/
  function () {
    function NavDrawer(element, config) {
      this._backdrop = null;
      this._config = this._getConfig(config);
      this._content = $(element).find(Selector.CONTENT)[0];
      this._element = element;
      this._ignoreBackdropClick = false;
      this._isShown = false;
      this._typeBreakpoint = this._config.breakpoint === '' ? '' : "-" + this._config.breakpoint;
    }

    var _proto = NavDrawer.prototype;

    _proto.hide = function hide(event) {
      var _this = this;

      if (event) {
        event.preventDefault();
      }

      if (this._isTransitioning || !this._isShown) {
        return;
      }

      var hideEvent = $.Event(Event.HIDE);
      $(this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = false;
      this._isTransitioning = true;

      this._setEscapeEvent();

      $(document).off(Event.FOCUSIN);
      $(document.body).removeClass(ClassName.OPEN + "-" + this._config.type + this._typeBreakpoint);
      $(this._element).removeClass(ClassName.SHOW);
      $(this._element).off(Event.CLICK_DISMISS);
      $(this._content).off(Event.MOUSEDOWN_DISMISS);
      var transitionDuration = Util.getTransitionDurationFromElement(this._content);
      $(this._content).one(Util.TRANSITION_END, function (event) {
        return _this._hideNavdrawer(event);
      }).emulateTransitionEnd(transitionDuration);

      this._showBackdrop();
    };

    _proto.show = function show(relatedTarget) {
      var _this2 = this;

      if (this._isTransitioning || this._isShown) {
        return;
      }

      this._isTransitioning = true;
      var showEvent = $.Event(Event.SHOW, {
        relatedTarget: relatedTarget
      });
      $(this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      this._setEscapeEvent();

      $(this._element).addClass(NAME + "-" + this._config.type + this._typeBreakpoint);
      $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
        return _this2.hide(event);
      });
      $(this._content).on(Event.MOUSEDOWN_DISMISS, function () {
        $(_this2._element).one(Event.MOUSEUP_DISMISS, function (event) {
          if ($(event.target).is(_this2._element)) {
            _this2._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop();

      this._showElement(relatedTarget);
    };

    _proto.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    _proto._enforceFocus = function _enforceFocus() {
      var _this3 = this;

      $(document).off(Event.FOCUSIN).on(Event.FOCUSIN, function (event) {
        if (document !== event.target && _this3._element !== event.target && $(_this3._element).has(event.target).length === 0) {
          _this3._element.focus();
        }
      });
    };

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    _proto._hideNavdrawer = function _hideNavdrawer() {
      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._isTransitioning = false;
      $(this._element).trigger(Event.HIDDEN);
    };

    _proto._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $(this._backdrop).remove();
        this._backdrop = null;
      }
    };

    _proto._setEscapeEvent = function _setEscapeEvent() {
      var _this4 = this;

      if (this._isShown && this._config.keyboard) {
        $(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
          if (event.which === ESCAPE_KEYCODE) {
            event.preventDefault();

            _this4.hide();
          }
        });
      } else if (!this._isShown) {
        $(this._element).off(Event.KEYDOWN_DISMISS);
      }
    };

    _proto._showBackdrop = function _showBackdrop() {
      var _this5 = this;

      if (this._isShown) {
        this._backdrop = document.createElement('div');
        $(this._backdrop).addClass(ClassName.BACKDROP).addClass(ClassName.BACKDROP + "-" + this._config.type + this._typeBreakpoint).appendTo(document.body);
        $(this._element).on(Event.CLICK_DISMISS, function (event) {
          if (_this5._ignoreBackdropClick) {
            _this5._ignoreBackdropClick = false;
            return;
          }

          if (event.target !== event.currentTarget) {
            return;
          }

          _this5.hide();
        });
        Util.reflow(this._backdrop);
        $(this._backdrop).addClass(ClassName.SHOW);
      } else if (!this._isShown && this._backdrop) {
        $(this._backdrop).removeClass(ClassName.SHOW);

        this._removeBackdrop();
      }
    };

    _proto._showElement = function _showElement(relatedTarget) {
      var _this6 = this;

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      Util.reflow(this._element);
      $(document.body).addClass(ClassName.OPEN + "-" + this._config.type + this._typeBreakpoint);
      $(this._element).addClass(ClassName.SHOW);

      this._enforceFocus();

      var shownEvent = $.Event(Event.SHOWN, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        _this6._element.focus();

        _this6._isTransitioning = false;
        $(_this6._element).trigger(shownEvent);
      };

      var transitionDuration = Util.getTransitionDurationFromElement(this._content);
      $(this._content).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
    };

    NavDrawer._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var _config = _extends({}, Default, $(this).data(), typeof config === 'object' && config ? config : {});

        var data = $(this).data(DATA_KEY);

        if (!data) {
          data = new NavDrawer(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    _createClass(NavDrawer, null, [{
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return NavDrawer;
  }();

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    var _this7 = this;

    var selector = Util.getSelectorFromElement(this);
    var target;

    if (selector) {
      target = $(selector)[0];
    }

    var config = $(target).data(DATA_KEY) ? 'toggle' : _extends({}, $(target).data(), $(this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var $target = $(target).one(Event.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        return;
      }

      $target.one(Event.HIDDEN, function () {
        if ($(_this7).is(':visible')) {
          _this7.focus();
        }
      });
    });

    NavDrawer._jQueryInterface.call($(target), config, this);
  });
  $.fn[NAME] = NavDrawer._jQueryInterface;
  $.fn[NAME].Constructor = NavDrawer;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = NO_CONFLICT;
    return NavDrawer._jQueryInterface;
  };

  return NavDrawer;
}($);
