requirejs.config({
	baseUrl: 'http://zf2.pe/static/js/um/',
	paths: {
		jquery: 'bower_components/jquery/jquery',
		underscore: 'bower_components/lodash/lodash',
		backbone: 'bower_components/backbone/backbone',
		handlebars: 'bower_components/handlebars/handlebars',
		text: 'bower_components/requirejs-text/text',
		chaplin: 'bower_components/chaplin/chaplin',
		echo: '../../libs/plugins/jqEcho.js'
	},
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
		deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		handlebars: {
			exports: 'Handlebars'
		}
	}
	, urlArgs: 'bust=' +  (new Date()).getTime()
});
require(['application', 'routes'], function(Application, routes) {
	new Application({routes: routes, controllerSuffix: '-controller', pushState: false});
});