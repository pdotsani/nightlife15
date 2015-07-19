'use strict';

angular.module('nightlife15App')
  .service('googleSvc', function ($http, $rootScope, ngGPlacesAPI) {
  	// Google api key
    var key = 'AIzaSyDkosyXecpxied8BZZhGWqD1pltP589p7c';
    // tmp bars array
    var bars = [];

    var googleBars = function(city) {
        bars = [];
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+
            city+'&key='+key;
        $http.get(url).success(function(data){
            console.log(data.results[0].geometry.location);
            // Get lat and lng of location using google geocode
            var lat = data.results[0].geometry.location.lat;
            var lng = data.results[0].geometry.location.lng;

            // Use google places api to find nearby bars in the area
            ngGPlacesAPI.nearbySearch({latitude: lat, longitude: lng}).then(
                function(data){
                    data.forEach(function(bar){
                        bars.push({_id: bar.name, location: bar.vicinity, going: 0});
                    })
                    $http.post('/api/citys/', {_id:city, bars: bars}).success(function(data){
                        console.log(data);
                    });
                });
        });        
    }

    return {
        findCity: function(city){
            bars = [];
            $http.get('/api/citys/'+city).success(function(data){
                data.bars.forEach(function(bar){
                    bars.push({_id: bar._id, going: bar.going, location: bar.location})
                })
                console.log(bars);
            }).error(function(data){
                $rootScope.$broadcast('get-bars');
            })
        },
    	getBars: function(city){
    		// clear bars array before starting
    		bars = [];
    		googleBars(city);
    	},
    	returnBars: function() {
    		return bars;
    	}
    }
  });
