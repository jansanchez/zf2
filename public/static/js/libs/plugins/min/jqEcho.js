(function(b){var a=[],d=990,c=function(e){var f={id:null,msg:null,lifetime:5000,speed:350,type:"notice",element:"div",themes:{notice:{background:"#F9EDBE",border:"1px solid #E5AD43",color:"#222222",opacity:"0.80",bottom:"50px",left:0,width:"35%"},success:{background:"#dff0d8",border:"1px solid #d6e9c6",color:"#468847",opacity:"0.80",bottom:"20%",left:0,width:"35%"},warn:{background:"#f2dede",border:"1px solid #eed3d7",color:"#b94a48",opacity:"0.80",bottom:"30%",left:0,width:"35%"},debug:{background:"#d9edf7",border:"1px solid #bce8f1",color:"#3a87ad",opacity:"0.80",bottom:"50px",left:0,width:"35%"}},commonStyle:{position:"fixed","font-family":"tahoma, arial, sans-serif","font-size":"12px","line-height":"15px",padding:"8px","word-wrap":"break-word","font-weight":400,"z-index":d},callback:{load:null,unload:null}};this.style=this.style||"";this.el=null;this.$el=null;this.destroyed=0;this.settings=b.extend(f,e);this.init()};c.prototype.construct=function(){var f=this,e=Math.floor(Math.random()*999);if(a.indexOf(e)<0){a.push(e);f.settings.id="echo"+e}else{}};c.prototype.createBox=function(){var e=this;d++;e.el=document.createElement(e.settings.element);e.el.setAttribute("id",e.settings.id);e.el.setAttribute("style",e.getStyle());e.button=document.createElement("button");e.button.setAttribute("style","position: relative;top: -2px;right: 0;line-height: 20px;padding: 0;cursor: pointer;background: transparent;border: 0;color: #000000;float: right;font-size: 18px;font-weight: bold;opacity: 0.3;text-shadow: 0 1px 0 #FFFFFF;");e.button.innerHTML="x";b(e.el).html(e.settings.msg);b(e.el).append(b(e.button));b(e.button).on("click",function(f){e.destroy()});e.$el=b(e.el);b("body").append(e.$el);e.settings.callback.load&&e.settings.callback.load(e);if(e.settings.lifetime!=0){setTimeout(function(){e.destroy()},e.settings.lifetime)}};c.prototype.getStyle=function(){var g=this,f="";for(var e in g.settings.commonStyle){if(g.settings.commonStyle.hasOwnProperty(e)){f+=e+":"+g.settings.commonStyle[e]+";"}}for(var e in g.settings.themes[g.settings.type]){if(g.settings.themes[g.settings.type].hasOwnProperty(e)){f+=e+":"+g.settings.themes[g.settings.type][e]+";"}}g.style=f;return g.style};c.prototype.init=function(){this.construct();this.createBox()};c.prototype.destroy=function(){var e=this;if(e.destroyed==0){e.$el.fadeOut(e.settings.speed,function(){e.$el.empty();e.destroyed=1})}};b.fn.Echo=function(e){if(typeof e=="undefined"||e.constructor==Object){new c(e)}else{b.error("El parámetro proporcionado "+e+" esta mal declarado o no es un objeto")}}})(jQuery);function echo(b,a){if(!a){a=5000}$.fn.Echo({msg:b,type:"notice",lifetime:a})}function debug(b,a){if(!a){a=7000}$.fn.Echo({msg:b,type:"debug",lifetime:a})}function warn(b,a){if(!a){a=5000}$.fn.Echo({msg:b,type:"warn",lifetime:a})}function success(b,a){if(!a){a=5000}$.fn.Echo({msg:b,type:"success",lifetime:a})};