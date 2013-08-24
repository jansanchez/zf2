define [
  'chaplin',
  'models/base/model'
], (Chaplin, Model) ->
  'use strict'

  class PaginateModel extends Model
    defaults:
      page: 1
      pagination: Urbmail.page
      total: Chaplin.mediator.pages
      totalPage: 0
      interval: ""
      isNext: false
      isPrevious: true
      urlNext: "javascript:;"
      urlPrevious: "javascript:;"     