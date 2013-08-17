define [
  'handlebars'
  'chaplin'
  'lib/utils'
], (Handlebars, Chaplin, utils) ->
  'use strict'

  # Application-specific Handlebars helpers
  # ---------------------------------------

  Handlebars.registerHelper 'pageState', (page,total) ->
    page++

  Handlebars.registerHelper 'pageNext', (page,total) ->
    page++

  # Get Chaplin-declared named routes. {{#url "like" "105"}}{{/url}}
  Handlebars.registerHelper 'url', (routeName, params..., options) ->
    Chaplin.helpers.reverse routeName, params

  null
