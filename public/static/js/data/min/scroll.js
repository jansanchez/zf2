var infScroll={"#pagos":{url:yOSON.baseHost+"application/pagos/ajax",tmpl:"#tplTrPaid",total:(typeof totalPagos!="undefined")?totalPagos:"",ajax:{p1:function(){return $("#selPaid").val()},p2:function(a){return a.scroll.current}},pushclassTag:function(a){return a.tdClass}},"#adsAct":{url:yOSON.baseHost+"application/index/ajax-avisos-activos",tmpl:"#tplAdsAct",total:(typeof totalAvisos!="undefined")?totalAvisos:"",ajax:{p1:function(a){return a.scroll.current}}},"#adsImp":{url:yOSON.baseHost+"application/aviso/ajax-avisos-impresos",tmpl:"#tplAdsImp",total:(typeof totalAvisos!="undefined")?totalAvisos:"",ajax:{p1:function(a){return a.scroll.current}}},"#adsDown":{url:yOSON.baseHost+"application/aviso/ajax-avisos-de-baja",tmpl:"#tplAdsDown",total:(typeof totalAvisos!="undefined")?totalAvisos:"",ajax:{p1:function(a){return a.scroll.current}},callback:{success:function(a){$(".check-all").prop("checked",false);return a.data.src}}},"#perfilStore":{url:yOSON.baseHost+"mi-cuenta/agentes/avisos-listado-json",tmpl:"#tplAdsTienda",total:(typeof tmp.cantAds!="undefined")?tmp.cantAds:"",stop:true,pushidTag:function(a,b){b.data("json",a);return"ads-"+a.id},ajax:{page:function(a){return a.scroll.current}},callback:{preLoad:function(){var g=this,e=g.settings,d=g.el,a=_.template($(e.tmpl).html()),c,f,b;_.each(tmp.data,function(h){h.path=tmp.urlElements;f=e.pushclassTag&&e.pushclassTag(h)||"";c=$("<"+e.tag+"/>",{"class":e.classTag+" "+f});b=e.pushidTag&&e.pushidTag(h,c)||"";if(b!=""){c.attr("id",b)}c.data("json",h);c.append(a(h));d.append(c)})},success:function(b){var a=$("#txtHighlight").val().split(",");$.each(b.data.src,function(c,d){b.data.src[c]["path"]=tmp.urlElements;b.data.src[c]["destq"]=($.inArray(d.id,a)>=0)?true:false});return b.data.src}}},"#adsActAgentes":{url:yOSON.baseHost+"agentes/aviso/ajax-avisos-activos",tmpl:"#tplAdsAct",total:(typeof totalAvisos!="undefined")?totalAvisos:"",ajax:{p1:function(a){return a.scroll.current}}},"#adsDownAgentes":{url:yOSON.baseHost+"agentes/aviso/ajax-avisos-inactivos",tmpl:"#tplAdsDown",total:(typeof totalAvisos!="undefined")?totalAvisos:"",ajax:{p1:function(a){return a.scroll.current}},callback:{success:function(a){$(".check-all").prop("checked",false);return a.data.src}}},"#pagosAgentes":{url:yOSON.baseHost+"agentes/pagos/ajax",tmpl:"#tplTrPaid",total:(typeof totalPagos!="undefined")?totalPagos:"",ajax:{p1:function(){return $("#selPaid").val()},p2:function(a){return a.scroll.current}},pushclassTag:function(a){return a.tdClass}},"#portadaAgente":{classTag:".agt-content",url:yOSON.baseHost+"agente-inmuebles/tienda-listado-json",tmpl:"#tplAgente",frecuency:6,limit:12,total:(typeof totalPagos!="undefined")?totalPagos:24,ajax:{page:function(a){return a.scroll.current}},pushclassTag:function(a){return"grids-4"},callback:{load:function(a){var b=$(".box-infoagt").data("masonry");if(typeof b!="undefined"){b.layout();a.calposition()}},show:function(a){var b=$(".box-infoagt").data("masonry");if(typeof b!="undefined"){b.layout()}},success:function(a){return a.data.src}}}};