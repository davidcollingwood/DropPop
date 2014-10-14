// implementation of AR-Experience (aka "World")
var World = {
    // ranges for random values
    range: {
        latitude: 0.0001,
        longitude: 0.0001,
        altitude: 1
    },
    
    // user's current position
    position: {
        latitude: 0,
        longitude: 0,
        altitude: 0,
        accuracy: 0
    },
    
	// true once data was fetched
	initiallyLoadedData: false,

	// called to inject new POI data
	loadPoisFromJsonData: function loadPoisFromJsonDataFn(poiData) {
		var markerLocation = new AR.GeoLocation(poiData.latitude, poiData.longitude, poiData.altitude);
		var markerHtmlDrawable = new AR.HtmlDrawable({ uri: 'bubble.html' }, 5, {
    		onClick: function() {
    		    alert('tap tap tap');
        		window.location = 'architectsdk://close';
    		}
		});

		// create GeoObject
		var markerObject = new AR.GeoObject(markerLocation, {
			drawables: {
				cam: [markerHtmlDrawable]
			}
		});
	},
	
	createPois: function(count) {
    	for (var i = 0; i < count; i++) {
    	    World.createPoi();
    	}
	},
	
	createPoi: function() {
	    var lat = World.position.latitude - (World.range.latitude / 2) + Math.random() * World.range.latitude;
	    var lon = World.position.longitude - (World.range.longitude / 2) + Math.random() * World.range.longitude;
	    var alt = World.position.altitude - (World.range.altitude / 2) + Math.random() * World.range.altitude;
	    
    	World.loadPoisFromJsonData({
        	latitude: lat,
        	longitude: lon,
        	altitude: alt
    	});
	},

	// location updates, fired every time you call architectView.setLocation() in native environment
	locationChanged: function locationChangedFn(lat, lon, alt, acc) {
	    World.position.latitude = lat;
        World.position.longitude = lon;
        World.position.altitude = alt;
        World.position.accuracy = acc;
        
		/*
			The custom function World.onLocationChanged checks with the flag World.initiallyLoadedData if the function was already called. With the first call of World.onLocationChanged an object that contains geo information will be created which will be later used to create a marker using the World.loadPoisFromJsonData function.
		*/
		if (!World.initiallyLoadedData) {
		    World.createPois(20);
			World.initiallyLoadedData = true;
		}
	},
};

/* 
	Set a custom function where location changes are forwarded to. There is also a possibility to set AR.context.onLocationChanged to null. In this case the function will not be called anymore and no further location updates will be received. 
*/
AR.context.onLocationChanged = World.locationChanged;