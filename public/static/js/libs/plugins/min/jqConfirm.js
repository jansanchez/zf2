(function(d,c){var a,b;c.templateSettings={interpolate:/\{\{(.+?)\}\}/g};b="<div class='popup-box'>			<h2 class='urb-stitle'>{{title}}</h2>			<p class='control mb30'>{{answer}}</p>			<div class='control'>				<a  class='btn-gray btn-standar' title='No' href='javascript:;'>No</a>     			<a title='Sí' class='btn-urb btn-standar' href='javascript:;'>Sí</a>			</div>		</div>";a=function(e){var f;f={title:"Título",answer:"Preguntas",callback:null};this.settings=d.extend(f,e);this.tmpl=this.render();this.arquitect={};this.rspta=null;this.init()};a.prototype.init=function(){var e;e=this;this.construct();this.events();d.fancybox(this.arquitect.content,{beforeClose:function(){if(e.rspta==null){e.rspta=false}e.settings.callback&&e.settings.callback()}})};a.prototype.construct=function(){var e;e=d(this.tmpl);this.arquitect={content:e,yes:e.find(".btn-urb"),no:e.find(".btn-gray")}};a.prototype.events=function(){var e,f;f=this;e=f.arquitect;e.yes.on("click",function(g){g.preventDefault();f.rspta=true;d.fancybox.close()});e.no.on("click",function(g){g.preventDefault();f.rspta=false;return d.fancybox.close()})};a.prototype.render=function(){var e,f;f=this;e=c.template(b);return e(f.settings)};d.extend({confirm:function(e){new a(e)}})})(jQuery,_);