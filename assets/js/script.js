var nasaAPIKey = "S7totvp99lZVSFYYOyQf6MWFjfqmkXftXQguSU6k";
var weatherAPIKey = "cd6e68596f1256478d4f74585fda2916";
var unsplashAPI = "6CNuMUBWat5swNnIhwjW2O3Wc4RgVRCKRbkaCK5i5gI";

var searchButtonEl = $("#search-button");
var dateInputEl = $("#datepicker");
var locationInputEl = $("#location-search");
var searchInputEl = $("#search-input");
var today = dayjs().format("YYYY-MM-DD");

var currentLocationEl = $("#current-location");
var currentTempEl = $("#temp");
var currentUVEl = $("#uv");

var currentTempEl = $("#temp");

var geoResultsEl = $("#geo-results");

// Date autocomplete
$(function () {
  dateInputEl.datepicker({
    changeMonth: true,
    changeYear: true,
    maxDate: "0",
    dateFormat: "yy-mm-dd",
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
  getRoverManifests();
  getRoverPhoto();
});

// Gets weather based off user location and date input
function getWeather() {
  console.log(dateInputEl.val());

  if (dateInputEl.val() === today) {
    var queryURL =
      "https://api.weatherstack.com/current?access_key=" +
      weatherAPIKey +
      "&query=" +
      locationInputEl.val() +
      "&units=f";

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
      });
  } else {
    var queryURL =
      "https://api.weatherstack.com/historical?access_key=" +
      weatherAPIKey +
      "&query=" +
      locationInputEl.val() +
      "&historical_date=" +
      dateInputEl.val() +
      "&units=f";

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
      });
  }

  function currentForecast(data) {
    currentLocationEl.text(data.location.name);
    currentLocationEl.prepend("Location: ");
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
    currentLocationEl.prepend("Location: ");
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
  var queryURL =
    "https://api.nasa.gov/planetary/apod?date=" +
    dateInputEl.val() +
    "&api_key=" +
    nasaAPIKey;

  fetch(queryURL)
    .then((response) => response.json())
    .then((response) => {
      document.querySelector("#space-photo").src = response.hdurl;
      // Facts about the photo
      document.querySelector("#photo-description").textContent =
        response.explanation;
    });
}

function getRoverManifests() {
  // These rover manifests contain information regarding the time period that each rover was active
  // Useful for determining which rover to grab photos from
  // Not for user
  const queryURLSpirit = `https://api.nasa.gov/mars-photos/api/v1/manifests/Spirit/?api_key=${nasaAPIKey}`;
  const queryURLOpportunity = `https://api.nasa.gov/mars-photos/api/v1/manifests/Opportunity/?api_key=${nasaAPIKey}`;
  const queryURLCuriosity = `https://api.nasa.gov/mars-photos/api/v1/manifests/Curiosity/?api_key=${nasaAPIKey}`;

  fetch(queryURLSpirit)
    .then((response) => response.json())
    .then((data) => console.log(data));

  fetch(queryURLOpportunity)
    .then((response) => response.json())
    .then((data) => console.log(data));

  fetch(queryURLCuriosity)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

function getSpiritRoverPhoto() {
  const queryURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?earth_date=${dateInputEl.val()}&api_key=${nasaAPIKey}&camera=fhaz`;

  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      document.querySelector("#rover-photo").src =
        data?.photos[0]?.img_src ??
        "./assets/images/rover_missing_src_catch.jpg";
    });
}

function getOpportunityRoverPhoto() {
  const queryURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?earth_date=${dateInputEl.val()}&api_key=${nasaAPIKey}&camera=fhaz`;

  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      document.querySelector("#rover-photo").src =
        data?.photos[0]?.img_src ??
        "./assets/images/rover_missing_src_catch.jpg";
    });
}

function getCuriosityRoverPhoto() {
  const queryURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${dateInputEl.val()}&api_key=${nasaAPIKey}&camera=navcam`;

  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      document.querySelector("#rover-photo").src =
        data?.photos[0]?.img_src ??
        "./assets/images/rover_missing_src_catch.jpg";
    });
}

function getRoverPhoto() {
  const currentDate = new Date(dateInputEl.val());
  const spiritBirth = new Date("2004-01-05");
  const spiritDeath = new Date("2010-03-21");
  const opportunityDeath = new Date("2018-06-11");
  console.log(dateInputEl, dateInputEl.val(), currentDate);
  console.log(spiritBirth, spiritDeath, opportunityDeath);

  if (currentDate < spiritBirth) {
    console.log("Try a date after Jan 5th 2004");
  } else if (spiritBirth <= currentDate && currentDate <= spiritDeath) {
    console.log("Spirit picture");
    getSpiritRoverPhoto();
  } else if (spiritDeath < currentDate && currentDate <= opportunityDeath) {
    console.log("Opportunity picture");
    getOpportunityRoverPhoto();
  } else if (opportunityDeath < currentDate) {
    console.log("Curiosity picture");
    getCuriosityRoverPhoto();
  } else {
    console.error("Issue with getRoverPhoto() date call");
  }
}
