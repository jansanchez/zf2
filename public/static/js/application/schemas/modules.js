/*=========================================================================================
 *@ListModules: Listado de todos los Modulos asociados al portal
 **//*===================================================================================*/
yOSON.AppSchema.modules = {
    'application': {  /*PORTAL PUBLICO   */
        controllers:{
            'index':{
                actions: {
                    'ficha': function (){
                        yOSON.AppCore.runModule('formulario-contacto');
                        yOSON.AppCore.runModule('gmaps-ficha-inmueble');
                        yOSON.AppCore.runModule('frm-denunciar-aviso');
                        yOSON.AppCore.runModule('msje-add-favorite');
                        yOSON.AppCore.runModule('frm-fancy-enviar-msje');
                        yOSON.AppCore.runModule('headFloat');
                        yOSON.AppCore.runModule('phonebox');
                        yOSON.AppCore.runModule('gal-slide');
                        yOSON.AppCore.runModule('slideshow');
                        yOSON.AppCore.runModule('socialNetworkData');
                        yOSON.AppCore.runModule('ads-reviews');
                    },
                    'avisos-activos':function(){
                        yOSON.AppCore.runModule('infinite-scroll',["#adsAct"]);
                        //yOSON.AppCore.runModule('prueba-scroll',["#adsAct"]);
                        yOSON.AppCore.runModule('tbl-order',[{"module":true}]);
                        yOSON.AppCore.runModule('tbl-actions');
                    },
                    'alquileres-turistas':function(){
                        yOSON.AppCore.runModule('ads-reviews');
                    },
                    'byDefault':function(){
                        yOSON.AppCore.runModule('gal-slide');
                        yOSON.AppCore.runModule('buttons-css3');
                        yOSON.AppCore.runModule('message-ie');   
                    }
                },
                allActions: function(){
                    yOSON.AppCore.runModule('publica');
                    yOSON.AppCore.runModule('box-suscribir');
                    yOSON.AppCore.runModule('validation',{form:"#frmSuscribir"});
                    yOSON.AppCore.runModule('modify-for-location');
                    //yOSON.AppCore.runModule('show-popup');
                }
            },
            'aviso':{
                actions : {
                    'paso1' : function(){
                        yOSON.AppCore.runModule('fancy-step1',{rol:'persona-natural'});
                        yOSON.AppCore.runModule('destroy-cookie');
                    },
                    'combo-impreso':function(){
                       yOSON.AppCore.runModule('cbo-impress');
                    },
                    'paso2':function(){
                        yOSON.AppCore.runModule('valid-step2');
                        yOSON.AppCore.runModule('validation',{form:"#formStep2"});
                        yOSON.AppCore.runModule('showHideInputs',{rol:'persona-natural'});
                        yOSON.AppCore.runModule('maps-step2');
                        yOSON.AppCore.runModule('select-geocode');
                        yOSON.AppCore.runModule('uploaderImages-step2');
                        yOSON.AppCore.runModule('select-depends',['#step2']);
                        yOSON.AppCore.runModule('add-video');
                        yOSON.AppCore.runModule('datepicker',["#paso2"]);
                        yOSON.AppCore.runModule('count-characters',["#descAv","#count-char",1200]);
                    },
                    'paso3':function(){
                        yOSON.AppCore.runModule('ads-publication');
                    },
                    'paso4':function(){
                       yOSON.AppCore.runModule('add-highlight');
                       yOSON.AppCore.runModule('comprobante-step4',{rol:'persona-natural'});
                       yOSON.AppCore.runModule('validation',{form:"#frm-comprobante"});
                       yOSON.AppCore.runModule('validacion-step4',{rol:'persona-natural'});
                       yOSON.AppCore.runModule('select-depends',['#step4']);
                       yOSON.AppCore.runModule('registrar-nuevo-ruc');
                       yOSON.AppCore.runModule('lightboxPagoEfectivo');
                       yOSON.AppCore.runModule('show-more-step4');
                       yOSON.AppCore.runModule('show-add-ruc');
                    },
                    'paso5':function(){

                    },
                    'avisos-de-baja':function(){
                        yOSON.AppCore.runModule('tbl-actions');
                        yOSON.AppCore.runModule('infinite-scroll',["#adsDown"]);
                        yOSON.AppCore.runModule('tbl-order',[{"module":true}]);
                        yOSON.AppCore.runModule('check-all');
                        yOSON.AppCore.runModule('remove-all');
                    },
                    'avisos-impresos':function(){
                        yOSON.AppCore.runModule('infinite-scroll',["#adsImp"]);
                        yOSON.AppCore.runModule('tbl-order',[{"module":true}]);
                    },
                    'byDefault':function(){}
                },
                allActions:function(){}
            },
            'pagos':{
                actions:{
                    'index': function(){
                        yOSON.AppCore.runModule('infinite-scroll',["#pagos"]);
                        yOSON.AppCore.runModule('tbl-order',[{"module":true,pData:"p3",pOrder:"p4",pTotal:"p2"}]);
                        yOSON.AppCore.runModule('select-paid');
                    },
                    'byDefault':function(){}
                },
                allActions: function(){}
            },
            'perfilpago': {
                actions:{
                    'index': function(){
                       yOSON.AppCore.runModule('registrar-nuevo-ruc');
                       yOSON.AppCore.runModule('validacion-step4');
                       yOSON.AppCore.runModule('validation',{form:"#frm-comprobante"});
                       yOSON.AppCore.runModule('add-ruc-facturacion',{title:'Eliminar',question:'¿Desea eliminar este registro?',urlAjax:'perfilpago/eliminar-cliente-adecsys/idPerfilPago/'});
                       yOSON.AppCore.runModule('select-depends',["#perfil"]);
                       
                    },
                    'byDefault':function(){}
                },
                allActions: function(){}
            },
            'usuario':{
                actions:{
                    'editar-usuario': function(){
                       yOSON.AppCore.runModule('validate-datos-usuario');
                    },
                    'byDefault':function(){}
                },
                allActions: function(){}
            },
            'front':{
                actions:{
                    byDefault:function(){}
                },
                allActions: function(){
                    //yOSON.AppCore.runModule('gal-slide');
                    //yOSON.AppCore.runModule('slideshow');
                    //yOSON.AppCore.runModule('headFloat');
                    //yOSON.AppCore.runModule('ads-reviews');
                }
            },
            'alertas':{
                actions:{
                    'index':function(){
                        yOSON.AppCore.runModule('receive-alerts');
                        yOSON.AppCore.runModule('delete-item',{title:'Alertas',answer:'¿Está seguro que desea eliminar esta alerta?'});
                        yOSON.AppCore.runModule('tbl-order',[{url:"application/alertas/ajax-alertas",tmpl:"#tplAlert",pData:"p2",pOrder:"p3",pTotal:"p1"}]);
                    },
                    'crear':function(){
                        yOSON.AppCore.runModule('validate-alerts-form');
                        yOSON.AppCore.runModule('select-depends',["#alert"]);
                    },
                    'editar':function(){
                        yOSON.AppCore.runModule('validate-alerts-form');
                        yOSON.AppCore.runModule('select-depends',["#alert"]);
                    },
                    'byDefault':function(){}
                },
                allActions: function(){}
            },
            byDefault : function(){},
            allActions: function(){}
        },
        byDefault : function(){},
        allControllers : function(){}
    },
    'agente': {
        controllers: {
            'index':{
              actions: {
                  'agente-inmobiliario': function(){
                      yOSON.AppCore.runModule('ads-reviews');
                      yOSON.AppCore.runModule('formulario-contacto');
                      yOSON.AppCore.runModule('simple-slide');
                      yOSON.AppCore.runModule('phonebox',{"pos":10});
                  },
                  'tienda-listado': function(){
                      yOSON.AppCore.runModule('select-depends',["#listado",true]);
                      yOSON.AppCore.runModule('almacenar-distritos-por-provincia');
                      yOSON.AppCore.runModule('buscador-autocomplete-distrito');
                      yOSON.AppCore.runModule('infinite-scroll',["#portadaAgente"]);
                      yOSON.AppCore.runModule('cascading-grid');
                      yOSON.AppCore.runModule('ads-reviews');
                      yOSON.AppCore.runModule('agent-list');                      
                  },
                  'byDefault':function(){}
              },
              allActions: function(){}
            },
            'aviso': {
                actions : {
                    'paso1':function(){
                        yOSON.AppCore.runModule('valid-step2');
                        yOSON.AppCore.runModule('validation',{form:"#formStep2"});
                        yOSON.AppCore.runModule('showHideInputs',{rol:'agentes'});
                        yOSON.AppCore.runModule('maps-step2');
                        yOSON.AppCore.runModule('select-geocode');
                        yOSON.AppCore.runModule('uploaderImages-step2');
                        yOSON.AppCore.runModule('select-depends',['#step2']);
                        yOSON.AppCore.runModule('add-video');
                        yOSON.AppCore.runModule('datepicker',["#paso2"]);
                        yOSON.AppCore.runModule('count-characters',["#descAv","#count-char",1200]);
                        yOSON.AppCore.runModule('showTypeAd');
                    },
                    'paso2':function(){
                        yOSON.AppCore.runModule('ads-publication');
                        yOSON.AppCore.runModule('add-more-words');
                    },
                    'pagar-paquete':function(){
                        yOSON.AppCore.runModule('add-highlight');
                        yOSON.AppCore.runModule('comprobante-step4',{rol:'agentes'});
                        yOSON.AppCore.runModule('validation',{form:"#frm-comprobante"});
                        yOSON.AppCore.runModule('validacion-step4',{rol:'agentes'});
                        yOSON.AppCore.runModule('select-depends',['#step4']);
                        yOSON.AppCore.runModule('registrar-nuevo-ruc');
                        yOSON.AppCore.runModule('lightboxPagoEfectivo');
                        yOSON.AppCore.runModule('show-more-step4');
                        yOSON.AppCore.runModule('up-price');
                        yOSON.AppCore.runModule('show-add-ruc');

                    },
                    'contratar-paquete' : function(){
                        yOSON.AppCore.runModule('fancy-step1',{rol:'agentes'});
                    },
                    'avisos-activos': function(){
                        yOSON.AppCore.runModule('tbl-actions');
                        yOSON.AppCore.runModule('infinite-scroll',["#adsActAgentes"]);
                        yOSON.AppCore.runModule('tbl-order',[{"module":true}]);
                    },
                    'avisos-inactivos': function(){
                        yOSON.AppCore.runModule('tbl-actions');
                        yOSON.AppCore.runModule('infinite-scroll',["#adsDownAgentes"]);
                        yOSON.AppCore.runModule('tbl-order',[{"module":true}]);
                        yOSON.AppCore.runModule('check-all');
                        yOSON.AppCore.runModule('republish-all');
                        
                    },
                    'byDefault':function(){}
                },
                allActions: function(){}
            },
            'mis-datos': {
                actions:{
                    'index': function(){
                       yOSON.AppCore.runModule('validation',{form:"#frm-DatosTienda"});
                       yOSON.AppCore.runModule('imagen-agente');
                       yOSON.AppCore.runModule('imagenes-portada-agente');
                       yOSON.AppCore.runModule('accordion');
                       yOSON.AppCore.runModule('slidejs',{slide:"#slide-highlight",config:{slides:".mov-ads",width:888,height:230}});                        
                       yOSON.AppCore.runModule('order-highlight');
                       yOSON.AppCore.runModule('select-certificados');
                       yOSON.AppCore.runModule('infinite-scroll',["#perfilStore"]);
                       yOSON.AppCore.runModule('search-highlight');
                    },
                    'byDefault':function(){}
                },
                allActions: function(){}
            },
            'pagos': {
                actions:{
                    'index': function(){
                        yOSON.AppCore.runModule('infinite-scroll',["#pagosAgentes"]);
                         yOSON.AppCore.runModule('tbl-order',[{"module":true,pData:"p3",pOrder:"p4",pTotal:"p2"}]);
                        yOSON.AppCore.runModule('select-paid');
                    },
                    'byDefault':function(){}
                },
                allActions: function(){}
            },
            'perfilpago': {
                actions:{
                    'index': function(){
                       yOSON.AppCore.runModule('validacion-step4');
                       yOSON.AppCore.runModule('validation',{form:"#frm-comprobante"});
                       yOSON.AppCore.runModule('select-depends',["#perfil"]);
                       yOSON.AppCore.runModule('registrar-nuevo-ruc');
                       yOSON.AppCore.runModule('add-ruc-facturacion',{title:'Eliminar',question:'¿Desea eliminar este registro?',urlAjax:'agentes/perfil-pago/eliminar-cliente-adecsys/id/'});
                       
                    },
                    'byDefault':function(){}
                },
                allActions: function(){}
            },
            byDefault : function(){},
            allActions: function(){}
        },
        byDefault : function(){},
        allControllers : function(){}
    },
    byDefault : function(){},
    allModules : function(oMCA){
        yOSON.AppCore.runModule('error-images');
        yOSON.AppCore.runModule('boxes-alertas');
        yOSON.AppCore.runModule('session-peruid');
    }
};