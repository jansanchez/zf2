// Generated by CoffeeScript 1.6.3
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['views/base/view', 'text!templates/layout-mail.hbs'], function(View, template) {
  'use strict';
  var LayoutView, _ref;
  return LayoutView = (function(_super) {
    __extends(LayoutView, _super);

    function LayoutView() {
      this.searchKeyword = __bind(this.searchKeyword, this);
      _ref = LayoutView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    LayoutView.prototype.el = '#wrapper';

    LayoutView.prototype.regions = {
      'paginate': '.ml-paginator',
      'page': '#divListMail',
      'message': "#divDetMail",
      'paginate-message': ".mail-paginator"
    };

    LayoutView.prototype.template = template;

    LayoutView.prototype.events = {
      "click #btnSearch": "searchKeyword",
      "keypress #txtSearch": "searchKeyword"
    };

    LayoutView.prototype.searchKeyword = function(e) {
      var $txtSearch, txtSearch, url;
      if (e.which === 13 || e.which === 1) {
        $txtSearch = $('#txtSearch');
        txtSearch = $.trim($txtSearch.val());
        if (txtSearch !== '') {
          url = window.location.protocol + '//' + window.location.host + window.location.pathname + '#search/' + txtSearch;
          return window.location = url;
        }
      }
    };

    return LayoutView;

  })(View);
});