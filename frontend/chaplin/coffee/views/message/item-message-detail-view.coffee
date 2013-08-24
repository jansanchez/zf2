define [
  'views/base/view'
  'text!templates/message-item-mail.hbs'
], (View, template)->

# String estado:1 => leido
# String estado:2 => no leido

# String destacado:1 => destacado
# String destacado:0 => no destacado

  class ItemMessageDetailView extends View
    tagName: 'li'
    attributes: ->
      {
        'class': @_renderClass()
        'data-id': @model.get('idCorreo')
      }
    _renderClass:->
      className = 'mlist-el'
      classRead = ' ml-read'
      classActual = ' act'
      
      if @model.get('estado') == 1
        className+=classRead

      return className
    template: template
