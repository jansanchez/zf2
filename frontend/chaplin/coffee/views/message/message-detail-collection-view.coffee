define [
  'chaplin'
  'views/base/collection-view'
  'views/message/item-message-detail-view'
], (Chaplin, CollectionView, ItemMessageDetailView) ->
  
  class MessageDetailCollectionView extends CollectionView
    className:'grids-8'
    tagName:'div'
    autoRender: true
    itemView: ItemMessageDetailView
