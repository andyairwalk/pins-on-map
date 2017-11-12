// Center the map
var map = new google.maps.Map(document.getElementById('map'), {
	zoom: 7,
	center: new google.maps.LatLng(0, 0),
	mapTypeId: google.maps.MapTypeId.ROADMAP
});

var infowindow = new google.maps.InfoWindow();
var marker, i;

// add pins on map via json
$.ajax({
	url: "https://api.mongolab.com/api/1/databases/locations/collections/pins?apiKey=LgEjQO7xxGnnfoqMELFaVQ1TuPuVkDw7"
}).done(function(data){
	console.log(data);
	var total_pins = Object.keys(data).length;

	for (i = 0; i < total_pins; i++) {
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

// on form submit add the pin on the map and on the json file
$("body").on("submit", "#form", function(e){
	e.preventDefault();

	var name = $("#name").val();
	var lat = $("#lat").val();
	var lng = $("#lng").val();

	marker = new google.maps.Marker({
		position: new google.maps.LatLng(lat, lng),
		map: map
	});

	google.maps.event.addListener(marker, 'click', (function(marker) {
		return function() {
			infowindow.setContent(name);
			infowindow.open(map, marker);
		}
	})(marker));

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