define [
  'controllers/base/controller'
], (Controller) ->
  'use strict'

  class IndexController extends Controller
    selectorTitle: '.head-adm h2'
    index: (params) ->
      console.log 'index!'
    message: (params) ->
      console.log 'message!'
    search: (params) ->
      $(@selectorTitle).html('Mensajes - Buscando: '+params.keyword)
    	#console.log 'Soy "indexController" invocaste mi route "search" y me pasaron el parametro: ' + params.keyword