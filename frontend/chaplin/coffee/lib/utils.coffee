define [
  'underscore'
  'chaplin'
], (_, Chaplin) ->
  'use strict'

  # Application-specific utilities
  # ------------------------------

  # Delegate to Chaplin’s utils module
  utils = Chaplin.utils.beget Chaplin.utils

  _.extend utils,
    caldivExc: (dividendo,divisor) ->
      residuo= dividendo%divisor
      if residuo!=0 then ((dividendo-residuo)/divisor)+1 else dividendo/divisor

  utils
