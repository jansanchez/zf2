/*----------------------------------------------------------------------------------------------------------
* @name : Peru-Id
* @Dependencias : http://pre.peruid.pe/f/scripts/peruid.js
* @Description : Verifica la la veracidad de inicio de session en Peru-Id
*//*------------------------------------------------------------------------------------------------------*/
document.cookie = 'shopPay=0; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
var _so = {w:(window.top||window), n:'[go_comentarios]', t:1200000, l:document.location.href}
var _sw = function(){var _t=$('#go_comentar');if(_t.hasClass('go_peruid')) _t.click(function(){_so.w.name+=_so.n;});}
if (_so.w.name.indexOf(_so.n)>=0){document.location.href = '#comentarios';_so.w.name = _so.w.name.replace(_so.n,'');}
if(typeof peruid === 'function'){
    var dispatchEvents = {
        debug: true,
        tplLogged: '<div id="bar-account">' +
                        '<div id="welcome">¡Bienvenido, <span>{{USERNAME}} !</span></div>'+
                        '<div class="wrap">'+
                            '<div id="my-account" class="separator">'+
                                '<a href="/micuenta/miperfil#perfil">Mi cuenta</a>'+
                            '</div>' +
                            '<div id="my-credit" class="separator">'+
                                 '<a href="/micuenta/miperfil#credito">Mis créditos</a>'+
                            '</div>' +
                            '<div id="my-purchases" class="separator">'+
                                 '<a href="/micuenta/miperfil#compras">Mis compras</a>'+
                            '</div>' +
                            '<div id="logout">' +
                                '<a href="{{PATHLOGOUT}}">salir</a>'+
                            '</div>' +
                         '</div>' +
                   '</div>',
        tplLogout: "<div id='user-login'>" +
                        "<span><a class='go_peruid' href='{{PATHLOGIN}}'>Ingresa</a><span> o" +
                        "<span><a class='' href='{{PATHREGIST}}'>Regístrate</a></span>" +
                   "</div>",
        1: function(pid, ctx, data){
            var partial = this._parseTpl(this.tplLogged,{ 
                username: data.j.usuario.nombre,
                pathlogout: ctx.path_base + 'logout/' + ctx.path_portal + '?path=/logout'
            });
            pid.remove_modal();
            var $containerAccount = $("#container-account");
            $containerAccount.html(partial);
        },
        3: function(pid, ctx, data){
            this._parseTpl(this.tplLogout,{
                pathlogin: ctx.path_base + 'login/' + ctx.path_portal,
                pathregist: ctx.path_base + 'registro/' + ctx.path_portal + '?' + encodeURIComponent(window.location.pathname)
            });
            pid.remove_modal();
            pid.add_modal();
        },
        4: function(pid, ctx, data){
            //global
            pid.add_modal();
            //step compra
            var $frmComprar = $("form.frm-comprar"),
                $btnComprar = $(".btn-comprar-continuar"),
                $sctNuevoMiembro = $(".nuevo-miembro"),
                loginProcess = function(evt){
                    evt.preventDefault();
                    if($frmComprar.valid()){
                       $fixa.trigger('click');
                    }
                };
            
            if($btnComprar.length && !$sctNuevoMiembro.length){
                var $fixa = $("<a class='go_peruid' style='display:none;'></a>");
                    $fixa.attr({rel:'login',href:ctx.path_base + 'login/'+ ctx.path_portal});
                
                $fixa.insertAfter($btnComprar);
                pid.add_modal($fixa);
                
                $btnComprar.click(loginProcess);
                $frmComprar.submit(loginProcess);
            }
            
        },
        _parseTpl: function(str, data){
            var result = str;
            for(var item in data){
               result = result.replace( new RegExp('{{'+ item.toUpperCase() +'}}'), data[item]); 
            }
            return result;
        }
    };
    var pid = new peruid({
        /*nueva version*/
         path_base: (typeof path_base == 'string') ? path_base : AppWeb.peruID.urlBase ,
         path_receiver:(typeof path_receiver == 'string') ? path_receiver : AppWeb.peruID.urlReceiver,
         path_portal: (typeof path_portal == 'string') ? path_portal : AppWeb.peruID.urlPortal,
         path_proxy: (typeof path_proxy == 'string') ? path_proxy : AppWeb.peruID.urlProxy,
         callback: function(_p){
             var THAT = this;
            if(dispatchEvents.debug){
              //console.log(_p);
            };
            /* Responses:
             * 1 -> onLogged
             * 3 -> onLogout
             * 4 -> onNoLogged
             */
            if(dispatchEvents.hasOwnProperty(_p.code)){
               dispatchEvents[_p.code](pid, this, _p);
            }
         }
    });
}