(function($){
	function calCociente(dividendo,divisor){
		return ((dividendo-(dividendo%divisor))/divisor);
	};
	var Slidejs=function(that,options){
		var opt={
			width:"auto", //Ancho total del slider
			height:"auto", //Alto total del slider
			responsive:true, //Activar responsive
			nav:true, //Activar la navegacion
			separate:"auto", //Separacion entre cada banner
			nwidth:"auto", //Ancho de cada banner
			slides:".slids", //Clase de cada banner
			content:"control-slids", //Clase del contenedor de los banner que genera el plugin
			duration:600,
			easing:"",
			callback:{
				start:null,
				complete:null,
				loaded:null
			},
			num:4
		};
		this.settings=$.extend(opt,options);
		this.$this=that;
		this.settings["width"]=(this.settings["width"]=="auto")?that.width():this.settings["width"];
		this.settings["height"]=(this.settings["height"]=="auto")?that.height():this.settings["height"];
		this.settings["initheight"]=this.settings["height"];
		this.settings["totalw"]=0;
		this.arquitect={
			"control-slids":null,
			"slids":[],
			"nav":null
		};
		this.optAnimate={
			"current":0,
			"slide":0,
			"scroll":0,
			"total":0
		};
		this.init();
	};
	Slidejs.prototype.init=function(){
		this.construct();
		this.animate();
		this.settings.callback["loaded"]&&this.settings.callback["loaded"](this);
	};
	Slidejs.prototype.construct=function(){
		var _this=this,
			slides=$(_this.settings.slides,_this.$this),
			maxw=0, //capturar ancho maximo para calcular el separate
			wtotal=0; //ancho total de los slids
		_this.settings["nwidth"]=(_this.settings["nwidth"]=="auto")?slides.outerWidth():_this.settings["nwidth"];
		var settings=_this.settings;
		_this.arquitect["control-slids"]=$("<div />",{"class":settings.content,"css":{"position":"relative"}});
		$(settings.slides,_this.$this).each(function(index,value){
			_this.arquitect["slids"].push($(value));
			maxw=(maxw<=$(value).outerWidth(true))?$(value).outerWidth(true):maxw;
			wtotal=wtotal+$(value).outerWidth(true);
		});
		this.settings["totalw"]=wtotal;
		_this.settings["separate"]=(_this.settings["separate"]=="auto")?(maxw-settings["nwidth"]):_this.settings["separate"];
		$(settings.slides,_this.$this).appendTo(_this.arquitect["control-slids"]);
		_this.arquitect["control-slids"].appendTo(_this.$this);
		if(_this.arquitect.slids.length>0){
			_this.arquitect["control-slids"].css({"width":wtotal,"height":settings["height"]});
		}
		if(settings.nav){
			_this.nav();
		}
	};
	Slidejs.prototype.nav=function(){
		var _this=this,
			settings=_this.settings,
			nav={},
			wscrollbar=0;
		nav["content-slids"]=$("<div />",{"class":"slids-content","style":"display:none"});
		nav["scrollbar"]=$("<div />",{"class":"slids-scrollbar"});
		nav["uiscroll"]=$("<div />",{"class":"slids-uiscroll"});
		nav["navigate"]=$("<div />",{"class":"slids-navs"});
		nav["nav-left"]=$("<a />",{"class":"slids-nleft disabled","title":"Anterior","href":"javascript:;"});
		nav["nav-rigth"]=$("<a />",{"class":"slids-nrigth","title":"Siguiente","href":"javascript:;"});
		_this.$this.append(nav["content-slids"]);
		nav["content-slids"].append(nav["scrollbar"]).append(nav["navigate"]);
		nav["navigate"].append(nav["nav-left"]).append(nav["nav-rigth"]);
		wscrollbar=settings["width"]-nav["navigate"].outerWidth(true);
		nav["scrollbar"].css("width",wscrollbar).append(nav["uiscroll"]);
		settings["height"]=settings["height"]+nav["content-slids"].outerHeight(true);
		if(_this.arquitect.slids.length>0){
			_this.$this.css("height",settings["height"]);
			nav["content-slids"].show();
		}
		_this.arquitect["nav"]=nav;
	};
	Slidejs.prototype.animate=function(){
		var _this=this,
			settings=_this.settings,
			nav=_this.arquitect["nav"],
			flag=true;
		_this.calcSlide();		
		nav["nav-left"].bind("click",function(){
			if(flag&&!$(this).hasClass("disabled")){
				flag=false;
				settings.callback["start"]&&settings.callback["start"]();
				_this.animSlide(_this,0,function(){
					flag=true;
					settings.callback["complete"]&&settings.callback["complete"]();
				});
			}
		});
		nav["nav-rigth"].bind("click",function(){
			if(flag&&!$(this).hasClass("disabled")){
				flag=false;
				settings.callback["start"]&&settings.callback["start"]();
				_this.animSlide(_this,1,function(){
					flag=true;
					settings.callback["complete"]&&settings.callback["complete"]();
				});
			}
		});
	};
	Slidejs.prototype.calcSlide=function(){ //Calcula los parametros para realizar la animacion
		var _this=this,
			nav=_this.arquitect["nav"],
			total=_this.settings["totalw"],
			wdth=_this.settings["width"],
			separate=_this.settings["separate"],
			wnav=_this.settings["nwidth"],
			tmp=0; //Almacena temporalmente el numero de slides que se deben visualizar slide
		tmp=calCociente((wdth+separate),(wnav+separate));
		_this.optAnimate["slide"]=tmp*(wnav+separate);
		_this.optAnimate["total"]=calCociente(total,_this.optAnimate["slide"]);
		_this.optAnimate["scroll"]=Math.round(parseFloat(nav["scrollbar"].width())/(_this.optAnimate["total"]+1));
		/* Temporal */
		if(_this.optAnimate.total==0){
			nav["content-slids"].hide();
			(_this.arquitect.slids.length>0)?_this.$this.css("height",_this.settings["initheight"]):_this.$this.css("height","auto");
		}

		nav["uiscroll"].css("width",_this.optAnimate["scroll"]);
	};
	Slidejs.prototype.animSlide=function(that,opt,callback){ //Funcion que realiza la animación
		var _this=that,
			settings=_this.settings,
			animate=_this.optAnimate,
			nav=_this.arquitect["nav"],
			slide=animate["slide"],
			next=(opt)?animate["current"]+1:animate["current"]-1,
			total=slide*next,
			totalui=(animate["total"]!=next)?(animate["scroll"]*next):(parseFloat(nav["scrollbar"].width())-parseFloat(nav["uiscroll"].css("width")));
		_this.optAnimate["current"]=next;
		_this.showSlide();
		_this.arquitect["control-slids"].animate({
			"left":(total==0)?0:-total
		},settings.duration,settings.easing,function(){
			callback&&callback();
		});
		nav["uiscroll"].animate({
			"left":(totalui==0)?0:totalui
		},settings.duration,settings.easing);
	};
	Slidejs.prototype.showSlide=function(){ //Funcion que realiza la animación
		var _this=this,
			nav=_this.arquitect["nav"],
			total=_this.optAnimate["total"],
			current=_this.optAnimate["current"];
		nav["nav-left"].removeClass("disabled");
		nav["nav-rigth"].removeClass("disabled");
		if(current==total){
			nav["nav-rigth"].addClass("disabled");
		}
		if(current==0){
			nav["nav-left"].addClass("disabled");
		}
	};
	Slidejs.prototype.addElement=function(element,callback){ //Funcion que realiza la animación
		var _this=this,
			settings=_this.settings,
			arquitect=_this.arquitect,
			slides,wtotal=0,maxw=0;
		arquitect["control-slids"].append(element.hide());
		arquitect["slids"].push(element);
		$.each(arquitect["slids"],function(index,value){
			maxw=(maxw<=value.outerWidth(true))?value.outerWidth(true):maxw;
			wtotal=wtotal+value.outerWidth(true);
		});
		_this.settings["totalw"]=wtotal;
		arquitect["control-slids"].css({"width":wtotal,"height":settings["initheight"]});
		//_this.$this.css("height",settings["height"]);			
		slides=$(_this.settings.slides,_this.$this);
		_this.settings["nwidth"]=slides.outerWidth();
		_this.settings["separate"]=maxw-_this.settings["nwidth"];
		element.show(600,function(){
			//arquitect.nav["content-slids"].show();
			_this.calcSlide();
			callback&&callback();
		}); 
	};
	Slidejs.prototype.removeElement=function(element,callback){ //Funcion que realiza la animación
		var _this=this,
			settings=_this.settings,
			arquitect=_this.arquitect,
			slides,wtotal=0,maxw=0;
		element.hide(600,function(){
			element.remove();
			_this.arquitect["slids"]=[];
			slides=$(_this.settings.slides,_this.$this);
			slides.each(function(index,value){
				_this.arquitect["slids"].push($(value));
				maxw=(maxw<=$(value).outerWidth(true))?$(value).outerWidth(true):maxw;
				wtotal=wtotal+$(value).outerWidth(true);
			});
			_this.settings["totalw"]=wtotal;
			_this.settings["nwidth"]=slides.outerWidth();
			_this.settings["separate"]=maxw-_this.settings["nwidth"];
			arquitect["control-slids"].css("width",wtotal);
			if(slides.length<=settings.num){
				arquitect["control-slids"].css("height",settings["initheight"]);
				arquitect.nav["content-slids"].hide();
				if(slides.length==0){
					arquitect["control-slids"].css("height","auto");
					_this.$this.css("height","auto");
				}
			}else{
				_this.$this.css("height",settings["height"]);
			}
			_this.calcSlide();
			callback&&callback();
		});
	};
	$.fn.Slidejs = function( methods ) {
		if(typeof methods=="undefined" || methods.constructor==Object){
			return new Slidejs(this,methods);
		}else{
			$.error( 'El parametro proporcionado ' +  method + ' esta mal declarado o no es un objeto' );
		}
	};
})(jQuery);