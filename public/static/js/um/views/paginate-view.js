// Generated by CoffeeScript 1.6.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['views/base/view', 'text!templates/paginate-mail.hbs'], function(View, template) {
  'use strict';
  var PaginateView, _ref;
  return PaginateView = (function(_super) {
    __extends(PaginateView, _super);

    function PaginateView() {
      _ref = PaginateView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PaginateView.prototype.template = template;

    PaginateView.prototype.region = "paginate";

    template = null;

    return PaginateView;

  })(View);
});