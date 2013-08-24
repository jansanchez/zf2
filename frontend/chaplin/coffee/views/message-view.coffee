define [
  'views/base/view'
  'text!templates/message-mail.hbs'
], (View, template) ->
  'use strict'
  
  class MessageView extends View
    autoRender: true
    template: template
    template = null
  
