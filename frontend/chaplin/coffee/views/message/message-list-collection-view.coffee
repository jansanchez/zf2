define [
  'chaplin'
  'views/base/collection-view'
  'views/message/item-message-list-view'
], (Chaplin, CollectionView, ItemMessageListView) ->

  class MessageListCollectionView extends CollectionView
    className: 'ml-list'
    attributes:
      'id': 'divListMail'
    itemView: ItemMessageListView
    tagName: 'ul'
    autoRender: true
    initialize:->
      @subscribeEvent 'MessageListCollectionView:observerSeleccionado', @observerSeleccionado
      super
    vieweds:[]
    observerSeleccionado:(params)->
      # en un archivo global deberemos colocar un indexOf nativo para ie8
      if @vieweds.indexOf(params.id) == -1
        @vieweds.push params.id
      
      if @vieweds.length
        for viewed in @vieweds by 1
          if viewed != params.id
            @$el.find("li[data-id=#{viewed}]")
              .addClass(params.assingClass)
