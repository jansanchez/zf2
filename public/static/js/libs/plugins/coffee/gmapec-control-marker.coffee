###
    Clase intermediaria a gmaps
###
window.controlMarker = class controlMarker extend gmap
    #constructor del objeto gMap - CORE
    # parametros que recibe
    # @obj = el elemento del documento
    # @services = se declara en formato de array si va a tomar "geocode", "places"
    # @async = si la carga de la librería de gmaps va a ser asincrona o no
    # @registerMethod = Esta collecion toma los metodos que se van a usar para
    #                    la ejecucion correspondiente
    constructor: (@obj, @libraries, @async)->
      @debug = true
      @libraries = @libraries || ''
      @async = @async || true
      @markers = {}
      @nspace = null
      @registerMethod = []
      @isDispachableEvents = false
      #execute
      @render()
    #method features - CORE
    #Almacena las características del mapa
    #básico para que el objeto levante
    f: (@opts)->
      @opts.zoom = @opts.zoom || 8
      @opts.lt = @opts.lt || -8.59087
      @opts.lg = @opts.lg || -77.1025
      @opts.center = [@opts.lt, @opts.lg]
      @opts.mapTypeId = @opts.type || "ROADMAP"
      @opts.streetViewControl = @opts.streetViewControl || true
    #method evt
    #eventos del mapa
    #almacena los eventos que hace unicamente el mapa
    evt:(evts)->
      @gMethodAdd({
            #nombre del evento a ejecutarse
            method: 'evt'
            #se envía los mismos parametros para el despacho correspondiente
            params: evts
            #la funcion que se ejecutará cuando se inicialize el plugin
            func: (params, gmap)->
              for nameEvt of evts
                gmap.nspace.event.addListener gmap.map, nameEvt, evts[nameEvt]
      })
    #Ejecuta con las indicaciones dadas en este orden:
    #f -> features
    #overlays -> overlays (markers, ...)
    #method render - CORE
    #verifica si la carga de la librería es asycrona y llama al método que
    #despacha todo
    render:->
       #si es asíncrono se ejecuta
       if @async
          @asyncJS()
       # si viene el js en el doc
       else
          @dispatch()
    #dispatch method - CORE
    #metodo que ejecuta todo lo configurado
    dispatch: ->
        @nspace = google.maps
        #verificamos si la libreria existe
        if @nspace == undefined
          throw "la carga de google maps a fallado o es una version no soportada"
        #verificamos si el elemento existe  
        if document.getElementById(@obj)
          target = document.getElementById(@obj)
          if not @hasOwnProperty("map")
            realOpts = @dealOpts @opts
            #creamos la base del mapa
            @map = new @nspace.Map(target,  realOpts)
            @isDispachableEvents = true
            @dispatchEvents(@)
        #lanzamos mensaje de error en caso falle
        else
          throw "el objeto map no existe en el documento"
    dispatchEvents: (ctx)->
      if ctx.isDispachableEvents
        #ejecutamos los metodos registrados
        for collectionMethod in @registerMethod by 1
            method = collectionMethod.method
            params = collectionMethod.params
            status = collectionMethod.status
            if status
               collectionMethod.func(params, ctx)
               collectionMethod.status  = 0
    #method que trata con las opciones del mapa
    dealOpts: (opts)->
        _this = @
        return {
          center: new _this.nspace.LatLng(opts.center[0], opts.center[1])
          zoom: opts.zoom
          lt: opts.lt
          lg: opts.lg
          mapTypeId: _this.nspace.MapTypeId[opts.mapTypeId]
          streetViewControl: opts.streetViewControl
        }
    #method markers - EXT
    marker:(markerOpts) ->
        @gMethodAdd({
             method: "marker"
             params: markerOpts
             func:(params, gmap)->
                #settings del marker
                stMarker = {}
                if not markerOpts.hasOwnProperty("position")
                  stMarker.position =  new gmap.nspace.LatLng(markerOpts.lt || -8.59087, markerOpts.lg || -77.1025)
                else
                  stMarker.position = markerOpts.position
                stMarker.title = markerOpts.title || ""
                stMarker.map = gmap.map
                stMarker.draggable = markerOpts.draggable || false
                #estableciendo el icono del marker
                stMarker.icon = markerOpts.icon
                #el id del marker
                stMarker.id = markerOpts.id
                #el marker será fijo y no se removerá
                stMarker.fixed = markerOpts.fixed || false
                #asociacion del marker con el mapa
                markerObj = new gmap.nspace.Marker(stMarker)
                ctxMarker = markerObj
                #se guarda en una colección de markers  
                gmap.markers[stMarker.id] = markerObj
                #setData
                markerObj.gmap = gmap
                markerObj.data = params.data || ""
                #se despacha los eventos que se solicitan
                for nameEvt of markerOpts.evts
                  gmap.nspace.event.addListener markerObj, nameEvt , markerOpts.evts[nameEvt]
        })
    #method get marker - EXT
    getMarker:(idMarker)->
        return @markers[idMarker]
    #method delete markers - EXT
    cleanMarkers: () ->
        @gMethodAdd({
            method: "cleanMarkers"
            params: ""
            func:(params, gmap)->
              window.eee = gmap.markers
              for marker of gmap.markers
                if gmap.markers[marker].fixed is false
                   gmap.markers[marker].setMap null
                   delete gmap.markers[marker]
                
        })
    #reubicar marker -> EXT
    relocateMarker: (markerId)->
        @gMethodAdd({
            method: "relocate"
            params: {
              markerId: markerId
            }
            func:(params, gmap)->
                gmap.markers[params.markerId].setMap(gmap.map)
        })
    #get all markers -> CORE
    getAllMarkers: (st) ->
        exceptional = st.exceptional || []
        for own kMarker of @markers
          if exceptional.indexOf(@markers[kMarker].id) is -1
            @markers[kMarker]
    #geocode - service
    geocode:(geocodeOpts)->
        @gMethodAdd({
             method: "geocode"
             params: geocodeOpts
             func: (params, gmap) ->
                gcoder = new gmap.nspace.Geocoder()
                callback = params.callback
                
                if params.hasOwnProperty('lt') && params.hasOwnProperty('lg')
                   params.latLng = new google.maps.LatLng(params.lt, params.lg)
                
                if params.useMarker
                   marker = gmap.markers[params.useMarker]

                delete params.lt
                delete params.lg
                delete params.callback
                delete params.useMarker
                
                gcoder.geocode(
                    params, 
                    (results, status)->
                       callback(results, status, {gmap: gmap, marker: marker})
                )
        })
    #places -> service
    gplaces: (gPlacesOpts) ->
        @gMethodAdd({
             method: "gplace"
             params: gPlacesOpts
             func: (params, gmap) ->
                places = new gmap.nspace.places.PlacesService(gmap.map)
                places.search({
                    location: gmap.map.getCenter()
                    radius: gPlacesOpts.radius
                    types: gPlacesOpts.types
                }, params.callback)
        })
    #callback async
    #Methodo que permite ejecutar funciones ni bien termine de cargar la libreria
    #Es necesario cuando una librería externa depende del core del mapa en este caso
    # google Maps
    onLoadAsyncLib: (onLoadOpts)->
        @gMethodAdd({
             method: "onLoadAsyncLib"
             params: onLoadOpts
             func: (params, gmap) ->
                params.callback && params.callback(gmap)
        })
    asyncJS:->
        #fix renderMap
        _this = @
        window["renderMap"] = ->
            _this["dispatch"]()
        #queryLibraries
        if @libraries != ""
            queryLibraries = "&libraries=#{_this.libraries}"
        else 
            queryLibraries = _this.libraries
        #loadScript
        @u.loadScript "https://maps.googleapis.com/maps/api/js?v=3.exp#{queryLibraries}" +
                      "&sensor=false&callback=renderMap", ""
    u:
      loadScript:(src, evts)->
        script = document.createElement 'script'
        script.type = 'text/javascript'
        if script.readyState
            script.onreadystatechange = ->
                script.onreadystatechange=null
                evts.ready && evts.ready(src)
        else
            script.onload = ->
                evts.ready && evts.ready(src)
        script.src = src
        document.body.appendChild script
    #Adicionamos el metodo
    gMethodAdd:(settings)->
        settings.status = 1
        @registerMethod.push(settings)
        @dispatchEvents(@)
    #getMapa
    mapa:()->
      @map
    #LatLng
    latLng:(lat, lng)->
      new @nspace.LatLng(lat, lng)
    #get infoWindow
    info:->
      new @nspace.InfoWindow()