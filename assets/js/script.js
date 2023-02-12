var nasaAPIKey = "S7totvp99lZVSFYYOyQf6MWFjfqmkXftXQguSU6k";
var weatherAPIKey = 'cd6e68596f1256478d4f74585fda2916';
var unsplashAPI = "6CNuMUBWat5swNnIhwjW2O3Wc4RgVRCKRbkaCK5i5gI";

var searchButtonEl = $('#search-button');
var dateInputEl = $('#datepicker');
var locationInputEl = $('#location-search');
var searchInputEl = $('#search-input');
var today = dayjs().format('YYYY-MM-DD');

var currentLocationEl = $("#current-location");
var currentTempEl = $("#temp");
var currentUVEl = $("#uv");

var currentTempEl = $("#temp");

var geoResultsEl = $('#geo-results');


// Date autocomplete
$(function () {
    dateInputEl.datepicker({
        changeMonth: true,
        changeYear: true,
        maxDate: '0',
        dateFormat: 'yy-mm-dd'
    });
});

searchButtonEl.on("click", function (event) {
    event.preventDefault();

    if (dateInputEl.val() == 0 || locationInputEl.val() == 0) {
        return false;
    }

    var searchValue = dateInputEl.val();
    console.log(searchValue);
    console.log(locationInputEl.val());

    getWeather();
    getAstronomyPhoto();
});

// Gets weather based off user location and date input
function getWeather() {
    console.log(dateInputEl.val());

    if (dateInputEl.val() === today) {
        var queryURL = "https://api.weatherstack.com/current?access_key=" + weatherAPIKey + "&query=" + locationInputEl.val() + "&units=f";

        fetch(queryURL)
            .then(function (response) {
                if (response.ok) {
                    console.log(response.status);
                    return response.json();
                }
            })
            .then(function (data) {
                console.log(data);
                currentForecast(data);
            })
    } else {
        var queryURL = "https://api.weatherstack.com/historical?access_key=" + weatherAPIKey + "&query=" + locationInputEl.val() + "&historical_date=" + dateInputEl.val() + "&units=f";

        fetch(queryURL)
            .then(function (response) {
                if (response.ok) {
                    console.log(response.status);
                    return response.json();
                }
            })
            .then(function (data) {
                console.log(data);
                historicalForecast(data);
            })
    }

    function currentForecast(data) {
        currentLocationEl.text(data.location.name);
        currentLocationEl.prepend("Location: ")
        currentTempEl.text(data.current.temperature);
        currentTempEl.prepend("Current Temperature: ");
        currentTempEl.append("&deg;F");
        currentUVEl.text(data.current.uv_index);
        currentUVEl.prepend("UV Index: ");
        currentUVEl.append(" mW/m" + "<sup>2</sup>");
    }

    function historicalForecast(data) {
        var avgtemp = Object.values(data.historical);
        
        currentLocationEl.text(data.location.name);
        currentLocationEl.prepend("Location: ")
        console.log(avgtemp);
        currentTempEl.text(avgtemp[0].avgtemp);
        currentTempEl.prepend("Average Temperature: ");
        currentTempEl.append("&deg;F");
        currentUVEl.text(avgtemp[0].uv_index);
        currentUVEl.prepend("UV Index: ");
        currentUVEl.append(" mW/m" + "<sup>2</sup>");
    }
}

// Pulls Astronomy image from selected date
function getAstronomyPhoto() {
    var queryURL = "https://api.nasa.gov/planetary/apod?date=" + dateInputEl.val() + "&api_key=" + nasaAPIKey;

    fetch(queryURL)
        .then(response => response.json())
        .then(response => {
            document.querySelector('#space-photo').src = response.hdurl
            // Facts about the photo
            document.querySelector('#photo-description').textContent = response.explanation
        })
}