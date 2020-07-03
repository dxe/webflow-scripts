// function to get cookies (source: https://www.w3schools.com/js/js_cookies.asp)
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// function to add hours to date (source: https://stackoverflow.com/questions/1050720/adding-hours-to-javascript-date-object)
Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}

// function to extract 12-hour time from date (source: https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format)
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ampm;
  return strTime;
}

function getAllChapters() {
	fetch(`https://adb.dxe.io/fb_pages`)
	.then(res => {
		return res.json();
	})
	.then(regions => {
		let chapterDataHTML = "";
		for (let [region, chapters] of Object.entries(regions)) {
			// new region
			chapterDataHTML += `<div class="location-title">${region}</div><div class="location-home">`;
			chapters.forEach(chapter => {
				// insert chapters into region
				chapterDataHTML += `
					<div class="location-button">
					    <a href="#" onClick="updateSelectedChapter('${chapter.Name}','${chapter.ID}','${chapter.FbURL}','${chapter.Flag}')" class="location-link w-inline-block">
					        <div class="text-block-10">${chapter.Flag} ${chapter.Name}</div>
					    </a>
					</div>
					`;
			})
			// end region
			chapterDataHTML += "</div>"
		}
		// append to div on page
		$("#chapter-regions-wrapper").append(chapterDataHTML);
	})
	.catch(error => {
		console.warn(error);
	});
}

$(document).ready(function() {
	// inject html into button to add icon
	$("a[data-action='find-chapter']").html(`<i class="fas fa-map-marker-alt"></i>&nbsp;&nbsp;Find my chapter`);
	// read cookie for location if saved
	var chapterName = getCookie("chapterName");
	var chapterID = getCookie("chapterID");
	var fbURL = getCookie("fbURL");
	var chapterFlag = getCookie("chapterFlag");
		if (chapterName && chapterID && fbURL && chapterFlag) {
			updateSelectedChapter(chapterName, chapterID, fbURL, chapterFlag);
		} else {
			loadNearestEvents();
		}
		// populate chapter selector with current chapters
	getAllChapters();
});

function updateSelectedChapter(chapterName, chapterID, facebookURL, chapterFlag) {
	// update selected name
	$("#selected-chapter").text(chapterFlag + " " + chapterName);
	// close the chapter selector secreen
	hideChapterSelector();
	// if no FB url for the chapter, we should use default dxe url
	if (facebookURL === "") facebookURL = "https://facebook.com/directactioneverywhere";
	// set cookie
	document.cookie = `chapterName=${encodeURIComponent(chapterName)}`;
	document.cookie = `chapterID=${encodeURIComponent(chapterID)}`;
	document.cookie = `fbURL=${encodeURIComponent(facebookURL)}`;
	document.cookie = `chapterFlag=${encodeURIComponent(chapterFlag)}`;
	// update FB button
	$("a[data-action='view-facebook']").attr("href", facebookURL + "/events");
	$("a[data-action='view-facebook']").text(`View ${chapterName} on Facebook`);
	// clear events currently shown
	$("#event-items-wrapper").empty();
	// update event listing shown using chapter fb id
	let startTime = new Date().addHours(-1).toISOString().substring(0,16);
	let endtime = new Date().addHours(720).toISOString().substring(0,16);
	fetch(`https://adb.dxe.io/fb_events/${chapterID}?start_time=${startTime}&end_time=${endtime}`)
	.then(res => {
		return res.json();
	})
	.then(events => {
		// if 0 events & chapter id not configured, then display a message
		if (events === null && chapterID == 0) {
			$("#event-items-wrapper").append(`
				<div class="w-dyn-item">
			        <div class="event-div">
			            <div class="event-info-div">
			                <div class="event-title">No events found</div>
			                <div class="fb-event-info">Please check <a href="${facebookURL}/events" target="_blank">Facebook</a>.</div>
			                <div class="fb-event-info"><strong>Are you an organizer?</strong> Please email <a href="mailto:tech@dxe.io">tech@dxe.io</a> for your events to be added here.</div>
			            </div>
			        </div>
			    </div>
				`)
			return;
		}
		// if 0 events, say no "upcoming" events found
		if (events === null) {
			$("#event-items-wrapper").append(`
				<div class="w-dyn-item">
			        <div class="event-div">
			            <div class="event-info-div">
			                <div class="event-title">No upcoming events found</div>
			                <div class="fb-event-info">Sorry, there are no upcoming events for ${chapterName}.</div>
			            </div>
			        </div>
			    </div>
				`)
			return;
		}

		// append #event-items-wrapper
		for (let i = 0; i < 3; i++) { // TODO: add a "limit" param to API so we don't need to get more events than we need for homepage
			console.log(i);
			let event = events[i];
			const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
			let localStartDate = new Date(event.StartTime).toLocaleDateString(undefined, options);
			let localStartTime = formatAMPM(new Date(event.StartTime));
			let facebookEventURL = `https://www.facebook.com/events/${event.ID}`;
			if (!event.Cover) event.Cover = 'https://ec2.dxe.io/img/default_cover.jpg';
			$("#event-items-wrapper").append(`
				<div class="w-dyn-item">
			        <div class="event-div">
			            <div class="event-image"><a href="${facebookEventURL}" target="_blank"><img width="1010" src="${event.Cover}" class="fb-event-thumbnail"></a></div>
			            <div class="event-info-div">
			                <div class="event-title">${event.Name}</div>
			                <div class="fb-event-info">${localStartDate} at ${localStartTime}</div>
			                <div class="fb-event-info">${event.LocationName}</div>
			                <div class="fb-event-info">${event.AttendingCount} attending | ${event.InterestedCount} interested</div>
			                <div class="fb-event-info"><a href="${facebookEventURL}" class="link" target="_blank">RSVP on Facebook</a></div>
			            </div>
			        </div>
			    </div>
				`)
		}
	})
	.catch(error => {
		console.warn(error);
	});
}

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
	loadNearestEvents(latitude, longitude);
}

function loadNearestEvents(lat = 0, lng = 0) {
	fetch(`https://adb.dxe.io/fb_page/${lat},${lng}`)
	.then(res => {
		return res.json();
	})
	.then(data => {
		// TODO: if nearest chapter is over 100 miles away, then display a message
		// if nearest chapter is over 100 miles away, then display a message
		if (data[0].Distance > 100) {
			document.getElementById("event-items-wrapper").insertAdjacentHTML("beforeBegin",
      			`<div style="padding-bottom: 30px;"><h3>The closest chapter to you is ${Math.round(data[0].Distance)} miles away.</h3><p>Contact <a href="mailto:mentoring@dxe.io">mentoring@dxe.io</a> to start a chapter of your own!</p></div>`
      		);
		}
		updateSelectedChapter(data[0].Name, data[0].ID, data[0].FbURL, data[0].Flag);
		$("a[data-action='find-chapter']").html(`<i class="fas fa-map-marker-alt"></i>&nbsp;&nbsp;Find my chapter`);
	})
	.catch(error => {
		console.warn(error);
	});
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

function showChapterSelector() {
	$(".select-location-custom").css("display", "flex");
	$(".select-location-custom").fadeTo(200, .99);
}

function hideChapterSelector() {
	$(".select-location-custom").fadeTo(200, 0, function() {
		$(".select-location-custom").css("display", "none");
	});
}