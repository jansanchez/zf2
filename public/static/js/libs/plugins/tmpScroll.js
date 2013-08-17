(function($){
	function getBrowser(){var a=uaMatch(navigator.userAgent);var b={};if(a.browser){b[a.browser]=true;b.version=a.version}if(b.chrome){b.webkit=true}else{if(b.webkit){b.safari=true}}return b}function uaMatch(b){b=b.toLowerCase();var a=/(chrome)[ \/]([\w.]+)/.exec(b)||/(webkit)[ \/]([\w.]+)/.exec(b)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(b)||/(msie) ([\w.]+)/.exec(b)||b.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(b)||[];return{browser:a[1]||"",version:a[2]||"0"}};
	function loading(inst,cond){if(cond){inst.addClass("loading")}else{inst.removeClass("loading")}}
	function caldivExc(dividendo,divisor){var residuo=dividendo%divisor;return (residuo!=0)?((dividendo-residuo)/divisor)+1:dividendo/divisor;}
	function caldivMin(dividendo,divisor){var residuo=dividendo%divisor;return (residuo!=0)?(dividendo-residuo)/divisor:dividendo/divisor;}
	var win=$(window),
		htm=$("html")[0],
		browser = getBrowser(),
		selScroll=(browser.webkit)?$("body,document"):$("body,html");

	var Scrollaize=function(that,options){
		var opt={
			el:"",  //Contexto
			tag:"",  //Tag del elemento que se agrega
			btn:"",  //Boton ver mas
			frecuency:10, //Frecuencia en la que se muestra los elementos
			limit:30, //Limite de elementos a mostrar para solicitar una peticion ajax
			delay:400, //Tiempo de demora para mostrar
			stop:false,
			classTag:"", //Clase del elemento que se agrega
			callback:{
				preLoad:null, //Callback al iniciar la animacion -- Queda
				success:null, //Callback de ajax con peticion exitosa
				error:null  //Callback de ajax con error
			},


			

			pushclassTag:null, //Te permite agregar una clase al momento agregarlo al contexto
			pushidTag:null, //Te permite agregar un id al momento de agregarlo al contexto
			url:"", //Url de ajax a consultar
			tmpl:"", //Template a consumir			
			total:60, //Total de elementos existentes			
			partial:true, //Si es true muestra los elementos siguientes, si es false recarga el contexto actualizando los elementos
			ajax:{} //Requiere un json con funciones para obtener los parametros que se le van a enviar al ajax	
			



		};
		this.settings=$.extend(opt,options);
		this.whght=htm.clientHeight; //Alto de la ventana del navegador
		this.btn=$(this.settings.btn); //Boton que añade templates
		this.arquitect={ //Instancia de arquitectura
			regs:null,
			number:0
		};
		/*this.lmtScroll=0; //Limite del scroll
		this.flagAjax=true; //Flag del Ajax
		this.tmpl=null; //Template
		this.el=(this.settings.el!="")?$(this.settings.el):that; //Elemento al que se le añade los templates
		this.limit={};
		this.calcLimit();
		this.scroll={
			flag:true, //Flag de Scroll
			currentScroll:1, //Scroll actual
			totalScroll:caldivExc(this.settings.limit,this.settings.frecuency), //Numero de visitas
			current:1 //Grupo actual
		};
		this.$this=that;*/
		this.init();
		return this;
	};
	Scrollaize.prototype.init=function(){
		this.settings.callback.preLoad&&this.settings.callback.preLoad.call(this);
		this.construct();
		this.scrollize();
		/*this.dispatchScroll();
		this.resize();
		this.scroll.flag=(this.settings.stop)?false:true;
		*/
	};
	Scrollaize.prototype.construct=function(){
		var _this=this,
			el=this.el,
			settings=_this.settings,
			arquitect=_this.arquitect;
		arquitect.regs=$(settings.tag,settings.el);
		arquitect.number=arquitect.regs.length;
		if(arquitect.number<settings.limit){
			_this.btn.hide().data("est",false);
		}
	};

	Scrollaize.prototype.calcLimit=function(){


		var _this=this,
			lmtCur=caldivExc(_this.settings.total,_this.settings.limit),
			lmtCurS=caldivExc((_this.settings.total%_this.settings.limit),_this.settings.frecuency);
		_this.limit={ //Guarda los limites que se deben contemplar para no hacer peticiones innecesarias
			current:(lmtCur!=0)?lmtCur:1,
			currentScroll:(lmtCurS!=0)?lmtCurS:1
		};

	};	
	Scrollaize.prototype.dispatchScroll=function(){
		var _this=this,
			settings=_this.settings,
			scroll=_this.scroll,
			arquitect=_this.arquitect,
			totalE=(settings.frecuency*scroll.currentScroll)+(settings.limit*(scroll.current-1)), //Total de elementos a mostrar
			fix,totalTD,arrTD; //Hack para que funcion se llame una sola vez
		totalE=(totalE>settings.total)?settings.total:totalE;
		(scroll.currentScroll<scroll.totalScroll||(_this.limit.current==_this.scroll.current&&_this.limit.currentScroll==_this.scroll.currentScroll))?_this.btn.hide():_this.btn.show();;
		
		/* Ya se tomo en cuenta */
		if(scroll.currentScroll==1&&scroll.current==1){
			arquitect.regs.not(":lt("+(totalE)+")").find("td").hide();
			_this.calposition();
		}
		/* Fin ya se tomo en cuenta */


		else{
			fix=0;
			arrTD=arquitect.regs.slice(0,totalE).find("td");
			totalTD=arrTD.length;
			arrTD.fadeIn(1000,function(){
				fix=fix+1;
				(fix==totalTD)?_this.calposition():"";
			});
		}
	};
	Scrollaize.prototype.scrollize=function(){
		var _this=this,
			settings=_this.settings,
			top,lmtScroll;

		/* Ya se tomo en cuenta */
		win.on("scroll",function(){
			top=selScroll.scrollTop(),
			lmtScroll=_this.lmtScroll-_this.whght;
			if(top>=lmtScroll&&_this.scroll.flag){
				_this.scroll.flag=false;
				_this.scroll.currentScroll=_this.scroll.currentScroll+1;
				setTimeout(function(){
					_this.dispatchScroll();
				},settings.delay);
			}
		});
		/* Fin ya se tomo en cuenta */

		_this.btn.on("click",function(e){
			e.preventDefault();
			_this.scroll.currentScroll=1;
			_this.scroll.current=_this.scroll.current+1;
			_this.ajax(function(){
				_this.dispatchScroll();
			});
		});
	};
	Scrollaize.prototype.resize=function(){
		/* Se implemento */
		var _this=this;
		win.on("resize",function(){
			_this.whght=htm.clientHeight;
		});
		/* Fin de Se implemento*/
	};
	Scrollaize.prototype.calposition=function(){
		/* Se implemento */

		var _this=this,
			$this=_this.$this,
			lmtScroll=$this.offset().top+$this.height();
		_this.lmtScroll=lmtScroll;
		/* Fin de Se implemento*/

		(_this.scroll.currentScroll<_this.scroll.totalScroll&&!(_this.limit.current==_this.scroll.current&&_this.limit.currentScroll==_this.scroll.currentScroll))?_this.scroll.flag=true:"";


	};
	Scrollaize.prototype.ajax=function(callback){
		var _this=this,
			settings=_this.settings,
			data=_this.convertData(settings.ajax);
		loading(_this.btn,true);
		$.ajax({
			"url":settings.url,
			"data":data,
			"dataType":"json",
			"type":"GET",
			"success":function(json){
				loading(_this.btn,false);
				var result=settings.callback.success&&settings.callback.success(json) || json;
				_this.render(result);
				callback&&callback();
			},
			"error":function(jqXHR,textStatus,errorThrown){
				loading(_this.btn,false);
				settings.callback.error&&settings.callback.error(jqXHR,textStatus,errorThrown);
			}
		});
	};
	Scrollaize.prototype.convertData=function(json){
		var _this=this,
			result={};
		for(var index in json){
			result[index]=json[index]&&json[index](_this);
		}
		return result;
	};
	Scrollaize.prototype.render=function(json){
		var _this=this,
			el=_this.el,
			settings=_this.settings,
			arquitect=_this.arquitect,
			tmp=null,addReg,clase,vwid,cond;
		_this.tmpl=(_this.tmpl==null)?_.template($(settings.tmpl).html()):_this.tmpl;
		if(settings.partial){
			_.each(json,function(value){
				clase=settings.pushclassTag&&settings.pushclassTag(value) || "";
				addReg=$("<"+settings.tag+"/>",{"class":settings.classTag+" "+clase});
				vwid=settings.pushidTag&&settings.pushidTag(value,addReg) || "";
				if(vwid!="") addReg.attr("id",vwid);
				addReg.append(_this.tmpl(value));
				addReg.find("td").hide();
				el.append(addReg);
				tmp=(tmp==null)?addReg:tmp.add(addReg);
			});
		}
		else{
			_.map(_this.arquitect.regs,function(value,key){
				clase=settings.pushclassTag&&settings.pushclassTag(json[key]) || "";
				vwid=settings.pushidTag&&settings.pushidTag(json[key],$(value)) || "";
				cond=$(value).find("td").is(':hidden');
				if(vwid!="") $(value).attr("id",vwid);
				$(value).removeClass().addClass(clase).html(_this.tmpl(json[key]));
				if(cond) $(value).find("td").hide();
			});
			_.each(json.slice(_this.arquitect.regs.length,json.length),function(value){
				clase=settings.pushclassTag&&settings.pushclassTag(value) || "";				
				addReg=$("<"+settings.tag+"/>",{"class":settings.classTag+" "+clase});
				vwid=settings.pushidTag&&settings.pushidTag(value,addReg) || "";
				if(vwid!="") addReg.attr("id",vwid);
				addReg.append(_this.tmpl(value));
				addReg.find("td").hide();
				el.append(addReg);
				tmp=(tmp==null)?addReg:tmp.add(addReg);
			});
		}
		arquitect.regs=arquitect.regs.add(tmp);
		arquitect.number=arquitect.regs.length;
	};
	//Metodos Estaticos
	Scrollaize.prototype.fetch=function(collection,total){
		var _this=this,
			settings=_this.settings,
			arquitect=_this.arquitect,
			stotal=(typeof total!="undefined")?total:settings.total,
			excend=(collection.length<_this.arquitect.regs.length)?true:false,//Excendete
			miss=(collection.length>_this.arquitect.regs.length)?true:false, //Faltante
			cond,clase,vwid;
		_this.tmpl=(_this.tmpl==null)?_.template($(settings.tmpl).html()):_this.tmpl;
		_this.settings.total=stotal;
		_this.calcLimit();		
		_.map(collection,function(value,key){
			if($(_this.arquitect.regs[key]).length>0){
				clase=settings.pushclassTag&&settings.pushclassTag(value) || "";
				vwid=settings.pushidTag&&settings.pushidTag(value,$(_this.arquitect.regs[key])) || "";
				cond=$(_this.arquitect.regs[key]).find("td").is(':hidden');
				if(vwid!="") $(_this.arquitect.regs[key]).attr("id",vwid);
				$(_this.arquitect.regs[key]).removeClass().addClass(clase).html(_this.tmpl(value));
				if(cond) $(_this.arquitect.regs[key]).find("td").hide();
			}
		});
		if(miss){
			_this.scrollReset();
			_this.assing(collection);
		}    
		if(excend){
			_this.arquitect.regs.slice(collection.length,_this.arquitect.regs.length).remove();
			_this.arquitect.regs=_this.arquitect.regs.slice(0,collection.length);
			//_this.scroll.flag=false;
			_this.btn.hide();
			_this.scrollReset();
		}
		_this.calposition();
	};
	Scrollaize.prototype.stopScroll=function(cond){
		var _this=this;		
		if(cond){
			_this.scroll.flag=false;
		}else{
			_this.calposition();
		}
	};

	Scrollaize.prototype.scrollReset=function(){
		var _this=this,
			larquitect=0;
		_.each(_this.arquitect.regs,function(value){
			if(!$(value).find("td").is(':hidden')) larquitect=larquitect+1;
		});
		var	cur=caldivExc(larquitect,_this.settings.limit),
			res=larquitect%_this.settings.limit,
			curScroll=(res==0)?this.scroll.totalScroll:caldivExc(res,_this.settings.frecuency);
		_this.scroll.currentScroll=curScroll; //Scroll actual
		_this.scroll.current=cur; //Grupo actual		
		(_this.scroll.currentScroll<_this.scroll.totalScroll||(_this.limit.current==_this.scroll.current&&_this.limit.currentScroll==_this.scroll.currentScroll))?_this.btn.hide():_this.btn.show();
	};
	Scrollaize.prototype.assing=function(collection){
		var _this=this,
			el=_this.el,
			settings=_this.settings,
			arquitect=_this.arquitect,
			larquitect=_this.arquitect.regs.length,
			lcollection=collection.length,
			range=(caldivExc(larquitect,_this.settings.frecuency)*_this.settings.frecuency)-larquitect,
			tmp=null,addReg,clase,vwid;
		_.map(collection.slice(larquitect,lcollection),function(value,key){
			clase=settings.pushclassTag&&settings.pushclassTag(value) || "";					
			addReg=$("<"+settings.tag+"/>",{"class":settings.classTag+" "+clase});
			vwid=settings.pushidTag&&settings.pushidTag(value,addReg) || "";
			if(vwid!="") addReg.attr("id",vwid);
			addReg.append(_this.tmpl(value));
			if(key>=range) addReg.find("td").hide();
			el.append(addReg);
			tmp=(tmp==null)?addReg:tmp.add(addReg);
		});
		arquitect.regs=arquitect.regs.add(tmp);
		arquitect.number=arquitect.regs.length;
	};
	$.fn.Scrollaize = function( methods ) {
		if(typeof methods=="undefined" || methods.constructor==Object){
			return new Scrollaize(this,methods);
		}else if(typeof methods!="undefined"&&methods.constructor==String){
			Scrollaize[methods].apply( this, Array.prototype.slice.call( arguments, 1 ));
		}else{
			$.error( 'El parametro proporcionado ' +  method + ' esta mal declarado o no es un objeto' );
		}
	};
})(jQuery,_);