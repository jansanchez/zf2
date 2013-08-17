(($,_) ->
	getBrowser = ->
		a = uaMatch(navigator.userAgent)
		b = {}
		if a.browser
			b[a.browser] = true
			b.version = a.version
		if b.chrome
			b.webkit = true
		else
			b.safari = true  if b.webkit
		b
	uaMatch = (b) ->
		b = b.toLowerCase()
		a = /(chrome)[ \/]([\w.]+)/.exec(b) or /(webkit)[ \/]([\w.]+)/.exec(b) or /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(b) or /(msie) ([\w.]+)/.exec(b) or b.indexOf("compatible") < 0 and /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(b) or []
		browser: a[1] or ""
		version: a[2] or "0"
	loading= (inst,cond)->
		if cond
			inst.addClass("loading")
		else
			inst.removeClass("loading")
	caldivExc = (dividendo, divisor) ->
		residuo = dividendo % divisor
		(if (residuo isnt 0) then ((dividendo - residuo) / divisor) + 1 else dividendo / divisor)
	caldivMin = (dividendo, divisor) ->
		residuo = dividendo % divisor
		(if (residuo isnt 0) then (dividendo - residuo) / divisor else dividendo / divisor)
	win= $(window)								##Instancia del elemento window
	htm= $("html")[0]							##Instancia del elemento html
	browser= getBrowser()						##Parámetro que devuelve la descripción del browser
	selScroll= if(browser.webkit) then $("body,document") else $("body,html")	##Instancia del scroll
	class Scrollaize
		constructor: (that,options)->
			opt=
				el: ""							##Contexto
				tag: "div"						##Tag del elemento que se agrega
				identifTag: ""					##Identificador del tag, puede ser una clase, id o ambas
				btn: ""							##Boton ver mas
				limit: 30						##Limite de elementos a mostrar para solicitar una peticion ajax
				frecuency: 10					##Frecuencia en la que se mostraran los elementos
				delayShow: 400					##Delay de animacion para mostrar elementos
				stop: false						##No la lanza el scroll al inicializarce el plugin
				table: false					##Opcion que indica si el scroll infinito se va a realizar para una tabla o no
				callback:
					preLoad: null				##Callback al iniciar la animacion -- Queda
					success: null				##Callback de ajax con peticion exitosa
					error: null					##Callback de ajax con error
			@settings= $.extend opt,options
			@navHeight= htm.clientHeight		##Alto de la ventana del navegador
			@btn= $(this.settings.btn)			##Boton que añade templates
			@arquitect=							##Instancia de arquitectura
				regs: null						##Storiza los elementos a scrollear
				number: 0						##Storiza el numero de elementos
			@flagAjax= true						##Flag que indica si el ajax se va realizar
			@scroll= 							##Almacena configuraciones del scroll
				state: true						##Flag que condiciona si se va hacer la animacion de evento scroll
				showElements: 0					##Calcula el número de elementos que se van visualizando
				groupScroll: 1					##Grupo del scroll
				limitScroll: 0					##Storiza el limite del Scroll
			@el= $(@settings.el)				##Contexto del Scroll Infinito
			@_init()
		_init: ()->
			@settings.callback.preLoad&&@settings.callback.preLoad.call(this)
			@_construct()
			@_resizeScroll()
			@_scrollize()
			return
		_construct: ()->						##Construye y Storiza los elementos a animar
			_this= @
			settings= _this.settings
			arquitect= _this.arquitect
			scroll= _this.scroll
			arquitect.regs= $(settings.tag+settings.identifTag,settings.el)
			arquitect.number= arquitect.regs.length
			if arquitect.number<settings.limit 				##Si el numero de elementos es menor que el limite de elemento para hacer ajax
				_this.flagAjax= false
			if arquitect.number>settings.frecuency			##Si el numero de elementos es mayor que la frecuencia en la que se debe mostrar los elementos
				if settings.table
					arquitect.regs.not(":lt("+(settings.frecuency)+")").find("td").hide()
				else
					arquitect.regs.not(":lt("+(settings.frecuency)+")").hide()
				scroll.showElements= settings.frecuency
			else											##El numero de elementos es menor o igual a la frecuencia
				scroll.state= false
				scroll.showElements= arquitect.number
			if arquitect.number==settings.limit&&settings.limit==settings.frecuency		##Si el numero de elementos es igual al limite y el limite es igual a la frecuencia
				scroll.state= false
			else
				_this.btn.hide()
			return
		_scrollize: ()->						##Bindea el evento scroll
			_this= @
			settings= _this.settings
			scroll= _this.scroll
			top= 0
			lmtScroll= 0
			_this._calcLimit()
			scroll.state= unless settings.stop then scroll.state else false
			win.on "scroll", ->
				top= selScroll.scrollTop()
				console.log scroll.state
				if top>=scroll.limitScroll&&scroll.state
					scroll.state= false
					setTimeout (->
						_this._showElements()
					), settings.delayShow
				return
			return
		_calcLimit: ()->						##Calcula el limite del Scroll
			_this= @
			scroll= _this.scroll
			el= _this.el
			scroll.limitScroll= (el.offset().top+el.height())-_this.navHeight
			return
		_resizeScroll: ()->						##Controla el redimencionamiento del window
			_this= @
			win.on "resize",->
				_this.navHeight= htm.clientHeight
				_this._calcLimit()
				return
			return
		_showElements: ()->						##Funcion que controla la vista y animacion de elementos del scroll
			_this= @
			scroll= _this.scroll
			arquitect= _this.arquitect
			settings= _this.settings
			nel= scroll.showElements 					##Variable que almacena los elementos visibles en ese instante de segundo
			totalel= arquitect.number					##Variable que almacena el total de elementos que se tiene
			frecuency= settings.frecuency				##Variable que almacena la frecuencia en la que se debe mostrar los elementos
			limit= settings.limit*scroll.groupScroll	##Variable que almacena el límite de elementos a mostrar para luego realizar la petición ajax
			currentel= nel+frecuency					##Variable que almacena la nueva cantidad de elementos a mostrar

			if currentel<=totalel
				scroll.state= true
				if currentel==limit
					console.log "Debe mostrarse el boton"
			else
				if settings.table
					arquitect.regs.slice(nel,totalel).find("td").hide()
				else
					arquitect.regs.slice(nel,totalel).hide()
				scroll.showElements= totalel
				_this.btn.hide()


			return
	$.fn.Scrollaize = (methods) ->
		if typeof methods is "undefined" or methods.constructor is Object
			new Scrollaize(this, methods)
		else if typeof methods isnt "undefined" and methods.constructor is String
			Scrollaize[methods].apply this, Array::slice.call(arguments_, 1)
			return
		else
			$.error "El parametro proporcionado " + method + " esta mal declarado o no es un objeto"
			return
	return
) jQuery,_