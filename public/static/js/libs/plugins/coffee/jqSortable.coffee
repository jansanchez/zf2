(($) ->
	cloneInst = (inst,conf,index) ->
		clone= inst.clone()
		clone.css $.extend(conf,{"z-index":index})
		inst.parent().append(clone)
		return clone
	calcPos = (inst) ->
		resd= inst.outerWidth(true)-inst.outerWidth()
		pos= inst.position()
		"top": pos.top
		"left": pos.left+resd
	class Sortablejs 
		constructor: (options) ->
			opt =
				context: "body"
				el: ".sort-el"
				parent: "auto"
				close: true
				closeTag: ".sort-close"
				navs:
					previous: ".sort-previous"
					next: ".sort-next"
				disable: "dis"
				time: 600
				separator: ","
				input: null
				id: "data-id"
				callback:
					close: null
			@settings= $.extend opt,options
			@context= $(@settings.context)
			@el= $(@settings.el)
			@flag=true
			@init()
		init: ->
			@construct()
			@animate()
			return
		construct: ->
			_this= this
			settings=_this.settings
			el= _this.el
			$.each el, (index,value) ->
				next= $(value).find(settings.navs.next)
				previous= $(value).find(settings.navs.previous)
				if settings.close
					del= $(value).find(settings.closeTag)
					del.data "target", $(this)
				$(this).data "next", next
				$(this).data "previous", previous
				_this.recognize.call $(this),settings.disable
				return
			return
		recognize: (dis,ignore)->
			inst= null
			ign= ignore or []	#Ignorar elemento
			$.each this, (index,value)->
				inst= $(value)
				next= inst.data "next"
				previous= inst.data "previous"
				nextEl= inst.next()
				prevEl= inst.prev()
				next.add(previous).removeClass(dis).data("el",inst)
				if nextEl.length > 0 and $.inArray(nextEl[0],ign)==-1
					next.data "target", inst.next()
				else
					next.addClass(dis)
				if prevEl.length >0 and $.inArray(prevEl[0],ign)==-1
					previous.data "target", inst.prev()
				else
					previous.addClass(dis)
				return
			return
		animate: ->
			_this= this
			settings= this.settings
			navs= settings.navs
			init= null
			finish= null
			classNext= settings.navs.next.replace(/[\.\s]/g, '')
			css=
				"margin": 0
				"position": "absolute"
			_this.context.on "click", navs.previous+","+navs.next, (e)->
				e.preventDefault()
				if _this.flag
					el= $(this).data "el"
					target= $(this).data "target"
					unless $(this).hasClass(settings.disable)
						_this.flag= false
						panimInit= calcPos target						#Json de position para realizar el animate para el init
						panimFinish= calcPos el 						#Json de position para realizar el animate para el finish
						init= cloneInst el, $.extend(css,panimFinish), 3
						finish= cloneInst target, $.extend(css,panimInit), 2						
						el.add(target).css("visibility","hidden")
						init.animate
							"top": panimInit["top"]
							"left": panimInit["left"]
						, settings.time, ->
							el.css("visibility","visible")
							init.remove()
							_this.flag= true
							return
						finish.animate
							"top": panimFinish["top"]
							"left": panimFinish["left"]
						, settings.time, ->
							target.css("visibility","visible")
							finish.remove()	
							return
						if $(this).hasClass classNext
							target.insertBefore el
						else
							target.insertAfter el
						_this.recognize.call _this.el,settings.disable,[init[0],finish[0]]
						if _this.settings.input?
							_this.el= $(_this.settings.el).not(init.add(finish))
							_this.reorder()
						return
			if settings.close
				_this.context.on "click", settings.closeTag, (e)->
					e.preventDefault()
					target= $(this).data("target")
					target.hide 500, ()->
						target.remove()
						_this.el= $(settings.el)
						_this.recognize.call _this.el,settings.disable
						_this.reorder()
						settings.callback.close&&settings.callback.close(target.attr(settings.id))
						return
					return
			return
		reorder: ->
			_this= this
			settings=_this.settings
			el= _this.el
			inpt= $(settings.input)
			id= null
			result= ""
			separator= ""
			$.each el, (index,value) ->
				id= $(value).attr(settings.id)
				separator= (if ((index+1) == el.length) then "" else settings.separator)
				result= result + id + separator
				return
			inpt.val result
			return
		##Estaticos
		refresh: ()->
			_this= this
			_this.el= $(_this.settings.el)
			_this.construct()
			_this.reorder()
			return
	$.extend
		Sortablejs: (json) ->
			new Sortablejs(json)
	return
) jQuery