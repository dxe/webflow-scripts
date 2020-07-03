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
          if (chapter.FbURL) infoContent += `<div class="map-icon-column"><center><a href="${chapter.FbURL}" target="_blank"><div class="map-icon">${fbIcon}</div></a></center></div>`
          if (chapter.TwitterURL) infoContent += `<div class="map-icon-column"><center><a href="${chapter.TwitterURL}" target="_blank"><div class="map-icon">${twitterIcon}</div></a></center></div>`
          if (chapter.InstaURL) infoContent += `<div class="map-icon-column"><center><a href="${chapter.InstaURL}" target="_blank"><div class="map-icon">${instaIcon}</div></a></center></div>`
          if (chapter.Email) infoContent += `<div class="map-icon-column"><center><a href="mailto:${chapter.Email}" target="_blank"><div class="map-icon">${mailIcon}</div></a></center></div>`
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
          // insert chapter into accordian
          chapterDataAccordian = `
            <div class="chapter-list-item">
               <p class="paragraph-chapter-list">${chapter.Flag} ${chapter.Name}<br></p>
               <div class="chapter-icons-div">
               `
          chapterDataAccordian += (chapter.FbURL) ? `<a href="${chapter.FbURL}" target="_blank" class="w-inline-block"><div class="accordian-icon">${fbIcon}</div></a>` : ""
          chapterDataAccordian += (chapter.TwitterURL) ? `<a href="${chapter.TwitterURL}" target="_blank" class="w-inline-block"><div class="accordian-icon">${twitterIcon}</div></a>` : ""
          chapterDataAccordian += (chapter.InstaURL) ? `<a href="${chapter.InstaURL}" target="_blank" class="w-inline-block"><div class="accordian-icon">${instaIcon}</div></a>` : ""
          chapterDataAccordian += (chapter.Email) ? `<a href="mailto:${chapter.Email}" target="_blank" class="w-inline-block"><div class="accordian-icon">${mailIcon}</div></a>` : ""
          chapterDataAccordian += `</div></div>`;
          // append accordian data to div on page
          let regionDiv = "";
          switch(region) {
            case "Asia-Pacific":
              regionDiv = "#chapters-asia";
              break;
            case "Central & South America":
              regionDiv = "#chapters-central";
              break;
            case "Europe":
              regionDiv = "#chapters-europe";
              break;
            case "Middle East & Africa":
              regionDiv = "#chapters-middle";
              break;
            case "North America":
              regionDiv = "#chapters-north";
              break;
          }
          if (regionDiv != "") $(regionDiv).append(chapterDataAccordian);
        })

      }
      
    }
  })
  .catch(error => {
    console.warn(error);
  });
}