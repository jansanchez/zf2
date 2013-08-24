define ->
  'use strict'

  # The routes for the application. This module returns a function.
  # `match` is match method of the Router
  (match) ->
    match '', 'index#index'
    match 'message/:id', 'index#message', constraints: {id: /^[0-9]*$/}

    # Users, repos, topics.
    match 'p:page', 'index#show', {constraints: {page: /^[0-9]*$/}}
    match 'p:page/message/:id', 'index#show', {constraints: {page: /^[0-9]*$/}, name: "message"}
    match 'p:page/search/:search', 'index#show', {constraints: {page: /^[0-9]*$/}, name:"search"}
