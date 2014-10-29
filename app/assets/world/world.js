// implementation of AR-Experience (aka "World")
var World = {
    
	// true once data was fetched
	initiallyLoadedData: false,

	// called to inject new POI data
	loadPoisFromJsonData: function loadPoisFromJsonDataFn(bubble) {
		var markerLocation = new AR.GeoLocation(bubble.location.lat, bubble.location.lng, 100.0);
		var markerHtmlDrawable = new AR.HtmlDrawable({ uri: 'bubble.html' }, 5, {
    		onClick: function() {
    		    alert('Article: ' + bubble.article.title + '\nDropped by: ' + bubble.user.full_name);
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

	// location updates, fired every time you call architectView.setLocation() in native environment
	locationChanged: function locationChangedFn(lat, lon, alt, acc) {
	    /*
			The custom function World.onLocationChanged checks with the flag World.initiallyLoadedData if the function was already called. With the first call of World.onLocationChanged an object that contains geo information will be created which will be later used to create a marker using the World.loadPoisFromJsonData function.
		*/
		if (!World.initiallyLoadedData) {
		    World.loadData();
			World.initiallyLoadedData = true;
		}
	},
	
	loadData: function() {
    	var request = new XMLHttpRequest();
    	
    	request.onreadystatechange = function() {
        	if (request.readyState != 4)
        	    return;
            if (request.status != 200) {
                alert('The server is not responding...please try again.');
                return;
            }
            
            var data = JSON.parse( request.responseText );
            var bubbles = data.data.bubbles;
            
            for (var i = 0; i < bubbles.length; i++) {
                World.loadPoisFromJsonData(bubbles[i]);
            }
    	};
    	
    	request.open('GET', 'http://drop-pop-api.gopagoda.com/api/bubbles', true);
    	request.send(null);
	}
};

/* 
	Set a custom function where location changes are forwarded to. There is also a possibility to set AR.context.onLocationChanged to null. In this case the function will not be called anymore and no further location updates will be received. 
*/
AR.context.onLocationChanged = World.locationChanged;