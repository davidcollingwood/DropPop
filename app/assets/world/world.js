// implementation of AR-Experience (aka "World")
var World = {
	// true once data was fetched
	initiallyLoadedData: false,

	// POI-Marker asset
	markerDrawable_idle: null,

	// called to inject new POI data
	loadPoisFromJsonData: function loadPoisFromJsonDataFn(poiData) {
		var markerLocation = new AR.GeoLocation(poiData.latitude, poiData.longitude, poiData.altitude);
		var markerHtmlDrawable = new AR.HtmlDrawable({ html: '<div class="ar-bubble"></div>' }, 1, {
    		zOrder: 0,
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

		// Updates status message as a user feedback that everything was loaded properly.
		World.updateStatusMessage('1 place loaded');
	},

	// updates status message shon in small "i"-button aligned bottom center
	updateStatusMessage: function updateStatusMessageFn(message, isWarning) {

		var themeToUse = isWarning ? "e" : "c";
		var iconToUse = isWarning ? "alert" : "info";
        
        document.getElementById('status-message').innerHTML = message;
        
/*
		$("#status-message").html(message);
		$("#popupInfoButton").buttonMarkup({
			theme: themeToUse
		});
		$("#popupInfoButton").buttonMarkup({
			icon: iconToUse
		});
*/
	},

	// location updates, fired every time you call architectView.setLocation() in native environment
	locationChanged: function locationChangedFn(lat, lon, alt, acc) {

		/*
			The custom function World.onLocationChanged checks with the flag World.initiallyLoadedData if the function was already called. With the first call of World.onLocationChanged an object that contains geo information will be created which will be later used to create a marker using the World.loadPoisFromJsonData function.
		*/
		if (!World.initiallyLoadedData) {
			// creates a poi object with a random location near the user's location
			var poiData = {
				"id": 1,
				"longitude": (lon + (Math.random() / 5 - 0.1)),
				"latitude": (lat + (Math.random() / 5 - 0.1)),
				"altitude": alt // 100.0
			};

			World.loadPoisFromJsonData(poiData);
			World.initiallyLoadedData = true;
		}
	},
};

/* 
	Set a custom function where location changes are forwarded to. There is also a possibility to set AR.context.onLocationChanged to null. In this case the function will not be called anymore and no further location updates will be received. 
*/
AR.context.onLocationChanged = World.locationChanged;