// implementation of AR-Experience (aka "World")
var World = {
	// true once data was fetched
	initiallyLoadedData: false,

	// called to inject new POI data
	loadPoisFromJsonData: function loadPoisFromJsonDataFn(poiData) {
		var markerLocation = new AR.GeoLocation(poiData.latitude, poiData.longitude, poiData.altitude);
		var markerHtmlDrawable = new AR.HtmlDrawable({ uri: 'bubble.html' }, 5, {
    		onClick: function() {
        		alert('Tap tap tap');
    		}
		});

		// create GeoObject
		var markerObject = new AR.GeoObject(markerLocation, {
			drawables: {
				cam: [markerHtmlDrawable]
			}
		});
	},

	// location updates, fired every time you call architectView.setLocation() in native environment
	locationChanged: function locationChangedFn(lat, lon, alt, acc) {

		/*
			The custom function World.onLocationChanged checks with the flag World.initiallyLoadedData if the function was already called. With the first call of World.onLocationChanged an object that contains geo information will be created which will be later used to create a marker using the World.loadPoisFromJsonData function.
		*/
		if (!World.initiallyLoadedData) {
/*
		    World.loadPoisFromJsonData({
    		    'longitude': (lon + (Math.random() / 1 - 0.1)),
    		    'latitude': (lat + (Math.random() / 1 - 0.1)),
    		    'altitude': 100.0
		    });
		    
		    World.loadPoisFromJsonData({
    		    'longitude': (lon + (Math.random() / 2 - 0.1)),
    		    'latitude': (lat + (Math.random() / 2 - 0.1)),
    		    'altitude': 100.0
		    });
		    
		    World.loadPoisFromJsonData({
    		    'longitude': (lon + (Math.random() / 3 - 0.1)),
    		    'latitude': (lat + (Math.random() / 3 - 0.1)),
    		    'altitude': 100.0
		    });
		    
		    World.loadPoisFromJsonData({
    		    'longitude': (lon + (Math.random() / 4 - 0.1)),
    		    'latitude': (lat + (Math.random() / 4 - 0.1)),
    		    'altitude': 100.0
		    });
		    
		    World.loadPoisFromJsonData({
    		    'longitude': (lon + (Math.random() / 5 - 0.1)),
    		    'latitude': (lat + (Math.random() / 5 - 0.1)),
    		    'altitude': 100.0
		    });
		    
		    World.loadPoisFromJsonData({
    		    'longitude': (lon + (Math.random() / 6 - 0.1)),
    		    'latitude': (lat + (Math.random() / 6 - 0.1)),
    		    'altitude': 100.0
		    });
		    
		    World.loadPoisFromJsonData({
    		    'longitude': (lon + (Math.random() / 7 - 0.1)),
    		    'latitude': (lat + (Math.random() / 7 - 0.1)),
    		    'altitude': 100.0
		    });
		    
		    World.loadPoisFromJsonData({
    		    'longitude': (lon + (Math.random() / 8 - 0.1)),
    		    'latitude': (lat + (Math.random() / 8 - 0.1)),
    		    'altitude': 100.0
		    });
		    
		    World.loadPoisFromJsonData({
    		    'longitude': (lon + (Math.random() / 9 - 0.1)),
    		    'latitude': (lat + (Math.random() / 9 - 0.1)),
    		    'altitude': 100.0
		    });
*/
		    
		    World.loadPoisFromJsonData({
    		    'longitude': (lon + (Math.random() / 1000)),
    		    'latitude': (lat + (Math.random() / 1000)),
    		    'altitude': 100.0
		    });
		    
			World.initiallyLoadedData = true;
		}
	},
};

/* 
	Set a custom function where location changes are forwarded to. There is also a possibility to set AR.context.onLocationChanged to null. In this case the function will not be called anymore and no further location updates will be received. 
*/
AR.context.onLocationChanged = World.locationChanged;