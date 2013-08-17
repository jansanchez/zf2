define [
  'chaplin',
  'models/base/model'
], (Chaplin, Model) ->
  'use strict'

  class PaginateModel extends Model
    defaults:
      page: 1
      pagination: Urbmail.page
      total: Urbmail.totalmsg