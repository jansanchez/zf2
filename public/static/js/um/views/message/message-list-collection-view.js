// Generated by CoffeeScript 1.6.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['chaplin', 'views/base/collection-view', 'views/message/item-message-list-view'], function(Chaplin, CollectionView, ItemMessageListView) {
  var MessageListCollectionView, _ref;
  return MessageListCollectionView = (function(_super) {
    __extends(MessageListCollectionView, _super);

    function MessageListCollectionView() {
      _ref = MessageListCollectionView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    MessageListCollectionView.prototype.className = 'ml-list';

    MessageListCollectionView.prototype.attributes = {
      'id': 'divListMail'
    };

    MessageListCollectionView.prototype.itemView = ItemMessageListView;

    MessageListCollectionView.prototype.tagName = 'ul';

    MessageListCollectionView.prototype.autoRender = true;

    MessageListCollectionView.prototype.initialize = function() {
      this.subscribeEvent('MessageListCollectionView:observerSeleccionado', this.observerSeleccionado);
      return MessageListCollectionView.__super__.initialize.apply(this, arguments);
    };

    MessageListCollectionView.prototype.vieweds = [];

    MessageListCollectionView.prototype.observerSeleccionado = function(params) {
      var viewed, _i, _len, _ref1, _results;
      if (this.vieweds.indexOf(params.id) === -1) {
        this.vieweds.push(params.id);
      }
      if (this.vieweds.length) {
        _ref1 = this.vieweds;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i += 1) {
          viewed = _ref1[_i];
          if (viewed !== params.id) {
            _results.push(this.$el.find("li[data-id=" + viewed + "]").addClass(params.assingClass));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    };

    return MessageListCollectionView;

  })(CollectionView);
});