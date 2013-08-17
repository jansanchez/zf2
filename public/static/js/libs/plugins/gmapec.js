// Generated by CoffeeScript 1.6.3
/*
    Clase intermediaria a gmaps
*/


(function() {
  var gMap,
    __hasProp = {}.hasOwnProperty;

  window.gMap = gMap = (function() {
    function gMap(obj, libraries, async) {
      this.obj = obj;
      this.libraries = libraries;
      this.async = async;
      this.debug = true;
      this.libraries = this.libraries || '';
      this.async = this.async || true;
      this.markers = {};
      this.nspace = null;
      this.registerMethod = [];
      this.isDispachableEvents = false;
      this.render();
    }

    gMap.prototype.f = function(opts) {
      this.opts = opts;
      this.opts.zoom = this.opts.zoom || 8;
      this.opts.lt = this.opts.lt || -8.59087;
      this.opts.lg = this.opts.lg || -77.1025;
      this.opts.center = [this.opts.lt, this.opts.lg];
      this.opts.mapTypeId = this.opts.type || "ROADMAP";
      return this.opts.streetViewControl = this.opts.streetViewControl || true;
    };

    gMap.prototype.evt = function(evts) {
      return this.gMethodAdd({
        method: 'evt',
        params: evts,
        func: function(params, gmap) {
          var nameEvt, _results;
          _results = [];
          for (nameEvt in evts) {
            _results.push(gmap.nspace.event.addListener(gmap.map, nameEvt, evts[nameEvt]));
          }
          return _results;
        }
      });
    };

    gMap.prototype.render = function() {
      if (this.async) {
        return this.asyncJS();
      } else {
        return this.dispatch();
      }
    };

    gMap.prototype.dispatch = function() {
      var realOpts, target;
      this.nspace = google.maps;
      if (this.nspace === void 0) {
        throw "la carga de google maps a fallado o es una version no soportada";
      }
      if (document.getElementById(this.obj)) {
        target = document.getElementById(this.obj);
        if (!this.hasOwnProperty("map")) {
          realOpts = this.dealOpts(this.opts);
          this.map = new this.nspace.Map(target, realOpts);
          this.isDispachableEvents = true;
          return this.dispatchEvents(this);
        }
      } else {
        throw "el objeto map no existe en el documento";
      }
    };

    gMap.prototype.dispatchEvents = function(ctx) {
      var collectionMethod, method, params, status, _i, _len, _ref, _results;
      if (ctx.isDispachableEvents) {
        _ref = this.registerMethod;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i += 1) {
          collectionMethod = _ref[_i];
          method = collectionMethod.method;
          params = collectionMethod.params;
          status = collectionMethod.status;
          if (status) {
            collectionMethod.func(params, ctx);
            _results.push(collectionMethod.status = 0);
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    };

    gMap.prototype.dealOpts = function(opts) {
      var _this;
      _this = this;
      return {
        center: new _this.nspace.LatLng(opts.center[0], opts.center[1]),
        zoom: opts.zoom,
        lt: opts.lt,
        lg: opts.lg,
        mapTypeId: _this.nspace.MapTypeId[opts.mapTypeId],
        streetViewControl: opts.streetViewControl
      };
    };

    gMap.prototype.marker = function(markerOpts) {
      return this.gMethodAdd({
        method: "marker",
        params: markerOpts,
        func: function(params, gmap) {
          var ctxMarker, markerObj, nameEvt, stMarker, _results;
          stMarker = {};
          if (!markerOpts.hasOwnProperty("position")) {
            stMarker.position = new gmap.nspace.LatLng(markerOpts.lt || -8.59087, markerOpts.lg || -77.1025);
          } else {
            stMarker.position = markerOpts.position;
          }
          stMarker.title = markerOpts.title || "";
          stMarker.map = gmap.map;
          stMarker.draggable = markerOpts.draggable || false;
          stMarker.icon = markerOpts.icon;
          stMarker.id = markerOpts.id;
          stMarker.fixed = markerOpts.fixed || false;
          markerObj = new gmap.nspace.Marker(stMarker);
          ctxMarker = markerObj;
          gmap.markers[stMarker.id] = markerObj;
          markerObj.gmap = gmap;
          markerObj.data = params.data || "";
          _results = [];
          for (nameEvt in markerOpts.evts) {
            _results.push(gmap.nspace.event.addListener(markerObj, nameEvt, markerOpts.evts[nameEvt]));
          }
          return _results;
        }
      });
    };

    gMap.prototype.getMarker = function(idMarker) {
      return this.markers[idMarker];
    };

    gMap.prototype.cleanMarkers = function() {
      return this.gMethodAdd({
        method: "cleanMarkers",
        params: "",
        func: function(params, gmap) {
          var marker, _results;
          window.eee = gmap.markers;
          _results = [];
          for (marker in gmap.markers) {
            if (gmap.markers[marker].fixed === false) {
              gmap.markers[marker].setMap(null);
              _results.push(delete gmap.markers[marker]);
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        }
      });
    };

    gMap.prototype.relocateMarker = function(markerId) {
      return this.gMethodAdd({
        method: "relocate",
        params: {
          markerId: markerId
        },
        func: function(params, gmap) {
          return gmap.markers[params.markerId].setMap(gmap.map);
        }
      });
    };

    gMap.prototype.getAllMarkers = function(st) {
      var exceptional, kMarker, _ref, _results;
      exceptional = st.exceptional || [];
      _ref = this.markers;
      _results = [];
      for (kMarker in _ref) {
        if (!__hasProp.call(_ref, kMarker)) continue;
        if (exceptional.indexOf(this.markers[kMarker].id) === -1) {
          _results.push(this.markers[kMarker]);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    gMap.prototype.geocode = function(geocodeOpts) {
      return this.gMethodAdd({
        method: "geocode",
        params: geocodeOpts,
        func: function(params, gmap) {
          var callback, gcoder, marker;
          gcoder = new gmap.nspace.Geocoder();
          callback = params.callback;
          if (params.hasOwnProperty('lt') && params.hasOwnProperty('lg')) {
            params.latLng = new google.maps.LatLng(params.lt, params.lg);
          }
          if (params.useMarker) {
            marker = gmap.markers[params.useMarker];
          }
          delete params.lt;
          delete params.lg;
          delete params.callback;
          delete params.useMarker;
          return gcoder.geocode(params, function(results, status) {
            return callback(results, status, {
              gmap: gmap,
              marker: marker
            });
          });
        }
      });
    };

    gMap.prototype.gplaces = function(gPlacesOpts) {
      return this.gMethodAdd({
        method: "gplace",
        params: gPlacesOpts,
        func: function(params, gmap) {
          var places;
          places = new gmap.nspace.places.PlacesService(gmap.map);
          return places.search({
            location: gmap.map.getCenter(),
            radius: gPlacesOpts.radius,
            types: gPlacesOpts.types
          }, params.callback);
        }
      });
    };

    gMap.prototype.onLoadAsyncLib = function(onLoadOpts) {
      return this.gMethodAdd({
        method: "onLoadAsyncLib",
        params: onLoadOpts,
        func: function(params, gmap) {
          return params.callback && params.callback(gmap);
        }
      });
    };

    gMap.prototype.asyncJS = function() {
      var queryLibraries, _this;
      _this = this;
      window["renderMap"] = function() {
        return _this["dispatch"]();
      };
      if (this.libraries !== "") {
        queryLibraries = "&libraries=" + _this.libraries;
      } else {
        queryLibraries = _this.libraries;
      }
      return this.u.loadScript(("https://maps.googleapis.com/maps/api/js?v=3.exp" + queryLibraries) + "&sensor=false&callback=renderMap", "");
    };

    gMap.prototype.u = {
      loadScript: function(src, evts) {
        var script;
        script = document.createElement('script');
        script.type = 'text/javascript';
        if (script.readyState) {
          script.onreadystatechange = function() {
            script.onreadystatechange = null;
            return evts.ready && evts.ready(src);
          };
        } else {
          script.onload = function() {
            return evts.ready && evts.ready(src);
          };
        }
        script.src = src;
        return document.body.appendChild(script);
      }
    };

    gMap.prototype.gMethodAdd = function(settings) {
      settings.status = 1;
      this.registerMethod.push(settings);
      return this.dispatchEvents(this);
    };

    gMap.prototype.mapa = function() {
      return this.map;
    };

    gMap.prototype.latLng = function(lat, lng) {
      return new this.nspace.LatLng(lat, lng);
    };

    gMap.prototype.info = function() {
      return new this.nspace.InfoWindow();
    };

    return gMap;

  })();

}).call(this);
