var browser = (function(){
  var m = (function(ua){
    ua = ua.toLowerCase();
    var chr=/(chrome)[ \/]([\w.]+)/.exec(ua), 
        wbk=/(webkit)[ \/]([\w.]+)/.exec(ua),
        opr=/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua), 
        ie =/(msie) ([\w.]+)/.exec(ua),
        moz=/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua),
        mch=chr||wbk||opr||ie||ua.indexOf("compatible")<0 && moz||[];
    return {brw:mch[1]||"", ver:mch[2]||"0"};
  })(navigator.userAgent), nav={};
  if(m.brw){ nav[m.brw]=true; nav.version=m.ver }
  if(nav.chrome){ nav.webkit=true }else if(nav.webkit){ nav.safari=true }
  return nav;
})();
var Cookie = {
    create: function(name,value,days) {
        if(days){
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }else{ var expires = ""; }
        document.cookie = name+"="+value+expires+"; path=/";
        return this;
    },
    read: function(name){
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++){
            var c = ca[i]; while(c.charAt(0)==' '){ c=c.substring(1,c.length); }
            if(c.indexOf(nameEQ)==0){ return c.substring(nameEQ.length,c.length); }
        } return null;
    },
    del: function(name){
        return this.create(name, "", -1);
    }
};
var utils={
  "concat":function(arr,len){ //Transforma un array de palabras en una cadena y determinas hasta donde se va adjuntar
    var result="",space,lon;
    lon=(arr.length<=len)?arr.length:len;
    for (var i=0;i<lon;i++){
      space=((lon-1)==i)?"":" ";
      if(typeof arr[i]!=="undefined"){
        result=result+arr[i]+space;
      }else{
        break;
      }
    }
    return result;
  },
  "unique":function(){
    return Math.random().toString(36).substr(2);
  },
  "vLetter":function(input,options){
    var opt={
        type:1, //Bindear. Valor 0 destroy
        len:5,
        expr:null
      },
      hash=utils.unique();
    opt=$.extend(opt,options);
    window[hash]=opt.len;
    var valLetter=function(){
      var _this=$(this),
        valor=$.trim(_this.val()),
        result="",space,
        arr;

      if(valor==""){arr=[];}else{arr=(opt.expr==null)?valor.split(/\s+/g):valor.match(opt.expr);}

      if(arr.length>window[hash]){
        _this.val(utils.concat(arr,window[hash]));
      }else if(arr.length==window[hash]&&valor.charAt(valor.length-1)==" "){
        _this.val(utils.concat(arr,window[hash]));
      }
      opt.callback && opt.callback(arr.length,utils.concat(arr,window[hash]),hash);
    },
    valLetter2=function(){
      var _this= $(this);
      setTimeout(function(){
        var valor=$.trim(_this.val()),
          result="",space,arr;

        if(valor==""){arr=[];}else{arr=(opt.expr==null)?valor.split(/\s+/g):valor.match(opt.expr);}

        if(arr.length>window[hash]){
          _this.val(utils.concat(arr,window[hash]));
        }else if(arr.length==window[hash]&&valor.charAt(valor.length-1)==" "){
          _this.val(utils.concat(arr,window[hash]));
        }
        opt.callback && opt.callback(arr.length,utils.concat(arr,window[hash]),hash);
      },300);
    };
    if(opt.type){
      $(input).bind("keyup click",valLetter);
      $(input).bind("paste cut",valLetter2);
    }else{
      $(input).unbind("keyup click",valLetter);
      $(input).unbind("paste cut",valLetter2);
    }
    return hash;
  },
  "vLength":function(input,len,callback){
    $(input).bind("keyup",function(e){
      var _this=$(this),
        valor=_this.val();
      callback&&callback(valor.length);
      if(valor.length>len){
        _this.val(valor.substr(0,len));
      }
    }).bind("paste",function(){
      var _this=$(this);
      setTimeout(function(){
        var valor=_this.val();
        callback&&callback(valor.length);
        if(valor.length>len){
          _this.val(valor.substr(0,len));
        }
      },300);
    });
  },
  "validBlanks":function(str,callback){
    var arr=str.split(" "),space,
        result="";
        acu=0;
    for(var i=0;i<arr.length;i++){
      space=((arr.length-1)==i)?"":" ";
      if(arr[i]!=""){
        acu=0;
        arr[i]=callback&&callback(arr[i]) || arr[i];
        result=result+arr[i]+space;
        acu=acu+1;
      }else{
        acu=acu+1;
        result=(acu<=1)?result+" ":result;
      }
    }
    return result;
  },
  "blockInpLen":function(input,len,cond,callback){
    var dispatch=function(val){
      if(typeof cond!="undefined"&&cond==false){
        var arr=val.split(" ");
        for (var i=0; i<arr.length; i++) {
          arr[i]=(arr[i]!="")?arr[i].substr(0,len):arr[i];
        }
        return utils.concat(arr,arr.length);
      }else{
        return utils.validBlanks(val,function(arr){
          return arr.substr(0,len);
        });
      }
    };
    $(input).bind('keyup', function(e){
      if($.trim(this.value)==''){
        this.value='';
      }else{
        this.value=dispatch(this.value);
      }
      callback&&callback();
    });
  },
  "validAjax":function(json,callback,session){
    var clbk={
      "success":null,
      "error":null
    };
    clbk=$.extend(clbk,callback);
    session=session || false;
    if(parseFloat(json.session.state)||session){
      if(parseFloat(json.data["state"])){
        clbk["success"]&&clbk["success"](json);
      }else{
        clbk["error"]&&clbk["error"](json);
      }
    }else{
      window.location=yOSON.baseHost+json.session["href"];
    }
  },
  "ajax":function(json,session){ /* Funcion a reemplazar por el ajax de jQuery */
    var opt={
        "url":"",
        "dataType":"json"
      },
      clbk={
        "success":json.success,
        "error":json.error
      };
    opt=$.extend(opt,json);
    session=session || false;
    opt.success=function(json,status,jqXHR){
      if(parseFloat(json.session.state)||session){
        if(parseFloat(json.data["state"])){
          clbk.success&&clbk.success(json.data,status,jqXHR);
        }else{
          clbk.error&&clbk.error(json.data,jqXHR,status,error);
        }
      }else{
        window.location=yOSON.baseHost+json.session["href"];
      }      
    };
    $.ajax(opt);
  },
  "loader":function(content,cond,opacity){
    if(cond){
      var opc=(opacity)?" fix":"";
      content.append("<div class='loader"+opc+"'><span></span></div>");
    }else{
      content.find(".loader").remove();
    }
  },
  "resetForm":function(inst){
    $(':input', inst).each(function() {
      var type = this.type;
      var tag = this.tagName.toLowerCase();
      if (type == 'text' || type == 'password' || tag == 'textarea')
          this.value = "";
      else if (type == 'checkbox' || type == 'radio')
          this.checked = false;
      else if (tag == 'select')
          this.selectedIndex = 0;
    });
  }
};