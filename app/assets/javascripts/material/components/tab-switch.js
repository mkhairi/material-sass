function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * tab indicator animation
 * requires bootstrap's (v4.0.0-alpha.6) tab.js
 */

var TabSwitch = function ($) {

  // constants >>>
  var DATA_KEY = 'md.tabswitch';
  var NAME = 'tabswitch';
  var NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 390;

  var ClassName = {
    ANIMATE: 'animate',
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
    NAV: '.nav-tabs',
    NAV_ITEM: '.nav-item'
  };
  // <<< constants

  var TabSwitch = function () {
    function TabSwitch(nav) {
      _classCallCheck(this, TabSwitch);

      if (typeof $.fn.tab === 'undefined') {
        throw new Error('Material\'s JavaScript requires Bootstrap\'s tab.js');
      }

      this._nav = nav;
      this._navindicator = null;
    }

    TabSwitch.prototype.switch = function _switch(element, relatedTarget) {
      var _this = this;

      var supportsTransition = Util.supportsTransitionEnd();

      if (!this._navindicator) {
        this._createIndicator();
      }

      var elLeft = $(element).closest(Selector.NAV_ITEM).offset().left;
      var elWidth = $(element).closest(Selector.NAV_ITEM).outerWidth();
      var navLeft = $(this._nav).offset().left;
      var navScrollLeft = $(this._nav).scrollLeft();
      var navWidth = $(this._nav).outerWidth();

      if (relatedTarget !== undefined) {
        var relatedLeft = $(relatedTarget).closest(Selector.NAV_ITEM).offset().left;
        var relatedWidth = $(relatedTarget).closest(Selector.NAV_ITEM).outerWidth();

        $(this._navindicator).css({
          left: relatedLeft + navScrollLeft - navLeft,
          right: navWidth - (relatedLeft + navScrollLeft - navLeft + relatedWidth)
        });

        $(this._navindicator).addClass(ClassName.SHOW);
        Util.reflow(this._navindicator);

        if (supportsTransition) {
          $(this._nav).addClass(ClassName.ANIMATE);
        }
      }

      $(this._navindicator).css({
        left: elLeft + navScrollLeft - navLeft,
        right: navWidth - (elLeft + navScrollLeft - navLeft + elWidth)
      });

      var complete = function complete() {
        $(_this._nav).removeClass(ClassName.ANIMATE);
        $(_this._navindicator).removeClass(ClassName.SHOW);
      };

      if (!supportsTransition) {
        complete();
        return;
      }

      $(this._navindicator).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
    };

    TabSwitch.prototype._createIndicator = function _createIndicator() {
      this._navindicator = document.createElement('div');

      $(this._navindicator).addClass(ClassName.INDICATOR).appendTo(this._nav);

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
    TabSwitch._jQueryInterface.call($(event.target), event.relatedTarget);
  });

  $.fn[NAME] = TabSwitch._jQueryInterface;
  $.fn[NAME].Constructor = TabSwitch;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = NO_CONFLICT;
    return TabSwitch._jQueryInterface;
  };

  return TabSwitch;
}(jQuery);
