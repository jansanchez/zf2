define(['backbone'], function(Backbone) {
	/*Creamos un modelo*/
	var Video = Backbone.Model.extend({
		/*defino sus valores por defecto*/
		defaults : {
			vid : null,
			title : null,
			main : 0
		},
		/*Pseudo constructor del modelo, se ejecuta cuando un modelo es instanciado*/
		initialize : function(){
			/*Bindeamos un evento cuando es cambiado el atributo 'title' de nuestro modelo*/
			/*
			this.on('change', function(){

			});
			*/
		},
		/*Agregamos al modelo funciones de manipulacion de sus atributos*/
		setTitle : function(title){
			this.set({'title' : title});
		}
	});
	return Video;
});