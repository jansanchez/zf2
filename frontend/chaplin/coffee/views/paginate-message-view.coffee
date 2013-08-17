define [
  'views/base/view'
  'text!templates/paginate-message-mail.hbs'
], (View, template) ->
  'use strict'

  class PaginateMessageView extends View
    template: template
    template= null
    