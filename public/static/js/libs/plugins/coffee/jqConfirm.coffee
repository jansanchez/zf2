(($,_) ->
	_.templateSettings = interpolate : /\{\{(.+?)\}\}/g
	tmpl = "<div class='popup-box'>
			<h2 class='urb-stitle'>{{title}}</h2>
			<p class='control mb30'>{{answer}}</p>
			<div class='control'>
				<a  class='btn-gray btn-standar' title='No' href='javascript:;'>No</a>
     			<a title='Sí' class='btn-urb btn-standar' href='javascript:;'>Sí</a>
			</div>
		</div>"
	Confirm = (options) ->
		opt=
			"title": "Título"
			"answer": "Preguntas"
			"callback": null
		@settings=$.extend(opt,options)
		@tmpl=@render()
		@arquitect={}
		@rspta=null
		@init()
		return
	Confirm::init= ->
		_this = this
		@construct()
		@events()
		$.fancybox @arquitect.content,
			beforeClose: ->
				_this.rspta = false if !_this.rspta?
				_this.settings.callback&&_this.settings.callback(_this.rspta)
				return
		return
	Confirm::construct= ->
		content=$(@tmpl)
		@arquitect=
			"content": content
			"yes": content.find(".btn-urb")
			"no": content.find(".btn-gray")
		return
	Confirm::events= ->
		_this= this
		arquitect= _this.arquitect
		arquitect.yes.on "click", (e) ->
			e.preventDefault()
			_this.rspta= true
			$.fancybox.close()
			return
		arquitect.no.on "click",(e) ->
			e.preventDefault()
			_this.rspta= false
			$.fancybox.close()
		return
	Confirm::render= ->
		_this= this
		template= _.template tmpl
		template _this.settings
	$.extend
		confirm: (json) ->
			new Confirm(json)
			return
	return
) jQuery,_