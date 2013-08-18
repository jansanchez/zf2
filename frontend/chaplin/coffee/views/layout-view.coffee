define [
  'views/base/view'
  'text!templates/layout-mail.hbs'
], (View, template) ->
  'use strict'

  class LayoutView extends View
    el: '#wrapper'
    regions:
        'paginate': '.ml-paginator'
        'page': '#divListMail'
        'message': "#divDetMail"
        'paginate-message': ".mail-paginator"
    template: template
    events:
      "click #btnSearch":   "searchKeyword"
      "keypress #txtSearch":   "searchKeyword"
    searchKeyword: (e) =>
      if e.which == 13 || e.which == 1
        $txtSearch = $('#txtSearch')
        txtSearch=$.trim($txtSearch.val())
        if txtSearch!=''
          url = window.location.protocol + '//' + window.location.host + window.location.pathname + '#search/'+txtSearch
          window.location = url
          # {keyword: txtSearch}