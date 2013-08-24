// Generated by CoffeeScript 1.6.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['chaplin', 'views/base/view', 'text!templates/item-message-list-view.hbs'], function(Chaplin, View, template) {
  var ItemMessageListView, _ref;
  return ItemMessageListView = (function(_super) {
    __extends(ItemMessageListView, _super);

    function ItemMessageListView() {
      _ref = ItemMessageListView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ItemMessageListView.prototype.tagName = 'li';

    ItemMessageListView.prototype.attributes = function() {
      return {
        'class': this._renderClass(),
        'data-id': this.model.get('idCorreo')
      };
    };

    ItemMessageListView.prototype.className = 'mlist-el';

    ItemMessageListView.prototype.classRead = ' ml-read';

    ItemMessageListView.prototype.classActual = ' act';

    ItemMessageListView.prototype.initialize = function() {
      if (this.model.get('destacado') === "1") {
        return this.model.set('destacado', 1);
      } else {
        return this.model.set('destacado', 0);
      }
    };

    ItemMessageListView.prototype._renderClass = function() {
      if (this.model.get('estado') === "1") {
        this.className += " " + this.classRead;
      }
      return this.className;
    };

    ItemMessageListView.prototype.template = template;

    ItemMessageListView.prototype.events = {
      'click': 'verDetalle',
      'click input[type=checkbox]': 'selectCheck',
      'click .icon-detasq': 'toggleDestaque'
    };

    ItemMessageListView.prototype.verDetalle = function() {
      var $el, id;
      $el = $(this.el);
      id = $el.attr('data-id');
      $el.removeClass(this.classRead).addClass(this.classActual);
      this.publishEvent('MessageListCollectionView:observerSeleccionado', {
        id: id,
        el: $el,
        assingClass: this.classRead
      });
      return window.location = "" + window.location.pathname + "#message/" + id;
    };

    ItemMessageListView.prototype.selectCheck = function(e) {
      return e.stopPropagation();
    };

    ItemMessageListView.prototype.toggleDestaque = function(e) {
      var $this, activeClass, state;
      e.stopPropagation();
      $this = $(e.currentTarget);
      activeClass = 'act';
      if ($this.hasClass(activeClass)) {
        $this.removeClass(activeClass);
      } else {
        $this.addClass(activeClass);
      }
      state = this.model.get('destacado') === 0 ? 1 : 0;
      this.model.set('destacado', state);
      this.model.url("" + yOSON.baseHost + "agentes/correo/ajax-upd/destaque/data/");
      return this.model.save();
    };

    return ItemMessageListView;

  })(View);
});