function initMap() {
  window.infoWindow = new google.maps.InfoWindow({
    minWidth: 200,
  });

  window.map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: new google.maps.LatLng(25.151388, 18.509137),
    zoom: 2,
    mapTypeControl: false,
    streetViewControl: false,
    styles: [
              {
                "stylers": [
                  {
                    "hue": "#e7ecf0"
                  }
                ]
              },
              {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "poi",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "road",
                "stylers": [
                  {
                    "saturation": -70
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "transit",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "water",
                "stylers": [
                  {
                    "saturation": -60
                  },
                  {
                    "visibility": "simplified"
                  }
                ]
              }
            ]
  });

  // zoom map out more on mobile
  if (window.matchMedia('screen and (max-width: 768px)').matches) map.setZoom(0);

  const fbIcon = `<img src="https://ec2.dxe.io/img/fb.svg">`;
  const twitterIcon = `<img src="https://ec2.dxe.io/img/twitter.svg">`;
  const instaIcon = `<img src="https://ec2.dxe.io/img/insta.svg">`;
  const mailIcon = `<img src="https://ec2.dxe.io/img/envelope.svg">`;

  window.markers = [];

  fetch(`https://adb.dxe.io/fb_pages`)
    .then(res => {
    return res.json();
  })
    .then(regions => {
    for (let [region, chapters] of Object.entries(regions)) {
      if (region != 'Online') {
        chapters.forEach(chapter => {
          // create marker on map w/ info window
          var infoContent =  `<div class="info-window"><div style="padding-bottom: 10px;"><center><span style="font-family: Inter,sans-serif; font-size: 1.2em;">${chapter.Name}</span></center></div>`
          infoContent += `<div class="row">`
          // add relevant icons
          infoContent += (chapter.FbURL) ? `<div class="map-icon-column"><center><a href="${chapter.FbURL}" target="_blank"><div class="map-icon">${fbIcon}</div></a></center></div>` : ""
          infoContent += (chapter.TwitterURL) ? `<div class="map-icon-column"><center><a href="${chapter.TwitterURL}" target="_blank"><div class="map-icon">${twitterIcon}</div></a></center></div>` : ""
          infoContent += (chapter.InstaURL) ? `<div class="map-icon-column"><center><a href="${chapter.InstaURL}" target="_blank"><div class="map-icon">${instaIcon}</div></a></center></div>` : ""
          infoContent += (chapter.Email) ? `<div class="map-icon-column"><center><a href="mailto:${chapter.Email}" target="_blank"><div class="map-icon">${mailIcon}</div></a></center></div>` : ""
          infoContent += `</div></div>`
          var point = new google.maps.LatLng(
            parseFloat(chapter.Lat),
            parseFloat(chapter.Lng)
          );
          var icon = {
              url: "https://ec2.dxe.io/img/maps-pin2.png",
              scaledSize: new google.maps.Size(30, 30),
              origin: new google.maps.Point(0,0),
              anchor: new google.maps.Point(15, 30)
          };
          var marker = new google.maps.Marker({
            map: map,
            position: point,
            icon: icon,
          });
          markers.push(marker);
          marker.addListener('click', function() {
            infoWindow.setContent(infoContent);
            infoWindow.open(map, marker);
          });
        })

      }
      
    }
  })
  .catch(error => {
    console.warn(error);
  });
}