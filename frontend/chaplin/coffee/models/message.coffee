define [
  'chaplin'
  'models/base/model'
], (Chaplin, Model) ->
	'use strict'
	class Message extends Model
		defaults: {
			idCorreo: null
			remitente: null
			titulo: ''
			hora: null
			destacado: 0
			estado: 1
			archivo: null},
		url:->
			"#{yOSON.baseHost}agentes/correo/ajax-msg"
		urlDetail:(id)->
			url = @url()
			"#{url}/inbox/#{id}"
