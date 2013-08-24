define [
  'chaplin'
  'controllers/base/controller',
  'models/message',
  'views/message/message-list-collection-view',
  'views/message/message-detail-collection-view'
  'models/base/collection'
], (Chaplin, Controller, Message, MessageListCollectionView, MessageDetailCollectionView, Collection) ->
  'use strict'

  class IndexController extends Controller
    _listMail: (params) ->                  #Listamos el lado izquierdo de los correos
      #Asociamos el modelo
      @messageList = new Message
      @messages = new Collection null, model: Message      
      #proveemos la url que tiene el modelo a la collecion
      #la collecion tomará la url y procesará lo que necesita
      @messages.url = @messageList.url()      
      #Parseamos y procesamos la data que viene de la ruta
      #haciendo esto espera procesar un elemento array
      #para cada elemento de ese array lo hirá asociando al modelo
      @messages.parse = (response) ->
        # Brayan cuando no hay data nos esta llegando undefined
        # hay que tratar ese escenario.
        if response.data.src.data == undefined
          console.log 'no hay data'
        else
          Chaplin.mediator.pages= response.data.src.total
          @publishEvent 'PaginateView:render'
          return $.parseJSON(response.data.src.data)      
      #Creando la instancia de la vista asociando la collection 
      #y agregando la region de donde displayar
      @messagesListView = new MessageListCollectionView 
        collection: @messages
        region: 'listEmail'        
      #Ejecutamos para la recolleccion de data
      utils.loader($(".ctn-listmail"),true)
      @messages.fetch({ data: $.param(params) }).then =>
        utils.loader($(".ctn-listmail"),false);
    _refreshSearch: (params,route)->                  #Actualizamos el search
      if route.name == "search" and $.trim(params.search)!=""
        $('#txtSearch').val(params.search)
        $('#spaClose').fadeIn()
    index: (params) ->
      @redirectToRoute "index#show", [1]    
    show: (params,routes) ->
      @_listMail params
      @_refreshSearch params, routes
    message: (params) ->
      
      #Asociamos el modelo
      @messageDetail = new Message
      console.log @
      
      @messagesDetail = new Collection null, model:Message
      
      @messagesDetail.url = @messageDetail.urlDetail(params.id)
      @messagesDetail.parse = (response) ->
        console.log $.parseJSON(response.data.src.data)
        return $.parseJSON(response.data.src.data)
        
      @messageDetailView = new MessageDetailCollectionView
        collection: @messagesDetail
        region: 'message'
      
      @messagesDetail.fetch().then = (data)->
        console.log data