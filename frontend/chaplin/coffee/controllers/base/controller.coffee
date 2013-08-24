define [
	'chaplin'
	'views/layout-view'
	'views/paginate-view'
	'models/paginate'
], (Chaplin,LayoutView,PaginateView,Paginate) ->
  'use strict'

  class Controller extends Chaplin.Controller
    # Place your application-specific controller features here
    beforeAction: (params, route)->
      _this = @
      @compose 'layout', LayoutView

      #jsPage= if route.name=="index#show" then params else {}
      @compose 'paginate', PaginateView, {model: new Paginate(params), params}


      if route.name == "index#message"      	
      	require ['views/paginate-message-view'], (PaginateMessageView)->
      		_this.compose 'paginate-message', PaginateMessageView, region: 'paginate-message'
