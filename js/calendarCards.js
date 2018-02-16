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
            var card = '<div class="card"><div class="container"><h4><b>' + items[i].summary + '</b></h4><br/><p>' + getShowDate(startTime) + '</p><p>' + getShowTime(startTime) + '</p><p>' + '</p></div></card>';
            EventsDiv.innerHTML += card;      
        }
    });
});

function  getShowDate(date) {
    var legth = (date.toUTCString().length - 13);
    return "Date: " + date.toUTCString().substring(0, legth);
}

function  getShowTime(date) {
    var legth = (date.toLocaleTimeString().length);
    return "Start Time: " + date.toLocaleTimeString().substring(0, legth - 6) + date.toLocaleTimeString().substring(legth - 3, legth);
}