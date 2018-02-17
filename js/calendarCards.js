var Root = 'https://www.googleapis.com/calendar/v3/calendars/';
var calendarID = '<YOUR CALENDAR ID HERE>';
var maxResults = 2;
var APIKey = '<YOUR KEY HERE>';
var currectDate = (new Date()).toISOString();
var EventsDiv = document.getElementById("EventCards");

$(document).ready(function () {
    $.ajax({
      url: Root + calendarID + "/events?maxResults=" + maxResults + "&timeMin=" + currectDate + "&singleEvents=true&orderBy=startTime" + '&key=' + APIKey,
      method: 'GET'
    }).then(function(data) {
        var items = data.items;
        for(var i = 0; i < items.length; i++) {
            var startTime = new Date(items[i].start.dateTime);
            var card = `
                <div class="card">
                    <h2>
                        <b>` + items[i].summary + `</b>
                    </h2>`
                    + getEventLocation(items[i]) + `
                    <p>` + getEventDate(startTime) + `</p>
                    <p>` + getEventTime(startTime) + `</p>
                </card>`;
            EventsDiv.innerHTML += card;
        }
    });
});

function  getEventLocation(evntLocation) {
    if(evntLocation.location){
        return  `<p><a href="http://maps.google.com/?q=` + evntLocation.location + `"><i class="fas fa-map-marker-alt"></i> ` + evntLocation.location + `</a></p>`
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