define [
  'views/base/view'
  'text!templates/paginate-mail.hbs'
], (View, template) ->
  'use strict'

  class PaginateView extends View
    template: template
    region: "paginate"
    template= null