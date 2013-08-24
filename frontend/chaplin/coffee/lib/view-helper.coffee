define [
  'handlebars'
  'chaplin'
  'lib/utils'
], (Handlebars, Chaplin, utils) ->
  'use strict'

  # Application-specific Handlebars helpers
  # ---------------------------------------


  #View helper que resuelve las rutas del Paginate
  Handlebars.registerHelper 'urlPage', (routeName, page, crit) ->
    if crit=="previous" then page-- else page++
    Chaplin.helpers.reverse routeName, [page]

  # Get Chaplin-declared named routes. {{#url "like" "105"}}{{/url}}
  Handlebars.registerHelper 'url', (routeName, params..., options) ->
    Chaplin.helpers.reverse routeName, params
    
  # Debug the vars
  Handlebars.registerHelper 'debug', (optionalValue) ->
    console.log "Contexto actual::"
    console.info "this"
    if optionalValue
      console.log "Value::"
      console.info optionalValue