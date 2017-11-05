var locations = [
['Bondi Beach', -33.890542, 151.274856],
['Coogee Beach', -33.923036, 151.259052],
['Cronulla Beach', -34.028249, 151.157507],
['Manly Beach', -33.80010128657071, 151.28747820854187],
['Maroubra Beach', -33.950198, 151.2593017]
];

// Center the map
var map = new google.maps.Map(document.getElementById('map'), {
	zoom: 10,
	center: new google.maps.LatLng(-33.92, 151.25),
	mapTypeId: google.maps.MapTypeId.ROADMAP
});

var infowindow = new google.maps.InfoWindow();

var marker, i;

// Add pins on the map
for (i = 0; i < locations.length; i++) {  
	marker = new google.maps.Marker({
		position: new google.maps.LatLng(locations[i][1], locations[i][2]),
		map: map
	});

	google.maps.event.addListener(marker, 'click', (function(marker, i) {
		return function() {
			infowindow.setContent(locations[i][0]);
			infowindow.open(map, marker);
		}
	})(marker, i));
}


// test add pin

$("body").on("click", "#test-add-button", function(){
	marker = new google.maps.Marker({
		position: new google.maps.LatLng(0, 0),
		map: map
	});

	google.maps.event.addListener(marker, 'click', (function(marker) {
		return function() {
			infowindow.setContent("test something");
			infowindow.open(map, marker);
		}
	})(marker));
});

$("body").on("submit", "#form", function(e){
	e.preventDefault();

	var name = $("#name").val();
	var lat = $("#lat").val();
	var lng = $("#lng").val();

	$.ajax({
		url: "https://api.mongolab.com/api/1/databases/locations/collections/pins?apiKey=LgEjQO7xxGnnfoqMELFaVQ1TuPuVkDw7",
		data: JSON.stringify({
			name: name,
			lat: lat,
			lng: lng
		}),
		type: "POST",
		contentType: "application/json",
		dataType: "json",
		success: function(data) {
			console.log("success");
		},
		error: function(xhr, status, err) {
			console.log("error");
		}
	})
});

// loop json
$.ajax({
	url: "https://api.mongolab.com/api/1/databases/locations/collections/pins?apiKey=LgEjQO7xxGnnfoqMELFaVQ1TuPuVkDw7"
}).done(function(data){
	console.log(data);
});

// var request = new XMLHttpRequest();
// request.open("GET", "dist/db/locations.json", false);
// request.send(null);
// request.onreadystatechange = function() {
//   if ( request.readyState === 4 && request.status === 200 ) {
//     var my_JSON_object = JSON.parse(request.responseText);
//     console.log(my_JSON_object);
//   }
// }

/////
// getArray().done( function(json) {
// 	console.log("done");
//     console.log(json); // show the json data in console
//     var _len = json.length;
//     var fixture;


//     //loop through json and match today's date with match-date
//     // for (var i in json) {
//     //     fixture = json[i];
//     //     if (fixture.date == today) {
//     //         //print out today's schedule here
//     //         console.log(fixture.team1 + " Vs. " + fixture.team2);
//     //     }
//     // }

// });