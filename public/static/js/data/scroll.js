var infScroll={
	"#pagos":{
        url:yOSON.baseHost+"application/pagos/ajax",
        tmpl:"#tplTrPaid",
        total:(typeof totalPagos!="undefined")?totalPagos:"",
        ajax:{
            "p1":function(){
                return $("#selPaid").val();
            },
            "p2":function(obj){
                return obj.scroll.current;
            }
        },
        pushclassTag:function(json){
            return json.tdClass;
        }
	},
	"#adsAct":{
        url:yOSON.baseHost+"application/index/ajax-avisos-activos",
        tmpl:"#tplAdsAct",
        total:(typeof totalAvisos!="undefined")?totalAvisos:"",
        ajax:{
            "p1":function(obj){
                return obj.scroll.current;
            }
        }
	},
    "#adsImp":{
        url:yOSON.baseHost+"application/aviso/ajax-avisos-impresos",
        tmpl:"#tplAdsImp",
        total:(typeof totalAvisos!="undefined")?totalAvisos:"",
        ajax:{
            "p1":function(obj){
                return obj.scroll.current;
            }
        }
    },
    "#adsDown":{
        url:yOSON.baseHost+"application/aviso/ajax-avisos-de-baja",
        tmpl:"#tplAdsDown",
        total:(typeof totalAvisos!="undefined")?totalAvisos:"",
        ajax:{
            "p1":function(obj){
                return obj.scroll.current;
            }
        },
        callback:{
            success:function(json){
                $(".check-all").prop('checked', false);
                return json.data["src"];
            }
        }
    },
    "#perfilStore":{
        url:yOSON.baseHost+"mi-cuenta/agentes/avisos-listado-json",
        tmpl:"#tplAdsTienda",
        total:(typeof tmp.cantAds!="undefined")?tmp.cantAds:"",
        stop:true,
        pushidTag:function(json,inst){
            inst.data("json",json);
            return "ads-"+json.id;
        },
        ajax:{
            "page":function(obj){
                return obj.scroll.current;
            }
        },
        callback:{
            preLoad:function(){
                var _this=this,
                    settings=_this.settings,
                    el=_this.el,
                    tmpl=_.template($(settings.tmpl).html()),
                    reg,clase,vwid;
                _.each(tmp.data,function(value){
                    value["path"]=tmp.urlElements;
                    clase=settings.pushclassTag&&settings.pushclassTag(value) || "";
                    reg=$("<"+settings.tag+"/>",{"class":settings.classTag+" "+clase});
                    vwid=settings.pushidTag&&settings.pushidTag(value,reg) || "";
                    if(vwid!="") reg.attr("id",vwid);
                    reg.data("json",value);
                    reg.append(tmpl(value));
                    el.append(reg);
                });
            },
            success:function(json){
                var arr=$("#txtHighlight").val().split(",");
                $.each(json.data["src"],function(index,value){
                    json.data["src"][index]["path"]=tmp.urlElements;
                    json.data["src"][index]["destq"]=($.inArray(value.id,arr)>=0)?true:false;
                });
                return json.data["src"];
            }
        }
    },
    "#adsActAgentes":{
        url:yOSON.baseHost+"agentes/aviso/ajax-avisos-activos",
        tmpl:"#tplAdsAct",
        total:(typeof totalAvisos!="undefined")?totalAvisos:"",
        ajax:{
            "p1":function(obj){
                return obj.scroll.current;
            }
        }
    },
    "#adsDownAgentes":{
        url:yOSON.baseHost+"agentes/aviso/ajax-avisos-inactivos",
        tmpl:"#tplAdsDown",
        total:(typeof totalAvisos!="undefined")?totalAvisos:"",
        ajax:{
            "p1":function(obj){
                return obj.scroll.current;
            }
        },
        callback:{
            success:function(json){
                $(".check-all").prop('checked', false);
                return json.data["src"];
            }
        }
    },
    "#pagosAgentes":{
        url:yOSON.baseHost+"agentes/pagos/ajax",
        tmpl:"#tplTrPaid",
        total:(typeof totalPagos!="undefined")?totalPagos:"",
        ajax:{
            "p1":function(){
                return $("#selPaid").val();
            },
            "p2":function(obj){
                return obj.scroll.current;
            }
        },
        pushclassTag:function(json){
            return json.tdClass;
        }
    } ,
    "#portadaAgente":{
        classTag:".agt-content",
        url:yOSON.baseHost+"agente-inmuebles/tienda-listado-json",
        tmpl:"#tplAgente",
        frecuency:6,
        limit:12,
        total:(typeof totalPagos!="undefined")?totalPagos:24,
        ajax:{
            "page":function(obj){
                return obj.scroll.current;
            }
        },
        pushclassTag:function(json){
            return "grids-4";
        },
        callback:{
            load:function(inst){
                var msnry=$(".box-infoagt").data("masonry");
                if(typeof msnry!="undefined"){
                    msnry.layout();
                    inst.calposition();
                }
            },
            show:function(inst){
                var msnry=$(".box-infoagt").data("masonry");
                if(typeof msnry!="undefined"){
                    msnry.layout();
                }
            },
            success:function(json){
                return json.data["src"];
            }
        }
    }
};