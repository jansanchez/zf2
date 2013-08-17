define([
    'jquery',
    'underscore',
    'backbone',
    'router'
], function ($, _, Backbone, router) {

    // rutas

    router.route("publica-tu-aviso/normal/1", "", function(){

        console.log('oe no! (bis)');

    });

    var root = $("[data-main][data-root]").data("root");
    root = root ? root : '/';

    return {
        initialize: function () {
            Backbone.history.start({
                pushState: true,
                root: root
            });
        }
    };
});