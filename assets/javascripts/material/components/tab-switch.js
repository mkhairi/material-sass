/*
 * Tab indicator animation
 * Requires Bootstrap's (v4.1.X) `tab.js`
 */
var TabSwitch = function ($) {
  // constants >>>
  var DATA_KEY = 'md.tabswitch';
  var NAME = 'tabswitch';
  var NO_CONFLICT = $.fn[NAME];
  var ClassName = {
    ANIMATE: 'animate',
    DROPDOWN_ITEM: 'dropdown-item',
    INDICATOR: 'nav-tabs-indicator',
    MATERIAL: 'nav-tabs-material',
    SCROLLABLE: 'nav-tabs-scrollable',
    SHOW: 'show'
  };
  var Event = {
    SHOW_BS_TAB: 'show.bs.tab'
  };
  var Selector = {
    DATA_TOGGLE: '.nav-tabs [data-toggle="tab"]',
    DROPDOWN: '.dropdown',
    NAV: '.nav-tabs' // <<< constants

  };

  var TabSwitch =
  /*#__PURE__*/
  function () {
    function TabSwitch(nav) {
      this._nav = nav;
      this._navindicator = null;
    }

    var _proto = TabSwitch.prototype;

    _proto.switch = function _switch(element, relatedTarget) {
      var _this = this;

      var navLeft = $(this._nav).offset().left;
      var navScrollLeft = $(this._nav).scrollLeft();
      var navWidth = $(this._nav).outerWidth();

      if (!this._navindicator) {
        this._createIndicator(navLeft, navScrollLeft, navWidth, relatedTarget);
      }

      if ($(element).hasClass(ClassName.DROPDOWN_ITEM)) {
        element = $(element).closest(Selector.DROPDOWN);
      }

      var elLeft = $(element).offset().left;
      var elWidth = $(element).outerWidth();
      $(this._navindicator).addClass(ClassName.SHOW);
      Util.reflow(this._navindicator);
      $(this._nav).addClass(ClassName.ANIMATE);
      $(this._navindicator).css({
        left: elLeft + navScrollLeft - navLeft,
        right: navWidth - (elLeft + navScrollLeft - navLeft + elWidth)
      });

      var complete = function complete() {
        $(_this._nav).removeClass(ClassName.ANIMATE);
        $(_this._navindicator).removeClass(ClassName.SHOW);
      };

      var transitionDuration = Util.getTransitionDurationFromElement(this._navindicator);
      $(this._navindicator).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
    };

    _proto._createIndicator = function _createIndicator(navLeft, navScrollLeft, navWidth, relatedTarget) {
      this._navindicator = document.createElement('div');
      $(this._navindicator).addClass(ClassName.INDICATOR).appendTo(this._nav);

      if (typeof relatedTarget !== 'undefined') {
        if ($(relatedTarget).hasClass(ClassName.DROPDOWN_ITEM)) {
          relatedTarget = $(relatedTarget).closest(Selector.DROPDOWN);
        }

        var relatedLeft = $(relatedTarget).offset().left;
        var relatedWidth = $(relatedTarget).outerWidth();
        $(this._navindicator).css({
          left: relatedLeft + navScrollLeft - navLeft,
          right: navWidth - (relatedLeft + navScrollLeft - navLeft + relatedWidth)
        });
      }

      $(this._nav).addClass(ClassName.MATERIAL);
    };

    TabSwitch._jQueryInterface = function _jQueryInterface(relatedTarget) {
      return this.each(function () {
        var nav = $(this).closest(Selector.NAV)[0];

        if (!nav) {
          return;
        }

        var data = $(nav).data(DATA_KEY);

        if (!data) {
          data = new TabSwitch(nav);
          $(nav).data(DATA_KEY, data);
        }

        data.switch(this, relatedTarget);
      });
    };

    return TabSwitch;
  }();

  $(document).on(Event.SHOW_BS_TAB, Selector.DATA_TOGGLE, function (event) {
    TabSwitch._jQueryInterface.call($(this), event.relatedTarget);
  });
  $.fn[NAME] = TabSwitch._jQueryInterface;
  $.fn[NAME].Constructor = TabSwitch;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = NO_CONFLICT;
    return TabSwitch._jQueryInterface;
  };

  return TabSwitch;
}($);
