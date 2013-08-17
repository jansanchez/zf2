define [
  'views/base/view'
  'text!templates/page-mail.hbs'
], (View, template) ->
  'use strict'

  class PageView extends View
    template: template
    template= null
    