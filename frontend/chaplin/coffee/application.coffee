define [
  'chaplin'
], (Chaplin) ->
  'use strict'

  # The application object.
  # Choose a meaningful name for your application.
  class Application extends Chaplin.Application
    title: 'Urbania Mail'

  	# Create additional mediator properties.
  	initMediator: ->
  		# Add additional application-specific properties and methods
  		# e.g. Chaplin.mediator.prop = null
  		Chaplin.mediator.user = null
    initialize: ->
      super
