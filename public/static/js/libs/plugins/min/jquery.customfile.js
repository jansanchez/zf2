(function(c){var a=typeof c("<input/>")[0].multiple!=="undefined",b=/msie/i.test(navigator.userAgent);c.fn.customFile=function(){return this.each(function(){var e=c(this).addClass("customfile"),f=c('<div class="customfile-wrap">'),h=c('<input type="text" class="customfile-filename" placeholder="No se han cargado Imagenes"/>'),g=c('<button type="button" class="btn-urb customfile-upload">Elige tu imagen</button>'),d=c('<label style="line-height:33px;text-align:center" class="btn-urb customfile-upload" for="'+e[0].id+'">Elige tu imagen</label>');e.css({position:"absolute",left:"-9999px"});f.insertAfter(e).append(e,h,(b?d:g));e.attr("tabIndex",-1);g.attr("tabIndex",-1);g.click(function(){e.focus().click()});e.change(function(){var m=[],n,k;if(a){n=e[0].files;for(var l=0,j=n.length;l<j;l++){m.push(n[l].name)}k=m.join(", ")}else{k=e.val().split("\\").pop()}h.val(k).attr("title",k).focus()});h.on({blur:function(){e.trigger("blur")},keydown:function(i){if(i.which===13){if(!b){e.trigger("click")}}else{if(i.which===8||i.which===46){e.replaceWith(e=e.clone(true));e.trigger("change");h.val("")}else{if(i.which===9){return}else{return false}}}}})})}}(jQuery));