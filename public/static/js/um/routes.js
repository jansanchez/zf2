// Generated by CoffeeScript 1.6.3
define(function() {
  'use strict';
  return function(match) {
    match('', 'index#index');
    match('message', 'index#message');
    return match('search/:keyword', 'index#search');
  };
});