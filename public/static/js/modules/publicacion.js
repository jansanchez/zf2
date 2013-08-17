/**
* Modulo principal de publicacion
* @class publicacion
* @module yOSON
*/
/*-----------------------------------------------------------------------------------------------
 * @Module: boxes-alertas
 * @Description: Añadir boton cerrar en las cajas de alertas
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("boxes-alertas", function(Sb){
    var st = {
        alerta: '#clean-alert'
    },
    dom = {},
    catchDom = function(){
        dom.alerta = $(st.alerta);
    },
    bindEvents = function(){
        dom.alerta.on("click","#close-alert",deleteAlert);
    },
    deleteAlert = function (){
      var $parent = $(this).parent();
            $parent.fadeOut("slow");
    };
    return {
        init: function(){
            catchDom();
            bindEvents();
        }
    };
});
/*--
/*-----------------------------------------------------------------------------------------------
 * @Module: error-images
 * @Description: Permite poner una imagen por default cuando la imagen no carga
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("error-images", function(Sb){
    var dom = {};
    return {
        init : function(oParams){
            var dimensions = {
                '460' : 'w460h345',
                '298' : 'w298h169',
                '160' : 'w160h90',
                'default' : 'w460h345'
            }
            $('img').on('error',function(){
                var wimg = $(this).width();
                if(dimensions[wimg]){
                    rootImg = dimensions[wimg];
                }else{
                    rootImg = dimensions['default'];
                }
                $(this).attr('src',yOSON.baseHost+'static/img/imgerror/'+rootImg+'.jpg');
            })
        },
        destroy: function(){}
    };
});

 /*-----------------------------------------------------------------------------------------------
 * @Module: Fancy Step1
 * @Description: Fancybox Popup - Step 1
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("fancy-step1", function(Sb){
    var dom = {
            'seeExample':    $('.see-example'),
            'bxplInfo':      $('.bxpl-info')
        },
        imagesExamples = {
            'yellow' : {
                title : 'Ejemplo Aviso Simple',
                img : $('.data-img-yellow').html()
            },
            'gray' : {
                title: 'Ejemplo Aviso Simple Plus',
                img : $('.data-img-gray').html()
            },
            'orange' : {
                title : 'Ejemplo Aviso Económico',
                img : $('.data-img-orange').html()
            },
            'blue' : {
                title : 'Ejemplo Aviso Normal',
                img : $('.data-img-blue').html()
            },
            'green' : {
                title : 'Ejemplo Aviso Premium',
                img : $('.data-img-green').html()
             }
         },
         textoInformacion = {
           'yellow' : {
                title : 'Aviso Simple',
                titleAgentes : $('.data-name-yellow').text(),
                msg : $('.data-yellow').html()
            },
            'gray' : {
                title: 'Aviso Simple Plus',
                titleAgentes : $('.data-name-gray').text(),
                msg : $('.data-gray').html()
            },
            'orange': {
                title : 'Aviso Económico',
                titleAgentes : $('.data-name-orange').text(),
                msg : $('.data-orange').html()
            },
            'blue' : {
                title : 'Aviso Normal',
                titleAgentes : $('.data-name-blue').text(),
                msg : $('.data-blue').html()
            },
            'green' : {
                title : 'Aviso Premium',
                titleAgentes : '',
                msg : $('.data-green').html()
             }
        },
        examples = function (){
            dom.seeExample.on('click', function(event){
                event.preventDefault();
                var $this = $(this),
                    dataId = $this.attr('data-id'),
                    objData = imagesExamples[dataId],
                    htmlContent = '<div id="example-detail" ><h2 class="urb-stitle">'+objData.title+'</h2>'+objData.img +'</div>';
                $.fancybox.showLoading();
                setTimeout(function(){
                    $.fancybox({
                        type : 'html',
                        openEasing: 'easeOutBack',
                        closeEasing: 'easeInBack',
                        openSpeed : 500,
                        closeSpeed : 500,
                        openEffect : 'elastic',
                        closeEffect : 'elastic',
                        afterLoad : function(){
                            $.fancybox.hideLoading();
                        },
                        content : htmlContent
                    }); //fancybox
                },0);

            }); // seeExample
        },
        information = function (nameRol){
            dom.bxplInfo.on('click',function(event){
                event.preventDefault();
                var $this = $(this),
                    dataColor = $this.attr('data-color'),
                    objData = textoInformacion[dataColor],
                    template = function(){
                        var title,msg;
                        if(nameRol == 'persona-natural'){
                            title = objData.title;
                        }else if(nameRol == 'agentes'){
                            title = objData.titleAgentes;
                        }
                        msg = objData.msg;
                        return '<div id="more-information"><h2 class="urb-stitle">'+title+'</h2><div class="text">'+msg+'</div></div>';
                    };

                $.fancybox({
                    type: 'html',
                    width: 500,
                    height: 'auto',
                    autoSize: false,
                    openEasing: 'easeOutBack',
                    closeEasing: 'easeInBack',
                    openSpeed : 500,
                    closeSpeed : 500,
                    openEffect : 'elastic',
                    closeEffect : 'elastic',
                    content : template()
                });
            }); // bxplInfo
        },
        init = function(nameRol){
            var userRol = {
                'persona-natural': function(){
                    examples();
                    information('persona-natural');
                },
                'agentes': function(){
                    information('agentes');
                },
                'default': function(){}
            };

            if(userRol[nameRol]){
                userRol[nameRol]();
            }else{
                userRol['default']();
            }
        };
    return {
        init: function(oParams){
            oParams.rol = oParams.rol || 'persona-natural';
            init(oParams.rol);
        },
        destroy: function(){}
    };
}, ['libs/plugins/jqFancybox-min.js','libs/plugins/jqEasing.js']);
/* ----------------------------------------------------------------------------------------------------------
 * @Module     : Trigger PeruID
 * @description: Valida la sesion para correr peruID
 **//*------------------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule('session-peruid', function(Sb){

    return{
        init: function(){
            var dom = {
                'bxplBtn'   : $('.bxpl-btn, .bxpl-price a'),
                'peruid'    : $('.pid_Fb'),
                'pidtrg'    : $('.fbx_login'),
                'pidlnkMas' : $('.go_peruid:eq(0)'),
                'pidlnkDev' : $('.pid_Fb:eq(0)')
            };
            dom.pidtrg.on('click', function(event){
                event.preventDefault();
                if(dom.pidlnkMas.length) dom.pidlnkMas.attr('data-redirect', $(this).attr('href')).trigger('click');
                if(dom.pidlnkDev.length) dom.pidlnkDev.trigger('click');
            });
            /*dom.bxplBtn.on('click',function(event){
                var $this = $(this);
                    if($this.hasClass('fbx_login')){
                        event.preventDefault();
                        dom.peruid.trigger('click');
                    }
            });*/ //bxplBtn
        },
        destroy: function(){}
    };
});


/* ----------------------------------------------------------------------------------------------------------
 * @Module     : Combo Impreso
 * @description: Genera cookie del combo impreso
 **//*------------------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule('cbo-impress', function(Sb){
    var dom={
        "cbo":$("input[name='radPackage']"),
        "btn":$("#btn-cboimp")
    };
    return {
        /*Public Constructor : Inicializa el modulo (Es el que se ejecuta en el schema @modules)*/
        init: function(oParams){
            dom.btn.on("click",function(e){
                e.preventDefault();
                var value=dom.cbo.filter(":checked").val(),
                    href=$(this).attr("href");
                if(typeof value!="undefined"){
                    Cookie.create("impreso",dom.cbo.filter(":checked").val());
                    window.location=href;
                }
            });
        },
        destroy: function(){ /*Que hacer cuando se destruya la instancia del modulo aca*/ }
    };
});
/* ----------------------------------------------------------------------------------------------------------
 * @Module     : Destroy Impress
 * @description: Destruye cookie de combo impreso
 **//*------------------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule('destroy-cookie', function(Sb){
    return {
        /*Public Constructor : Inicializa el modulo (Es el que se ejecuta en el schema @modules)*/
        init: function(oParams){
            Cookie.del("impreso");
        },
        destroy: function(){ /*Que hacer cuando se destruya la instancia del modulo aca*/ }
    };
});
/*-----------------------------------------------------------------------------------------------
 * @Module: showTypeAd
 * @Description: Permite seleccionar el tipo del aviso y mostrar los pasos a continuar
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("showTypeAd", function(Sb){
    var dom = {
        tpAvisoAgente : $('input[name=tpAvisoAgente]')
    },
    showHideStep = function(type){
        var showStatus = {
            'web' : function(){
                $('.step-impress').animate({width:'0px'},function(){});
            },
            'impress' : function(){
                $('.step-impress').animate({width:'62px'},function(){
                    
                });
            },
            'default': function(){}
        };
        
        if(showStatus[type]){
            showStatus[type]();
        }else{
            showStatus['default'];
        }
    },
    changeHandler = function(){
        var valueType =  function(valueRadio){
            if(valueRadio == 1){
                 type = 'web'   
            }else{
                type = 'impress'
            }
            return type;
        }

        if(dom.tpAvisoAgente.is(':checked')){
            showHideStep(valueType(dom.tpAvisoAgente.val()));           
        };        

        dom.tpAvisoAgente.on('change',function(){
            var type,
                valueChecked = $(this).val();
            showHideStep(valueType(valueChecked));
        });    
    };
    return {
        init : function(oParams){
            changeHandler();
        },
        destroy: function(){}
    };
});

/*-----------------------------------------------------------------------------------------------
 * @Module: Validate Step2
 * @Description: Validate- Publicacion Step 2
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("valid-step2", function(Sb){
    var dom = {formValidate: $('#formStep2')};
    return {
        init: function(oParams){
            //valida datos input del formulario
            var _this=this;
            //valida input file fake
            $('#orderPhotos').addClass('ignore');

            dom.formValidate.on('submit',function(){
                if($('#orderPhotos').val() == ''){
                    if($('#noPhotos').length == 0){
                        $('.customfile-filename').addClass('error');
                        if(dom.formValidate.valid()){
                            $("html,body").animate({
                                scrollTop:$('#photosMissing').offset().top
                            },700,
                            'swing',
                            function(){
                                location.hash='#photosMissing'
                            }); // animate
                        }

                    }; // if noPhotos
                    return false;
                }else{
                    $('.customfile-filename').attr('placeholder','');
                    _this.cleanHideInput();
                    return true;
                }
            }); // -- formValidate

        },
        cleanHideInput:function(){ //Resetea los valores de los inputs ocultos que se encuentra en la matriz
            $(".showHide").each(function(index,value){
                if(!$(value).is(":visible")){
                    utils.resetForm($(value));
                }
            });
        },
        destroy: function(){}
    };
});
 /*-----------------------------------------------------------------------------------------------
 * @Module: ShowHide Inputs
 * @Description: Mostrar y Ocultar inputs
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("showHideInputs", function(Sb){
    var dom = {
        sltransacion: $('#tipoTransac'),
        sllocalizado : $('#localzdo'),
        sltipo : $('#tipoInm'),
        slmoneda: $('.moneda1'),
        slmoneda2: $('.moneda2'),
        txtPrice : $('#precio'),
        txtBedroom : $('#dormtro'),
        txtBathroom : $('#banio'),
        txtMbathroom : $('#medioBanio'),
        txtParking : $('#estacionmto'),
        txtAreaterreno : $('#areaTerreno'),
        txtAreaconstruida : $('#areaConstruida'),
        txtAge : $('#anio'),
        chkNewhouse : $('#estreno'),
        txtPhone : $('#telef01'),
        txtPhone2 : $('#telef02'),
        slUrb : $("#idUrbzn"),
        slDistrito :$("#idDistrito")
    },
    init = function(nameRol){
        dataLocalizado(nameRol,function(){
            showHideInputs();
            changeNameMoneda(dom.slmoneda,'tipoMoneda1');
            changeNameMoneda(dom.slmoneda2,'tipoMoneda2');
        });
        enabledDisabledAnio();
        showHideChk();
        renderUrbaBalneario();
        dom.sllocalizado.trigger('change',false); //Ejecuta para ocutar los campos
    },
    dataLocalizado = function(nameRol,callback){
            var renderOptions = function(data){
                var htmlSelect = '';
                if(tmp.paquete == 'premium' || tmp.paquete == 'economico' || tmp.paquete == 'normal'){
                    for(var i=0;i<data.length;i++){
                        if(data[i].id != 22){
                            htmlSelect += '<option data-id="'+data[i].orden+'" value="'+data[i].id+'">'+data[i].nombre+'</option>'; 
                        }
                    }
                }else{
                    for(var i=0;i<data.length;i++){
                            htmlSelect += '<option data-id="'+data[i].orden+'" value="'+data[i].id+'">'+data[i].nombre+'</option>'; 
                    }
                }
                
                
                return htmlSelect;
            },
            renderTrigger = function(selectDom){
                selectDom.on('change',function(e,param){
                var  sltransacionVal = parseInt(dom.sltransacion.val()),
                     sllocalizadoVal = parseInt(dom.sllocalizado.val()),
                     cond=(typeof param!="undefined")?param:true;
                     if(nameRol == 'agentes'){
                        var typeRol = 'agentes/aviso';
                     }else{
                        typeRol = 'aviso';
                     }
                     if(cond){
                      $.ajax({
                            url: yOSON.baseHost+typeRol+'/tipo-inmueble/lc/'+sllocalizadoVal+'/tr/'+sltransacionVal,
                            //url: yOSON.baseHost+'aviso/tipo-inmueble/lc/'+sllocalizadoVal+'/tr/'+sltransacionVal,
                            dataType: 'json',
                            beforeSend :function(){
                                dom.sltipo.attr('disabled','disabled');
                            },
                            success : function(json){
                                dom.sltipo.removeAttr('disabled');
                                dom.sltipo.html(renderOptions(json.data.src));
                                var valEditar = $('#id').val(),
                                    valRepublicar = $('#idRepub').val();
                                if(valEditar != '' && typeof(valEditar) != 'undefined'){
                                    dom.sltipo.val(tmp.idTipInm);
                                }else if(valRepublicar != '' && typeof(valRepublicar) != 'undefined'){
                                    dom.sltipo.val(tmp.idTipInm);
                                }else{
                                    dom.sltipo.children();
                                    var arrayChildren = $('#tipoInm').children(); 
                                    var arrayValues = []; 
                                    $.each(arrayChildren,function(index,ele){ 
                                        arrayValues.push($(ele).attr('value')); 
                                    }); 
                                    $.each(arrayValues,function(i,el){
                                        if(el == 5){
                                            dom.sltipo.val(el);
                                        }
                                    });
                                }

                                callback&&callback();
                            }
                        });
                    }
                });// hace el render de tipode inmueble tipoInm
            };
             //renderOptions

            renderTrigger(dom.sltransacion);
            renderTrigger(dom.sllocalizado);
            dom.sltransacion.trigger('change');
    },
    showHideInputs = function(){
        var aInputs = $('.showHide'),
            mapa = [
                [//ciudad
                    [//venta
                        [1,1,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,1,0],
                        [1,1,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,1,0],
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],//
                        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
                        [1,1,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,1,0],
                        [1,1,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,1,0],
                        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0]
                    ],
                    [//alquiler
                        [1,1,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,1,0], //casa
                        [1,1,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,1,0], //departamento
                        [1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0], //habitacion
                        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0], //terreno
                        [1,1,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,1,0], //oficina
                        [1,1,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,1,0], //local
                        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0] //otros
                    ],
                    [//alquiler turista
                        [0,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1],
                        [0,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1],
                        [0,0,1,1,1,1,1,1,1,0,1,0,1,0,0,0,1,1,1],
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],//
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],//
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],//
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] //
                    ]
                ],
                [//campo
                    [//venta
                        [1,1,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,1,0],
                        [1,1,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,1,0],
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],//
                        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],//
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],//
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0]//
                    ],
                    [//alquiler
                        [0,0,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0],
                        [0,0,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0],
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],//
                        [0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,0],
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],//
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],//
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0]//
                    ],
                    [//alquiler turista
                        [0,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1],
                        [0,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1],
                        [0,0,1,1,1,1,1,1,1,0,1,0,1,0,0,0,1,1,1],
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],//
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],//
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],//
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] //
                    ]
                ],
                [//playa
                    [//venta
                        [1,1,0,0,0,0,0,0,0,1,1,1,0,1,1,1,1,1,0],
                        [1,1,0,0,0,0,0,0,0,1,1,1,0,1,1,1,1,1,0],
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],//
                        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],//
                        [1,1,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,1,0],
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0]//
                    ],
                    [//alquiler
                        [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
                        [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
                        [0,0,0,1,1,1,1,1,1,0,1,0,0,0,0,0,1,0,0],
                        [0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,0],
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],//
                        [0,0,0,1,1,1,1,1,1,0,1,1,0,0,1,1,1,1,0],
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0]//
                    ],
                    [//alquiler turista
                        [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                        [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                        [0,0,1,1,1,1,1,1,1,0,1,0,1,0,0,0,1,1,1],
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],//
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],//
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],//
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] //
                    ]
                ]
            ],
            countInput = function(inst,bool){
                if(typeof inst.data("data-inp")=="undefined"){ 
                   inst.data("data-inp",false);
                   inst.addClass("data-inp");
                }
                var cond=inst.data("data-inp");
                if(!cond){
                    inst.data("data-inp",bool);
                }

            },
            showHide = function(regla,callback){
                for(i=0;i<regla.length;i++){
                    if(regla[i] == 0){
                      $(aInputs[i]).hide();
                        countInput($(aInputs[i]).parent(),false);
                    }else if(regla[i] == 1){
                        $(aInputs[i]).show();
                        countInput($(aInputs[i]).parent(),true);
                    }
                }
                callback&&callback();
            },
            showHideTrigger = function(selectDom){
                selectDom.on('change',function(){
                var sllocalizadoVal = parseInt(dom.sllocalizado.val())-1,
                    sltransacionVal = parseInt(dom.sltransacion.val())-1,
                    sltipoVal = parseInt($('#tipoInm option:selected').attr('data-id'))-1;
                    showHide(mapa[sllocalizadoVal][sltransacionVal][sltipoVal],function(){
                        $(".data-inp").each(function(index,value){
                            var cond=$(value).data("data-inp");
                            (cond)?$(value).removeClass("hide"):$(value).addClass("hide");
                            $(value).data("data-inp",false);
                        });
                    });
                });
            };

            showHideTrigger(dom.sllocalizado);
            showHideTrigger(dom.sltransacion);
            showHideTrigger(dom.sltipo);
            dom.sltipo.trigger('change');
    },
    enabledDisabledAnio = function(){
        dom.chkNewhouse.on('change',function(){
            if($(this).is(':checked')){
                dom.txtAge.val('');
                dom.txtAge.attr('disabled','disabled');
            }else{
                dom.txtAge.removeAttr('disabled'); 
            }
        });
    },
    changeNameMoneda = function(elem,nameClass){
        if(elem.is(':hidden')){
            elem.attr('name',nameClass);
        }else if(elem.is(':visible')){
            elem.attr('name','tipoMoneda');
        }
    },
    showHideChk = function(){
        var i,
            chkInputs = $('.list-chk li'),
            chkInputsClone = chkInputs.clone(),
            mapaChk = [
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],//ciudad
                        [0,1,0,0,1,1,1,0,0,1,1,0,1,1,1,0,1,0,0,0,0,0,0,0,0,1,0,0],//campo
                        [0,1,0,0,1,1,1,0,0,1,1,0,1,1,1,0,1,0,0,0,0,0,0,0,0,1,0,1]//playa
                    ],
            showHide = function(regla,callback){
                for(i=0;i<regla.length;i++){
                    if(regla[i] == 0){
                      $(chkInputsClone[i]).hide();
                    }else if(regla[i] == 1){
                        $(chkInputsClone[i]).show();
                    }
                }
                callback&&callback();
            },
            renderOrder = function(){
                    $('.list-chk li').filter(':hidden').remove();
            };

            dom.sllocalizado.on('change',function(){
                var $this = $(this),
                    sllocalizadoVal = parseInt($this.val())-1;
                    $('.list-chk').html(chkInputsClone);
                    showHide(mapaChk[sllocalizadoVal],renderOrder);
            });

    },
    renderUrbaBalneario = function(){
        var nameChange = dom.slUrb.parents('.control-group').find('.control-label');
        dom.sllocalizado.on('change',function(){
            if($(this).val() == 3){
                nameChange.text('Balneario');
            }else{
                nameChange.text('Urbanización');
            }
             dom.slDistrito.trigger('change');
        });
    };

    return {
        init: function(oParams){
            init(oParams.rol);
        },
        destroy: function(){}
    };
});
/*-----------------------------------------------------------------------------------------------
 * @Module: Maps Step2
 * @Description: Plugin de Gmaps - Step 2
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("maps-step2", function(Sb){
    var st = {
            mapa: 'map',
            hLat: 'lat',
            hLng: 'lng',
            geocodeOpts: {
                address: 'Lima, Peru',
                useMarker: 'ubigeo',
                callback: function(results, status, ctx){
                    if(status === 'OK'){
                        listenCallbackGeocode(results, status, ctx);
                    }
                }
           }
        },
        dom = {},
    catchDom = function(){
        dom.mapa = $("#" + st.mapa);
        dom.hLat = $("#" + st.hLat);
        dom.hLng = $("#" + st.hLng);
    },
    bindEvents = function(){
        var objMap = new gMap(st.mapa);
        
        objMap.f({
            zoom: 12
        });
        
        objMap.marker({
            id: 'ubigeo',
            title: 'Indica donde se encuentra el inmueble',
            draggable: true,
            evts:{
                dragend: function(e){
                    var mapa = this.get("map"),
                        latLng = this.getPosition();
                    mapa.panTo(latLng);
                    setValues(latLng);
                }
            }
        });
        
        var hLat = $.trim(dom.hLat.val()) || 0,
                    hLng = $.trim(dom.hLng.val()) || 0;

        if(parseInt(hLat) === 0 && parseInt(hLng) === 0){
            objMap.geocode(st.geocodeOpts);
        } else {
            objMap.onLoadAsyncLib({
                callback: function(){
                    var ubigeoMarker = objMap.getMarker('ubigeo'),
                        mapa = objMap.map,
                        coord = objMap.latLng(dom.hLat.val(), dom.hLng.val());
                        ubigeoMarker.setPosition(coord);
                        mapa.setCenter(coord);
                }
            });
        }
        objMap.onLoadAsyncLib({
            callback: function(){
                //ejecuta el evento de los combos dependientes
                Sb.trigger("extendMapGeocodeCombos",[objMap, st.hLat, st.hLng]);
            }
        });
    },
    listenCallbackGeocode = function (results, status, ctx){
        var latLng = results[0].geometry.location,
            coord = new ctx.gmap.nspace.LatLng(latLng.lat(), latLng.lng());

        setValues(latLng);

        ctx.gmap.map.setCenter(coord);
        ctx.marker.setPosition(coord);
        ctx.marker.setMap(ctx.gmap.map);
    },
    setValues = function(latLng){
        document.getElementById(st.hLat).value = latLng.lat();
        document.getElementById(st.hLng).value = latLng.lng();
    };
    return {
        init: function(){
            catchDom();
            bindEvents();
        },
        destroy: function(){

        }
    };
},['libs/plugins/gmapec.js']);
/* ----------------------------------------------------------------------------------------------------------
 * @Module     : Select Geocode
 * @description: Modulo de los selects dependientes que renderizan la ubicacion del marker
 *//*------------------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule('select-geocode', function(Sb){
    var st = {
            slcDepartamento: '#idDpto',
            slcProvincia: '#idProvin',
            slcDistrito: '#idDistrito'
        },
        ubigeo = {},
        dom = {},
        catchDom = function(){
            dom.slcDepartamento = $(st.slcDepartamento);
            dom.slcProvincia = $(st.slcProvincia);
            dom.slcDistrito = $(st.slcDistrito);
            //escuchando otros parametros para tratarlos
            Sb.events(["extendMapGeocodeCombos"], extendMapGeocodeCombos, this);
        },
        extendMapGeocodeCombos = function(objMap, lat, lng) {
           st.objMap = objMap;
           st.hLat = lat;
           st.hLng = lng;
        },
        bindEvents = function(){
            dom.slcDepartamento.on('change', onChangeSlcDepartamento);
            dom.slcProvincia.on('change', onChangeSlcProvincia);
            dom.slcDistrito.on('change', onChangeSlcDistrito);
        },
        onChangeSlcDepartamento = function(evt){
           var $this = $(this),
               $option = $(this).find(':selected');
       
           ubigeo = {};
           
           ubigeo['departamento'] = $this.val()!==''?$option.text():'';
           
           getTotalQuery();
           
        },
        onChangeSlcProvincia = function(evt){
           var $this = $(this),
               $option = $(this).find(':selected');
       
           ubigeo['provincia'] = $this.val()!=='' ? $option.text():''; 
           
           if(ubigeo['departamento'] === ubigeo['provincia']){
                  ubigeo['departamento'] = ubigeo['provincia'];
                  ubigeo['provincia'] = '';
           }
               
           getTotalQuery();
           
        },
        onChangeSlcDistrito = function(evt){
           var $this = $(this),
               $option = $(this).find(':selected');
           
           ubigeo['distrito'] = $this.val()!=='' ? $option.text():'';

           getTotalQuery();
           
        },
        getTotalQuery = function(){
           var strUbigeo = resultUbigeo();
           st.objMap.geocode({
                address: strUbigeo + ",Perú",
                useMarker: 'ubigeo',
                callback: function(results, status, ctx){
                    if(status === 'OK'){
                        //ejecutamos el callback del mapa de geocode del modulo de mapas
                        listenCallbackGeocode(results, status, ctx);
                    }
                }
           });
        },
        listenCallbackGeocode = function (results, status, ctx){
            var latLng = results[0].geometry.location,
                coord = new ctx.gmap.nspace.LatLng(latLng.lat(), latLng.lng());

            setValues(latLng);

            //ctx.gmap.map.setCenter(coord);
            ctx.gmap.map.panTo(coord);
            ctx.marker.setPosition(coord);
            ctx.marker.setMap(ctx.gmap.map);
        },
        setValues = function(latLng){
            document.getElementById(st.hLat).value = latLng.lat();
            document.getElementById(st.hLng).value = latLng.lng();
        },
        getGeocodeOpts = function(){
           return st.geocodeOpts;
        },
        resultUbigeo = function(){
            var result = [];
            for(var item in ubigeo){
               if(ubigeo[item] !== ''){
                result.push(ubigeo[item]); 
               }
            }
            return result.toString();
        };
    return {
        init: function(){
            catchDom();
            bindEvents();
        },
        destroy: function(){
    
        }
    };
});
/* ----------------------------------------------------------------------------------------------------------
 * @Module     : Select Depends
 * @description: Modulo de selects dependientes
 *//*------------------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule('select-depends', function(Sb){
    var btnSubmit = function(child){return $(child).parents('form:eq(0)').find('[type="submit"]');};
    var setUrl = function(url, pars){
        return url.replace(/\$([0-9]+)/gi, function(res, match){
            return pars[parseInt(match)];
        });
    };
    var ajxReq = function(url, fnc){
        $.ajax({url:yOSON.baseHost+url, type:'get', dataType:'json', success:fnc});
    };
    var treeDeps = {};
    return {
        /*Bolean: Existe o no class btn*/
        clsBtn:false,
        /*Public Constructor : Inicializa el modulo (Es el que se ejecuta en el schema @modules)*/
        init: function(oParams){
            var Params=selectDepends[oParams[0]],
                l=Params.length, i=0, j=1, THIS=this;
            while(i<l){ //Recorremos Params
                //Selects Dependientes
                var selA   = $(Params[i].ids[0]),
                    selB   = $(Params[i].ids[1]),
                //Selectores de selects dependientes
                    sSelA  = Params[i].ids[0],
                    sSelB  = Params[i].ids[1],
                //Callback
                    callback=null;
                    if(typeof Params[i].callback!="undefined"){
                        callback  = {
                            before: Params[i].callback.before || null,
                            after: Params[i].callback.after || null
                        };
                    }
                //Llenando arbol de dependencias
                treeDeps[sSelA]=[sSelB];  //inicial
                for(var j=i+1; j<l; j++){
                    var nextSelA = Params[j].ids[0];  //siguiente selector selDepA
                    var nextSelB = Params[j].ids[1];  //siguiente selector selDepA
                    var ultSelDep= treeDeps[sSelA][ treeDeps[sSelA].length-1 ]; //Ultimo selector dep de selA (osea selector selDepB actual)
                    if(ultSelDep==nextSelA){treeDeps[sSelA].push(nextSelB)}   //Si el ultimo actual es igual siguiente se adiciona al actual como dependiente tmb.
                }
                this.clsBtn = $(btnSubmit(selA)).hasClass('btn');
                selA.bind('change', (function(i, selB,callback){
                    return function(e, idB){
                        var valSel=$.trim($('option:selected',this).val()),
                            objDeps = $( treeDeps["#"+this.id].join(',') ),
                            result=THIS.chargeVals(Params[i],valSel);
                        if(valSel==''||valSel=='-1'){objDeps.html('').append('<option value="">No hay registros</option>');return}
                        /*ELSE desactivacion y peticion xhr*/
                        objDeps.prop('disabled', true);
                        btnSubmit(this).prop('disabled', true).addClass((THIS.clsBtn?'':'btn ')+'disabled');
                        var url = setUrl(Params[i].url, result);
                        if(callback)callback.before&&callback.before();
                        ajxReq(url, function(json){ THIS.success(selB, idB, arguments[2])(json); if(callback)callback.after&&callback.after(json); });
                    };
                })(i++, selB,callback));
            }
        },
        chargeVals:function(params,val){
            var result={"0":val},
                arr=[];
            if(typeof params.routes!="undefined"){
                for(var index in params.routes){
                    result[index]=params.routes[index]&&params.routes[index]();
                }
            }
            for(var i in result) {
                if(result.hasOwnProperty(i) && !isNaN(+i)) {
                    arr[+i] = result[i];
                }
            }
            return arr;
        },
        /*Evento al cargar completamente la data para selB a peticion de selA */
        success: function(selB){
            var THIS=this;
            var Args=arguments;
            return function(json){
                selB.prop('disabled', false).html('').parent().children('label.error').remove();
                btnSubmit(selB).prop('disabled', false).removeClass((THIS.clsBtn?'':'btn ')+'disabled');
                utils.validAjax(json,{
                    "success":function(result){
                        var arr=result.data["src"];
                        $.each(arr, function(index,element){
                            for(var i in element){
                                selB.append( $('<option value="'+i+'">'+element[i]+'</option>').attr('selected',(i==Args[1])) );
                            }
                        });
                        selB.css('border-color','#CCC').trigger('change',[Args[2]]).parent().children('label.error').remove();
                        //cuando finaliza la carga ejecuta un callback en caso lo tenga
                        var onFinalLoadB = selB.data('onSuccessLoadB');
                        onFinalLoadB && onFinalLoadB();
                    },
                    "error":function(result){
                        selB.append('<option value="">No hay registros</option>').trigger('change', [Args[2]]).attr('disabled', true);
                         //cuando finaliza la carga ejecuta un callback en caso lo tenga
                        var onFinalLoadB = selB.data('onErrorLoadB');
                        onFinalLoadB && onFinalLoadB();
                    }
                });
            };
        },
        destroy: function(){ /*Que hacer cuando se destruya la instancia del modulo aca*/ }
    };
},['data/selects.js']);
/* ----------------------------------------------------------------------------------------------------------
 * @Module     : uploaderImages-step2
 * @description: Cargador de fotos con soporte para arrastrado desde el escritorio y de la forma tradicional
 **//*------------------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule('uploaderImages-step2', function(Sb){
    var dom = {
        canvasImages : $('#uploaderImages'),
        formUploader : $('#formStep2'),
        inputFile    :  $('#imageUploader'),
        orderPhotos    :  $('#orderPhotos'),
        btnUploader : $('#btnUploader'),
        uploaderLoadingGroup : $('#uploaderLoadingGroup')
    },
    bannerImportant = '<div id="bannerImportant">Foto Portada</div>',
    countMinPhotos = tmp.limitPhotos,
    message = $('.message', dom.canvasImages),
    showMessage  = function(msg){
        message.html(msg);
    }, // --showMessage
    customInputFile = function(){
        dom.inputFile.customFile();
    }, // --customFile
    forderPhotos = function(event,dataId){
        var i=0,
            dataIdArray = [],
            stringId = "",
            stringDataId = "",
            idDefaultsVal = dom.orderPhotos.val();
        
        // metodos para array
        if(idDefaultsVal != ''){
           dataIdArray = idDefaultsVal.split('|');
        }

        var orderActions = {
            'add' : function(){
                dataIdArray.push(dataId);
                if(tmp.limitPhotos == dataIdArray.length){
                      $('button.customfile-upload')
                        .attr('disabled','disabled')
                        .removeClass('btn-urb')
                        .addClass('btn-gray');
                        warn('Solo puede subir un máximo de '+tmp.limitPhotos+' fotos');
                }
            },
            'remove' : function(){
                var indexEl = $.inArray(dataId,dataIdArray);
                dataIdArray.splice(indexEl,1);
                if(dataIdArray.length == 0){
                    $('.customfile-filename').attr('placeholder','No se han cargado Imagenes');
                }
                if(tmp.limitPhotos > dataIdArray.length){
                      $('button.customfile-upload')
                        .removeAttr('disabled')
                        .removeClass('btn-gray')
                        .addClass('btn-urb');
                }
                if(tmp.limitPhotos > countMinPhotos){
                    countMinPhotos = countMinPhotos + 1;
                }
            },
            'order' : function(){
                dataIdArray = [];
                for(var j=0;j<dataId.length;j++){
                    dataIdArray.push($(dataId[j]).attr('data-id'));
                }
            },
            'edit' : function(){
                dataIdArray = [];
                for(var k=0;k<dataId.length;k++){
                    dataIdArray.push(dataId);
                }
            },
            'default' : function(){}
        };

        if (orderActions[event]) {
          orderActions[event]();
        } else {
          orderActions['default']();
        }

        // -- metodos para array

        stringDataId = dataIdArray.join('|');
        dom.orderPhotos.attr('value',stringDataId);
    },
    getId = function(id){
        var dataId = id.split('.');
            return dataId[0];
    },
    addBannerMain = function(timer){
        if(typeof(timer) == 'undefined' || timer == ''){
            timer = 0;
        }
        setTimeout(function(){
            var firstHtml = $('#uploaderImages').children('.preview')[0];
            if($(firstHtml).find('#bannerImportant').length == 0){
                $(firstHtml).append(bannerImportant);   
            }  
        },timer);
    },
    upLoaderIframe = function(){
        var productPath='',
            extension = '.jpg',
            dataIdOrder = '',
            options = {
                frm: 'formStep2',
                onComplete: function (json){
                    dom.uploaderLoadingGroup.fadeOut('slow');
                    var json = $.parseJSON(json);
                    for(var i=0;i<json.data.src.length;i++){
                        countMinPhotos--;
                    }
                    $('.customfile-filename')
                        .attr('placeholder','')
                        .removeClass('error');
                    dom.formUploader.attr('action','');
                    dom.formUploader.attr('target', '');

                    if(json.data.state[0] == 0){
                        warn(json.data.msg);
                    }else{
                        $.each(json.data.src,function(index,val){
                            if(json.data.src[index].state == 1){
                                dataId = getId(json.data.src[index].img);
                            dom.canvasImages.append('<div class="preview" data-id="'+dataId+'"><a class="btn-closebox btn-delete" href="javascript:;"></a>'+
                                '<span class="imageHolder">'+
                                '<img class="preview-img" src="'+yOSON.baseHost+'elements/tmp/'+json.data.src[index].img+'" />'+
                                '</span></div>');
                                forderPhotos('add',dataId);
                            }else{
                                warn(json.data.src[index].msg);
                            }   
                        });
                    }

                    var el = $('#uploaderImages').children('.preview')[0];
                    if($(el).find('#bannerImportant').length == 0){
                        $(el).append(bannerImportant);
                    }
 
                }
            },
            submitPhotos = function(){
                dom.uploaderLoadingGroup.fadeIn('slow');
                setTimeout(function(){
                    dom.formUploader.attr('action', yOSON.baseHost+'aviso/upload-image-temporal-notice/amount/'+countMinPhotos);
                    $.fn.iframeUp('submit', options);
                    dom.inputFile.val('');
                    $('.customfile-filename').val('');
                },900); 
            },
            dragAndDropFiles = function(callback){
                // funcionalidad experimental
                //uploader width drag and drop

                $contentImages = document.getElementById('uploaderImages');
                dom.canvasImages.append('<div id="messagesDrop">Arrastre sus imagenes aqui</div>');
                $contentImages.addEventListener('dragover',function(event){
                    event.preventDefault();
                    dom.canvasImages.addClass('dropOver');
                    $('#messagesDrop').addClass('hidde-msg');
                },false);

                $contentImages.addEventListener('dragleave',function(event){
                    event.preventDefault();
                    dom.canvasImages.removeClass('dropOver');
                    var firstHtml = $('#uploaderImages').children('.preview');
                    if(firstHtml.length == 0){
                        $('#messagesDrop').removeClass('hidde-msg');
                    }
                },false);

                $contentImages.addEventListener('drop',function(event){
                    event.preventDefault();
                    dom.canvasImages.removeClass('dropOver');
                    $('#messagesDrop').addClass('hidde-msg');

                    var files = event.dataTransfer.files;

                    $.each(files,function(index,file){
                        var reader = new FileReader();
                            reader.onload = (function(file) {
                                return function(e) {
                                    dom.canvasImages.append('<div class="preview" data-id="'+i+'"><a class="btn-closebox btn-delete" href="javascript:;"></a>'+
                                        '<span class="imageHolder">'+
                                        '<img class="preview-img" src="'+this.result+'" />'+
                                        '</span></div>');
                                }
                            })(files[index]);
                            reader.readAsDataURL(file);
                    });
                    callback && callback();
                    
                });
            }
        /* reade file */
        /* verifica si el explorador es compatible con navegadores que soporten el API */
        if(window.File && window.FileReader && window.FileList && window.Blob){
            var $inputFileUploader = document.getElementById('imageUploader');
            //uploader with change
            $inputFileUploader.addEventListener('change',function(event){
                var files = event.target.files,
                    flag = false;
                if(files.length == 0){
                    warn('Debe seleccionar un archivo');
                    flag = true;
                }else{
                    for(var i=0,f; f = files[i];i++){
                        if(!(/\.(jpg|jpeg|bmp|png|gif)$/i).test(f.name)){ //JPG, JPEG, BMP, PNG, GIF
                            warn(' El tipo de archivo seleccionado no es una imagen');
                            flag = true;
                        }else if(f.size >= 2097152){
                            warn('El tamaño de la Imagen debe ser menor o igual a 2 Mb');
                            flag = true;
                        }
                    }
                    
                }
                if(!flag){
                    submitPhotos();
                }else{
                    dom.inputFile.val('');
                    $('.customfile-filename').val('');
                }
            },false);  
            // soporte drag and drop  
            //dragAndDropFiles(function(){addBannerMain(200)});
            // -- soporte drag and drop
        }else{
            dom.inputFile.on('change',function(){
                if(dom.inputFile.val() != '' && dom.inputFile.val() != 'undefined'){
                    submitPhotos();  
                }else{
                    warn('Debe de seleccionar un archivo');
                }
            });
        }

    }, // -- upLoaderIframe
    deleteImage = function(callback){
        dom.canvasImages.on('click','.btn-delete',function(event){
            event.preventDefault();
            var $this = $(this),
                $contentItem = $this.parent(),
                dataId = getId($contentItem.attr('data-id'));
            $contentItem.fadeOut(400,function(){
                $.ajax({
                    type: 'GET',
                    url : yOSON.baseHost+'aviso/delete-image-temporal-notice/id/'+dataId,
                    success : function(json){
                        var json = $.parseJSON(json);
                        if(json.data.state[0] == 1){
                            $contentItem.remove();
                        }

                        callback && callback();
                        
                    }
                });
            });
            forderPhotos('remove',dataId);

        });
    }, // -- deleteImage
    sortableGrid = function(){
        dom.canvasImages.sortable({
            cursor: "move",
            opacity : 0.5,
            update: function( event, ui ) {
                if($(ui.item).find('#bannerImportant')){
                    $('#bannerImportant',this).remove();
               } 
               var firstHtml = $(this).children('.preview')[0];
               $(firstHtml).append(bannerImportant);
               forderPhotos('order',dom.canvasImages.children('.preview'));
            }
        });

        dom.canvasImages.disableSelection();
    }; // --sortableGrid
    return {
        /*Public Constructor : Inicializa el modulo (Es el que se ejecuta en el schema @modules)*/
        init: function(oParams){
            customInputFile();
            deleteImage(function(){addBannerMain()});
            upLoaderIframe();
            sortableGrid();
            var orderPhotosArray = dom.orderPhotos.val().split("|");
            if(dom.orderPhotos.val() == ''){
                forderPhotos('edit',orderPhotosArray);
            }else{
                countMinPhotos = countMinPhotos - orderPhotosArray.length;
            }
        },
        destroy: function(){ /*Que hacer cuando se destruya la instancia del modulo aca*/ }
    };
},['libs/plugins/jqUICore.js','libs/plugins/jqUISortable.js','libs/plugins/jqCustomfile.js','libs/plugins/jqIframeup.js']);
/* ----------------------------------------------------------------------------------------------------------
 * @Module     : Count Character
 * @description: Contador de caracteres
 **//*------------------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule('count-characters', function(Sb){
    return {
        /*Public Constructor : Inicializa el modulo (Es el que se ejecuta en el schema @modules)*/
        init: function(oParams){
            var input=oParams[0],
                count=$(oParams[1]),
                len=oParams[2],
                res="";
            utils.vLength(input,len,function(c){
                res=(c<=len)?(len-c):0;
                count.text(res);
            });
            $(input).trigger("keyup");
        },
        destroy: function(){ /*Que hacer cuando se destruya la instancia del modulo aca*/ }
    };
});
yOSON.AppCore.addModule('add-more-words',function(Sb){
    var dom = {
        radMedio : $('#radMedio1, #radMedio2')
    }
    return{
        init: function(){
            var _this,newCantWord;
           dom.radMedio.on('click',function(){
            _this=$(this);
            Sb.trigger("returnInstCountAds",[function(hash){
                var newCant = _this.val();
                if(newCant == 2){
                    newCantWord = 11;
                }else if(newCant == 3){
                    newCantWord = 17;
                }
                window[hash]=newCantWord;
                $("#txaAdvImpreso").trigger("keyup");
            }]);
           });
        },
        destroy : function(){}
    }
});

/* ----------------------------------------------------------------------------------------------------------
 * @Module     : Ads Publication
 * @description: Aviso de Publicacion
 **//*------------------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule('ads-publication', function(Sb){
    var _this=this,
        dom={
            act:$(".advi-act"),
            txtarea:$("#txaAdvImpreso"),
            count:$("#advi-num"),
            span:$(".advi-content span")
        };
    _this.instCountAds=null;
    Sb.events(["returnInstCountAds"],function(fn){fn&&fn(_this.instCountAds);},this);
    return {
        /*Public Constructor : Inicializa el modulo (Es el que se ejecuta en el schema @modules)*/
        init: function(oParams){

            var count=0,
                cTotal=tmp.palabrasLibresCant,
                tmpinstCount;
            dom.act.bind("click",function(){
                var vl=$.trim(dom.txtarea.val());
                dom.txtarea.val(vl);
                $(this).hide();
                dom.txtarea.focus();
            });
            dom.txtarea.bind("blur",function(){
                var val=$.trim($(this).val());
                if(val==""){
                    dom.act.show();
                }
            });
            dom.txtarea.on('keypress scroll',function(){
                if($(this).scrollTop()>0){
                    dom.span.hide();
                }else{
                   dom.span.show();
                }
            });
            tmpinstCount=utils.vLetter("#txaAdvImpreso",{
                len:parseFloat(tmp.palabrasLibresCant),
                callback:function(len,text,hash){
                    cTotal=window[hash] || cTotal;
                  count=(parseFloat(len)>=cTotal)?cTotal:parseFloat(len);
                  dom.count.text(cTotal-count);
                }
            });
            utils.blockInpLen("#txaAdvImpreso",15,false,function(){
                if(dom.txtarea.scrollTop()>0){
                    dom.span.hide();
                }else{
                    dom.span.show();
                }
            });
            _this.instCountAds=tmpinstCount;
            if(dom.txtarea.val()!=""){dom.act.hide();dom.txtarea.trigger("keyup")}
        }
    };
});
/* ----------------------------------------------------------------------------------------------------------
 * @Module     : Ads Publication
 * @description: Aviso de Publicacion
 **//*------------------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule('add-highlight', function(Sb){
    var dom={
        stotal:$(".sub-price span"),
        total:$(".total-price span"),
        chkprice:$(".add-hlight")
    };
    return {
        /*Public Constructor : Inicializa el modulo (Es el que se ejecuta en el schema @modules)*/
        init: function(oParams){
            var STOTAL=parseFloat(dom.stotal.text().replace('S/.', ''))*Math.pow(10,2),
                padd,result,txtval;
            dom.chkprice.bind("click",function(){
                padd=parseFloat($(this).attr("dt-price"))*Math.pow(10,2);
                STOTAL=($(this).is(":checked"))?STOTAL+padd:STOTAL-padd;
                result=(STOTAL/Math.pow(10,2)).toFixed(2);
                dom.total.text("S/."+result);
                txtval=($(this).is(":checked"))?parseFloat($(this).attr("dt-price")).toFixed(2):"0.00";
                $(this).parent().find(".price-right").text("S/. "+txtval);
            });
        },
        destroy: function(){ /*Que hacer cuando se destruya la instancia del modulo aca*/ }
    };
});
/*-----------------------------------------------------------------------------------------------
 * @Module: comprobante-step4
 * @Description: Manejo de Comprobante, sección que maneja un radio para seleccionar
 *               el tipo de documento para hacer el registro de pago
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("comprobante-step4", function(Sb){
    var st = {
            radioDoc: ':input[name=radTipoComprobante]',
            idRadioBoleta: 'radBoleta',
            idRadioFactura: 'radFactura',
            launcherNuevoDoc: '#nuevo-doc',
            strLauncherNoClicked: 'Añadir Nuevo RUC',
            strLauncherClicked: 'Elegir un RUC registrado',
            sectionBoleta: '#section-boleta',
            sectionFactura: '#section-factura',
            sectionNuevoRegistro: '#section-nuevo',
            slcRazonSocial:'#selPerfilPago',
            radioEvts:{
                onCheckedBoleta: function() {
                  dom.sectionBoleta.show();
                  if( dom.sectionNuevoRegistro.is(":visible")){
                    dom.launcherNuevoDoc.trigger("click",{clicked: true});
                  }
                },
                onUncheckedBoleta: function() {
                  dom.sectionBoleta.hide();
                },
                onCheckedFactura: function(){
                  dom.sectionFactura.show();

                },
                onUncheckedFactura: function () {
                  dom.sectionFactura.hide();
                }
            }
        },
        dom = {},
        catchDom = function(){
           dom.radioDoc = $(st.radioDoc);
           dom.sectionBoleta = $(st.sectionBoleta);
           dom.sectionFactura = $(st.sectionFactura);
           dom.launcherNuevoDoc = $(st.launcherNuevoDoc);
           dom.sectionNuevoRegistro = $(st.sectionNuevoRegistro);
           dom.slcRazonSocial = $(st.slcRazonSocial);
        },
        bindEvents = function(nameRol){
            if(nameRol == 'persona-natural'){
                _handleEventsRadio( st.idRadioBoleta, st.radioEvts);
            }else if(nameRol == 'agentes'){
                _handleEventsRadio( st.idRadioFactura, st.radioEvts);
            }
            dom.radioDoc.on("change", onChangeRadio);
            dom.launcherNuevoDoc.on("click", {clicked: false}, onClickNuevo);
        },
        onChangeRadio = function (e){
            _handleEventsRadio(e.currentTarget.id, st.radioEvts);
        },
        _handleEventsRadio = function(id, evts){
            var handler = {};

            handler[st.idRadioBoleta] = {
                 unchecked : function(){
                    evts.onUncheckedBoleta && evts.onUncheckedBoleta();
                 },
                 checked : function() {
                    handler[st.idRadioFactura].unchecked();
                    evts.onCheckedBoleta && evts.onCheckedBoleta();
                 }
            };

            handler[st.idRadioFactura] = {
                 unchecked : function(){
                    evts.onUncheckedFactura && evts.onUncheckedFactura();
                 },
                 checked : function(){
                    handler[st.idRadioBoleta].unchecked();
                    evts.onCheckedFactura && evts.onCheckedFactura();
                 }
            };
            return handler[id].checked();
        },
        onClickNuevo = function(evt){

            if(evt.data.clicked) {

               dom.sectionNuevoRegistro.hide();
               $(evt.currentTarget).html(st.strLauncherNoClicked);
               dom.slcRazonSocial.removeAttr("disabled");

               evt.data.clicked = false;

            } else {

               dom.sectionNuevoRegistro.show();
               dom.sectionNuevoRegistro.find(":input").val('');
               $(evt.currentTarget).html(st.strLauncherClicked);
               dom.slcRazonSocial.attr("disabled", "disabled");
               dom.slcRazonSocial.find("option[value=0]").prop("selected", true);
               evt.data.clicked = true;
            }

        };
        return {
            init: function(oParams){
                catchDom();
                bindEvents(oParams.rol);
            },
            destroy: function(){

            }
        }; 
});
/*-----------------------------------------------------------------------------------------------
 * @Module: validacion-step4
 * @Description: Validacion del formulario de paso 4
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("validacion-step4", function(Sb){
    var st = {
            frmComprobante: "#frm-comprobante",
            txtRUC: ":input[name=txtRuc]",
            txtDNI: ":input[name=txtDni]",
            txtApellidoNombre: ":input[name=txtApellidoNombre]",
            txtNombre: ":input[name=txtNombre]",
            txtApeMaterno: ":input[name=txtApeMaterno]",
            txtApePaterno: ":input[name=txtApePaterno]",
            txtRazonSocial: ":input[name=txtRazonSocial]",
            txtDireccion: ":input[name=txtDireccion]",
            selTipoVia: ":input[name=selTipoVia]",
            selDepartamento: ":input[name=selDepartamento]",
            selProvincia: ":input[name=selProvincia]",
            selDistrito: ":input[name=selDistrito]",
            hfromAdecsys: ":input[name=hidAdecsys]"
        },
        dom = {},
        catchDom = function(){
            dom.frmComprobante = $(st.frmComprobante);
            dom.txtRUC = $(st.txtRUC);
            dom.txtDNI = $(st.txtDNI);
            dom.txtApellidoNombre = $(st.txtApellidoNombre);
            dom.txtNombre = $(st.txtNombre);
            dom.txtApeMaterno = $(st.txtApeMaterno);
            dom.txtApePaterno = $(st.txtApePaterno);
            dom.txtRazonSocial = $(st.txtRazonSocial);
            dom.txtDireccion = $(st.txtDireccion);
            dom.selTipoVia = $(st.selTipoVia);
            dom.selDepartamento = $(st.selDepartamento);
            dom.selProvincia = $(st.selProvincia);
            dom.selDistrito = $(st.selDistrito);
            dom.hfromAdecsys = $(st.hfromAdecsys);
        },
        bindEvents = function(nameRol){
            if(nameRol == 'agentes'){
               dom.frmComprobante.validate();
               dom.txtDNI.rules( "add", {
                    required: true,
                    messages: {
                    required: "Es requerido."
                    }
                });

            }else if(nameRol == 'persona-natural'){
                //dom.txtDNI.rules('remove','required'); 
            }
            dom.txtRUC.keydown(function(){
                if($(this).val() < 11) {
                    return;
                }
            }).on('keyup.RUC', validateRUC);
            
            var autoCompleteInterval = null;
            
            handleControlCutPaste(dom.txtRUC,{
                paste: function(evt){
                    setTimeout(function(){
                        validateRUC(evt);
                    }, 300);
                },
                cut: function(evt){
                    validateRUC(evt);
                }
            });
            
            dom.txtApellidoNombre.data('namePerDefault', dom.txtApellidoNombre.val());
            
            dom.txtDNI.keydown(function(){
                if($(this).val() < 8) {
                    return;
                }
            }).keyup(validateDNI);
            
            handleControlCutPaste(dom.txtDNI,{
                paste: function(evt){
                    setTimeout(function(){
                        validateDNI(evt);
                    }, 300);
                },
                cut: function(evt){
                    validateDNI(evt);
                }
            });
        },
        validateRUC = function(evt){
           var $elem = evt.currentTarget,
               value = $elem.value,
               handler = null;

            if(!$($elem).hasClass('paste')) {
               handler = handleKeys(evt);
            } else{
               handler = true;
            }
            
            if (dom.frmComprobante.validate().element(st.txtRUC) 
                    && handler){
                $($elem).data('completelength',true);
                $($elem).removeClass('paste');
                
                $elem.blur();
                
                $.ajax({
                    dataType: 'json',
                    url:yOSON.baseHost + 'perfilpago/validar-cliente-adecsys/tipDoc/RUC/numDoc/'+ value,
                    success: function(data){
                        dom.frmComprobante.validate().resetForm();
                        var dataUser = data.data.src;
                        if(data.data.msg === 'noResults'){
                            //se establece el origen del RUC
                            dom.hfromAdecsys.val(0);
                            dom.hfromAdecsys.attr('value',0);
                            
                            cleanFieldsRUC();
                            
                        } else {
                            //se establece el origen del RUC
                            dom.hfromAdecsys.val(1);
                            dom.hfromAdecsys.attr('value',1);
                            //if persona natural
                            handleDataPerField(dom.txtNombre , dataUser.Pre_Nom, true);
                            handleDataPerField(dom.txtApePaterno, dataUser.Ape_Pat, true);
                            handleDataPerField(dom.txtApeMaterno, dataUser.Ape_Mat, true);
                            //if persona juridica
                            handleDataPerField(dom.txtRazonSocial, dataUser.RznSoc_Nombre, true);
                            //ambos
                            handleDataPerSelect(dom.selTipoVia, dataUser.Tip_Calle, true);
                            handleDataPerField(dom.txtDireccion, dataUser.Nom_Calle, true);
                            //combos
                            handleDataPerSelect(dom.selDepartamento, dataUser.idDepartamento, true);
                            dom.selProvincia.data('onSuccessLoadB', function(){
                                handleDataPerSelect(dom.selProvincia, dataUser.idProvincia, true);
                            });
                            dom.selDistrito.data('onSuccessLoadB', function(){
                                handleDataPerSelect(dom.selDistrito, dataUser.idDistrito, true);
                            });
                            dom.selDepartamento.trigger('change', [dataUser.idProvincia, dataUser.idDistrito]);                           
                        }
                    },
                    error: function(){

                    }
                });
                
             } else if(value.length < 11){
                 $($elem).removeData('completelength');
                 cleanFieldsRUC();
             }
        },
        cleanFieldsRUC = function(){
            //if persona natural
            handleDataPerField(dom.txtNombre , "");
            handleDataPerField(dom.txtApePaterno, "");
            handleDataPerField(dom.txtApeMaterno, "");
            //if persona juridica
            handleDataPerField(dom.txtRazonSocial, "");
            //ambos
            handleDataPerSelect(dom.selTipoVia, "");
            handleDataPerField(dom.txtDireccion, "");
            //combos
            handleDataPerSelect(dom.selDepartamento, "");
            handleDataPerSelect(dom.selProvincia, "");
            handleDataPerSelect(dom.selDistrito, "");
            //clean events for combos dependientes
            dom.selProvincia.removeData('onSuccessLoadB');
            dom.selDistrito.removeData('onSuccessLoadB');
        },
        handleKeys = function(evt){
            var result = false,
                keyCode = (window.event) ? evt.which : evt.keyCode;
            
            if((keyCode >= 48) && (keyCode <= 57) || 
               (keyCode >= 96) && (keyCode <= 105) ||
               (keyCode === 13)) {
               
               $(evt.currentTarget).removeClass('paste').removeClass('cut');
               result = true;
            }
            return result;
        },
        validateDNI = function(evt){
           var $elem = evt.currentTarget,
               value = $elem.value,
               handler = null;
           if(!$($elem).hasClass('paste')) {
               handler = handleKeys(evt);
           } else{
               handler = true;
           }
            
           if(value.length === 0){
             handleDataPerField(dom.txtApellidoNombre, dom.txtApellidoNombre.data('namePerDefault'));   
           }
           
           if (value.length === 8 && handler){
                $($elem).removeClass('paste');
                
                $elem.blur();

                $.ajax({
                    dataType: 'json',
                    url:yOSON.baseHost + 'perfilpago/validar-cliente-adecsys/tipDoc/DNI/numDoc/'+ value,
                    success: function(data){
                        dom.frmComprobante.validate().resetForm();
                        var dataUser = data.data.src;
                        if($.trim(dataUser.RznSoc_Nombre)){
                            handleDataPerField(dom.txtApellidoNombre, dataUser.RznSoc_Nombre);
                        } else {
                            handleDataPerField(dom.txtApellidoNombre, dom.txtApellidoNombre.data('namePerDefault'));
                        }
                    }
                });               
           }
        },
        handleDataPerField = function(obj, value, existsRUC){
            var extsRUC = (typeof existsRUC === 'undefined')?false: true;
            if((value && value!=="") || extsRUC){
               obj.attr('value', value);
               obj.val(value);
               obj.attr('title', value);
               obj.addClass('disabled');
               obj.attr('disabled', 'disabled');
            } else {
               obj.removeAttr('value');
               obj.val('');
               obj.removeAttr('title');
               obj.removeAttr('disabled');
               obj.removeClass('disabled');
            }
        },
        handleDataPerSelect = function(obj, value, existsRUC){
            var extsRUC = (typeof existsRUC === 'undefined')?false: true;
            obj.find("option").removeAttr("selected");
            if((value && value !== "") || extsRUC){
               obj.find("option[value='"+value+"']").prop("selected", true);
               obj.val(value);
               obj.prop('disabled', true);
            } else {
               obj.prop('disabled', false); 
            }
        },
        handleControlCutPaste = function(obj, callbacks){
            obj.bind({
               paste: function(evt){
                  obj.removeClass('cut').addClass('paste');
                  callbacks.paste && callbacks.paste(evt);
               },
               cut: function(evt){
                  obj.removeClass('paste').addClass('cut');
                  callbacks.cut && callbacks.cut(evt);
               },
               focus: function(evt){
                  obj.removeClass('cut').addClass('paste');
                  callbacks.focus && callbacks.focus(evt);
               },
               blur: function(evt){
                  obj.removeClass('cut').addClass('paste');
                  callbacks.blur && callbacks.blur(evt);
               }        
            });
        };
    return {
        init: function(oParams){
            catchDom();
            bindEvents(oParams.rol);
        },
        destroy: function(){

        }
    };
}, ['libs/plugins/jqValidate-min.js']);
/*-----------------------------------------------------------------------------------------------
 * @Module: registrar-nuevo-ruc
 * @Description: Manejo de campos del formulario de registro de nuevo RUC
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("registrar-nuevo-ruc", function(Sb){

    var st = {
            inputRUC: '#txtRuc',
            wpNatural: '#datosPersonales',
            wpJuridica: '#razonSocial'
    },
    dom = {},
    catchDom = function(){
        dom.inputRUC = $(st.inputRUC);
        dom.wpNatural = $(st.wpNatural);
        dom.wpJuridica = $(st.wpJuridica);
    },
    bindEvents = function(){
        dom.inputRUC.on('keyup',filterFields);
    },
    filterFields = function(e){
        var valueInput = dom.inputRUC.val();

        if(parseInt(valueInput.substr(0,1)) === 1){

            handleFieldsPNatural(1);
            handleFieldsPJuridica(0);
        } else {

            handleFieldsPNatural(0);
            handleFieldsPJuridica(1);
        }
    },
    handleFieldsPNatural = function(action){
        if(action === 1){
            dom.wpNatural.slideDown();
        } else{
            dom.wpNatural.slideUp();
        }
    },
    handleFieldsPJuridica = function(action){
        if(action === 1){
            dom.wpJuridica.slideDown();
        } else{
            dom.wpJuridica.slideUp();
        }
    };
    return {
        init: function(){
            catchDom();
            bindEvents();
        },
        destroy: function(){
    
        }
    };
});
/*-----------------------------------------------------------------------------------------------
 * @Module: Datos de Facturacion - agregar RUC
 * @Description: Datos de Facturacion - agregar RUC
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("add-ruc-facturacion", function(Sb){
    var st = {
        indexTable: 'td.tdOrd'
    },
    dom = {},
    catchDom = function(){
        dom.indexTable = $(st.indexTable);
    },
    bindEvents = function(titleEliminar,askEliminar,urlAjax){
        scrollAdd();
        deleteRow(titleEliminar,askEliminar,urlAjax);
    },
    deleteRow = function (titleEliminar,askEliminar,urlAjax){
      $('#tabla').on("click",".eliminar",function(){
        var $parent = $(this).parent(); 
        $.confirm({
                "title":titleEliminar,
                "answer":askEliminar,
                "callback":function(cond){
                    if(cond){
                        var id = $parent.attr('id');
                       $.ajax({
                            url: yOSON.baseHost + urlAjax + id,
                            dataType:'json',
                            beforeSend: function(){

                            },
                            success: function(data){
                              if(data.data.state === 1){
                                $parent.remove();
                                orderTableByIndex();
                              } else{
                                warn(data.data.msg, 5000);
                              }
                            },
                            error : function(){
                                warn('No se puedo eliminar.', 5000);
                            }
                            
                       });
                    }
                }
            });
      });
    },
    orderTableByIndex = function() {
        var index = 1;
        if($(st.indexTable).length) {
            $(st.indexTable).each(function(i,e){
                $(e).html(index);
                index++;
            });
        }
    },
    scrollAdd = function (){
        $('#goForm').scrollWindow();
    };
    return {
        init: function(oParams){
            catchDom();
            bindEvents(oParams.title,oParams.question,oParams.urlAjax);
        }
    };
},['libs/plugins/jqFancybox-min.js','backbone/libs/underscore/underscore.js','libs/plugins/jqConfirm.js']);
/*-----------------------------------------------------------------------------------------------
 * @Module: lightboxPagoEfectivo Pago efectivo-step4
 * @Description: lightbox Pago efectivo - step 4
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("show-more-step4", function(Sb){
    var dom = {
        strongLetter : $('#strongLetter'),
        headerLetter : $('#headerLetter')
    },
     textoInformacion = {
       'strongLetter' : {
            title : 'Negrita',
            msg : '<strong id="exampleAvisoImpreso">Paita 4dorm. (Piura). Se Vende Casa Habitación, desocupada, AT.226.05m2 AC180m2 en Av.San Martín. Ideal para Hotel y Comercio en General. Comunicarse al C. 997-937-266.</strong>'
        },
        'headerLetter' : {
            title: 'Encabezado Simple',
            msg : '<p id="exampleAvisoImpreso"><span>SOL DE LA MOLINA</span>4dorm. Condominio 3casas, A.C.260m2; 2coch, acab./lujo, Kontiki 281, alt.cdra.10 Acapulco, T.719-5140, 719-5141</p>'
        }
    },
    showLightBox = function(elem,objDataBox){
        elem.on('click',function(event){
                event.preventDefault();
                var $this = $(this),
                    objData = objDataBox,
                    htmlContent = '<div id="example-detail" ><h2 class="urb-stitle">'+objData.title+'</h2>'+objData.msg +'</div>';
                $.fancybox.showLoading();
                setTimeout(function(){
                    $.fancybox({
                        type : 'html',
                        openEasing: 'easeOutBack',
                        closeEasing: 'easeInBack',
                        openSpeed : 500,
                        closeSpeed : 500,
                        openEffect : 'elastic',
                        closeEffect : 'elastic',
                        autoSize : false,
                        width : 350,
                        height : 140,
                        afterLoad : function(){
                            $.fancybox.hideLoading();
                        },
                        content : htmlContent
                    }); //fancybox
                },0);
            }); //click on
    }
   return {
        init: function(){

            showLightBox(dom.strongLetter,textoInformacion.strongLetter);
            showLightBox(dom.headerLetter,textoInformacion.headerLetter);
        }
    }
},['libs/plugins/jqFancybox-min.js']);

/*-----------------------------------------------------------------------------------------------
 * @Module: lightboxPagoEfectivo Pago efectivo-step4
 * @Description: lightbox Pago efectivo - step 4
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("lightboxPagoEfectivo", function(Sb){
    return {
        init: function(){
            var that = this;
            $(".fancybox-effects-d").fancybox({
                padding: 0,
                openEasing: 'easeOutBack',
                closeEasing: 'easeInBack',
                openSpeed : 500,
                closeSpeed : 500,
                openEffect : 'elastic',
                closeEffect : 'elastic',
                title : null,
                scrolling : null,
                fitToView  : false,
                autoSize : false,
                width : 550,
                height : 770,
                beforeLoad : function(){
                    that.videoPE();
                }
            });
        },
        videoPE:function(){
            function checkVideo() {
                if (!!document.createElement('video').canPlayType) {
                    var vidTest = document.createElement("video");
                    var oggTest = vidTest.canPlayType('video/ogg; codecs="theora, vorbis"');
                    if (!oggTest) {
                        h264Test = vidTest.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
                        if (!h264Test) {
                            return false;
                        } else {
                            if (h264Test == "probably") {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    } else {
                        if (oggTest == "probably") {
                            return true;
                        } else {
                            return false;
                        }
                    }
                } else {
                    return false;
                }
            }
            if (checkVideo() != true) {
                var params = {},
                    flashvars = {},
                    baseUrl_ = yOSON.statHost;
                params.allowscriptaccess = "always";
                params.allowfullscreen = "true";
                params.wmode = "opaque";
                params.flashvars = "file=" + baseUrl_ + "video/1.flv&repeat=no&stretching=fill&skin=" + baseUrl_ + "swf/md.swf&autostart=false&bufferlength=1&image=" + baseUrl_ + "video/1.jpg";
                swfobject.embedSWF("" + baseUrl_ + "swf/playertv.swf", "pagoefectivo-video", "500", "300", "9", "" + baseUrl_ + "swf/expressInstall.swf", flashvars, params);
            }
        }
    }
}, ['libs/plugins/jqFancybox-min.js','libs/plugins/swfobject.js','libs/plugins/jqEasing.js']);
/**
* Añadir Video
* @submodule add-video
* @main publicacion
*/
yOSON.AppCore.addModule("add-video", function(Sb){
    var st = {
            txt: 'txtVideo',
            btnAdd: 'btnAddVideo',
            list: 'olVideoList',
            remove: 'remove',
            tpl: 'tplUrlVideo',
            template: null,
            counter: 0,
            limit: 2,
            validation : /(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
            urlYtPrefix : 'http://gdata.youtube.com/feeds/api/videos/',
            deleteUrl : yOSON.baseHost+'aviso/delete-video-notice/'
        },
        videos = [],
        dom = {},
    catchDom = function(){
        dom.txt = $("#" + st.txt);
        dom.btnAdd = $("#" + st.btnAdd);
        dom.list = $("#" + st.list);
        dom.remove = $("." + st.remove);
        dom.tpl = $("#" + st.tpl);
    },
    bindEvents = function(){
        dom.btnAdd.on('click', function(e){

            var txtVideo = dom.txt.val();
            if (!txtVideo.match(st.validation)) {
                warn("Por favor ingrese un video válido de Youtube.");
                return false;
            };

            var expression=txtVideo.match(st.validation),
            url=st.urlYtPrefix+encodeURIComponent(expression[3]),
            vid = expression[3];

            if (videos.length>(st.limit-1)) {
                warn("El número máximo permitido es de "+st.limit+" videos.");
                dom.txt.val('');
                return false;
            };

            if (dontRepeat(vid)) {
                loadVideo(url, vid);
            }

        });
    },
    dontRepeat = function(vid){

        if (videos.length>0) {

            if (getArrayIndex(vid)>-1) {
                warn("Usted ya ingresó este video.");
                dom.txt.val('').attr('placeholder', 'Ingrese una nueva url de video');
                return false;
            }else{
                return true;
            }
        }
        return true;
    },
    loadVideo = function(url, vid){
        $.ajax({
            url: url,
            data: 'v=2&alt=json&callback=?',
            type: "GET",
            cache:false,
            dataType: "json",
            success: function(response) {

                videos.push({
                    vid : vid,
                    title : response.entry.title.$t,
                    preview : response.entry.media$group.media$thumbnail[0].url,
                    height : 65,
                    width : 90
                });

                var compiled_template = _.template(st.template),
                $current = $(compiled_template(_.last(videos)));
                if (dom.list.hasClass('slvzr-empty')) {
                    dom.list.removeClass('slvzr-empty');
                };
                dom.list.append($current);

                dom.txt.val('').attr('placeholder','Ingrese la url del video');

                $current.on("click", ".remove", function(e){
                    var _this = $(e.currentTarget).parent(),
                    idAviso = $('#id').val();
                    if(!tmp.videos){
                        videos.splice(getArrayIndex(vid), 1);
                        _this.fadeOut().remove();
                        return true;
                    }else{
                        $.ajax({
                            url: st.deleteUrl+'id/'+vid+'/media/'+idAviso,
                            type: "GET",
                            dataType: "json",
                            success: function(response) {
                                if(response.session.state==1){
                                    if(response.data.state==1){
                                        videos.splice(getArrayIndex(vid), 1);
                                        success(response.data.msg);
                                        _this.fadeOut().remove();
                                        return true;
                                    }else{
                                        warn(response.data.msg);
                                        return false;
                                    }
                                }else{
                                    warn(response.session.msg);
                                    return false;
                                }
                            },
                            error: function (request, status, error) {
                                warn('La acción solicitada no ha podido concretarse, por favor intentelo más tarde.');
                                return false;
                            }
                        });
                    }
                });
            },
            error: function (request, status, error) {
                warn('El video solicitado no existe.');
            }
        });
    },
    getArrayIndex = function(vid){
        var indice = -1;
        for (var i=0;i<videos.length;i++){
            if (videos[i].vid==vid){
                indice = i;
            }
        }
        return indice;
    },
    afterCatchDom = function(){
        st.template = st.template || $.trim(dom.tpl.html());
    },
    listVideos = function(){
        if(tmp.videos){
            for(var i=0; i<tmp.videos.length; i++){
               loadVideo(st.urlYtPrefix+tmp.videos[i], tmp.videos[i]);
            }
            tmp.videos = [];
        }
    };
    return {
        init: function(){
            catchDom();
            afterCatchDom();
            bindEvents();
            listVideos();
        },
        destroy: function(){

        }
    };
}, ['backbone/libs/underscore/underscore.js']);
/* ----------------------------------------------------------------------------------------------------------
 * @Module     : Range Datepicker
 * @description: Modulo para mostrar datepicker
 **//*------------------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule('datepicker', function(Sb){
    var methods={
        range:function(json){
            var opt={
                    "from":null,
                    "to":null
                },
                options=$.extend(opt,json),
                from=options.from,
                to=options.to;
            if(from!=null&&to!=null){
                if(typeof from=="string"){
                    $(from).datepicker({
                        minDate:0,
                        numberOfMonths: 2,
                        dateFormat:"dd/mm/yy",
                        onClose:function(selectedDate){
                            $(to).datepicker("option","minDate",selectedDate);
                        }
                    });
                    $(to).datepicker({
                        minDate:0,
                        numberOfMonths: 2,
                        dateFormat:"dd/mm/yy",
                        onClose:function(selectedDate){
                            $(from).datepicker("option","maxDate",selectedDate);
                        }
                    });
                }
            }
        }
    };
    return {
        /*Public Constructor : Inicializa el modulo (Es el que se ejecuta en el schema @modules)*/
        init: function(oParams){
            var rules=datepicker[oParams[0]];
            for(var index in rules){
                methods[index](rules[index]);
            }
        },
        destroy: function(){ /*Que hacer cuando se destruya la instancia del modulo aca*/ }
    };
},['libs/plugins/jqUICore.js','libs/plugins/jqDatepicker.js','data/datepicker.js']);
/* ----------------------------------------------------------------------------------------------------------
 * @Module     : Infinite Scroll
 * @description: Modulo de Scroll Infinito
 **//*------------------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule('infinite-scroll', function(Sb){
    var _this=this;
    _this.inst=null;
    Sb.events(["returnInst"],function(fn){fn&&fn(_this.inst);},this);
    return {
        /*Public Constructor : Inicializa el modulo (Es el que se ejecuta en el schema @modules)*/
        init: function(oParams){
            var opt={
                el:".tbl-admin tbody",
                tag:"tr",
                btn:".btn-vermas",
                frecuency:10,
                limit:20,
                callback:{
                    success:function(json){
                        return json.data["src"];
                    }
                }
            },
            options=$.extend(opt,infScroll[oParams[0]]),
            instScroll=$("#wrapper").Scrollaize(options);
            _this.inst=instScroll;
        }
    };
},['backbone/libs/underscore/underscore.js','libs/plugins/jqScroll.js','data/scroll.js']);
/* ----------------------------------------------------------------------------------------------------------
 * @Module     : Prueba Scroll
 * @description: Modulo de Scroll Infinito
 **//*------------------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule('prueba-scroll', function(Sb){
    var _this=this;
    _this.inst=null;
    Sb.events(["returnInst"],function(fn){fn&&fn(_this.inst);},this);
    return {
        /*Public Constructor : Inicializa el modulo (Es el que se ejecuta en el schema @modules)*/
        init: function(oParams){
            var opt={
                el:".tbl-admin tbody",
                tag:"tr",
                btn:".btn-vermas",
                frecuency:20,
                table:true,
                limit:20,
                callback:{
                    success:function(json){
                        return json.data["src"];
                    }
                }
            },
            options=$.extend(opt,infScroll[oParams[0]]),
            instScroll=$("#wrapper").Scrollaize(options);
            _this.inst=instScroll;
        },
        destroy: function(){ /*Que hacer cuando se destruya la instancia del modulo aca*/ }
    };
},['backbone/libs/underscore/underscore.js','libs/plugins/jqScroll2.js','data/scroll.js']);
/* ----------------------------------------------------------------------------------------------------------
 * @Module     : Table Order
 * @description: Ordenamiento de tablas
 **//*------------------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule('tbl-order', function(Sb){
    var THIS=this,
        dom={
        "order":null
        },
        methods={
            scroll:function(sB,options){
                Sb.trigger("returnInst",[function(inst){
                    var _this=inst,
                        settings=_this.settings,
                        ajax=settings.ajax,
                        data;
                    ajax[options.pData]=function(){
                        return options["data"];
                    };
                    ajax[options.pOrder]=function(){
                        return options["order"];
                    };
                    settings.ajax=ajax;
                    data=_this.convertData(settings.ajax);
                    data[options.pTotal]=methods.numTotal(_this.arquitect.regs.length);
                    data[options.pCond]=true;
                    methods.ajax(settings.url,data,{
                        "success":function(json){
                            _this.fetch(json.data["src"],json.extra["totalPagos"]);
                        },
                        "error":function(){
                            warn("Ocurrió un error en la petición. Inténtelo de nuevo.");
                        }
                    });
                }]);
            },
            render:function(options){
                var tmpl=_.template($(options.tmpl).html()),
                    pdata=options.pData,
                    porder=options.pOrder,
                    pcond=options.pCond,
                    ptotal=options.pTotal,
                    data={
                        pdata:options.data,
                        porder:options.order,
                        pcond:true,
                        ptotal:$(options.target).length
                    };
                methods.ajax(yOSON.baseHost+options.url,data,{
                    "success":function(json){
                        $(options.target).each(function(index,value){
                            $(value).html(tmpl(json.data["src"][index]));
                        });
                    },
                    "error":function(){
                        warn("Ocurrió un error en la petición. Inténtelo de nuevo.");
                    }
                });
            },
            ajax:function(url,data,callback){
                var content=$("#wrapper");
                utils.loader(content,true);
                $.ajax({
                    "url":url,
                    "data":data,
                    "dataType":"json",
                    "type":"GET",
                    "success":function(json){
                        utils.loader(content,false);
                        callback.success&&callback.success(json);
                    },
                    "error":function(jqXHR,textStatus,errorThrown){
                        utils.loader(content,false);
                        callback.error&&callback.error(jqXHR,textStatus,errorThrown);
                    }
                });
            },
            numTotal:function(total){
                var residuo=total%20,
                    cociente=(residuo!=0)?((total-residuo)/20)+1:total/20;
                return cociente*20;
            }
        };
        THIS.opts={
            module:false,
            url:"", //Si no se usa scrollaize
            context:".tbl-order",
            el:".down,.up",
            pTotal:"p1",
            pData:"p2", //Parametro a pasar por ajax
            pOrder:"p3", //Parametro que indica el tipo de orden a pasar por ajax
            pCond:"ord",
            target:".tbl-admin tbody tr", //Si no se usa scrollaize
            tmpl:"#tplTrPaid"
        };
        Sb.events(["order-tbl"],function(fn){fn&&fn(methods,THIS.opts);},this);
    return {
        /*Public Constructor : Inicializa el modulo (Es el que se ejecuta en el schema @modules)*/
        init: function(oParams){
            var _this,data,order;
            THIS.opts=$.extend(THIS.opts,oParams[0]);
            dom.order=$(THIS.opts.context).find(THIS.opts.el);
            dom.order.bind("click",function(e){
                e.preventDefault();
                _this=$(this);
                if(!_this.hasClass("act")){
                    dom.order.removeClass("act");
                    _this.addClass("act");
                    THIS.opts["data"]=_this.parent().attr("data");
                    THIS.opts["order"]=(_this.hasClass("down"))?"desc":"asc";
                    (THIS.opts.module)?methods.scroll(Sb,THIS.opts):methods.render(THIS.opts);
                }
           });

        },
        destroy: function(){ /*Que hacer cuando se destruya la instancia del modulo aca*/ }
    };
},['backbone/libs/underscore/underscore.js']);
/* ----------------------------------------------------------------------------------------------------------
 * @Module     : Table Actions
 * @description: Modulo de instancias de actions
 **//*------------------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule('tbl-actions', function(Sb){
    var events={
        "delete":function(){
            var inst=this,
                //parent=inst.parents("tr"),
                url=inst.attr("href"),
                rspta;
            this.on("click",function(e){
                e.preventDefault();
                $.confirm({
                    "title":'Eliminar',
                    "answer":'¿Esta seguro que desea eliminar?',
                    "callback":function(cond){
                        if(cond) window.location=_this.attr('href');
                    }
                });
            });
        },
        "givedown":function(){
            var inst=this,
                url=inst.attr("href"),
                rspta;
            this.on("click",function(e){
                e.preventDefault();
                var _this = $(this);
                $.confirm({
                    "title":'Dar de baja',
                    "answer":'¿Esta seguro que desea dar de baja al anuncio?',
                    "callback":function(cond){
                        if(cond) window.location=_this.attr('href');
                    }
                });

            });
        },
        "cancelprinted": function(){
            var inst=this,
                url=inst.attr("href"),
                rspta;
            this.on("click",function(e){
                e.preventDefault();
                var _this = $(this);
                $.confirm({
                    "title":'Eliminar Impreso',
                    "answer":'¿Seguro que desea cancelar este impreso?',
                    "callback":function(cond){
                        if(cond) window.location=_this.attr('href');
                    }
                });

            });
        }
    },
    dispatch=function(inst,arr){
        for(var i=0;i<=arr.length;i++){
            events[arr[i]]&&events[arr[i]].call(inst);
        }
    };
    return {
        /*Public Constructor : Inicializa el modulo (Es el que se ejecuta en el schema @modules)*/
        init: function(oParams){
            var context=oParams[0] || $(".tbl-admin tbody tr"),
                classEl=oParams[1] || ".action-icons",
                config;
            context.find(classEl).each(function(index,value){
                config=$(value).attr("class").split(/\s+/);
                dispatch($(value),config);
            });
            //$.fn.Confirm();
        },
        destroy: function(){ /*Que hacer cuando se destruya la instancia del modulo aca*/ }
    };
},['backbone/libs/underscore/underscore.js','libs/plugins/jqFancybox-min.js','libs/plugins/jqConfirm.js']);
/*-----------------------------------------------------------------------------------------------
 * @Module: validate-alerts-form
 * @Description: Validar el formulario de alertas
*//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("validate-alerts-form", function(Sb){
    var dom = {
        formAlert : $('#formAlert'),
        chksInmueble : $('#chksInmueble'),
        radOperacion: $('#radOperacion'),
        radUbicada : $('#radUbicada'),
        errorRadOperation: $('#errorRadOperation'),
        errorRadUbicada : $('#errorRadUbicada'),
        errorChkInmueble: $('#errorChkInmueble'),
        errorRadFrecuencia : $('#errorRadFrecuencia'),
        allRadOperacion: $('input[name=radOperacion]'),
        allRadUbicada: $('input[name=radUbicada]'),
        allChksInm: $('input[name*=chkTipoInm]'),
        allRadFrecuencia: $('input[name=radFrecuencia]')

    },
    validateObj = {
            rules:{
                txtSince :{
                    required : true
                },
                txtDormitorios:{
                    digits: true,
                    min: 0,
                    max: 10
                },
                txtBanios:{
                    digits: true,
                    min: 0,
                    max: 20
                },
                txtEstacionamiento:{
                    min: 0
                },
                txtAntiguedad:{
                    min: 0
                },
                txtAreaconst:{
                    required : false,
                    decimals2 :true
                },
                txtAreatotal:{
                    required : false,
                    decimals2 :true
                },
                selDpto:{
                    required : true,
                    valueNotEquals : '0'
                },
                selProv:{
                    required : true,
                    valueNotEquals : '0'
                },
                selDist1:{
                    required : true,
                    valueNotEquals : '0'
                },
                txtDesde:{
                    required : false,
                    decimals2 :true
                },
                txtHasta:{
                    required : false,
                    decimals2 :true
                }
            },
            messages:{
                txtSince :{
                    required : "Este campo es necesario"
                },
                txtDormitorios:{
                    digits: "Ingrese un numero entero",
                    min: "Ingrese un numero igual o mayor a 0",
                    max: "Ingrese un numero igual o menor a 10"
                },
                txtBanios:{
                    digits: "Ingrese un numero entero",
                    min: "Ingrese un numero igual o mayor a 0",
                    max: "Ingrese un numero igual o menor a 20"
                },
                txtEstacionamiento:{
                    digits: "Ingrese un numero entero",
                    min: "Ingrese un numero igual o mayor a 0"
                },
                txtAntiguedad:{
                    digits: "Ingrese un numero entero",
                    min: "Ingrese un numero igual o mayor a 0"
                },
                selDpto:{
                    required : "Este campo es necesario",
                    valueNotEquals : "Este campo es necesario"
                },
                selProv:{
                    required : "Este campo es necesario",
                    valueNotEquals : "Este campo es necesario"
                },
                selDist1:{
                    required : "Este campo es necesario",
                    valueNotEquals : "Este campo es necesario"
                }
            },
            focusInvalid: false,
            submitHandler : function(form){
                if(dom.allRadOperacion.is(':checked') && dom.allRadUbicada.is(':checked') && dom.allChksInm.is(':checked') && dom.allRadFrecuencia.is(':checked')){
                    form.submit();
                }else{
                    return false;
                }                
            }
        },
        scrollTop = function(id){
            $("html,body").animate({
                scrollTop:$(id).offset().top
            },700,'swing',function(){
                location.hash=id;
            });
        },
        showHideChecksErrors = function(domElement,errorPlacement){
            domElement.on('change',function(){
                if(domElement.is(':checked')){
                    errorPlacement.hide();
                }else{
                    errorPlacement.show();
                }
            });
        },
        showHideRadioErrors = function(domElement,errorPlacement){
            domElement.on('change',function(){
                if(errorPlacement.is(':visible')){
                    errorPlacement.hide();
                }
                
            });
        },
        validateOnSubmit = function(allElements,errorPlacement){
            if(allElements.is(':checked')){
                   errorPlacement.hide();
                }else{
                   errorPlacement.show();
                   return true;
                }
        };
    return {
        init:function(){
            dom.formAlert.validate(validateObj);

            /* validacion aparte para radio y chk */
            showHideChecksErrors(dom.allChksInm,dom.errorChkInmueble);
            showHideRadioErrors(dom.allRadOperacion,dom.errorRadOperation);
            showHideRadioErrors(dom.allRadUbicada,dom.errorRadUbicada);
            showHideRadioErrors(dom.allRadFrecuencia,dom.errorRadFrecuencia);

            /* al submitear */
            dom.formAlert.on('submit',function(){
                var validChk = validateOnSubmit(dom.allChksInm,dom.errorChkInmueble);
                var validRadOp = validateOnSubmit(dom.allRadOperacion,dom.errorRadOperation);
                var validRadRad = validateOnSubmit(dom.allRadUbicada,dom.errorRadUbicada);
                validateOnSubmit(dom.allRadFrecuencia,dom.errorRadFrecuencia);
                if(validChk || validRadOp || validRadRad){
                    scrollTop('#formAlert');
                }
            });

        },
        destroy: function(){}
    }
},['libs/plugins/jqValidate-min.js']);
/* ----------------------------------------------------------------------------------------------------------
 * @Module     : validate-datos-usuario
 * @description: Modulo para validar el formulario de edición de datos del usuario
 **//*------------------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("validate-datos-usuario", function(Sb){
    var st = {
        formInfouser : '#formInfouser',
        dia: ':input[name=selDia]',
        mes: ':input[name=selMes]',
        year: ':input[name=selAnio]',
        txtClave: ':input[name=txtNewClave]',
        validateSettings:{
            rules:{
                txtEmail:{
                    required : true,
                    email: true,
                    maxlength: 20
                },
                txtEmailAltern:{
                    email: true,
                    maxlength: 20
                },
                txtNombre:{
                    required: true,
                    nombre: true,
                    minlength: 3,
                    maxlength: 15
                },
                txtApellidos:{
                    required: true,
                    nombre: true,
                    minlength: 3,
                    maxlength: 15
                },
                txtDni: {
                    dni: true
                },
                txtCell01: {
                    celular: true,
                    maxlength: 15
                },
                txtTelef01:{
                    phone: true,
                    maxlength: 15
                },
                txtNewClave:{
                  minlength: 8,
                  maxlength: 20
                },
                txtConfirmClave:{
                    equalTo:'#txtNewClave'
                }
           }
        }
    },
    dom = {},
    catchDom = function(){
        dom.formInfouser = $(st.formInfouser);
        dom.dia = $(st.dia);
        dom.mes = $(st.mes);
        dom.year = $(st.year);
        dom.token = $('#token');
        dom.txtClave = $(st.txtClave);
    },
    bindEvents = function(){
        dom.formInfouser.validate(st.validateSettings);
        $().dateSelectBoxes(dom.mes,dom.dia,dom.year);
        dom.txtClave.pstrength();
        dom.txtClave.trigger('keyup');
    };
    return {
        init:function(){
            catchDom();
            bindEvents();
        },
        destroy: function(){}
    };
},['libs/plugins/jqValidate-min.js','libs/plugins/jqDateSelectBoxes.js','libs/plugins/jqPstrength.min.js']);
/*--------------------------------------------------------------------------------------------------------
 * @Module     : check alls
 * @Description: Check a todos los checkbox
 *//*----------------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule('check-all', function(Sb){
    return {
    /*Public Constructor : Inicializa el modulo (Es el que se ejecuta en el schema @modules)*/
        init: function(oParams){
           var checkall=$(".check-all"),
               checks=$("input[name='chkAviso']");
            checkall.on("click",function(){
                if($(this).is(':checked')) {
                  $("input[name='chkAviso']").prop('checked', true);
                } else {
                  $("input[name='chkAviso']").prop('checked', false);
                }
           });
            checks.on('click',function(){
                if(!$(this).is(':checked')) {
                    $(".check-all",$(this).parents("table")).removeAttr("checked");
                }
            });
        },
        /*Constructor : Inicializa el modulo (Es el que se ejecuta en el schema @modules).*/
        destroy: function(){ /*Como destruir instacia de este modulo aqui*/ }
    };
});
/*--------------------------------------------------------------------------------------------------------
 * @Module     : remove all
 * @Description: Remueve los avisos en masa
 *//*----------------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule('remove-all', function(Sb){
    var dom={
        btn:$("#delete-ads")
    };
    return {
    /*Public Constructor : Inicializa el modulo (Es el que se ejecuta en el schema @modules)*/
        init: function(oParams){
            var data=[],el,cond;
            dom.btn.on("click",function(){
                el=$("input[name='chkAviso']:checked");
                if(el.length>0){
                    $("input[name='chkAviso']:checked").each(function(index,value){
                        data.push($(value).val());
                    });
                    $.confirm({
                        "title":'Eliminar Avisos',
                        "answer":"¿Esta seguro que desea eliminar los avisos seleccionados?",
                        "callback":function(cond){
                            if(cond){
                                window.location=yOSON.baseHost+"application/aviso/eliminar-varios?"+$.param({"p":data});
                            }
                        }
                    });
                }
                else{
                    warn("Seleccione al menos un aviso a Eliminar");
                }
            });
        },
        /*Constructor : Inicializa el modulo (Es el que se ejecuta en el schema @modules).*/
        destroy: function(){ /*Como destruir instacia de este modulo aqui*/ }
    };
},['libs/plugins/jqFancybox-min.js','backbone/libs/underscore/underscore.js','libs/plugins/jqConfirm.js']);
/*--------------------------------------------------------------------------------------------------------
 * @Module     : republish all
 * @Description: Remueve los avisos en masa
 *//*----------------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule('republish-all', function(Sb){
    var dom={
        btn:$("#republish-ads")
    };
    return {
    /*Public Constructor : Inicializa el modulo (Es el que se ejecuta en el schema @modules)*/
        init: function(oParams){
            var data=[],el,cond;
            dom.btn.on("click",function(){
                el=$("input[name='chkAviso']:checked");
                if(el.length>0){
                    $("input[name='chkAviso']:checked").each(function(index,value){
                        data.push($(value).val());
                    });

                    $.confirm({
                        "title":'Republicar Avisos',
                        "answer":"¿Esta seguro que desea republicar los avisos seleccionados?",
                        "callback":function(cond){
                            if(cond){
                                window.location=yOSON.baseHost+"agentes/aviso/republicacion-masiva?"+$.param({"id":data});
                            }
                        }
                    });

                }
                else{
                    warn("Seleccione al menos un aviso a Republicar");
                }
            });
        },
        /*Constructor : Inicializa el modulo (Es el que se ejecuta en el schema @modules).*/
        destroy: function(){ /*Como destruir instacia de este modulo aqui*/ }
    };
},['libs/plugins/jqFancybox-min.js','backbone/libs/underscore/underscore.js','libs/plugins/jqConfirm.js']);
/*--------------------------------------------------------------------------------------------------------
 * @Module     : Receive Alerts
 * @Description: Modulo de confirmacion de alertas
 *//*----------------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule('receive-alerts', function(Sb){
    var dom={
        alerts:$("#chkAlertas"),
        content:$("#wrapper")
    };
    return {
    /*Public Constructor : Inicializa el modulo (Es el que se ejecuta en el schema @modules)*/
        init: function(oParams){
            var cond,msg;
            dom.alerts.on("click",function(){
                cond=($(this).is(":checked"))?1:0;
                msg=($(this).is(":checked"))?"Su alertas han sido activadas":"Su alertas han sido desactivadas";
                utils.loader(dom.content,true);
                $.ajax({
                    url:yOSON.baseHost+"application/alertas/recibir-alertas",
                    data:{
                        "chkAlertas":cond
                    },
                    method:"GET",
                    dataType: 'json',
                    success: function(json) {
                        utils.validAjax(json,{
                            "success":function(json){
                                utils.loader(dom.content,false);
                                echo(msg,2000);
                            },
                            "error":function(){
                                utils.loader(dom.content,false);
                                warn("Ocurrió un error en la petición. Inténtelo de nuevo.");
                            }
                        })
                    },
                    error:function(){
                        utils.loader(dom.content,false);
                        warn("Ocurrió un error en la petición. Inténtelo de nuevo.");
                    }
                });
            });
        },
        /*Constructor : Inicializa el modulo (Es el que se ejecuta en el schema @modules).*/
        destroy: function(){ /*Como destruir instacia de este modulo aqui*/ }
    };
});

/*-----------------------------------------------------------------------------------------------
 * @Module: delete-item-alertas
 * @Description: Eliminar item de alertas
*//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("delete-item", function(Sb){
    var cond,
        dom = {
            actionIconsDelete : $('a.action-icons.delete')
        },
    deleteItem = function(title,answer){
        dom.actionIconsDelete.on('click',function(event){
            event.preventDefault();
            var _this=$(this);
            $.confirm({
                "title":title,
                "answer":answer,
                "callback":function(cond){
                    if(cond) window.location=_this.attr('href');
                }
            });
        });
    }
    return{
        init: function(oParams){
            deleteItem(oParams.title,oParams.answer);
        },
        destroy: function(){}
    }
},['libs/plugins/jqFancybox-min.js','backbone/libs/underscore/underscore.js','libs/plugins/jqConfirm.js']);
/*-----------------------------------------------------------------------------------------------
 * @Module: Select-Paid
 * @Description: Combo de pagos
*//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("select-paid", function(Sb){
    var st = {
           cbopaid:"#selPaid" 
        },
    dom = {},
    catchDom= function(){
        dom.cbopaid = $(st.cbopaid);
    },
    bindEvents= function(){
        dom.cbopaid.on("change",function(e){
            e.preventDefault();
            Sb.trigger("order-tbl",[function(methods,opts){
                opts["data"]=(typeof opts["data"]=="undefined")?"fchPublicacion":opts["data"];
                opts["order"]=(typeof opts["order"]=="undefined")?"desc":opts["order"];
                methods.scroll(Sb,opts);
            }]);
        });
    };
    return{
        init: function(){
            catchDom();
            bindEvents();
        }
    };
});
/*--------------------------------------------------------------------------------------------------------
 * @Module     : Validate Form
 * @Description: Validacion de formularios 
 *//*----------------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule('validation', function(Sb){
    return {
    /*Public Constructor : Inicializa el modulo (Es el que se ejecuta en el schema @modules)*/
        init: function(oParams){
            var forms = oParams.form.split(",");
            $.each(forms,function(index,value){
                var settings = {}, value=$.trim(value);
                for(var prop in yOSON.require[value]) settings[prop]=yOSON.require[value][prop];
                $(value).validate(settings); 
            });
        }
    };
}, ['libs/plugins/jqValidate-min.js','data/validate.js']);
/*--------------------------------------------------------------------------------------------------------
 * @Module     : Accordion
 * @Description: Modulo de efecto accordion
 *//*----------------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule('accordion', function(Sb){
    var st = {
           accordion:".titmov-box",
           targets:".mov-box"
        },
    dom = {},
    THIS=this,
    catchDom= function(){
        dom.accordion = $(st.accordion);
        dom.targets = $(st.targets);
    },
    bindEvents= function(){
        dom.accordion.on("click",animate);
    },
    animate=function(e){
        e.preventDefault();
        var _this=$(this),
            child=_this.data("child") || _this.parent().find(st.targets);
        if(typeof _this.data("child")=="undefined") _this.data("child",child);
        if(_this.hasClass("act")){
            dom.targets.slideUp(800,function(){
                $(this).parent().find(st.accordion).removeClass("act");
            });
            THIS.fn&&THIS.fn(_this);
        }else{
            dom.targets.not(child).slideUp(800,function(){
                $(this).parent().find(st.accordion).removeClass("act");
            });
            child.slideDown(800,function(){
                _this.addClass("act");
                THIS.fn&&THIS.fn(_this);
            });
        }
    };
    THIS.fn=null;
    Sb.events(["cblkAccordion"],function(fn){THIS.fn=fn;},this);
    return{
        init: function(){
            catchDom();
            bindEvents();
        }
    };
});
/*-----------------------------------------------------------------------------------------------
 * @Module: select-certificados
 * @Description: Combo de certificados para agregar el perfil agente
*//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("select-certificados", function(Sb){
    var listCertif = {
            1: {
               img: yOSON.statHost + 'img/elements/certificate-1.png?v='+ yOSON.statVers,
               label: 'Agente certificado'
            },
            2: {
               img: yOSON.statHost + 'img/elements/certificate-3.png?v='+ yOSON.statVers,
               label: 'Agente Mi Vivienda'
            }
        },
        st = {
           cboCertif:'#selCertificacion',
           btnAddCertif: '#addCertif',
           placeCertif: '.certificate-box',
           ctrlMiVivienda: '#control-mivivienda',
           hCertificado: ':input[name=hCertificado]'
        },
    dom = {},
    valuesCertifToSave = [],
    catchDom= function(){
        dom.cboCertif = $(st.cboCertif);
        dom.btnAddCertif = $(st.btnAddCertif);
        dom.placeCertif = $(st.placeCertif);
        dom.ctrlMiVivienda = $(st.ctrlMiVivienda);
        dom.hCertificado = $(st.hCertificado);
    },
    bindEvents= function(){
        dom.cboCertif.on('change',function(e){
            handleBtnAddCertif(false);
            if(this.value){
                if(parseInt(this.value) === 2) {
                    dom.ctrlMiVivienda.removeClass('hide');
                    handleBtnAddCertif(false);
                    
                } else {
                    dom.ctrlMiVivienda.addClass('hide');
                    handleBtnAddCertif(true,{
                       cboValue: this.value,
                       nameFunc: onAddCertif
                    });
                    
                }
            } 
        });
        
        dom.ctrlMiVivienda.find(':input').on('keyup', function(e){
            var $this = $(this);
            handleBtnAddCertif(false);
            
            if($.trim($this.val()) && /^[A-Za-z0-9\-]{0,7}$/i.test($this.val())){
                handleBtnAddCertif(true,{
                    cboValue: 2,
                    nameFunc: onAddCertifMivivienda
                });
            }
        });
        //catchData
        if(dom.hCertificado.val()!==''){
           var values = dom.hCertificado.val(),
               arrayIds = values.split(',');
           
           dom.placeCertif.find('.btn-delete').each(function(i, e){
               $(e).data('id', arrayIds[i]);
           });
        }
        onDeleteCertif();
    },
    handleBtnAddCertif = function(flag, data){
        if(flag){
            dom.btnAddCertif.removeClass('disabled').on('click', {cboValue: data.cboValue}, data.nameFunc);
        } else {
            dom.btnAddCertif.addClass('disabled').off('click');
        }
    },
    onAddCertif = function(e){

        var index = e.data.cboValue,
            $item = $('<div class="item-certif"></div>'),
            $deleteCertif = $('<a class="btn-closebox btn-delete" href="javascript:;"></a>'),
            $img = $('<img/>');
        //remueve el option y ejecuta el primer option por defecto
        dom.cboCertif.find('option[value='+ index +']').remove();
        dom.cboCertif.find(':first-child').attr('selected', 'selected');
        dom.cboCertif.trigger('change');
        //almacena el id de la opcion para cuando identifique la eliminacion
        $deleteCertif.data('id', index);
        $deleteCertif.appendTo($item);
        //se agrega la imagen al item
        $img.attr('src', listCertif[index].img).appendTo($item);
        //el item al lugar para mostrarse el logo
        $item.appendTo(dom.placeCertif);
        //se ordenan los ids del hidden
        orderCertif('add', index);
    },
    orderCertif = function(event, dataId){
        var i = 0,
            dataIdArray = [],
            stringId = '',
            stringDataId = '',
            idDefaultsVal = dom.hCertificado.val();
        
        //métodos para array
        if(idDefaultsVal !== ''){
            dataIdArray = idDefaultsVal.split(',');
        }
        
        var orderActions = {
            'add': function(){
                dataIdArray.push(dataId);
            },
            'remove': function(){
                var indexEl = $.inArray(dataId, dataIdArray);
                dataIdArray.splice(indexEl, 1);
            },
            'order': function(){
                dataIdArray = [];
                for(var j=0;j<dataId.length;j++){
                    dataIdArray.push($(dataId[j]).data('id'));
                }
            },
            'edit': function(){
                dataIdArray = [];
                for(var k=0;k<dataId.length;k++){
                    dataIdArray.push(dataId);
                }
            },
            'default': function(){}
        };
        
        if(orderActions[event]){
            orderActions[event]();
        } else {
            orderActions['default']();
        }
        
        stringDataId = dataIdArray.join(',');
        dom.hCertificado.attr('value', stringDataId);
    },
    onDeleteCertif = function(){
        dom.placeCertif.on('click', '.btn-delete', function(evt){
            evt.preventDefault();
            var $this = $(this),
                $contentItem = $this.parent(),
                dataId = $this.data('id'),
                label = listCertif[dataId].label;
            
            var $option = $('<option value="'+dataId+'">'+label+'</option>');
            $option.appendTo(dom.cboCertif);

            orderCertif('remove', dataId);
            $contentItem.remove();
        });  
    },
    onAddCertifMivivienda = function(e){
        
        var index = e.data.cboValue,
            $item = $('<div class="item-certif post-relt"></div>'),
            $deleteCertif = $('<a class="btn-closebox btn-delete" href="javascript:;"></a>'),
            $elemByConfirm = $('<div class="byconfirm">PENDIENTE<br>DE ACTIVACIÓN</div>'),
            $img = $('<img/>');
        //remueve el option y ejecuta el primer option por defecto
        dom.cboCertif.find('option[value='+ index +']').remove();
        dom.cboCertif.find(':first-child').attr('selected', 'selected');
        dom.cboCertif.trigger('change');
        //almacena el id de la opcion para cuando identifique la eliminacion
        $deleteCertif.data('id', index);
        $deleteCertif.appendTo($item);
        $elemByConfirm.appendTo($item);
        //se agrega la imagen al item
        $img.attr('src', listCertif[index].img).appendTo($item);
        //se inhabilita el campo de serie y se desactiva el agregar
        dom.ctrlMiVivienda.addClass('hide');
        handleBtnAddCertif(false);
        //el item al lugar para mostrarse el logo
        $item.appendTo(dom.placeCertif);
        orderCertif('add', index);
    };
    return{
        init: function(){
            catchDom();
            bindEvents();
        }
    };
});
/*-----------------------------------------------------------------------------------------------
 * @Module: Gallery Slide
 * @Description: Gallery Slide
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("slidejs", function(Sb) {
    var _this=this;
    _this.inst=null;
    Sb.events(["instSlidejs"],function(fn){fn&&fn(_this.inst);},this);
    return {
        init: function(oParams) {
            var slide=oParams.slide,
                obj=oParams.config || {},
                instSlide=$(slide).Slidejs(obj);
            _this.inst=instSlide;
        }
    };
}, ['libs/plugins/jqSlidejs.js']);

/*-----------------------------------------------------------------------------------------------
 * @Module: Order Highlight
 * @Description: Módulo que se emplea para el ordenamiento de destacados
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("order-highlight", function(Sb) {
    var st = {
           wrapper: ".tbl-admin",
           highlight:".tdAcc3 a.highlight",
           whighlight:"#slide-highlight",
           deleted:".btn-closebox"
        },
    htmlhighlight='<div class="box-highlight" style="display:none"><span class="action-icons highlight"></span><span class="text">Destacado en Tienda</span></div>',
    tmplHightL,
    dom = {},
    flagDestq=true, //Flag de destaque
    instSort= null, //Almacena la instancia de SortableJs
    catchDom= function(){
        dom.wrapper = $(st.wrapper);
        dom.whighlight = $(st.whighlight);
    },
    bindEvents= function(){
        sortable();
        dom.wrapper.on("click",st.highlight,highlight);
        dom.whighlight.on("click",st.deleted,function(e){
            e.preventDefault();
            var id=$(this).parents(".mov-ads").attr("data-id");
            $("#ads-"+id).find(st.highlight).trigger("click");
        });
    },
    sortable=function(){
        instSort=$.Sortablejs({
            "el":".mov-ads",
            "close":false,
            "navs":{
                "previous":".sort-nleft",
                "next":".sort-nrigth"
            },
            "input":"#txtHighlight",
            "disable":"disabled"
        });
    },
    highlight=function(e){
        e.preventDefault();
        var THIS=$(this),
            parent=THIS.parents("tr"),
            tpl=_.template(tmplHightL),
            tblTmp,tmp;
        if(flagDestq){
            bloq(true);            
            if(THIS.hasClass("act")){
                parent.find(".box-highlight").fadeOut(600,function(){$(this).remove();});                
                THIS.removeClass("act");
                 Sb.trigger("instSlidejs",[function(inst){
                    var _this=inst,
                        id=parent.attr("id").replace(/[\s\ads-]/g,"");
                    _this.removeElement($(".mov-ads[data-id='"+id+"']"),function(){
                        instSort.refresh();
                        bloq(false);
                    });
                }]);
            }else{
                tblTmp=$(htmlhighlight);
                parent.find(".twAdsagent").append(tblTmp);
                tmp=tpl(parent.data("json")).replace(/[\n\r]/g,"");
                Sb.trigger("instSlidejs",[function(inst){
                    var _this=inst;
                    _this.addElement($(tmp));
                }]);
                instSort.refresh();
                tblTmp.fadeIn(600,function(){bloq(false);});
                THIS.addClass("act");
            }
        }
    },
    bloq=function(cond){
        var dest=$(st.highlight);
        if(cond){
            flagDestq=false;
            dest.addClass("bloq");
        }else{
            flagDestq=true;
            dest.removeClass("bloq");
        }
    };
    return {
        init: function(oParams) {
            tmplHightL=$("#tplAdsHighl").html();
            catchDom();
            bindEvents();
        }
    };
}, ['libs/plugins/jqSortable.js','backbone/libs/underscore/underscore.js']);
/* ----------------------------------------------------------------------------------------------------------
 * @Module     : imagenes-portada-agente
 * @description: Cargador de imágenes de portada del agente
 **//*------------------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule('imagen-agente', function(Sb){
   var st = {
        canvasImages: '.choose-img .here-img',
        hPerfilPhoto: '#hPerfilPhoto',
        formUploader: 'frm-DatosTienda',
        inputfile: '.choose-img #logoUploader',
        btnUploader: '.choose-img #btnUploader',
        target: '.choose-img',
        customFilename: '.choose-img .customfile-filename',
        customButtonUpload: '.choose-img button.customfile-upload',
        limitPhotos: 1,
        countMinPhotos: 1
   },
   dom = {},
   catchDom = function(){
      dom.canvasImages = $(st.canvasImages);
      dom.formUploader = $('#' + st.formUploader);
      dom.inputFile = $(st.inputfile);
      dom.btnUploader = $(st.btnUploader);
      dom.target = $(st.target);
      dom.customFilename = $(st.customFilename);
      dom.customButtonUpload = $(st.customButtonUpload);
      dom.hPerfilPhoto = $(st.hPerfilPhoto);
   },
   bindEvents = function(){
       customInputFile();
       uploaderIframe();
   },
   customInputFile = function(){
        dom.inputFile.customFile({
            classesButton:'btn-small customfile-upload btn-gray',
            classesInput:'hide'
        });
   },
   uploaderIframe = function(){
        var productPath = '',
            extension = '.jpg',
            dataIdOrder = '',
            options = {
                frm: st.formUploader,
                onComplete: function(json){
                    utils.loader(dom.target, false);
                    
                    var json = $.parseJSON(json);
                    
                    dom.formUploader.attr('action', '');
                    dom.formUploader.attr('target', '');
                    
                    if(json.data.state[0] === 0){
                       warn(json.data.msg);
                    } else {
                       $.each(json.data.src, function(index, val){
                           if(json.data.src[index].state == 1){
                               var imgName = json.data.src[index].img;
                               redimensionAndShow(dom.canvasImages, yOSON.baseHost+'elements/tmp/'+ imgName);
                               dom.hPerfilPhoto.val(imgName.split('.')[0]);
                               //dom.canvasImages.html('<img class="preview-img hide" src="'+yOSON.baseHost+'elements/tmp/'+json.data.src[index].img+'"/>');
                               
                           }else{
                                warn(json.data.src[index].msg);
                           }
                       });
                    }
                }
            },
            submitPhotos = function(){
                utils.loader(dom.target, true);

                setTimeout(function(){
                    dom.formUploader.attr('action', yOSON.baseHost+'agentes/mis-datos/upload-image-temporal/amount/1');
                    $.fn.iframeUp('submit', options);
                    dom.inputFile.val('');
                    $(st.customFilename).val('');
                }, 900);
            };
        /* reade file */
        /* verifica si el explorador es compatible con navegadores que soporten el API */
        if(window.File && window.FileReader && window.FileList && window.Blob){
            var $inputFileUploader = document.getElementById('logoUploader');
            //uploader with change
            $inputFileUploader.addEventListener('change',function(event){
                
                var files = event.target.files,
                    flag = false;
                
                if(files.length == 0){
                    warn('Debe seleccionar un archivo');
                    flag = true;
                }else{
                    for(var i=0,f; f = files[i];i++){
                        if(!(/\.(jpg|jpeg|bmp|png|gif)$/i).test(f.name)){ //JPG, JPEG, BMP, PNG, GIF
                            warn(' El tipo de archivo seleccionado no es una imagen');
                            flag = true;
                        }else if(f.size >= 2097152){
                            warn('El tamaño de la Imagen debe ser menor o igual a 2 Mb');
                            flag = true;
                        }
                    }
                    
                }
                if(!flag){
                    submitPhotos();
                }else{
                    dom.inputFile.val('');
                    $('.customfile-filename').val('');
                }
            },false);
        }else{
            dom.inputFile.on('change',function(){
                if(dom.inputFile.val() !== '' && dom.inputFile.val() !== 'undefined'){
                    submitPhotos();  
                }else{
                    warn('Debe de seleccionar un archivo');
                }
            });
        }
   },
   redimensionAndShow = function(targetParent, src){
      var img = new Image()
          /*$img = img,
          factorW = 200,
          factorH = 124,
          thisHeight = $img.height() * (factorW / $img.width()),
          parentHeight = $img.parent().css('height').split('px')[0],
          delta = ((parentHeight - thisHeight)>=0)?(parentHeight - thisHeight):0*/;
  
      img.src = src;
      img.onload = function(){
          var factorW = 200,
              factorH = 124,
              thisHeight = this.height * (factorW / this.width);
 
          if(this.width > this.height && this.width > factorW){
              img.style.height = 'auto'; 
              img.height = 'auto'; 
              img.style.width = factorW + 'px'; 
              img.width = factorW + 'px';
          } else if (this.width <= this.height && this.height > factorH){
              img.style.height= factorH + 'px'; 
              img.height= factorH + 'px'; 
              img.style.width= 'auto'; 
              img.width= 'auto';
          } else {
              img.style.height= this.height; 
              img.height= this.height; 
              img.style.width= this.width; 
              img.width= this.width;
          }
          targetParent.addClass('hide');
          targetParent.html(img);
          targetParent.fadeIn('slow');
      };
   };
   return {
        init: function(oParams){
            catchDom();
            bindEvents();
        },
        destroy: function(){}
    };
}, ['libs/plugins/jqUICore.js','libs/plugins/jqUISortable.js','libs/plugins/jqCustomfile.js','libs/plugins/jqIframeup.js']);
/* ----------------------------------------------------------------------------------------------------------
 * @Module     : imagenes-portada-agente
 * @description: Cargador de imágenes de portada del agente
 **//*------------------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule('imagenes-portada-agente', function(Sb){
    var st = {
        canvasImages: '#uploaderImages',
        formUploader: 'frm-DatosTienda',
        inputfile: '#imageUploader',
        orderPhotos: '#orderPhotos',
        btnUploader: '#btnUploader',
        uploaderLoadingGroup: '#uploaderLoadingGroup',
        customFilename: '.customfile-filename',
        customButtonUpload: 'button.customfile-upload',
        limitPhotos: tmp.limitPhotos,
        countMinPhotos: 4
    },
    dom = {},
    catchDom = function(){
        dom.canvasImages = $(st.canvasImages);
        dom.formUploader = $('#' + st.formUploader);
        dom.inputFile = $(st.inputfile);
        dom.orderPhotos = $(st.orderPhotos);
        dom.btnUploader = $(st.btnUploader);
        dom.uploaderLoadingGroup = $(st.uploaderLoadingGroup);
    },
    bindEvents = function(){
        if(dom.orderPhotos.val() !== ''){
            var defaultValues = dom.orderPhotos.val().split('|');
            st.countMinPhotos = st.countMinPhotos - defaultValues.length;
        }
        customInputFile();
        uploaderIframe();
        sortableGrid();
        deleteImage();
        
    },
    orderPhotos = function(event, dataId){
        var i = 0,
            dataIdArray = [],
            stringId = '',
            stringDataId = '',
            idDefaultsVal = dom.orderPhotos.val();
        
        //métodos para array
        if(idDefaultsVal !== ''){
            dataIdArray = idDefaultsVal.split('|');
        }
        
        var orderActions = {
            'add': function(){
                dataIdArray.push(dataId);
                if(st.limitPhotos === dataIdArray.length){
                    $(st.customButtonUpload)
                        .attr('disabled', 'disabled')
                        .removeClass('btn-urb')
                        .addClass('btn-gray');
                    warn('Solo puede subir un máximo de '+st.limitPhotos+' fotos');
                }
            },
            'remove': function(){
                var indexEl = $.inArray(dataId, dataIdArray);
                dataIdArray.splice(indexEl, 1);
                if(dataIdArray.length === 0){
                    $(st.customFilename).attr('placeholder', 'No se han cargado imágenes');
                }
                if(st.limitPhotos > dataIdArray.length){
                    $(st.customButtonUpload)
                            .removeAttr('disabled')
                            .removeClass('btn-gray')
                            .addClass('btn-urb');
                }
                if(st.limitPhotos > st.countMinPhotos){
                    st.countMinPhotos = st.countMinPhotos + 1;
                }
            },
            'order': function(){
                dataIdArray = [];
                for(var j=0;j<dataId.length;j++){
                    dataIdArray.push($(dataId[j]).attr('data-id'));
                }
            },
            'edit': function(){
                dataIdArray = [];
                for(var k=0;k<dataId.length;k++){
                    dataIdArray.push(dataId);
                }
            },
            'default': function(){}
        };
        
        if(orderActions[event]){
            orderActions[event]();
        } else {
            orderActions['default']();
        }
        
        stringDataId = dataIdArray.join('|');
        dom.orderPhotos.attr('value', stringDataId);
    },
    getId = function(id){
        var dataId = id.split('.');
            return dataId[0];
    },
    customInputFile = function(){
        dom.inputFile.customFile();
    },
    uploaderIframe = function(){
        var productPath = '',
            extension = '.jpg',
            dataIdOrder = '',
            options = {
                frm: st.formUploader,
                onComplete: function(json){
                    dom.uploaderLoadingGroup.fadeOut('slow');
                    var json = $.parseJSON(json);
                    
                    for(var i=0;i<json.data.src.length;i++){
                        st.countMinPhotos--;
                    }
                    
                    dom.formUploader.attr('action', '');
                    dom.formUploader.attr('target', '');
                    
                    if(json.data.state[0] === 0){
                       warn(json.data.msg);
                    } else {
                       
                        for(var index = 0; index < json.data.src.length;index++){
                           var item = json.data.src[index];
                           if(item.state == 1){
                               var dataId = getId(item.img);
                               dom.canvasImages.append(
                                        '<div class="preview" data-id="'+dataId+'"><a class="btn-closebox btn-delete" href="javascript:;"></a>'+
                                        '<span class="imageHolder">'+
                                        '<img class="preview-img" src="'+yOSON.baseHost+'elements/tmp/'+item.img+'" />'+
                                        '</span></div>');
                                orderPhotos('add',dataId);
                           } else {
                               warn(item.msg);
                           }
                       }
                    }
                }
            },
            submitPhotos = function(){
                dom.uploaderLoadingGroup.fadeIn('slow');
                setTimeout(function(){
                    dom.formUploader.attr('action', yOSON.baseHost+'agentes/mis-datos/upload-image-temporal/amount/'+ st.countMinPhotos);
                    $.fn.iframeUp('submit', options);
                    dom.inputFile.val('');
                    $(st.customFilename).val('');
                }, 900);
            },
            /*experimental*/
            dragAndDropFiles = function(callback){
                
            };
            
            /* reade file */
        /* verifica si el explorador es compatible con navegadores que soporten el API */
        if(window.File && window.FileReader && window.FileList && window.Blob){
            var $inputFileUploader = document.getElementById('imageUploader');
            //uploader with change
            $inputFileUploader.addEventListener('change',function(event){
                var files = event.target.files,
                    flag = false;
                if(files.length == 0){
                    warn('Debe seleccionar un archivo');
                    flag = true;
                }else{
                    for(var i=0,f; f = files[i];i++){
                        if(!(/\.(jpg|jpeg|bmp|png|gif)$/i).test(f.name)){ //JPG, JPEG, BMP, PNG, GIF
                            warn('Formato de imagen inválido');
                            flag = true;
                        }else if(f.size >= 2097152){
                            warn('El tamaño de la Imagen debe ser menor o igual a 2 Mb');
                            flag = true;
                        }
                    }
                    
                }
                if(!flag){
                    submitPhotos();
                }else{
                    dom.inputFile.val('');
                    $('.customfile-filename').val('');
                }
            },false);
            // soporte drag and drop  
            //dragAndDropFiles(function(){addBannerMain(200)});
            // -- soporte drag and drop
        }else{
            dom.inputFile.on('change',function(){
                if(dom.inputFile.val() !== '' && dom.inputFile.val() !== 'undefined'){
                    submitPhotos();  
                }else{
                    warn('Debe de seleccionar un archivo');
                }
            });
        }
    },
    deleteImage = function(callback){
        dom.canvasImages.on('click', '.btn-delete', function(evt){
            evt.preventDefault();
            var $this = $(this),
                $contentItem = $this.parent(),
                dataId = getId($contentItem.attr('data-id'));
                
            $contentItem.fadeOut(400, function(){
                $.ajax({
                    type: 'GET',
                    url: yOSON.baseHost+'agentes/mis-datos/delete-image-temporal/id/'+dataId,
                    success: function(json){
                        var json = $.parseJSON(json);
                        if(json.data.state[0] === 1){
                            $contentItem.remove();
                        }
                        
                        callback && callback();
                    }
                });
            });
            orderPhotos('remove', dataId);
        });
    },
    sortableGrid = function(){
        dom.canvasImages.sortable({
            cursor: 'move',
            opacity: 0.5,
            update: function(event, ui){
                orderPhotos('order', dom.canvasImages.children('.preview'));
            }
        });
        
        dom.canvasImages.disableSelection();
    };
    return {
        init: function(oParams){
            catchDom();
            bindEvents();
        },
        destroy: function(){}
    };
}, ['libs/plugins/jqUICore.js','libs/plugins/jqUISortable.js','libs/plugins/jqCustomfile.js','libs/plugins/jqIframeup.js']);
/*-----------------------------------------------------------------------------------------------
 * @Module: Search Highlight
 * @Description: Funcionalidad Buscador de avisos destacados
*//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("search-highlight", function(Sb){
    var st = {
           inpt:"#txtSearch",
           btn:".just-search .btn-urb",
           btndestq: ".btn-destq",
           destq:"#infscroll"
        },
    dom = {},
    catchDom= function(){
        dom.inpt = $(st.inpt);
        dom.btn = $(st.btn);
        dom.btndestq= $(st.btndestq);
        dom.destq=$(st.destq);
    },
    bindEvents= function(){
        dom.btn.on("click",function(e){
            e.preventDefault();
            Sb.trigger("returnInst",[function(inst){
                var _this=inst,
                    settings=_this.settings,
                    ajax=settings.ajax,
                    data;
                ajax["search"]=function(){
                    return dom.inpt.val();
                };
                settings.ajax=ajax;
                data=_this.convertData(settings.ajax);
                data["total"]=methods.numTotal(_this.arquitect.regs.length);
                methods.ajax(settings.url,data,{
                    "success":function(json){
                        $.each(json.data["src"],function(index,value){
                            json.data["src"][index]["path"]=tmp.urlElements;
                        });
                        _this.fetch(json.data["src"],json.extra);
                    },
                    "error":function(){
                        warn("Ocurrió un error en la petición. Inténtelo de nuevo.");
                    }
                });
            }]);
        });
        dom.btndestq.bind("click",function(){
            if(!dom.destq.hasClass("act")){
                dom.destq.trigger("click");
            }
        });
        Sb.trigger("cblkAccordion",[function(el){
            var THIS=el;
            Sb.trigger("returnInst",[function(inst){
                var _this=inst;
                if(THIS.attr("id")=="infscroll"&&THIS.hasClass("act")){
                    _this.stopScroll(false);
                }else{
                    _this.stopScroll(true);
                }
            }]);            
        }]);
    },
    methods={
        ajax:function(url,data,callback){
            var content=$("#wrapper");
            utils.loader(content,true);
            $.ajax({
                "url":url,
                "data":data,
                "dataType":"json",
                "type":"GET",
                "success":function(json){
                    utils.loader(content,false);
                    callback.success&&callback.success(json);
                },
                "error":function(jqXHR,textStatus,errorThrown){
                    utils.loader(content,false);
                    callback.error&&callback.error(jqXHR,textStatus,errorThrown);
                }
            });
        },
        numTotal:function(total){
            var residuo=total%20,
                cociente=(residuo!=0)?((total-residuo)/20)+1:total/20;
            cociente=(cociente==0)?1:cociente;
            return cociente*20;
        }
    };
    return{
        init: function(){
            catchDom();
            bindEvents();
        }
    };
});
/*--------------------------------------------------------------------------------------------------------
 * @Module     : up-price
 * @Description: Subir precio
 *//*----------------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule('up-price', function(Sb){
    var st = {
           chkAdd : '#chkAdd',
           totalPrice : '.total-price span'
        },
    dom = {},
    catchDom= function(){
        dom.chkAdd = $(st.chkAdd);
        dom.totalPrice = $(st.totalPrice);
    },
    bindEvents= function(){
        dom.chkAdd.on('change',upPrice);
    },
    upPrice = function(){
        var total,
            precioExtra = parseFloat(tmp.precioExtra),
            precioBase = parseFloat(tmp.precioBase);
        if(dom.chkAdd.is(':checked')){ 
            total = precioExtra+precioBase;
        }else{
            total = precioBase;
        }
        total = parseFloat(total).toFixed(2);
        dom.totalPrice.text('S/. '+total);
    }
    return{
        init: function(){
            catchDom();
            bindEvents();
        }
    };
});
/*--------------------------------------------------------------------------------------------------------
 * @Module     : show-add-ruc
 * @Description: Mostrar añadir ruc
 *//*----------------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule('show-add-ruc', function(Sb){
    var st = {
            linkNewDoc : '#nuevo-doc',
            selPerfilPago : '#selPerfilPago option',
            radFactura : '#radFactura'
        },
    dom = {},
    catchDom= function(){
        dom.linkNewDoc = $(st.linkNewDoc);
        dom.selPerfilPago = $(st.selPerfilPago);
        dom.radFactura = $(st.radFactura);
    },
    bindEvents= function(){
        dom.radFactura.on('change',afterCatchDom);  
    },
    afterCatchDom = function(){
        if(dom.radFactura.is(':checked')){
            if(dom.selPerfilPago.length <= 1){
                dom.linkNewDoc.trigger('click');        
            }
        }

    }
    return{
        init: function(){
            catchDom();
            bindEvents();
            afterCatchDom();
        }
    };
});
