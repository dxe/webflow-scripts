// this script currently requries jqeury for the ready function

$(document).ready(function() {
	// inject html into button to add icon
	document.getElementById("find-chapter-btn").innerHTML = `<i class="fas fa-map-marker-alt"></i>&nbsp;&nbsp;Find nearest chapter`;
});

document.getElementById("find-chapter-btn").addEventListener("click", function(){
	// let user know that it's loading
	document.getElementById("find-chapter-btn").innerHTML = "Locating...";
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
	let userCoords = new google.maps.LatLng(latitude, longitude);
    map.panTo(userCoords);
    map.setZoom(6);

  	document.getElementById("find-chapter-btn").innerHTML = `<i class="fas fa-map-marker-alt"></i>&nbsp;&nbsp;Find nearest chapter`;

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
	  document.getElementById("find-chapter-btn").innerHTML = "You denied location sharing.";
	  return;
	}
	if (error.code === 2) {
	  // position unavailable
	  document.getElementById("find-chapter-btn").innerHTML = "Failed.";
	  return;
	}
	if (error.code === 3) {
	  // timeout
	  document.getElementById("find-chapter-btn").innerHTML = "Timeout.";
	  return;
	}
}