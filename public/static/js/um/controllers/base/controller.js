// Generated by CoffeeScript 1.6.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['chaplin', 'views/layout-view', 'views/paginate-view', 'models/paginate'], function(Chaplin, LayoutView, PaginateView, Paginate) {
  'use strict';
  var Controller, _ref;
  return Controller = (function(_super) {
    __extends(Controller, _super);

    function Controller() {
      _ref = Controller.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Controller.prototype.beforeAction = function(params, route) {
      var _this;
      _this = this;
      this.compose('layout', LayoutView);
      this.compose('paginate', PaginateView, {
        model: new Paginate(params),
        params: params
      });
      if (route.name === "index#message") {
        return require(['views/paginate-message-view'], function(PaginateMessageView) {
          return _this.compose('paginate-message', PaginateMessageView, {
            region: 'paginate-message'
          });
        });
      }
    };

    return Controller;

  })(Chaplin.Controller);
});
