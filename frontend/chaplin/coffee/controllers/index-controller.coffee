define [
  'controllers/base/controller'
], (Controller) ->
  'use strict'

  class IndexController extends Controller
    index: (params) ->
      console.log 'index!'
    message: (params) ->
      console.log 'message!'
    search: (params) ->
    	console.log 'Soy "indexController" invocaste mi route "search" y me pasaron el parametro: ' + params.keyword