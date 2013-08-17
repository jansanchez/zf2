define [
  'views/base/view'
  'text!templates/search-view.hbs'
], (View, template) ->
  'use strict'

  class SearchView extends View
    template: template
    template= null