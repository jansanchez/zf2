/*
Script: TextboxList.Autocomplete.js
	TextboxList Autocomplete plugin

	Authors:
		Guillermo Rauch
	
	Note:
		TextboxList is not priceless for commercial use. See <http://devthought.com/projects/jquery/textboxlist/>
		Purchase to remove this message.
*/
(function(){
	
$.TextboxList.Autocomplete = function(textboxlist, _options){
	
  var index = [], 
      prefix, 
      method, 
      container, 
      list, 
      values = [], 
      searchValues = [], 
      results = [],
      btnGlobal,
      placeholder = false, 
      current, 
      currentInput, 
      hidetimer, 
      doAdd, 
      currentSearch,
      inputDisplay,
      ruler,
      currentRequest;
      
  var options = $.extend(true, {
		minLength: 1,
		maxResults: 10,
		insensitive: true,
		highlight: true,
		highlightAll: false,
		highlightSelector: null,
		mouseInteraction: true,
		onlyFromValues: false,
		queryRemote: false,
                remote: {
			url: '',
			param: 'search',
			extraParams: {},
			loadPlaceholder: 'Please wait...'
                },
                /*link que mostrará la cantidad de items adicionales,ej: '1 más'*/
                seeMore: false,
                /**/
                type:'',
                method: 'standard',
		placeholder: 'Type to receive suggestions',
                addBtnGlobal: false,
                /*parametro para mostrar lo seleccionado mostrado en comas visualmente*/
                withDisplay: false
	}, _options);
	
  var init = function(){
        textboxlist.addEvent('bitEditableAdd', setupBit)
                   .addEvent('bitEditableFocus', search)
		   .addEvent('bitEditableBlur', hide)
                   .addEvent('bitBoxRemove', remove)
                   .setOptions({bitsOptions: {editable: {addKeys: false, stopEnter: false}}});
        if (browser.msie) {
            textboxlist.setOptions({
                    bitsOptions: {editable: {addOnBlur: false}}
            });
        }
        prefix = textboxlist.getOptions().prefix + '-autocomplete';
        
        method = $.TextboxList.Autocomplete.Methods[options.method];
        
        container = $('<div class="'+ prefix +'"/>').appendTo(textboxlist.getContainer());
        
        if (chk(options.placeholder)) {
            placeholder = $('<div class="'+ prefix +'-placeholder" />').html(options.placeholder).appendTo(container);
        }		
        
        list = $('<ul class="'+ prefix +'-results" />').appendTo(container).click(function(ev){
                ev.stopPropagation(); ev.preventDefault();
        });
        
        if(options.withDisplay){
               
           inputDisplay = textboxlist.getElement().clone();
           
           textboxlist.getContainer().addClass("hide");
           
           ruler = $('<span id="ruler"></span>');
           
           
           inputDisplay.attr('name', 'clone-'+textboxlist.getElement().attr('name'));
           inputDisplay.attr('id', 'clone-'+textboxlist.getElement().attr('id'));
           inputDisplay.css('display', 'block');
           
           inputDisplay.on('focus', function(){
               if(options.seeMore){
                renderSeeMore(false, 0); 
               }
               
               if($.trim($(this).val())){
                    textboxlist.getContainer().removeClass("hide");
                    inputDisplay.prop('value','');
                    search();
                    
               } else {
                   textboxlist.getContainer().addClass("hide");
               }
               
           }).on('blur', function(){
               inputDisplay.prop('value', textboxlist.getLabels().toString());
               
               if(options.seeMore){
                   checkWidthListContainer();
               }
               
               textboxlist.getContainer().addClass("hide");
           }).on('keyup', function(evt){
               if($.trim($(this).val())){
                   textboxlist.getContainer().removeClass("hide");
                   search();
               } else {
                   textboxlist.getContainer().addClass("hide");
               }
           });
           
           inputDisplay.insertBefore(textboxlist.getElement());
        
           ruler.css({
                'visibility':'hidden',
                'white-space':'nowrap'
           });
           
           ruler.appendTo('body');
        }
        
        if(options.addBtnGlobal) {
           var label = (options.addBtnGlobal.label || "Agregar"),
               classBtn = (options.addBtnGlobal.classBtn || "btn-urb"),
               wrapper = (options.addBtnGlobal.wrapper || "<div class='control'></div>");

           btnGlobal = $('<a href="javascript:;" id="'+prefix+'-add" class="'+ classBtn +'">'+label+'</a>');
           
           if(wrapper){
              var $wrapper = $(wrapper);
              $wrapper.html(btnGlobal);  
              container.append($wrapper);
              
           } else {
              btnGlobal.appendTo(container);
           }
           
           btnGlobal.mousedown(function(evt){
                
               evt.stopPropagation(); 
               evt.preventDefault();
               clearTimeout(hidetimer);
               
           }).mouseup(function(evt){
               var selectedsByCheck = btnGlobal.data('selected');
               addCurrents(selectedsByCheck);
               
               //currentInput.focus();
               //currentInput.setValue([null, '', null]);
               //hideContainer();
               search();
               
               if(options.withDisplay){
                   inputDisplay.prop('value', textboxlist.getLabels().toString());
                   inputDisplay.prop('value', '');
                   inputDisplay.trigger('blur');
                   textboxlist.getContainer().addClass("hide");
                   //search();
               
               }
               
               if(options.seeMore){
                   checkWidthListContainer();
               }
               
           });
        }
  };
  
  var checkWidthListContainer = function(){
     var width = inputDisplay.width(),
         list = textboxlist.getListContainer(),
         currentWidth = 0,
         totalTags = inputDisplay.val().split(',');
      
      if(options.withDisplay){
        ruler.html('');
        var visibleTags = 0;
        
        if(totalTags.length){
            
            for(var i = 0; i < totalTags.length; i++){
              ruler.append(totalTags[i] + ',');  
              //console.log("anchoString:" + ruler.outerWidth() + "--anchoText:"+ width);
              
              if(ruler.outerWidth(true) <= (width - 40)){
                 visibleTags++;
                 renderSeeMore(false, 0);
              } else {
                 renderSeeMore(true,totalTags.length - visibleTags);   
              }
            }
        }
      } else { 
        list.children().each(function(i, e){
              var bit = textboxlist.getBit(e);
              if(bit.type === 'box'){
                  currentWidth = currentWidth + $(e).outerWidth(true);
              }
        });
      }
      
  };
  var renderSeeMore = function(flag, num){
      
      var opts = $.extend(true, {
          id:'see-more',
          target: textboxlist.getListContainer(),
          label: '{n} más'
      }, _options['seeMore']);
      
      var seeMore = $('<a class="see-more" id="'+ opts.id +'" href="javascript:;"/>'),
          html = opts["label"].toString().replace(/{n}/, num);
      
      seeMore.on('click', function(evt){
          evt.preventDefault();
          inputDisplay.focus();
      });
      if(opts.target.find('#'+opts.id).length){
         opts.target.find('#'+opts.id).remove();
      }
      
      seeMore.appendTo(opts.target);
      seeMore.html(html);
      
      if(flag){
         seeMore.removeClass('hide');
      } else {
         seeMore.addClass('hide');
      }
      
  };
  var setupBit = function(bit){
        bit.toElement().keydown(navigate).keyup(function(){ search(); });
  };
	
  var search = function(bit){
        if (bit){ 
            currentInput = bit;
        };
        if (!options.queryRemote && !values.length){
            return;
        }

        var search = "";
        
        if(options.withDisplay){
            search = $.trim(inputDisplay.val());
        } else {
            search = $.trim(currentInput.getValue()[1]);
        }
        
        if (search.length < options.minLength) {
            showPlaceholder();
        }
	/*	
        if (search == currentSearch){ 
                    return;
        }
        */
        currentSearch = search;
        
        hideContainer();
        list.css('display', 'none');
        
        if (search.length < options.minLength) {
            return;
        }
        
        if (options.queryRemote){
            if (searchValues[search]){
                values = searchValues[search];
            } else {
                var data = options.remote.extraParams;
                data[options.remote.param] = search;
                if (currentRequest) {
                    currentRequest.abort();
                }
                currentRequest = $.ajax({
					url: options.remote.url,
					data: data,
					dataType: 'json',
					success: function(r){
						searchValues[search] = r;
						values = r;
						showResults(search);
					}
				});
            }
        }
        showResults(search);
  };
	
  var showResults = function(search){
      
        var results = null;
        if(options.highlightAll){
            results = method.filterAll(values, search, options.insensitive, options.maxResults);
        } else {
            results = method.filter(values, search, options.insensitive, options.maxResults);
        }
        if (textboxlist.getOptions().unique){
            results = $.grep(results, function(v){ return textboxlist.isDuplicate(v) === -1; });
        }
        
        hidePlaceholder();
        
        if (!results.length) {
            hideContainer();
            return;
        }
        
        blur();
        
        showContainer();

        list.empty().css('display', 'block');
	
        $.each(results, function(i, r){ 
            addResult(r, search); 
        });
        
        if (options.onlyFromValues) {
            focusFirst();
        }
        
        results = results;
  };
	
  var addResult = function(r, searched){
      
        var element = $('<li class="'+ prefix +'-result" />').html(r[3] ? r[3] : r[1]).data('textboxlist:auto:value', r);
        
        if(options.type === 'checkbox'){
          var checkElem = $('<input type="checkbox" name="autocomplete[]"/>');
          element = element.prepend(checkElem);
        }
        
        element.appendTo(list);
        
        if (options.highlight) { 
            
            $(options.highlightSelector ? element.find(options.highlightSelector) : element).each(function(){
                
                if(options.highlightAll){
                    
                    if ($(this).html()) method.highlightAll($(this), searched, options.insensitive, prefix + '-highlight');
                    
                } else {
                    
                    if ($(this).html()) method.highlight($(this), searched, options.insensitive, prefix + '-highlight');
                }
            }); 
        }
        
        if (options.mouseInteraction){
            
            element.css('cursor', 'pointer').hover(function(){ focus(element); }).mousedown(function(ev){
                ev.stopPropagation(); 
                ev.preventDefault();
                clearTimeout(hidetimer);
                doAdd = true;
                
                if(options.type === 'checkbox'){
                    var $check = element.find(':input[type=checkbox]');
                    
                    if($check.is(":checked")){
                       element.removeClass('selected');
                       $check.prop('checked', false);
                    } else {
                       element.addClass('selected');
                       $check.prop('checked', true); 
                    };
                    
                }
                if(options.addBtnGlobal) {
                   var selecteds = container.find('.selected');
                   btnGlobal.data('selected', selecteds);
                }
                
            }).mouseup(function(){
                if(!options.addBtnGlobal){
                    if (doAdd){
                        addCurrent();
                        currentInput.focus();
                        search();
                        doAdd = false;
                    }
                }
            });
            
            if (!options.onlyFromValues) {
                element.mouseleave(function(){ 
                    if (current && (current.get(0) == element.get(0))) {
                        blur();
                    } 
                });
            }
        }
  };
  
  var remove = function(evt){
     if(options.withDisplay){
        setTimeout(function(){
            
            inputDisplay.prop('value', textboxlist.getLabels().toString());
            
            if(options.seeMore){
               checkWidthListContainer();
            }
            
            inputDisplay.focus();
            
        }, 10);
     }
  };
  
  var hide = function(){
        hidetimer = setTimeout(function(){
            hideContainer();
            hidePlaceholder();
            list.css('display', 'none');
            currentSearch = null;
        }, browser.msie ? 150 : 0);
  };
	
        
  var showPlaceholder = function(){
        if (placeholder){ 
            placeholder.css('display', 'block');
        }
  };
	
  var hidePlaceholder = function(){
        if (placeholder){
            placeholder.css('display', 'none');
        }
  };
  
  var showContainer = function(){
        if (container){ 
            container.css('display', 'block');
        }
  };
	
  var hideContainer = function(){
        if (container){
            container.css('display', 'none');
        }
  };
	
  var focus = function(element){
        if (!element || !element.length) {
            return;
        }
        blur();
        current = element.addClass(prefix + '-result-focus');
  };
	
  var blur = function(){
        if (current && current.length){
            current.removeClass(prefix + '-result-focus');
            current = null;
        }
  };
	
  var focusFirst = function(){
        return focus(list.find(':first'));
  };
	
  var focusRelative = function(dir){
        if (!current || !current.length) {
            return self;
        }
        return focus(current[dir]());
  };
	
  var addCurrent = function(){
        var value = current.data('textboxlist:auto:value');
        var b = textboxlist.create('box', value.slice(0, 3));
        
        if (b){
                b.autoValue = value;
                if ($.isArray(index)){
                    index.push(value);
                };
                currentInput.setValue([null, '', null]);
                b.inject(currentInput.toElement(), 'before');
        }
        blur();
        return self;
  };

  var addCurrents = function(CollectionElems){
      if(CollectionElems.length){
        for(var i = 0; i < CollectionElems.length;i++){
            var elem = $(CollectionElems[i]),
                value = elem.data('textboxlist:auto:value');
            textboxlist.add(value[1], value[0]);
        }
      }
  };
  
  var navigate = function(ev){
        var evStop = function(){ ev.stopPropagation(); ev.preventDefault(); };
        switch (ev.which){
            case 38:			
                    evStop();
                    (!options.onlyFromValues && current && current.get(0) === list.find(':first').get(0)) ? blur() : focusRelative('prev');
                    break;
            case 40:			
                    evStop();
                    (current && current.length) ? focusRelative('next') : focusFirst();
                    break;
            case 13:
                    evStop();
                    if (current && current.length){
                        addCurrent();
                    } else if (!options.onlyFromValues){
                            var value = currentInput.getValue();				
                            var b = textboxlist.create('box', value);
                            if (b){
                                    b.inject(currentInput.toElement(), 'before');
                                    currentInput.setValue([null, '', null]);
                            }
                    }
                    
                    if(options.withDisplay){
                        textboxlist.getContainer().addClass("hide");
                    }
                    
        }
        
        if(options.withDisplay){
           inputDisplay.prop('value', textboxlist.getLabels().toString());
           ruler.html(inputDisplay.val());
        }
        
        if(options.seeMore){
           checkWidthListContainer();
        }
  };
  
  this.setValues = function(v){
        values = v;
  };

  this.reset = function(){
     
     var bit = textboxlist.getListContainer().children('li'); 
     
     if(bit.length){
        bit.remove();
     }
     
     hide();
     
     textboxlist.getContainer().addClass('hide');
     textboxlist.clearIndices();
     textboxlist.getOriginalElement().val('');
     inputDisplay.val('');
  };
  this.disable = function(){
     inputDisplay.prop('disabled', true);  
  };
  
  this.enable = function(){
     inputDisplay.prop('disabled', false); 
  };
  
  this.hideContainer = hideContainer;
  
  init();
};

$.TextboxList.Autocomplete.Methods = {
	standard: {
		filter: function(values, search, insensitive, max){
			var newvals = [], regexp = new RegExp('\\b' + escapeRegExp(search), insensitive ? 'i' : '');
			for (var i = 0; i < values.length; i++){
				if (newvals.length === max) break;
				if (regexp.test(values[i][1])) newvals.push(values[i]);
			}
			return newvals;
		},
		filterAll: function(values, search, insensitive, max){
                        var newvals = [], regexp = new RegExp(escapeRegExp(search), insensitive ? 'i' : '');
			for (var i = 0; i < values.length; i++){
				if (newvals.length === max) break;
				if (regexp.test(values[i][1])) newvals.push(values[i]);
			}
			return newvals;
                },
		highlight: function(element, search, insensitive, klass){
			var regex = new RegExp('(<[^>]*>)|(\\b'+ escapeRegExp(search) +')', insensitive ? 'ig' : 'g');
                        return element.html(element.html().replace(regex, function(a, b, c){
                                return (a.charAt(0) == '<') ? a : '<strong class="'+ klass +'">' + c + '</strong>'; 
			}));
		},
                //ultrasensible
                highlightAll: function(element, search, insensitive, klass){
                        var regex = new RegExp('(<[^>]*>)|'+ escapeRegExp(search), insensitive ? 'ig' : 'g');
                        return element.html(element.html().replace(regex, function(a, b, c){
                                return (a.charAt(0) == '<') ? a : '<strong class="'+ klass +'">' + a + '</strong>'; 
			}));
                }
	}
	
};

var chk = function(v){ return !!(v || v === 0); };
var escapeRegExp = function(str){ return str.replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1"); };

})();