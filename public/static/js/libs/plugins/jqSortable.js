(function($) {
  var Sortablejs, calcPos, cloneInst;
  cloneInst = function(inst, conf, index) {
    var clone;
    clone = inst.clone();
    clone.css($.extend(conf, {
      "z-index": index
    }));
    inst.parent().append(clone);
    return clone;
  };
  calcPos = function(inst) {
    var pos, resd;
    resd = inst.outerWidth(true) - inst.outerWidth();
    pos = inst.position();
    return {
      "top": pos.top,
      "left": pos.left + resd
    };
  };
  Sortablejs = (function() {
    function Sortablejs(options) {
      var opt;
      opt = {
        context: "body",
        el: ".sort-el",
        parent: "auto",
        close: true,
        closeTag: ".sort-close",
        navs: {
          previous: ".sort-previous",
          next: ".sort-next"
        },
        disable: "dis",
        time: 600,
        separator: ",",
        input: null,
        id: "data-id",
        callback: {
          close: null
        }
      };
      this.settings = $.extend(opt, options);
      this.context = $(this.settings.context);
      this.el = $(this.settings.el);
      this.flag = true;
      this.init();
    }

    Sortablejs.prototype.init = function() {
      this.construct();
      this.animate();
    };

    Sortablejs.prototype.construct = function() {
      var el, settings, _this;
      _this = this;
      settings = _this.settings;
      el = _this.el;
      $.each(el, function(index, value) {
        var del, next, previous;
        next = $(value).find(settings.navs.next);
        previous = $(value).find(settings.navs.previous);
        if (settings.close) {
          del = $(value).find(settings.closeTag);
          del.data("target", $(this));
        }
        $(this).data("next", next);
        $(this).data("previous", previous);
        _this.recognize.call($(this), settings.disable);
      });
    };

    Sortablejs.prototype.recognize = function(dis, ignore) {
      var ign, inst;
      inst = null;
      ign = ignore || [];
      $.each(this, function(index, value) {
        var next, nextEl, prevEl, previous;
        inst = $(value);
        next = inst.data("next");
        previous = inst.data("previous");
        nextEl = inst.next();
        prevEl = inst.prev();
        next.add(previous).removeClass(dis).data("el", inst);
        if (nextEl.length > 0 && $.inArray(nextEl[0], ign) === -1) {
          next.data("target", inst.next());
        } else {
          next.addClass(dis);
        }
        if (prevEl.length > 0 && $.inArray(prevEl[0], ign) === -1) {
          previous.data("target", inst.prev());
        } else {
          previous.addClass(dis);
        }
      });
    };

    Sortablejs.prototype.animate = function() {
      var classNext, css, finish, init, navs, settings, _this;
      _this = this;
      settings = this.settings;
      navs = settings.navs;
      init = null;
      finish = null;
      classNext = settings.navs.next.replace(/[\.\s]/g, '');
      css = {
        "margin": 0,
        "position": "absolute"
      };
      _this.context.on("click", navs.previous + "," + navs.next, function(e) {
        var el, panimFinish, panimInit, target;
        e.preventDefault();
        if (_this.flag) {
          el = $(this).data("el");
          target = $(this).data("target");
          if (!$(this).hasClass(settings.disable)) {
            _this.flag = false;
            panimInit = calcPos(target);
            panimFinish = calcPos(el);
            init = cloneInst(el, $.extend(css, panimFinish), 3);
            finish = cloneInst(target, $.extend(css, panimInit), 2);
            el.add(target).css("visibility", "hidden");
            init.animate({
              "top": panimInit["top"],
              "left": panimInit["left"]
            }, settings.time, function() {
              el.css("visibility", "visible");
              init.remove();
              _this.flag = true;
            });
            finish.animate({
              "top": panimFinish["top"],
              "left": panimFinish["left"]
            }, settings.time, function() {
              target.css("visibility", "visible");
              finish.remove();
            });
            if ($(this).hasClass(classNext)) {
              target.insertBefore(el);
            } else {
              target.insertAfter(el);
            }
            _this.recognize.call(_this.el, settings.disable, [init[0], finish[0]]);
            if (_this.settings.input != null) {
              _this.el = $(_this.settings.el).not(init.add(finish));
              _this.reorder();
            }
          }
        }
      });
      if (settings.close) {
        _this.context.on("click", settings.closeTag, function(e) {
          var target;
          e.preventDefault();
          target = $(this).data("target");
          target.hide(500, function() {
            target.remove();
            _this.el = $(settings.el);
            _this.recognize.call(_this.el, settings.disable);
            _this.reorder();
            settings.callback.close && settings.callback.close(target.attr(settings.id));
          });
        });
      }
    };

    Sortablejs.prototype.reorder = function() {
      var el, id, inpt, result, separator, settings, _this;
      _this = this;
      settings = _this.settings;
      el = _this.el;
      inpt = $(settings.input);
      id = null;
      result = "";
      separator = "";
      $.each(el, function(index, value) {
        id = $(value).attr(settings.id);
        separator = ((index + 1) === el.length ? "" : settings.separator);
        result = result + id + separator;
      });
      inpt.val(result);
    };

    Sortablejs.prototype.refresh = function() {
      var _this;
      _this = this;
      _this.el = $(_this.settings.el);
      _this.construct();
      _this.reorder();
    };

    return Sortablejs;

  })();
  $.extend({
    Sortablejs: function(json) {
      return new Sortablejs(json);
    }
  });
})(jQuery);