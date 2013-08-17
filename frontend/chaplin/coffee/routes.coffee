define ->
  'use strict'

  # The routes for the application. This module returns a function.
  # `match` is match method of the Router
  (match) ->
    match '', 'index#index'
    match 'message', 'index#message'
    match 'search/:keyword', 'index#search' #, params: {foo: 'bar'}
    