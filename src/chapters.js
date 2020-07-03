$(document).ready(function() {
	// inject html into button to add icon
	$("a[data-action='find-chapter']").html(`<i class="fas fa-map-marker-alt"></i>&nbsp;&nbsp;Find nearest chapter`);
});

$("a[data-action='find-chapter']").click(function() {
	// let user know that it's loading
	$("a[data-action='find-chapter']").text("Locating...");
	geolocate();
});

function geolocate() {
	if (window.navigator && window.navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(onGeolocateSuccess, onGeolocateError);
	}
}

function onGeolocateSuccess(coordinates) {
	const { latitude, longitude } = coordinates.coords;
	// TODO: CHANGE MAP CENTER & ZOOM
	userCoords = new google.maps.LatLng(latitude, longitude);
    map.panTo(userCoords);
    map.setZoom(6);

  	$("a[data-action='find-chapter']").html(`<i class="fas fa-map-marker-alt"></i>&nbsp;&nbsp;Find nearest chapter`);

  	// find nearest chapter marker
  	let nearestMarker = markers.reduce(function (prev, curr) {
	    var cpos = google.maps.geometry.spherical.computeDistanceBetween(userCoords, curr.position);
	    var ppos = google.maps.geometry.spherical.computeDistanceBetween(userCoords, prev.position);
	    return cpos < ppos ? curr : prev;
	});
	google.maps.event.trigger(nearestMarker, 'click');
}

function onGeolocateError(error) {
	console.warn(error.code, error.message);

	if (error.code === 1) {
	  // they said no
	  $("a[data-action='find-chapter']").text("You denied location sharing.");
	} else if (error.code === 2) {
	  // position unavailable
	  $("a[data-action='find-chapter']").text("Failed.");
	} else if (error.code === 3) {
	  // timeout
	  $("a[data-action='find-chapter']").text("Timeout.");
	}
}