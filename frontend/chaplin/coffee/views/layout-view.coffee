define [
  'chaplin'
  'views/base/view'
  'text!templates/layout-mail.hbs'
], (Chaplin, View, template) ->
  'use strict'

  class LayoutView extends View
    el       : '#wrapper'
    template : template
    dom      : {}
    regions:
      'paginate'         : '.ml-paginator'
      'page'             : '#divListMail'
      'listEmail'        : '#listEmail'
      'headMail'         : '.mail-head'
      'thread'           : '.mail-thread'
      'reply'            : '.mail-compose'
      'paginate-message' : ".mail-paginator"
    events:
      "click #btnSearch"   :   "searchKeyword"
      "keyup #txtSearch"   :   "searchKeyword"
      "click #spaClose"    :   "cleartxtSearch"
      "click #ancSelect"   :   "selectOptions"
      "click #ancFilter"   :   "selectFilter"
      "click #chkSelect"   :   "selectFromList"
      "click .chkAll"      :   "selectFromList"
      "click .chkNone"     :   "selectFromList"
    searchKeyword: (e) ->
      # selectores siempre al inicio
      @dom.txtSearch   = $('#txtSearch')
      @dom.spaClose    = $('#spaClose')
      txtSearch = $.trim(@dom.txtSearch.val())
      # sólo cuando presionen enter(13) o hacen click(1) ejecuto lo siguiente...
      if e.which == 13 || e.which == 1
        # queda pendiente la validacion de seguridad
        if txtSearch !=''
          ###
          creo mi "pathname" en base al action(search) y le paso el valor para el parametro "keyword" 
          mediante variable "txtSearch"
          ###
          #pathname = 'p1/search/'+encodeURIComponent(txtSearch)
          search= encodeURIComponent(txtSearch)
          # si mi "pathname" no inicia con un / lo agrego para no tener problemas en ie8
          #path = "/#{pathname}" if pathname.charAt(0) isnt '/'
          # utilizo el "EventBroker" de Chaplin para publicar un evento en la ruta
          # uso un evento global del router '!router:route' y le paso la nueva ruta(path)
          # el tercer parametro es un queryString
          # https://github.com/chaplinjs/chaplin/blob/master/docs/chaplin.router.md#global-events-of-chaplinrouter
          # https://github.com/chaplinjs/chaplin/blob/master/docs/chaplin.router.md#routepath
          # con esto hago un trigger hacia el action "search" y lo ejecuto
          #@publishEvent '!router:route', path
          @publishEvent '!router:route', Chaplin.helpers.reverse("search", [1,search])
        else
          @publishEvent '!router:route', Chaplin.helpers.reverse("index#show", [1])
      else
        if txtSearch == ''
          @cleartxtSearch()
        else
          @dom.spaClose.fadeIn() if @dom.spaClose.css('display') == 'none'
    selectOptions: (e) ->
      # selectores
      @dom.ancSelect   = $('#ancSelect')
      @dom.ancFilter   = $('#ancFilter')
      @dom.ancFilter.parent().removeClass('act') if @dom.ancFilter.parent().hasClass('act')
      @dom.ancSelect.parent().toggleClass('act')
    selectFilter: (e) ->
      # selectores
      @dom.ancSelect   = $('#ancSelect')
      @dom.ancFilter   = $('#ancFilter')
      @dom.ancSelect.parent().removeClass('act') if @dom.ancSelect.parent().hasClass('act')
      @dom.ancFilter.parent().toggleClass('act')
    cleartxtSearch: ->
      @dom.txtSearch.val('').focus()
      @dom.spaClose.fadeOut()
    selectFromList: (e) ->
      # selectores
      @dom.chkSelect   = $('#chkSelect')
      if $(e.currentTarget).hasClass('chkAll')
        value = true
        @dom.chkSelect.prop 'checked', value
        $(e.currentTarget).parent().parent().parent().removeClass('act') if $(e.currentTarget).parent().parent().parent().hasClass('act')
      else
        if $(e.currentTarget).hasClass('chkNone')
          value = false
          @dom.chkSelect.prop 'checked', value
          $(e.currentTarget).parent().parent().parent().removeClass('act') if $(e.currentTarget).parent().parent().parent().hasClass('act')
        else
          e.stopPropagation()
          value = if $(e.currentTarget).prop 'checked' then true else false
      @multiSelection(value)
    multiSelection: (value) ->
      @dom.divListMail = $('#divListMail')
      @dom.divListMail.children().each (i, el) ->
        $(el).children('input').prop 'checked', value
