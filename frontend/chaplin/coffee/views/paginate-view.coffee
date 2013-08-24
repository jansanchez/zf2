define [
  'chaplin'
  'views/base/view'
  'text!templates/paginate-mail.hbs'  
  'lib/utils'
], (Chaplin, View, template, Utils) ->
  'use strict'

  class PaginateView extends View
    template: template
    region: "paginate"
    pagTotal: 0
    pagPaginate: 0
    pagPages: 0
    pagPage: 0
    params: {}
    initialize: (object) ->
      @params= object.params
      @pagTotal= @model.get("total")                       #Obtiene el total de correos con la que cuenta la aplicacion
      @pagPaginate= @model.get("pagination")               #Obtiene la paginacion de correos con la que cuenta la aplicacion
      @pagPage= parseFloat @model.get("page")              #Obtiene la pagina actual
      @calcTotalPage()
      @calcPaginate()
      if @pagPage>@pagPages||@pagPage<=0
        @publishEvent '!router:route', Chaplin.helpers.reverse("index#show", [1])
      @subscribeEvent 'PaginateView:render', @updatePaginate
      super
    updatePaginate:() ->
      @pagTotal= Chaplin.mediator.pages
      @model.set "total",@pagTotal
      @calcTotalPage()
      @calcPaginate()
      @render()
    calcTotalPage: () ->
      @pagPages= Utils.caldivExc(@pagTotal,@pagPaginate)
      @model.set "totalPage", @pagPages
    calcPaginate: () ->
      pagNext= @pagPage+1                                  #Obtiene la pagina siguiente
      pagPrevious= @pagPage-1                              #Obtiene la pagina anterior
      arrPrevious= [pagPrevious]                           #Define un array con las configuraciones de la ruta para el obtener la url del boton atras
      arrNext= [pagNext]                                   #Define un array con las configuraciones de la ruta para obtener la url del boton siguiente
      rangeInit= if pagPrevious is 0 then 1 else (pagPrevious*@pagPaginate)             #Obtiene el rango inicial del paginado
      rangeFinish= if pagNext > @pagPages then @pagTotal else (pagNext*@pagPaginate)    #Obtiene el rango final del paginado

      @model.set "interval", rangeInit+"-"+rangeFinish

      if typeof @params.search!="undefined"
        name= "search"
        arrPrevious.push @params.search
        arrNext.push @params.search
      else
        name= "index#show"

      if pagPrevious>0
        @model.set "isPrevious", false
        @model.set "urlPrevious", Chaplin.helpers.reverse(name, arrPrevious)
      if pagNext>@pagPages
        if pagPrevious>0 then @model.set "isPrevious", false
        @model.set "isNext", true
        @model.set "urlNext", "javascript:;"
      else
        @model.set "urlNext", Chaplin.helpers.reverse(name, arrNext)