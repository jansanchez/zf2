/*-----------------------------------------------------------------------------------------------
 * @Module: error-images
 * @Description: Permite poner una imagen por default cuando la imagen no carga
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("box-suscribir", function(Sb){
    var st = {
        suscribir: '#frmSuscribir',
        btnSend: '#sendForm',
        txtEmail:'#txtEmail',
        icoMail : '.ico-mail',
        classAction : 'startAction',
        card : '#card',
        flipCard : '#flipCard',
        backCard : '<div class="back"><p id="successMessages"></p></div>',
        successMessages : '#successMessages',
        successMessagesText : '<span>Gracias</span><span>por</span><span>suscribirse</span>',
        isModernBrowser : false
    },
    dom = {},
    catchDom = function (){
        dom.suscribir = $(st.suscribir);
        dom.btnSend = $(st.btnSend);
        dom.txtEmail = $(st.txtEmail);
        dom.icoMail = $(st.icoMail);
        dom.flipCard = $(st.flipCard);
        dom.card = $(st.card);
    },
    bindEvents = function (){
        if(!browser.msie){
            dom.card.append(st.backCard);
            st.isModernBrowser = true;
        }
        dom.btnSend.on('click',sendSuscription);
    },
    sendSuscription = function (event){
        event.preventDefault();
        var correo = dom.txtEmail.val();
        if(dom.suscribir.valid()){
            $.ajax({
                'url': yOSON.baseHost+'application/index/suscribir-user/p1/'+correo,
                'beforeSend': function(){
                    dom.btnSend.text('Suscribiendome ...');
                },
                'success': function(json){
                    var json = $.parseJSON(json);
                    if(json.data.state == 1){
                        dom.txtEmail.val('');
                         if(st.isModernBrowser){ 
                            dom.flipCard.addClass(st.classAction);
                         }else{
                            dom.card.html('');
                            dom.card.html(st.backCard);
                         }
                        $(st.successMessages).hide().fadeIn('slow').html(st.successMessagesText);
                    }else if(json.data.state == 2){
                        dom.txtEmail.addClass('error').attr('original-title','El correo ya existe.');
                        dom.txtEmail.tipsy({trigger: 'focus',gravity:'w',title:'original-title',fade: true});
                        dom.btnSend.text('Suscribirme');
                    }
                },
                'error': function(){
                    warn('Lo sentimos, se produjo un error en el envío');
                }
            });
        }
    };
    return {
        init: function (){
            catchDom();
            bindEvents();
        }
    }
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
/*-----------------------------------------------------------------------------------------------
 * @Module: link a publica tu Aviso
 * @Description: Añadir link a publica tu Aviso
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("publica", function(Sb){
    var st = {
        publica: '#publica',
        link: yOSON.baseHost+'publica-tu-aviso/'
    },
    dom = {},
    catchDom = function(){
        dom.publica = $(st.publica);
    },
    bindEvents = function(){
        dom.publica.on("click",linkPublica);
    },
    startEvents =  function(){
        dom.publica.attr('href',st.link);
    },
    linkPublica = function (){
        window.location = $(this).attr('href'); 
    };
    return {
        init: function(){
            catchDom();
            bindEvents();
            startEvents();
        }
    };
});


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
    var treeDeps = {},
        conAjax=false;
    return {
        /*Bolean: Existe o no class btn*/
        clsBtn:false,
        /*Public Constructor : Inicializa el modulo (Es el que se ejecuta en el schema @modules)*/
        init: function(oParams){
            var Params=selectDepends[oParams[0]],               
                l=Params.length, i=0, j=1, THIS=this;
            condAjax=(typeof oParams[1]!="undefined")?oParams[1]:condAjax; //Condicional a utilsAjax
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
                },condAjax);
            };
        },
        destroy: function(){ /*Que hacer cuando se destruya la instancia del modulo aca*/ }
    };
},['data/selects.js']);
/*-----------------------------------------------------------------------------------------------
 * @Module: modify-for-location
 * @Description: Al selecionar el combo de localizacion, modifica los avisos segun la localizacion seleccionada
 * @Author: Erik Flores  - @elwerik
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("modify-for-location", function(Sb){
    var st = {
            sltDepartments : '.nav-geo',
            sltTextDepartments : '.geo-depart',
            optDepartments : '.geo-list li a',
            classShowOptions : 'act',
            idDepartment : '',
            urlAjax : yOSON.baseHost+'modify-portada-by-departamento/',
            tplAvisosDestacados: '#tplCuadro',
            addHighlights : '#addHighlights',
            featuredProjects : '#featuredProjects',
            template: null
    },
    dom = {},
    catchDom = function(){
        dom.sltDepartments = $(st.sltDepartments);
        dom.optDepartments = $(st.optDepartments);
        dom.sltTextDepartments = $(st.sltTextDepartments);
        dom.tplAvisosDestacados = $(st.tplAvisosDestacados);
    },
    afterCatchDom = function(){
        st.templateAvisosDestacados = st.templateAvisosDestacados || $.trim(dom.tplAvisosDestacados.html());
    },
    bindEvents = function(){
      dom.sltDepartments.on({
        'mouseenter':showOptions,
        'mouseleave':hideOptions
      });
      dom.optDepartments.on('click',{
        'callback':function(){loadInfo()}
        },selectOption);
    },
    runFunction = function(){
        verifyCarusel();
    },
    showOptions = function(){
        $(this).addClass(st.classShowOptions);
    },
    hideOptions = function(){
        $(this).removeClass(st.classShowOptions);
    },
    selectOption = function(event){
        var valueOption = $(this).text();
        dom.sltTextDepartments.text(valueOption);
        dom.sltDepartments.removeClass(st.classShowOptions);
        st.idDepartment = $(this).attr('id');
        event.data.callback&&event.data.callback();
    },
    verifyCarusel = function(){
        if($(st.addHighlights).hasClass('slide-pagesads')){
            var $controlSlide = $(st.addHighlights).children('div.control-slids');
            $controlSlide.attr('id','addHighlights');
            $(st.addHighlights).removeAttr('id');
        }
    },
    verifyAndExecute = function(oElements,conteiner){
       if(typeof(oElements) != 'undefined'){
            if(oElements.length != 0){
                addHighlights(oElements,conteiner);  
            }   
        }
    },
    addHighlights = function(avisos,conteiner){
        $(conteiner).html('');
        var compiled_template = _.template(st.templateAvisosDestacados);
        $.each(avisos,function(index,item){
            $current = $(compiled_template({'srcImagen': yOSON.baseHost+item.srcImagen+yOSON.statVers,'precio':item.precio,'moneda':item.moneda,'tituloAviso':item.tituloAviso,'hrefImagen':yOSON.baseHost+item.hrefImagen,'transaccion':item.transaccion}));
            $(conteiner).append($current);
        });
    },
    loadInfo = function(){
            $.ajax({
                'url' : st.urlAjax+st.idDepartment+'/'+tmp.portada,
                dataType: 'json',
                success : function(data){
                    verifyAndExecute(data.avisosDestacados,st.addHighlights);
                    verifyAndExecute(data.proyectosDestacados,st.featuredProjects);
                }
            });
    };
    return {
        init : function(oParams){
            catchDom();
            afterCatchDom();
            bindEvents();
            runFunction();
        },
        destroy: function(){}
    };
}, ['backbone/libs/underscore/underscore.js']);

/*-----------------------------------------------------------------------------------------------
 * @Module: formulario-contacto
 * @Description: Manejo de ambos formularios de contacto.
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule('formulario-contacto', function(Sb) {
    var st = {
        frmContactoDerecho: '#frm-contacto-derecho',
        wrpContactoDerecho: '#form-toggle-contacto',
        frmContactoInferior: '#frm-contacto-inferior',
        launchContactaDerecho: '.btn-contact > a.btn-urb, .aside-detail a.btn-urb',
        launchNewCaptcha: '.refreshCode',
        urlNewCaptcha: yOSON.baseHost + 'application/index/refresh',
        validation: {
            derecho: {
                rules: {
                    txtName: {
                        required: true,
                        nombre: true
                    },
                    txtMail: {
                        required: true,
                        email: true
                    },
                    txtPhone: {
                        phone: true,
                        required: true
                    },
                    txtMessage: {
                        required: true,
                        minlength: 20
                    },
                    'captcha[input]': {
                        required: true,
                        minlength: 4,
                        remote: {
                            url: yOSON.baseHost + 'application/index/ajax',
                            data: {
                                'captcha[id]': function() {
                                    return $(st.frmContactoDerecho).find(':input[name^=captcha][type=hidden]').val();
                                },
                                'captcha[input]': function() {
                                    return $(st.frmContactoDerecho).find(':input[name^=captcha][type=text]').val();
                                }
                            },
                            dataFilter: function(data) {
                                var data = $.parseJSON(data);
                                if (data.data.state !== 1) {
                                    renderNewCaptchaForError(dom.frmContactoDerecho, data.data);
                                    return false;
                                }
                                return true;
                            }
                        }
                    }
                },
                messages: {
                    'captcha[input]': {
                        remote: 'ingrese el codigo captcha'
                    }
                },
                submitHandler: function(form) {
                    var $form = $(form);
                    if($form.valid()){
                        $.ajax({
                            method: 'POST',
                            url: $form.attr('action'),
                            data: $form.serialize(),
                            beforeSend: function() {
                                $form.find(':input[type=submit]').attr('disabled', 'disabled');
                            },
                            success: function(data) {
                                $form.find(':input[type=submit]').removeAttr('disabled');
                                var msje = null;
                                if (data.data.state === 1) {
                                    msje = 'Los datos han sido correctamente enviados.';

                                    $form.find("input[type=text], textarea").val("");
                                    $form.validate().resetForm();
                                    
                                    $form.find(st.launchNewCaptcha).trigger('click');
                                    
                                    dom.wrpContactoDerecho.slideUp('slow');
                                } else {
                                    msje = 'Ocurrió un error en el servidor al enviar el mensaje.';
                                }
                                echo(msje);
                            },
                            error: function() {

                            },
                            dataType: 'json'
                        });
                    }
                }
            },
            inferior: {
                rules: {
                    'txtNameInferior': {
                        required: true,
                        nombre: true
                    },
                    txtMailInferior: {
                        required: true,
                        email: true
                    },
                    txtPhoneInferior: {
                        phone: true,
                        required: true
                    },
                    txtMessageInferior: {
                        required: true,
                        minlength: 20
                    },
                    'captchaInferior[input]': {
                        required: true,
                        minlength: 4,
                        remote: {
                            url: yOSON.baseHost + 'application/index/ajax-inferior',
                            data: {
                                'captchaInferior[id]': function() {
                                    return $(st.frmContactoInferior).find(':input[name^=captchaInferior][type=hidden]').val();
                                },
                                'captchaInferior[input]': function() {
                                    return $(st.frmContactoInferior).find(':input[name^=captchaInferior][type=text]').val();
                                }
                            },
                            dataFilter: function(data) {
                                var data = $.parseJSON(data);
                                if (data.data.state !== 1) {
                                    renderNewCaptchaForError(dom.frmContactoInferior, data.data);
                                    return false;
                                }
                                return true;
                            }
                        }
                    }
                },
                messages: {
                    'captchaInferior[input]': {
                        remote: 'ingrese el codigo captcha'
                    }
                },
                submitHandler: function(form) {
                    var $form = $(form);
                    if($form.valid()){
                        $.ajax({
                            method: 'POST',
                            url: $form.attr('action'),
                            data: $form.serialize(),
                            beforeSend: function() {
                                $form.find(':input[type=submit]').attr('disabled', 'disabled');
                            },
                            success: function(data) {
                                $form.find(':input[type=submit]').removeAttr('disabled');
                                var msje = null;

                                if (data.data.state === 1) {
                                    msje = 'Los datos han sido correctamente enviados.';

                                    $form.find("input[type=text], textarea").val("");
                                    $form.validate().resetForm();
                                    
                                    $form.find(st.launchNewCaptcha).trigger('click');

                                } else {
                                    msje = 'Ocurrió un error en el servidor al enviar el mensaje.';
                                }
                                echo(msje);
                            },
                            error: function() {

                            },
                            dataType: 'json'
                        });
                    }
                }
            }
        }
    },
    dom = {},
    catchDom = function() {
        dom.frmContactoDerecho = $(st.frmContactoDerecho);
        dom.frmContactoInferior = $(st.frmContactoInferior);
        dom.launchContactaDerecho = $(st.launchContactaDerecho);
        dom.wrpContactoDerecho = $(st.wrpContactoDerecho);
        dom.launchNewCaptcha = $(st.launchNewCaptcha);
    },
    bindEvents = function() {
        dom.frmContactoDerecho.validate(st.validation.derecho);
        dom.frmContactoInferior.validate(st.validation.inferior);
        dom.launchContactaDerecho.on('click', {clicked: false}, toggleFormderecho);
        dom.launchNewCaptcha.on('click', renderNewCaptcha);
    },
    renderNewCaptcha = function(evt) {
        var $form = $(this).closest('form'),
            $captchaImg = $form.find("img[src^='/captcha/']"),
            $captchaId = $form.find(':input[name^=captcha][type=hidden]'),
            $captchaInput = $form.find(':input[name^=captcha][type=text]');
        
        $.ajax({
            url: st.urlNewCaptcha,
            success: function(data) {
                if (data.data.state === 1) {
                    $captchaImg.attr('src', data.data.src.src);
                    $captchaId.attr('value', data.data.src.id);
                    $captchaInput.val('');
                    $captchaInput.removeAttr('value');
                }
            },
            dataType: 'json'
        });

        evt.preventDefault();
    },
    renderNewCaptchaForError = function($form, src){
       var $captchaImg = $form.find("img[src^='/captcha/']"),
            $captchaId = $form.find(':input[name^=captcha][type=hidden]');

        $captchaImg.attr('src', src.src.src);
        $captchaId.attr('value', src.src.id);
        
        warn("El captcha ingresado no es el correcto");
    },
    toggleFormderecho = function(evt) {
        if (evt.data.clicked) {
            dom.wrpContactoDerecho.slideUp('slow');
            evt.data.clicked = false;
        } else {
            dom.wrpContactoDerecho.slideDown('slow');
            //$(this).parents(".aside").slideUp('slow');
            $(this).parent().slideUp('slow');
            evt.data.clicked = true;
        }
    };
    return {
        init: function() {
            catchDom();
            bindEvents();
        },
        destroy: function() {

        }
    };
}, ['libs/plugins/jqValidate-min.js']);
/*-----------------------------------------------------------------------------------------------
 * @Module: gmaps-ficha-inmueble
 * @Description: Visualizacion del punto de ubicacion del inmueble con los servicios correspondientes.
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule('gmaps-ficha-inmueble', function(Sb) {
    var st = {
        map: 'map',
        lt: latitud,
        lg: longitud,
        zoom: 15,
        nameCheckList: ':input[name=chkPlace]',
        valueSchema: {
            transporte: {
                tags: 'airport,bus_station,transport,subway_station,taxi_stand,train_station',
                icon: 'transporte.png'
            },
            ce: {
                tags: 'library,school,university',
                icon: 'school.png'
            },
            entretenimiento: {
                tags: 'museum,aquarium,art_gallery,amusement_park,bar,bowling_alley,campground,casino,movie_rental,movie_theater,night_club,rv_park,stadium,zoo',
                icon: 'entretenimiento.png'
            },
            salud: {
                tags: 'dentist,doctor,hair_care,gym,health,hospital,insurance_agency,veterinary_care,spa,physiotherapist,beauty_salon',
                icon: 'salud.png'
            },
            servicios: {
                tags: 'accounting,atm,bank,church,city_hall,courthouse,electrician,finance,fire_station,gas_station,general_contractor,laundry,lawyer,local_government_office,locksmith,lodging,moving_company,painter,pharmacy,physiotherapist,plumber,police,post_office,real_estate_agency,roofing_contractor,storage,car_dealer,car_rental,car_repair,car_wash,parking,travel_agency',
                icon: 'servicios.png'
            },
            restAndCafe: {
                tags: 'bakery,cafe,meal_delivery,meal_takeaway,restaurant',
                icon: 'restaurant-cafe.png'
            },
            otros: {
                tags: 'cemetery,embassy,hindu_temple,mosque,place_of_worship,synagogue,park',
                icon: 'otros.png'
            },
            stores: {
                tags: 'home_goods_store,bicycle_store,book_store,clothing_store,convenience_store,department_store,electronics_store,florist,funeral_home,furniture_store,grocery_or_supermarket,hardware_store,jewelry_store,liquor_store,pet_store,shoe_store,shopping_mall,store',
                icon: 'tiendas.png'
            }
        }
    },
    dom = {},
    catchDom = function() {
        dom.objMap = new gMap(st.map, 'places');
        dom.nameCheckList = $(st.nameCheckList);
        dom.markerCluster = null;
    },
    bindEvents = function() {
        //estableciendo características del mapa
        dom.objMap.f({
            zoom: st.zoom,
            lt: st.lt,
            lg: st.lg
        });
        
        dom.objMap.onLoadAsyncLib({
            callback: function() {
                $.getScript(yOSON.statHost + 'js/libs/plugins/markerclusterer-compiled.js' + yOSON.statVers,
                function(){
                   //estableciendo el markerCluster
                   dom.markerCluster = new MarkerClusterer(dom.objMap.mapa());
                   //estableciendo los eventos de los checkboxes
                    dom.nameCheckList.on('click', handleCheck);
                    // inicializando la búsqueda
                    var placeLabels = collectLabelsOfSites();
                    searchPlaces(placeLabels);
               }); 
            }
        });
        
        //estableciendo eventos del mapa
        dom.objMap.evt({
            idle: function(){
                //estableciendo el marker del inmueble
                getMarkerInmueble();
            },
            zoom_changed: function() {
                cleanMarkersAndCluster();

                //nueva busqueda
                var placeLabels = collectLabelsOfSites();
                searchPlaces(placeLabels);
            },
            dragend: function() {
                cleanMarkersAndCluster();

                //nueva busqueda
                var placeLabels = collectLabelsOfSites();
                searchPlaces(placeLabels);
            }
        });

        
    },
    getMarkerInmueble = function() {
        dom.objMap.marker({
            id: 'inmueble',
            title: 'Inmueble XXX',
            lt: st.lt,
            lg: st.lg,
            icon: yOSON.statHost + 'img/icons/inmueble/inmueble.png',
            fixed: true
        });
    },
    handleCheck = function() {
        //reset to center
        resetToCenter();
        //toggle class
        toggleClassCheck(this);
        cleanMarkersAndCluster();
        var placeLabels = collectLabelsOfSites();
        searchPlaces(placeLabels);

    },
    cleanMarkersAndCluster = function() {
        //clear markers from map
        dom.objMap.cleanMarkers();
        //clear marker from cluster
        dom.markerCluster.clearMarkers();

    },
    resetToCenter = function() {
        var ctxMapa = dom.objMap.mapa();
        ctxMapa.setCenter(dom.objMap.latLng(st.lt, st.lg));
        ctxMapa.setZoom(st.zoom);
    },
    toggleClassCheck = function(obj) {
        var $liParent = $(obj).closest('li');
        if ($liParent.hasClass('act')) {
            $liParent.removeClass('act');
        } else {
            $liParent.addClass('act');
        }
    },
    collectLabelsOfSites = function() {
        var checkeds = dom.nameCheckList.map(function(i, e) {
            var value = '',
                    key = $(e).val();

            if ($(e).is(':checked')) {
                value = key;
                st.valueSchema[key]['active'] = true;

            } else {
                st.valueSchema[key]['active'] = false;
                value = 0;
            }

            return value;
        }),
        checkedData = [],
        checkedItems = '',
        valueSchema = null;

        for (var i = 0; i < checkeds.length; i++) {
            if (checkeds[i]) {
                if (st.valueSchema.hasOwnProperty(checkeds[i])) {
                    valueSchema = st.valueSchema[checkeds[i]].tags.toString();
                    checkedItems = valueSchema.split(",");

                    for (var j = 0; j < checkedItems.length; j++) {
                        checkedData.push(checkedItems[j]);
                    }
                }
            }
        }

        return checkedData;
    },
    searchPlaces = function(data) {
        if (data.length) {
            dom.objMap.gplaces({
                radius: '500',
                types: data,
                callback: function(result, status) {
                    if (status === 'OK') {
                        
                        var info = dom.objMap.info();

                        dom.markerCluster.clearMarkers();

                        for (var i = 0; i < result.length; i++) {

                            var icon = _getIconPlace(result[i].types);

                            dom.objMap.marker({
                                id: 'plcs-' + result[i].id,
                                position: result[i].geometry.location,
                                icon: yOSON.statHost + 'img/icons/' + icon,
                                data: result[i],
                                evts: {
                                    click: function(e) {
                                        var m = this.get('map');
                                        info.setContent(this.data.name);
                                        info.open(m, this);
                                    }
                                }
                            });
                            dom.markerCluster.addMarker(dom.objMap.getMarker('plcs-' + result[i].id));
                        }
                    }
                }
            });
        }
    },
    _getIconPlace = function(arrayType) {
        var resultPlaces = null,
            resultIcon = null;
        if(arrayType.length > 0){
            for (var i = 0; i < arrayType.length; i++) {
                if (resultPlaces === null) {
                    resultPlaces = searchPlaceInSchemaPlaces(arrayType[i]);
                }
            }
            resultIcon = st.valueSchema[resultPlaces].icon;
        } else {
            resultIcon = null;
        }
        return resultIcon;
    },
    searchPlaceInSchemaPlaces = function(placeStr) {
        var result = null;
        for (var place in st.valueSchema) {
            if (st.valueSchema[place].active) {
                var places = st.valueSchema[place].tags.toString();

                if (places.indexOf(placeStr) !== -1) {
                    result = place;

                } else if (!result) {
                    result = null;
                }

            }

        }
        return result;
    };
    return {
        init: function() {
            catchDom();
            bindEvents();
        },
        destroy: function() {

        }
    };
}, ['libs/plugins/gmapec.js']);
/*-----------------------------------------------------------------------------------------------
 * @Module: Gallery Slide
 * @Description: Gallery Slide width scroll style
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("gal-slide", function(Sb) {
    return {
        init: function() {
            $(".galproper-slide").Slidejs();
            $(".slide-ads").Slidejs({slides: ".urb-ads"})
            $(".slide-pagesads").Slidejs({slides: ".urb-ads"})
        }
    };
}, ['libs/plugins/jqSlidejs.js']);
/*-----------------------------------------------------------------------------------------------
 * @Module: Slide
 * @Description: Simple slide
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("simple-slide", function(Sb) {
    return {
        init: function() {
            $("#slide-agt").slidesjs({
                width: 940,
                height: 360,
                navigation: {
                    active: false
                },
                play:{
                    auto:true,
                    interval:5000
                }
            });
        }
    };
}, ['libs/plugins/jqSlide.js']);
/*-----------------------------------------------------------------------------------------------
 * @Module: Slideshow Property
 * @Description: Slideshow Property
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("slideshow", function(Sb) {
    var dom = {
        popup: $(".fancy-slid"), //Links que mandan al popup
        gallery: $(".gallery-property img"), //Galeria principal
        video: $(".fancy-vid")
    };
    return {
        init: function() {
            dom.video.each(function(index, value) {
                var val = $(value).attr("href"),
                    expr = val.match(/(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i),
                    url = 'http://gdata.youtube.com/feeds/api/videos/' + encodeURIComponent(expr[3]);
                $.ajax({
                    url: url,
                    data: 'v=2&alt=json&callback=?',
                    type: "GET",
                    cache:false,
                    dataType: "json",
                    success: function(response) {
                        $(value).data("ytb", response.entry.media$group.media$thumbnail[3].url);
                        $(value).append("<img src='" + response.entry.media$group.media$thumbnail[0].url + "' alt='" + response.entry.title.$t + "' width='106' height='80' />");
                    },
                    error: function(request, status, error) {
                        echo('El video solicitado no existe.');
                    }
                });
            });
            dom.popup.on("mouseenter", function() {
                var href = $(this).attr("href");
                href = ($(this).hasClass("fancy-vid")) ? $(this).data("ytb") : href;
                dom.gallery.attr("src", href);
            });

            dom.popup.fancybox({
                openEffect: 'none',
                closeEffect: 'none',
                autoResize: false,
                autoSize: false,
                width: 640,
                height: 480,
                playSpeed: 4000,
                loop:false,
                padding:0,
                fitToView:false,
                helpers: {
                    media: {},
                    title : {
                        type : 'outside'
                    },
                    buttons : {
                        tpl:'<div id="fancybox-buttons"><ul><li><a class="btnPrev" title="Anterior" href="javascript:;"></a></li><li><a class="btnPlay" title="Iniciar Presentación" href="javascript:;"></a></li><li><a class="btnNext" title="Siguiente" href="javascript:;"></a></li></ul></div>',
                        position:'bottom'
                    }
                },
                beforeLoad: function() {
                    var title = '';
                    title += '<span class="fancybox-title">Presentación '+(this.index + 1)+' de '+ this.group.length+'</span>';
                    this.title = title;
                }
            });

        }
    };
}, ['libs/plugins/jqFancybox-min.js', 'libs/plugins/jqFancybox-media.js','libs/plugins/jqFancybox-buttons.js']);
/*-----------------------------------------------------------------------------------------------
 * @Module: frm-denunciar-aviso
 * @Description: Form de denuncia de un aviso
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("frm-denunciar-aviso", function(Sb) {
    var st = {
        launchForm: '.report',
        wrpForm: '#denunciarAviso',
        form: '#denunciarAviso form',
        cancelDenuncia: '#cancel-denuncia'
    },
    dom = {},
            catchDom = function() {
        dom.launchForm = $(st.launchForm);
        dom.form = $(st.form);
        dom.cancelDenuncia = $(st.cancelDenuncia);
    },
            bindEvents = function() {

        dom.launchForm.on('click', function(e) {
            if (!$(this).data('login')) {
                $.fancybox({
                    openEffect: 'elastic',
                    closeEffect: 'fade',
                    href: st.wrpForm,
                    title: '',
                    width: 460,
                    height: 350,
                    scrolling: null,
                    fitToView: false,
                    autoSize: false,
                    beforeLoad: startValidateForm,
                    beforeClose: resetValidateForm
                });
            }
        });
        dom.cancelDenuncia.on('click', function() {
            $.fancybox.close();
        });
    },
            startValidateForm = function() {
        dom.form.find("textarea").val("");
        dom.form.find(":input[type=radio]").removeAttr('checked');
        dom.form.find(":input[type=radio][value=2]").prop('checked', true);
        dom.form.validate({
            rules: {
                radReason: {
                    required: true
                },
                txtDescription: {
                    required: true
                }
            },
            submitHandler: function(form) {
                var $form = $(form);
                $.ajax({
                    method: 'POST',
                    url: $form.attr('action'),
                    data: $form.serialize(),
                    beforeSend: function() {
                        $form.find(':input[type=submit]').attr('disabled', 'disabled');
                    },
                    success: function(data) {
                        $form.find(':input[type=submit]').removeAttr('disabled');
                        var msje = null;
                        if (data.data.state === 1) {
                            msje = 'Los datos han sido correctamente enviados.';

                            $form.find("input[type=radio], textarea").val("");
                            $form.validate().resetForm();
                            $.fancybox.close();

                        } else {
                            msje = 'Ocurrió un error en el servidor al enviar el mensaje.';
                        }
                        echo(msje);
                    },
                    error: function() {
                    },
                    dataType: 'json'
                });
            }
        });
    },
            resetValidateForm = function() {
        dom.form.validate().resetForm();
    };
    return {
        init: function() {
            catchDom();
            bindEvents();
        },
        destroy: function() {
        }
    };
}, ['libs/plugins/jqFancybox-min.js', 'libs/plugins/jqFancybox-media.js', 'libs/plugins/jqValidate-min.js']);
/*-----------------------------------------------------------------------------------------------
 * @Module: msje-add-favorite
 * @Description: Mensaje que se muestra al agregar un inmueble favorito
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("msje-add-favorite", function(Sb) {
    var st = {
        launchForm: '.favorite',
        wrpForm: '#addFavorite',
        form: '#addFavorite form',
        favoriteGray: '.favorite-gray',
        hIdFavorito: '#idFavorito',
        activeClass: 'act',
        shareIconsProperty : '.share-iconsProperty',
        idAvInm : $('#idAvInm').val(),
        requestFavorito: yOSON.baseHost + "application/index/favorito/p1/" 
    },
    dom = {},
    catchDom = function() {
        dom.launchForm = $(st.launchForm);
        dom.form = $(st.form);
        dom.ajaxSendNote = null;
        dom.favoriteGray = $(st.favoriteGray);
        dom.shareIconsProperty = $(st.shareIconsProperty);
    },
    bindEvents = function() {
        dom.launchForm.on('click', function() {
            var $this = $(this);
            if (!$this.data('login')) {
                if (!$this.hasClass(st.activeClass)) {
                    launchModal({

                        success: function(data) {
                            dom.form.data('fid', data.data.src.idf);
                            $.fancybox({
                                openEffect: 'elastic',
                                closeEffect: 'elastic',
                                closeSpeed: 150,
                                href: st.wrpForm,
                                title: '',
                                scrolling: null,
                                fitToView: false,
                                width: 200,
                                height: 400,
                                beforeLoad: renderForm,
                                beforeClose: checkCancel,
                                afterClose: effectFavorito
                            });
                            $this.off('click');
                        },
                        error: function() {
                        }
                    });
                }
            }
        });
    },
    verifyFavoritos = function(){
        if(dom.shareIconsProperty.find('a.favorite.body.act').length == 1){
            $('a.favorite.body.act').css({'position':'relative','left':'0px'});
        };
    },
    effectFavorito = function(){
        dom.launchForm.addClass(st.activeClass);
        $('a.favorite.body.act').css({'position':'relative','left':'0px'});
    },
    launchModal = function(callbacks) {
        $.ajax({
            url: st.requestFavorito+st.idAvInm,
            beforeSend: function(){
                $.fancybox.showLoading();
            },
            success: function(data) {

                if (data.data.state === 1) {
                    callbacks.success && callbacks.success(data);
                }
            },
            error: function() {
                callbacks.error && callbacks.error();
            },
            dataType: 'json'
        });
    },
    renderForm = function() {
        var $idFavorito = dom.form.find(st.hIdFavorito),
                fid = dom.form.data('fid');
        $idFavorito.attr('value', fid);
        dom.form.validate({
            rules: {
                txtDescription: {
                    required: true
                }
            },
            submitHandler: function() {
                dom.ajaxSendNote = $.ajax({
                    url: dom.form.attr('action'),
                    data: dom.form.serialize(),
                    beforeSend: function() {
                        dom.form.find(':input[type=submit]').attr('disabled', 'disabled');
                        dom.form.addClass('procesing');
                    },
                    success: function(data) {
                        dom.form.removeClass('procesing');
                        dom.form.find(':input[type=submit]').removeAttr('disabled');

                        var msje = null;

                        if (data.data.state === 1) {
                            msje = 'Los datos han sido correctamente enviados.';

                            dom.form.find("textarea").val("");
                            dom.form.validate().resetForm();
                            
                            $.fancybox.close();

                        } else {
                            msje = 'Ocurrió un error en el servidor.';
                        }
                        echo(msje);

                    },
                    error: function() {
                        var msje = 'Ocurrió un error en el servidor.';
                        echo(msje);
                    },
                    dataType: 'json'
                });
            }
        });
    },
    checkCancel = function() {
        dom.form.validate().resetForm();
        dom.form.find("input[type=text], textarea").val("");

        if (dom.form.hasClass('procesing')) {
            if (confirm('Desea cancelar el envío?')) {

            }
        }
    };
    return {
        init: function() {
            catchDom();
            verifyFavoritos();
            bindEvents();
        },
        destroy: function() {

        }
    };
}, ['libs/plugins/jqFancybox-min.js', 'libs/plugins/jqFancybox-media.js', 'libs/plugins/jqValidate-min.js']);
/*-----------------------------------------------------------------------------------------------
 * @Module: frm-fancy-enviar-msje
 * @Description: Fancybox para enviar a un amigo
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("frm-fancy-enviar-msje", function(Sb) {
    var st = {
        launchForm: '.mail',
        wrpForm: '#enviarMensaje',
        form: '#enviarMensaje > form',
        cancelEnvio: '#cancel-envio',
        dataDefaultForm: {},
        hasData: false
    },
    dom = {},
    catchDom = function() {
        dom.launchForm = $(st.launchForm);
        dom.cancelEnvio = $(st.cancelEnvio);
        dom.form = $(st.form);
    },
    bindEvents = function() {
        
        /*si tiene data los campos*/
        dom.form.find(':input').each(function(i,e){
            var name = $(e).attr('name'),
                value = $(e).attr('value');
            if (value){
                st.dataDefaultForm[name] = value;
                st.hasData = true;
            }
        });
        /**/
        dom.cancelEnvio.on('click', function() {
            $.fancybox.close();
        });
        
        dom.launchForm.on('click', function(){
           if(!$(this).data('login')){
                $.fancybox({
                    openEffect: 'elastic',
                    closeEffect: 'fade',
                    href: st.wrpForm,
                    title: '',
                    beforeLoad: startValidateForm,
                    beforeClose: resetValidateForm
                });
           } 
        });
    },
    startValidateForm = function() {
        
        if(st.hasData){
            for(var field in st.dataDefaultForm){
                if(st.dataDefaultForm.hasOwnProperty(field)){
                    dom.form.find(':input[name='+ field +']').val(st.dataDefaultForm[field]);
                }
            }
        } 
        
        dom.form.find("input[type=text], textarea").val("");
        
        dom.form.validate({
            rules: {
                txtEmail: {
                    required: true,
                    email: true
                },
                txtYouremail: {
                    required: true,
                    email: true
                },
                txtYourname: {
                    required: true,
                    nombre: true
                },
                txtDescription: {
                    required: true
                }
            },
            submitHandler: function(form) {
                var $form = $(form);
                $.ajax({
                    url: $form.attr('action'),
                    data: $form.serialize(),
                    beforeSend: function() {
                        $form.find(':input[type=submit]').attr('disabled', 'disabled');
                    },
                    success: function(data) {
                        $form.find(':input[type=submit]').removeAttr('disabled');
                        var msje = null;

                        if (data.data.state === 1) {
                            msje = 'Los datos han sido correctamente enviados.';

                            $form.find("input[type=text], textarea").val("");
                            $form.validate().resetForm();
                            $.fancybox.close();

                        } else {
                            msje = 'Ups! verifique bien lo ingresado.';
                        }
                        echo(msje);
                    },
                    error: function() {

                    },
                    dataType: 'json'
                });
            }
        });
    },
    resetValidateForm = function() {
        //dom.form.validate().resetForm();
    };
    return {
        init: function() {
            catchDom();
            bindEvents();
        },
        destroy: function() {
        }
    };
}, ['libs/plugins/jqFancybox-min.js', 'libs/plugins/jqFancybox-media.js', 'libs/plugins/jqValidate-min.js']);
/*----------------------------------------------------------------------------------------------
 * @Module: head flotante Ficha de Inmueble
 * @Description: head flotante Ficha de Inmueble
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("headFloat", function(Sb) {
    var dom = {
        toolbarFixed: $('.toolbar-fixed'),
        footerLimit: $('.fot-decor')
    },
    showHeader = function() {
        dom.toolbarFixed.removeClass('toolbar-fixed');
        dom.toolbarFixed.addClass('toolbar-show');
    },
            hiddenHeader = function() {
        dom.toolbarFixed.addClass('toolbar-fixed');
        dom.toolbarFixed.removeClass('toolbar-show');
    },
            runFloatHeader = function() {
        $(window).on('scroll', function() {
            var position = $(this).scrollTop();
            if (position > 200 && position <= (parseInt(dom.footerLimit.offset().top - 100))) {
                showHeader();
            } else {
                hiddenHeader();
            }
        });
    }
    return {
        init: function() {
            runFloatHeader();
        }
    };
});
/*----------------------------------------------------------------------------------------------
 * @Module: socialNetworkData
 * @Description: Obtener el numero de compartir
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("socialNetworkData", function(Sb) {
    var urlAdd = document.location.href,
            dom = {
        numberFacebook: $('#numberFacebook'),
        numberTwitter: $('#numberTwitter'),
        barMail : $('#barMail'),
        barFavorito : $('#barFavorito'),
        barFacebook : $('#barFacebook'),
        barTwitter: $('#barTwitter')
    },
    facebook = function() {
        var fbParams = {
            'url': 'url',
            'normalizedUrl': 'normalized_url',
            'shareCount': 'share_count',
            'likeCount': 'like_count',
            'commentCount': 'comment_count',
            'totalCount': 'total_count',
            'commentsboxCount': 'commentsbox_count',
            'commentsFbid': 'comments_fbid',
            'clickCount': 'click_count',
            'linkStat': 'link_stat',
            'urlLocation': urlAdd
        },
        fbQueryComplex = "https://graph.facebook.com/fql?q=SELECT " + fbParams.shareCount + " FROM " + fbParams.linkStat + " WHERE url='" + fbParams.urlLocation + "'";
        //shareCount = json.data[0].share_count;
        fbQuerySimple = "http://graph.facebook.com/?id="+fbParams.urlLocation;
        console.log(fbQuerySimple);
        $.ajax({
            url: fbQuerySimple,
            dataType: 'json',
            success: function(json) {
                if(json.shares == undefined){
                    var shareCount = 0;
                }else{
                    shareCount = json.shares;
                }

                barCount = Math.round(shareCount*3/10)+'%';
                dom.numberFacebook.text(shareCount);
                dom.barFacebook.attr('data-width',barCount);
            },error: function(){
                dom.numberFacebook.text('-');
                dom.barFacebook.attr('data-width','0');
            }
        });
    }, // -- facebook
    twitter = function() {
        var twParams = {
            'url': urlAdd
        },
        twQuery = 'http://cdn.api.twitter.com/1/urls/count.json?callback=?&url=' + twParams.url;
        $.getJSON(twQuery, function(json) {
            var countTwitter = json.count,
                barCount = Math.round(countTwitter*3/10)+'%';
            dom.numberTwitter.text(countTwitter);
            dom.barTwitter.attr('data-width',barCount);

        });
    }, // -- twitter
    showBars = function(){
        var $window = $(window),
            positionBars = $('#estadisticas').offset().top-500,
            barMailWidth = dom.barMail.attr('data-width'),
            barFavoritoWidth = dom.barFavorito.attr('data-width'),
            barFacebookWidth = dom.barFacebook.attr('data-width'),
            barTwitterWidth = dom.barTwitter.attr('data-width'),
            positionScroll;
        
        $window.on('scroll.linkTo',function(){
           if($window.scrollTop() >= positionBars){
                dom.barMail.css('width',barMailWidth);
                dom.barFavorito.css('width',barFavoritoWidth);
                dom.barFacebook.css('width',barFacebookWidth);
                dom.barTwitter.css('width',barTwitterWidth);
                showNumbers();
                $(this).off('scroll.linkTo');
           }
        });
    },
    showNumbers = function(){
        var numTotal = 0,
            $numVisit = $('#numVisit'),
            dataNumber = $numVisit.attr('data-number'),
            interval = setInterval(function(){
                
                if(numTotal == dataNumber){
                    clearInterval(interval);
                };
                $numVisit.text(numTotal);
                numTotal++;
            },10);
    },
    browserIE = function(){
        var rv = -1, // Return value assumes failure.
            browser = {};
        if (navigator.appName == 'Microsoft Internet Explorer') {
            browser.ie = true;
            var ua = navigator.userAgent;
            var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.test(ua) != null)
                rv = parseFloat( RegExp.$1 );
        }
        browser.ver = rv
        return browser;
    },
    shareWindow = function(){
        var $twitterButton = $('.twitterButton'),
            $facebookButton = $('.facebookButton'),
            openWindow = function(button){
                button.on('click',function(event){
                    event.preventDefault();
                    if(browserIE().ie == true){
                        window.open(button.attr('data-href'));
                    }else{
                        window.open(button.attr('data-href'),'facebook-share-dialog','width=626,height=436');
                    }
                });
            };
            openWindow($twitterButton);
            openWindow($facebookButton);
    }
    return {
        init: function() {
            if($('#estadisticas').length != 0){
                facebook();
                twitter();
                showBars();
            }
            shareWindow();
        }
    };
});
/* ----------------------------------------------------------------------------------------------------------
 * @Module     : Trigger PeruID
 * @description: Valida la sesion para correr peruID
 **//*------------------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule('session-peruid', function(Sb) {
    var st = {
        bxplBtn: ['#call', '.favorite', '.report'],
        peruidTrgr: '.fbx_login',
        launchPeruIdMas: '.go_peruid:eq(0)',
        launchPeruIdDev: '.pid_Fb:eq(0)' 
    },
    dom={},
    catchDom = function() {
        dom.bxplBtn = $(st.bxplBtn);
        dom.peruidTrgr = $(st.peruidTrgr);
        dom.launchPeruIdMas = $(st.launchPeruIdMas);
        dom.launchPeruIdDev = $(st.launchPeruIdDev);
    },
    bindEvents = function() {
        dom.peruidTrgr.each(function(i, e) {
            $(e).data('login', true);
            $(e).on('click', function(evt) {
                evt.preventDefault();
                if(dom.launchPeruIdMas.length) dom.launchPeruIdMas.attr('data-redirect', $(this).attr('href')).trigger('click');
                if(dom.launchPeruIdDev.length) dom.launchPeruIdDev.trigger('click');
            });
        });
    };
    return{
        init: function() {
            catchDom();
            bindEvents();
        },
        destroy: function() {
        }
    };
});
/*----------------------------------------------------------------------------------------------
 * @Module: ver telefono Ficha de Inmueble
 * @Description: ver telefono Ficha de Inmueble
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("phonebox", function(Sb) {
    var st = {
        call: $('#call')
    },
    seePhone = function() {
        $('#showPhone').on('click', function() {
            $("#hidePhone").fadeIn("slow").removeClass("hide");
            $("#showPhone").hide();
        });
    },
    callMe = function() {
        var $call = st.call;
        $call.one('click', function(e) {
            e.preventDefault();
            $(this).addClass('disable');
        });
    },
    goToLink = function(pos){
        //para ir con smooth scroll al formulario de contactar
        $('.smscroll').scrollWindow({lowPosition:pos});
        //scroll hacia stadisticas
        $('#statistics').scrollWindow({lowPosition:pos});
    };
    return {
        init: function(oParams) {
            var pos=(typeof oParams["pos"]!="undefined")?oParams["pos"]:100;
            seePhone();
            callMe();
            goToLink(pos);
        }
    };

});
/*----------------------------------------------------------------------------------------------
 * @Module: Ads Reviews
 * @Description: Módulo de Valoraciones
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("ads-reviews", function(Sb){
    var _this=this,
        st={
            creviews: '.for-rating', //Init de valoraciones
            stats: '.rate-green', //Barras de estadisticas
            rating: '.circle-rating', //Barra de valoraciones
            reviews: '.hover-rating-details', //Menu de valoraciones
            crating: '.rating-details', //Div que contiene las valoraciones
            rew:'.rnkreviews', //Texto de total de valoraciones
            prom:'.rnkprom' //Texto que indicar el promedio de valoraciones
        },
        dom={
            creviews: $(st.creviews), //Init de valoraciones
            rating:$(st.rating),
            reviews: $(st.reviews), //Menu de valoraciones
            crating:$(st.crating)
        },
		flag=true,
        params={},        
		methods={
            "construct":function(arr){
                var rw;
                arr.each(function(index,value){
                    rw=$(value);
                    rw.data("url",rw.attr("data-url")).data("id",rw.attr("data-id"));
                    rw.removeAttr("data-url").removeAttr("data-id");
                    rw.find(st.rating).data("parent",rw);
                    methods.rstAnimate(value);
                });
            },
			"saveRating":function(inst){
                var clase=inst.attr("class").match(/\s+(rnk[0-9]+)\s*/);
                clase=clase[1];
				inst.data("rating",clase);
				inst.removeClass(clase);
			},
			"getRating":function(inst){                
				inst.addClass(inst.data("rating"));
			},
			"showReviews":function(cond,context){
				if(cond){
					$(st.reviews,context).stop(true,true).slideDown(450,function(){
						methods.animate(context);
					});
				}else{
					$(st.reviews,context).stop(true,true).slideUp(450,function(){
						methods.rstAnimate(context);
					});
				}
			},
			"animate":function(context){
				var vl;
				$(st.stats,context).each(function(index,value){
					vl=$(value);
					vl.stop(true,true).animate({
						"width":vl.data('width')
					},400);
				});
			},
			"rstAnimate":function(context){
				var vl;
                $(st.stats,context).each(function(index,value){
					vl=$(value);
					(typeof vl.data("width")=="undefined")?vl.data("width",vl[0].style.width):"";
					vl.css("width",0);
				});
			},
			"readJson":function(json,score,context){
				for(var index in json.total){
					$(".trating"+index,context).html("("+json.total[index]+")");
				}
				for(var index in json.percent){
					$(st.stats,context).filter(".rating"+index).data("width",json.percent[index]+"%");
				}
				$(st.rew,context).text("("+json.totalValoraciones+" valoraciones)");
				$(st.prom,context).html("Valoración Promedio: "+json.valPromedio);
                $(st.rating,context).removeClass("rnk"+score).addClass("rnk"+Math.round(json.valPromedio));
			}
		};
        _this.bindEvents=function(el,content){
            var _this,score,parent;
            methods.construct(content);
            el.on("mouseenter",function(){
                _this=$(this);
                if(!_this.hasClass("dis")){
                    methods.saveRating(_this);
                }
                methods.showReviews(true,_this.data("parent"));
            }).on("mouseleave",function(){
                _this=$(this);
                if(!_this.hasClass("dis")){
                    methods.getRating(_this);
                }
                methods.showReviews(false,_this.data("parent"));
            });
            dom.rating.find("a").on("click",function(){
                _this=$(this);
                parent=_this.parents(st.rating);
                if(!parent.hasClass("dis")){
                    var crviews=parent.data("parent"),
                        crating=crviews.find(st.crating),
                        url=crviews.data("url"),
                        id=crviews.data("id");
                    score=_this.attr("rel");
                    parent.addClass("dis").addClass("rnk"+score);
                    utils.loader(crating,true,true);
                    utils.ajax({
                        "url":yOSON.baseHost+url+params.pId+"/"+id+"/"+params.pVal+"/"+score,
                        "dataType":"json",
                        success:function(json){
                            methods.readJson(json.src,score,crviews);
                            methods.rstAnimate(crviews);
                            utils.loader(crating,false);
                            methods.animate();
                        },
                        "error":function(){
                            parent.removeClass("dis").removeClass("rnk"+score);
                            methods.getRating(parent);
                            warn("Proceso de votacion fallido. Inténtelo nuevamente")
                            utils.loader(crating,false);
                        }
                    });
                }
            });
        };
        Sb.events(["InstReviews"],function(fn){fn&&fn(_this);},this);
	return {
			init: function(oParams){
                params.pId=oParams["pId"] || "p1";
                params.pVal=oParams["pVal"] || "p2";
                _this.bindEvents(dom.rating,dom.creviews);
			}
	};
});
/*-------------------------------------------------------------------------------------------------
 * @Module: show-popup
 * @Description: modulo para mostrar popup.
 *//*---------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("show-popup", function(Sb){ 
    /* @private */
    var _dom = $('.vbvisa');  /*[  ] se encuebtra eb carrito paso3*/    
    $('.radio .verified').css('cursor', 'pointer');  /*solo para "verified" del paso 3*/
    var _popup = function(pagina, ancho, alto, barras,tit){
        var izquierda = (screen.width)?(screen.width - ancho)/2:100;
        var arriba    = (screen.height)?(screen.height - alto)/2:100;
        var opciones ='toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars='+barras+',resizable=0,width='+ancho+',height='+alto+',left='+izquierda+',top='+arriba+'';
        tit = "nombre_"+ancho+"x"+alto; //alert(typeof(tit)); alert(tit);
        window.open(pagina,tit,opciones);
    };

    /* @public */
    return {
    /*Public Constructor : Inicializa el modulo (Es el que se ejecuta en el schema @modules)*/
        init: function(oParams){
            _dom.bind('click', function(){_popup('http://www.visanet.com.pe/visa.htm', 606, 405, 'no')});
            /*_dom.each(function(i,e){
                log("e -----------------> "); log(e); log($(e).attr('title'));
                $(e).bind('click', function(){_popup('http://www.visanet.com.pe/visa.htm', 606, 405, 'no')}); 
            });*/       
        },
        /*Constructor : Inicializa el modulo (Es el que se ejecuta en el schema @modules).*/
        destroy: function(){ /*Como destruir instacia de este modulo aqui*/ }
    };

});
/*----------------------------------------------------------------------------------------------
 * @Module: Ads Reviews
 * @Description: Módulo de Valoraciones
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("buttons-css3", function(Sb){
    var dom = {
        bgBeach : $('.bg-beach'),
        iconBeach : $('.icon-beach'),
        textBeach :$('.text-beach'),
        bgLand : $('.bg-land'),
        iconLand : $('.icon-land'),
        textLand :$('.text-land'),
        bgTourist : $('.bg-tourist'),
        iconTourist : $('.icon-tourist'),
        textTourist :$('.text-tourist')
    },
    transitionButton = function(conteiner,icon,text,leftpx,rightpx){
        conteiner.on({
            'mouseenter':function(){
                icon.css({'left':leftpx});
                text.css({'right':rightpx});
            },
            'mouseleave':function(){
                icon.css({'left':'0px'});
                text.css({'right':'0px'});
            }
        });
    }
    return {
        init:function(){
            transitionButton(dom.bgBeach,dom.iconBeach,dom.textBeach,'140px','40px');
            transitionButton(dom.bgLand,dom.iconLand,dom.textLand,'150px','45px');
            transitionButton(dom.bgTourist,dom.iconTourist,dom.textTourist,'150px','45px');
        },
        destroy:function(){

        }
    }
});
/*----------------------------------------------------------------------------------------------
 * @Module: Ads Reviews
 * @Description: Módulo de Valoraciones
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("message-ie", function(Sb){
    var bannerBottom = $('<div />').attr({'id':'messageIE'}),
        imgPerson = $('<div />').attr({'id':'imgPerson'}),
        txtIE = $('<p />').attr({'id':'txtIE'}),
        logosBrowser = $('<div />').attr({'id':'logosBrowser'}),
        createBanner = function(){
            $(imgPerson).appendTo(bannerBottom);
            $(txtIE).appendTo(bannerBottom).html('<h2>¡Un momento!</h2><p>Estás usando un navegador muy antiguo. Haz click <a id="happySad" href="http://browsehappy.com/?locale=es" target="_blank">aquí</a> para actualizarlo ya. </p>');
            $(logosBrowser).appendTo(bannerBottom);
            $(bannerBottom).appendTo('#footer'); 
            happySad();
        },
        happySad = function(){
            $('#footer').on({
                mouseenter: function(){
                    $('#imgPerson').css({
                        'backgroundPosition':'-302px -5px',
                        'width':'153px',
                        'height': '158px',
                        'marginTop': '-135px'

                    });
                },
                mouseleave:function(){
                    $('#imgPerson').css({
                        'backgroundPosition':'0px -74px',
                        'width':'153px',
                        'height': '170px',
                        'marginTop': '-66px'
                    });
                }
            },'#happySad');
        },
        browserIE = function(){
            var rv = -1, // Return value assumes failure.
                browser = {};
            if (navigator.appName == 'Microsoft Internet Explorer') {
                browser.ie = true;
                var ua = navigator.userAgent;
                var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                if (re.test(ua) != null)
                    rv = parseFloat( RegExp.$1 );
            }
            browser.ver = rv
            return browser;
        }
        
    return {
        init:function(){
            if(browserIE().ie == true && browserIE().ver < 8){
                createBanner();    
            }
            
        },
        destroy:function(){

        }
    }
});
/*----------------------------------------------------------------------------------------------
 * @Module: almacenar-distritos-por-provincia
 * @Description: Módulo que almacena en una colección los distritos
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("almacenar-distritos-por-provincia", function(Sb){
    var st = {
      selProvincia: '#selProvincia',
      url: yOSON.baseHost + 'ubigeo/distritos-por-provincia/id/'
    },
    dom = {},
    catchDom = function(){
       dom.selProvincia = $(st.selProvincia); 
    },
    bindEvents = function(){
       dom.selProvincia.on('change.storeDistrito', storeDistritos);
    },
    storeDistritos = function(evt){
       var value = $(this).val();
       if( $.trim(value) !== ''){
           $.ajax({
                url: st.url + value,
                success: function(json){
                   var data = $.parseJSON(json),
                       collection = data.data.src;
                   //ejecuta el evento de los combos dependientes
                   Sb.trigger("fillCollectionDistritos",[collection]);
                }
           });
       } else {
           var methods = $('input[name=txtDistrito]').data('methods');
           methods.disable();
           methods.reset();
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
},['libs/plugins/jqGrowingInput.js','libs/plugins/jqTextboxList.js', 'libs/plugins/jqTextboxList.Autocomplete.js']);
/*----------------------------------------------------------------------------------------------
 * @Module: buscador-autocomplete-distrito
 * @Description: Módulo de Autocomplete de distrito
 *//*-------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule("buscador-autocomplete-distrito", function(Sb){
    var st = {
      input: 'input[name=txtDistrito]',
      selProvincia: '#selProvincia'
    },
    dom = {},
    tl = null,
    catchDom = function(){
       dom.input = $(st.input); 
    },
    bindEvents = function(){
       handleVisualSelectedItems();
       //escuchando el evento para el autocomplete
       Sb.events(["fillCollectionDistritos"], fillCollectionDistritos, this);
    },
    handleVisualSelectedItems = function(){
       tl = new $.TextboxList(st.input, {
            unique:true,
            endEditableBit: true,
            bitOptions:{
                box:{
                    addKeys: false
                }
            },
            plugins:{
                autocomplete:{
                    withDisplay: true,
                    mouseInteraction: true,
                    onlyFromValues: true,
                    highlightAll: true,
                    type: 'checkbox',
                    addBtnGlobal: {
                        label:'Agregar'
                    },
                    seeMore:{
                        id:'see-more',
                        target: dom.input.parent(),
                        label: '{n} más'
                    }
                }
            },
            placeholder: false
       });
       
       dom.input.data('methods', tl.plugins['autocomplete']);
       tl.plugins['autocomplete'].disable();
    },
    fillCollectionDistritos = function(collection){
       var filter = _renderCollection(collection);
       tl.plugins['autocomplete'].enable();
       tl.plugins['autocomplete'].setValues(filter);
       tl.plugins['autocomplete'].reset();
    },
    _renderCollection = function(collection){
       //var nCollection = [[0, "a", null, "a"]];
       var nCollection = [];
       for(var i = 0; i < collection.length; i++){
          if(!collection[i][""]){
            var nItem = [];
            for(var item in collection[i]){
               nItem[0] = item;
               nItem[1] = capitalizeWord(collection[i][item]);
               nItem[2] = null;
               nItem[3] = capitalizeWord(collection[i][item]);
            }
            nCollection.push(nItem);
          }
       }
       return nCollection;
    },
    capitalizeWord = function(str){
       return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
    };
    return {
        init: function(){
            catchDom();
            bindEvents();
        },
        destroy: function(){
    
        }
    };
},['libs/plugins/jqGrowingInput.js','libs/plugins/jqTextboxList.js', 'libs/plugins/jqTextboxList.Autocomplete.js']);
/* ----------------------------------------------------------------------------------------------------------
 * @Module     : Infinite Scroll
 * @description: Modulo de Scroll Infinito
 **//*------------------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule('infinite-scroll', function(Sb){
    var _this=this;
    _this.inst=null;
    Sb.events(["InstScroll"],function(fn){fn&&fn(_this.inst);},this);
    return {
        /*Public Constructor : Inicializa el modulo (Es el que se ejecuta en el schema @modules)*/
        init: function(oParams){
            var opt={
                el:".box-infoagt",
                tag:"div",
                btn:".btn-vermas",
                table:false,
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
 * @Module     : Cascading Grid
 * @description: Modulo de ordenamiento de grillas en cascada
 **//*------------------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule('cascading-grid', function(Sb){
    var _this=this;
        _this.inst=null;
    Sb.events(["InstMsnry"],function(fn){fn&&fn(_this.inst);},this);
    return {
        /*Public Constructor : Inicializa el modulo (Es el que se ejecuta en el schema @modules)*/
        init: function(oParams){
            var msnry=$('.box-infoagt').masonry({
                itemSelector:'.agt-content',
                columnWidth:300,
                transitionDuration:0,
                visibleStyle:{display:"block"},
                hiddenStyle:{display:"none"},
                "gutter":20
            });
            _this.inst=msnry.data("masonry");
        }
    };
},['libs/plugins/masonry.js']);
/* ----------------------------------------------------------------------------------------------------------
 * @Module     : Agent List
 * @description: Modulo para la seccion tienda listado
 **//*------------------------------------------------------------------------------------------------------*/
yOSON.AppCore.addModule('agent-list', function(Sb){
    return {
        /*Public Constructor : Inicializa el modulo (Es el que se ejecuta en el schema @modules)*/
        init: function(oParams){
            var msnry,_this;
            Sb.trigger("InstScroll",[function(inst){
                _this=inst;
                _this.settings.callback.render=function(arr){
                    msnry=$(".box-infoagt").data("masonry");
                    if(typeof msnry!="undefined"){
                        msnry.reloadItems();
                        msnry.layout();
                    }
                    Sb.trigger("InstReviews",[function(rws){
                        _this=rws;
                        _this.bindEvents(arr.find(".circle-rating"),arr.find(".for-rating"));
                    }]);
                }
            }]);
        }
    };
},['backbone/libs/underscore/underscore.js','libs/plugins/jqScroll.js','data/scroll.js']);
