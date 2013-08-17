define [
	'chaplin'
	'views/layout-view'
	'views/paginate-view'
	'models/paginate'
	'views/page-view'
	'views/message-view'
], (Chaplin,LayoutView,PaginateView,Paginate,PageView,MessageView) ->
  'use strict'

  class Controller extends Chaplin.Controller
    # Place your application-specific controller features here
    beforeAction: (params, route)->
      _this= @
      @compose 'layout', LayoutView

      jsPage= if route.name=="index#page" then params else {}
      @compose 'paginate', PaginateView, {model: new Paginate(jsPage)}

      @compose 'page', PageView, region: 'page'
      @compose 'message', MessageView, region: 'message'
      if route.name == "index#message"      	
      	require ['views/paginate-message-view'], (PaginateMessageView)->
      		_this.compose 'paginate-message', PaginateMessageView, region: 'paginate-message'
