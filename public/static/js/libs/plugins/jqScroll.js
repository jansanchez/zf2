(function($){
	function getBrowser(){var a=uaMatch(navigator.userAgent);var b={};if(a.browser){b[a.browser]=true;b.version=a.version}if(b.chrome){b.webkit=true}else{if(b.webkit){b.safari=true}}return b}function uaMatch(b){b=b.toLowerCase();var a=/(chrome)[ \/]([\w.]+)/.exec(b)||/(webkit)[ \/]([\w.]+)/.exec(b)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(b)||/(msie) ([\w.]+)/.exec(b)||b.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(b)||[];return{browser:a[1]||"",version:a[2]||"0"}};
	function loading(inst,cond){if(cond){inst.addClass("loading")}else{inst.removeClass("loading")}}
	function caldivExc(dividendo,divisor){var residuo=dividendo%divisor;return (residuo!=0)?((dividendo-residuo)/divisor)+1:dividendo/divisor;}
	function caldivMin(dividendo,divisor){var residuo=dividendo%divisor;return (residuo!=0)?(dividendo-residuo)/divisor:dividendo/divisor;}
	function getClass(clase){ return clase.replace(/[\.]/g,' ').replace(/^\s+|\s+$|/g, '');}
	var win=$(window),
		htm=$("html")[0],
		browser = getBrowser(),
		selScroll=(browser.webkit)?$("body,document"):$("body,html");

	var Scrollaize=function(that,options){
		var opt={
			el:"",  //Contexto
			tag:"",  //Tag del elemento que se agrega
			classTag:"", //Clase del elemento que se agrega
			pushclassTag:null, //Te permite agregar una clase al momento agregarlo al contexto
			pushidTag:null, //Te permite agregar un id al momento de agregarlo al contexto
			btn:"",  //Boton ver mas
			url:"", //Url de ajax a consultar
			tmpl:"", //Template a consumir
			delay:400, //Tiempo de demora para mostrar
			total:60, //Total de elementos existentes
			frecuency:10, //Frecuencia en la que se muestra los elementos
			partial:true, //Si es true muestra los elementos siguientes, si es false recarga el contexto actualizando los elementos
			limit:30, //Limite de elementos a mostrar para solicitar una peticion ajax
			ajax:{}, //Requiere un json con funciones para obtener los parametros que se le van a enviar al ajax
			table:true, //Flag de table
			callback:{
				preLoad:null, //Callback al iniciar la animacion
				load:null,    //Callback cuando se termino de hacer la renderizcion del plugin
				show:null,		//Callback cuando se muestra Avisos
				success:null, //Callback de ajax con peticion exitosa
				render:null,  //Callback cuando se renderiza los elements despues del ajax
				error:null  //Callback de ajax con error
			},
			stop:false
		};
		this.settings=$.extend(opt,options);
		this.lmtScroll=0; //Limite del scroll
		this.whght=htm.clientHeight; //Alto de la ventana
		this.flagAjax=true; //Flag del Ajax
		this.tmpl=null; //Template
		this.el=(this.settings.el!="")?$(this.settings.el):that; //Elemento al que se le añade los templates
		this.btn=$(this.settings.btn); //Boton que añade templates
		this.arquitect={
			regs:null,
			number:0
		};
		this.limit={};		
		this.scroll={
			flag:true, //Flag de Scroll
			currentScroll:1, //Scroll actual
			totalScroll:caldivExc(this.settings.limit,this.settings.frecuency), //Numero de visitas
			current:1 //Grupo actual
		};
		this.calcLimit();
		this.$this=that;
		this.init();
		return this;
	};
	Scrollaize.prototype.init=function(){
		this.settings.callback.preLoad&&this.settings.callback.preLoad.call(this);
		this.construct();
		this.dispatchScroll();
		this.resize();
		this.scroll.flag=(/*this.arquitect.number==this.settings.total||*/this.settings.stop)?false:true;
		this.scrollize();
		this.settings.callback.load&&this.settings.callback.load(this);
	};
	Scrollaize.prototype.calcLimit=function(){
		var _this=this,
			lmtCur=caldivExc(_this.settings.total,_this.settings.limit),
			lmtCurS=caldivExc((_this.settings.total%_this.settings.limit),_this.settings.frecuency);
		_this.limit={ //Guarda los limites que se deben contemplar para no hacer peticiones innecesarias
			current:(lmtCur!=0)?lmtCur:1,
			currentScroll:(lmtCurS!=0)?lmtCurS:_this.scroll.totalScroll
		};;
	};
	Scrollaize.prototype.construct=function(){
		var _this=this,
			el=this.el,
			settings=_this.settings,
			arquitect=_this.arquitect;
		arquitect.regs=$(settings.tag+settings.classTag,el);
		arquitect.number=arquitect.regs.length;
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
		if(scroll.currentScroll==1&&scroll.current==1){
			if(settings.table){
				arquitect.regs.not(":lt("+(totalE)+")").find("td").hide();
			}else{
				arquitect.regs.not(":lt("+(totalE)+")").hide();
			}
			_this.calposition();
		}else{			
			fix=0;
			arrTD=(settings.table)?arquitect.regs.slice(0,totalE).find("td"):arquitect.regs.slice(0,totalE);
			totalTD=arrTD.length;
			arrTD.each(function(index,value){
				$(value).fadeIn(1000,function(){
					fix=fix+1;				
					if(fix==totalTD){
						_this.calposition();
					}
				});
				_this.settings.callback.show&&_this.settings.callback.show(_this);
			});
			/*arrTD.fadeIn(1000,function(){
				fix=fix+1;
				if(fix==totalTD){					
					_this.calposition();
				}
			});
			_this.settings.callback.show&&_this.settings.callback.show(_this);*/
		}
	};
	Scrollaize.prototype.scrollize=function(){
		var _this=this,
			settings=_this.settings,
			top,lmtScroll;

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
		var _this=this;
		win.on("resize",function(){
			_this.whght=htm.clientHeight;
		});
	};
	Scrollaize.prototype.calposition=function(){
		var _this=this,
			$this=_this.$this,
			lmtScroll=$this.offset().top+$this.height();
		_this.lmtScroll=lmtScroll;
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
			classT=getClass(settings.classTag),
			tmp=null,addReg,clase,vwid,cond;
		_this.tmpl=(_this.tmpl==null)?_.template($(settings.tmpl).html()):_this.tmpl;
		if(settings.partial){
			_.each(json,function(value){
				clase=settings.pushclassTag&&settings.pushclassTag(value) || "";
				addReg=$("<"+settings.tag+"/>",{"class":classT+" "+clase});
				vwid=settings.pushidTag&&settings.pushidTag(value,addReg) || "";
				if(vwid!="") addReg.attr("id",vwid);
				addReg.append(_this.tmpl(value));
				(settings.table)?addReg.find("td").hide():addReg.hide();
				el.append(addReg);
				tmp=(tmp==null)?addReg:tmp.add(addReg);
			});
		}
		else{
			_.map(_this.arquitect.regs,function(value,key){
				clase=settings.pushclassTag&&settings.pushclassTag(json[key]) || "";
				vwid=settings.pushidTag&&settings.pushidTag(json[key],$(value)) || "";
				cond=(settings.table)?$(value).find("td").is(':hidden'):$(value).is(':hidden');
				if(vwid!="") $(value).attr("id",vwid);
				$(value).removeClass().addClass(clase).html(_this.tmpl(json[key]));
				if(cond){
					(settings.table)?$(value).find("td").hide():$(value).hide();
				}
			});
			_.each(json.slice(_this.arquitect.regs.length,json.length),function(value){
				clase=settings.pushclassTag&&settings.pushclassTag(value) || "";				
				addReg=$("<"+settings.tag+"/>",{"class":classT+" "+clase});
				vwid=settings.pushidTag&&settings.pushidTag(value,addReg) || "";
				if(vwid!="") addReg.attr("id",vwid);
				addReg.append(_this.tmpl(value));
				(settings.table)?addReg.find("td").hide():addReg.hide();
				el.append(addReg);
				tmp=(tmp==null)?addReg:tmp.add(addReg);
			});
		}		
		arquitect.regs=arquitect.regs.add(tmp);
		arquitect.number=arquitect.regs.length;
		settings.callback.render&&settings.callback.render(tmp);
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
				cond=(settings.table)?$(_this.arquitect.regs[key]).find("td").is(':hidden'):$(_this.arquitect.regs[key]).is(':hidden');
				if(vwid!="") $(_this.arquitect.regs[key]).attr("id",vwid);
				$(_this.arquitect.regs[key]).removeClass().addClass(clase).html(_this.tmpl(value));
				if(cond){
					(settings.table)?$(_this.arquitect.regs[key]).find("td").hide():$(_this.arquitect.regs[key]).hide();
				}
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
			settings=_this.settings,
			larquitect=0,
			tmp;
		_.each(_this.arquitect.regs,function(value){
			tmp=(settings.table)?$(value).find("td").is(':hidden'):$(value).is(':hidden');
			if(!tmp) larquitect=larquitect+1;
		});
		var	cur=caldivExc(larquitect,_this.settings.limit),
			res=larquitect%_this.settings.limit,
			curScroll;
		if(res==0){
			curScroll=(larquitect==0)?1:_this.scroll.totalScroll;
		}else{
			curScroll=caldivExc(res,_this.settings.frecuency);
		}
		_this.scroll.currentScroll=curScroll; //Scroll actual
		_this.scroll.current=(cur==0)?1:cur; //Grupo actual
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
			classT=getClass(settings.classTag),
			tmp=null,addReg,clase,vwid;
		range=(range==0)?_this.settings.frecuency:range;
		_.map(collection.slice(larquitect,lcollection),function(value,key){
			clase=settings.pushclassTag&&settings.pushclassTag(value) || "";					
			addReg=$("<"+settings.tag+"/>",{"class":classT+" "+clase});
			vwid=settings.pushidTag&&settings.pushidTag(value,addReg) || "";
			if(vwid!="") addReg.attr("id",vwid);
			addReg.append(_this.tmpl(value));
			if(key>=range){
				(settings.table)?addReg.find("td").hide():addReg.hide();
			}
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