String.prototype.clearTpl = function(){
	return this.toString().replace('data-src', 'src');
}

/*Require Config*/
require.config({
	urlArgs: "v=" +  (new Date()).getTime(),
    baseUrl: yOSON.statHost+'js/backbone/',
    paths: {
        jquery: 'libs/jquery/jquery-1.9.1.min',
		underscore: 'libs/underscore/underscore',
		backbone: 'libs/backbone/backbone',
		text: 'libs/require/text',
		echo: 'libs/jquery/plugins/jqConsola',
		router: 'router'
    },
	shim: {
		underscore: {
		  exports: '_'
		},
		backbone: {
		  deps: ["underscore", "jquery"],
		  exports: "Backbone"
		}
	}
});

require(['jquery', 'underscore', 'backbone', 'text', 'echo'], function ($, _, Backbone, text, echo) {

	_.templateSettings = { interpolate : /\{\{(.+?)\}\}/g };



	var obj = {
				a: 'nooo', 
				b: { 
					c: 'ce!!!'}
				};


	var abc = _.template("hola {{ d.b.c }}!", obj, {variable: 'd'});
	console.log(abc);

	var compiled_template = _.template(plantilla);

	//this.$el.html(compiled_template(this.model.toJSON())).fadeIn();




	Backbone.sync = function(method, model, options) {
		options || (options = {});

		switch (method) {
			case 'create':
				console.log('create');
				
			break;
			case 'update':
				console.log('update');
			break;
			case 'delete':
				console.log('delete');
			break;
			case 'read':
				console.log('read');
			break;
		}
	};


	require(['urbania'], function (urbania) {
		urbania.initialize();
	});


	/*
	require(['/js/views/modules/GalleryView.js'],
		function (GalleryView){
			//Creamos una instancia de nuestra galería principal
			new GalleryView({});
		}
	);
	*/






});