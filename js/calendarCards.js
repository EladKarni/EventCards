var Root = 'https://www.googleapis.com/calendar/v3/calendars/';
var calendarID = '1kl8atmma4oppshf1ffa2h6do4@group.calendar.google.com';
var maxResults = 2;
var APIKey = 'AIzaSyBHIh0EFUSPss_CQrdDYlDmun23OJdsXBA';
var currectDate = (new Date()).toISOString();
var EventsDiv = document.getElementById("EventCards");

var geocoder;
var map;
var address = "San Diego, CA";


$(document).ready(function () {
    $.ajax({
      url: Root + calendarID + "/events?maxResults=" + maxResults + "&timeMin=" + currectDate + "&singleEvents=true&orderBy=startTime" + '&key=' + APIKey,
      method: 'GET'
    }).then(function(data) {
        var items = data.items;
        for(var i = 0; i < items.length; i++) {
            var startTime = new Date(items[i].start.dateTime);
            var card = `
                    <li class="card">
                        <div class="card--text">
                            <div class="text--container">
                                <div class="text--header">
                                    <h2 class="text--title">` + items[i].summary + `</h2>
                                        `+ getEventLocation(items[i]) + `
                                        <p>` + getEventDate(startTime) + `</p>
                                        <p>` + getEventTime(startTime) + `</p>
                                    </div>
                                </div>
                            </div>
                        <div id="map_canvas" ></div>
                    </li>`;
            EventsDiv.innerHTML += card;
            mapInitilization(items[i].location);
        }
    });
});

function  getEventLocation(evntLocation) {
    if(evntLocation.location){
        return  `<p><i class="fas fa-map-marker-alt"></i> ` + evntLocation.location + `</p>`
    } else {
        return '';
    }
}

function  getEventDate(date) {
    var legth = (date.toUTCString().length - 13);
    return `<i class="far fa-calendar-alt"></i> ` + date.toUTCString().substring(0, legth);
}

function  getEventTime(time) {
    var legth = (time.toLocaleTimeString().length);
    return `<i class="far fa-clock"></i> ` + time.toLocaleTimeString().substring(0, legth - 6) + time.toLocaleTimeString().substring(legth - 3, legth);
}

function mapInitilization(location) {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(40.4406, 79.9959);
    var myOptions = {
      zoom: 17,
      center: latlng,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
      },
      navigationControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
  
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  
    if (geocoder) {
      geocoder.geocode({
        'address': location
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
              map.setCenter(results[0].geometry.location);
            var infowindow = new google.maps.InfoWindow({
              content: '<b>' + address + '</b>',
              size: new google.maps.Size(150, 50)
            });
  
            var marker = new google.maps.Marker({
              position: results[0].geometry.location,
              map: map,
              title: address
            });
            google.maps.event.addListener(marker, 'click', function() {
              infowindow.open(map, marker);
            });
  
          } else {
            alert("No results found");
          }
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });
    }  
  }  