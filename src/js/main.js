// Center the map
var map = new google.maps.Map(document.getElementById('map'), {
	zoom: 1,
	center: new google.maps.LatLng(-33.92, 151.25),
	mapTypeId: google.maps.MapTypeId.ROADMAP
});

var infowindow = new google.maps.InfoWindow();

var marker, i;

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
 
// on form submit add the pin on the map
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
			console.log(data);
		},
		error: function(xhr, status, err) {
			console.log("error");
			console.log(xhr);
			console.log(status);
			console.log(err);
		}
	})
});

// add pins on map via json
$.ajax({
	url: "https://api.mongolab.com/api/1/databases/locations/collections/pins?apiKey=LgEjQO7xxGnnfoqMELFaVQ1TuPuVkDw7"
}).done(function(data){
	console.log(data);
	var total_pins = Object.keys(data).length;

	for (i = 0; i < total_pins; i++) {
	console.log();  
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(data[i].lat, data[i].lng),
			map: map
		});

		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
				infowindow.setContent(data[i].name);
				infowindow.open(map, marker);
			}
		})(marker, i));
	}
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