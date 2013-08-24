define [
  'chaplin'
  'views/base/view'
  'text!templates/item-message-list-view.hbs'
], (Chaplin, View, template)->

# String estado:1 => leido
# String estado:2 => no leido

# String destacado:1 => destacado
# String destacado:0 => no destacado

  class ItemMessageListView extends View
    tagName: 'li'
    attributes: ->
      {
        'class': @_renderClass()
        'data-id': @model.get('idCorreo')
      }
    className:'mlist-el'
    classRead:' ml-read'
    classActual:' act'
    initialize: () ->
      if @model.get('destacado') == "1"
        @model.set('destacado',1)
      else
        @model.set('destacado',0)
    _renderClass:->
      if @model.get('estado') == "1"
        @className+=" #{@classRead}"
      return @className
    template: template
    #bind Events
    events:
      'click':'verDetalle'
      'click input[type=checkbox]': 'selectCheck'
      'click .icon-detasq': 'toggleDestaque'
      
    verDetalle:->
      $el = $(@el)
      id = $el.attr('data-id')
      
      $el.removeClass(@classRead)
        .addClass(@classActual)
      
      #ejecuta trigger de detalle del correo
      @publishEvent 'MessageListCollectionView:observerSeleccionado',
        {id:id, el:$el, assingClass: @classRead }
        
      #Actualiza la ruta llamando al action correspondiente
      window.location = "#{window.location.pathname}#message/#{id}"
      #@publishEvent '!router:route', Chaplin.helpers.reverse("index#show", [1])

    selectCheck:(e)->
      e.stopPropagation()
    
    toggleDestaque:(e)->
      e.stopPropagation()
      $this = $(e.currentTarget)
      activeClass = 'act'

      if $this.hasClass activeClass
        $this.removeClass activeClass
      else
        $this.addClass activeClass
      
      state = if @model.get('destacado') == 0 then 1 else 0
      @model.set('destacado', state)
      @model.url("#{yOSON.baseHost}agentes/correo/ajax-upd/destaque/data/");
      @model.save()

