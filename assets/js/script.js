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

var spaceResultsEl = $("#space-results");

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

  getEarthPhoto();
  getWeather();
  getAstronomyPhoto();
  getRoverManifests();
  getRoverPhoto();
  getAsteroid();
});

// Gets weather based off user location and date input
function getWeather() {
  console.log(dateInputEl.val());

  if (dateInputEl.val() === today) {
    var currentQueryURL =
      "https://api.weatherstack.com/current?access_key=" +
      weatherAPIKey +
      "&query=" +
      locationInputEl.val() +
      "&units=f";

    fetch(currentQueryURL)
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
    var historicalQueryURL =
      "https://api.weatherstack.com/historical?access_key=" +
      weatherAPIKey +
      "&query=" +
      locationInputEl.val() +
      "&historical_date=" +
      dateInputEl.val() +
      "&units=f";

    fetch(historicalQueryURL)
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

      const sol = data?.photos[0]?.sol;

      document.querySelector("#rover-photo").src =
        data?.photos[0]?.img_src ??
        "./assets/images/rover_missing_src_catch.jpg";
      document.querySelector(
        "#rover_description"
      ).textContent = `Martian days are known as sols. Here you are looking at a photo taken from the Spirit rover on it's ${sol} sol. Spirit's first sol was on January 4th, 2004 and it survived until March 21st, 2010. It was a healthy 2208 sols old when it died.`;
      if (
        document.querySelector("#rover-photo").src ===
        "./assets/images/rover_missing_src_catch.jpg"
      ) {
        document.querySelector("#rover_description").textContent = "";
      }
    });
}

function getOpportunityRoverPhoto() {
  const queryURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?earth_date=${dateInputEl.val()}&api_key=${nasaAPIKey}&camera=fhaz`;

  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const sol = data?.photos[0]?.sol;
      document.querySelector("#rover-photo").src =
        data?.photos[0]?.img_src ??
        "./assets/images/rover_missing_src_catch.jpg";

      document.querySelector(
        "#rover_description"
      ).textContent = `Martian days are known as sols. Here you are looking at a photo taken from the Opportunity rover on it's ${sol} sol. Opportunity's first sol was on January 25th, 2004 and it survived until June 11th, 2018. It was a healthy 5111 sols old when it died.`;
      if (
        document.querySelector("#rover-photo").src ===
        "./assets/images/rover_missing_src_catch.jpg"
      ) {
        document.querySelector("#rover_description").textContent = "";
      }
    });
}

function getCuriosityRoverPhoto() {
  const queryURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${dateInputEl.val()}&api_key=${nasaAPIKey}&camera=navcam`;

  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const sol = data?.photos[0]?.sol;
      document.querySelector("#rover-photo").src =
        data?.photos[0]?.img_src ??
        "./assets/images/rover_missing_src_catch.jpg";

      document.querySelector(
        "#rover_description"
      ).textContent = `Martian days are known as sols. Here you are looking at a photo taken from the Curiosity rover on it's ${sol} sol. Curiosity's first sol was on August 6th, 2012 and it is still active! Check back for updates from Curiosity.`;
      if (
        document.querySelector("#rover-photo").src ===
        "./assets/images/rover_missing_src_catch.jpg"
      ) {
        document.querySelector("#rover_description").textContent = "";
      }
    });
}

function writeMartianWeather() {
  const marsWeather = [
    "Dirt",
    "Grey",
    "Sand",
    "Very No-Air",
    "Robots Only",
    "Rock",
    "Space",
    "Not Much",
  ];

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  let weatherToday = marsWeather[getRandomInt(marsWeather.length)];

  document.querySelector(
    "#mars_weather"
  ).textContent = `The weather on Mars today is: ${weatherToday}`;
}

function getRoverPhoto() {
  const currentDate = new Date(dateInputEl.val());
  const spiritBirth = new Date("2004-01-05");
  const spiritDeath = new Date("2010-03-21");
  const opportunityDeath = new Date("2018-06-11");

  writeMartianWeather();

  if (currentDate < spiritBirth) {
    console.log("Try a date after Jan 5th 2004");
  } else if (spiritBirth <= currentDate && currentDate <= spiritDeath) {
    console.log("Displaying an image from the Spirit rover.");
    getSpiritRoverPhoto();
  } else if (spiritDeath < currentDate && currentDate <= opportunityDeath) {
    console.log("Displaying an image from the Opportunity rover.");
    getOpportunityRoverPhoto();
  } else if (opportunityDeath < currentDate) {
    console.log("Displaying an image from the Curiosity rover.");
    getCuriosityRoverPhoto();
  } else {
    console.error("Issue with getRoverPhoto() date call");
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

// //    // var unsplashApiUrl = "https://api.unsplash.com/photos/?client_id=" + unsplashAPI;
// //    // var unsplashApiUrl = "https://api.unsplash.com/search/photos/?query="+ locationInputEl.val() +"&client_id=" + unsplashAPI;
//     var unsplashApiUrl = "https://api.unsplash.com/photos/random?query="+ locationInputEl.val() +"&client_id=" + unsplashAPI;

// pulls earth image

function getEarthPhoto() {
  var unsplashApiUrl =
    "https://api.unsplash.com/photos/random?query=" +
    locationInputEl.val() +
    "&client_id=" +
    unsplashAPI;
  fetch(unsplashApiUrl)
    .then((response) => response.json())
    .then((response) => {
      document.querySelector("#earth-photo").src = response.urls.regular;
    });
}

// Pulls nearest asteroid information
function getAsteroid() {
  var asteroidQueryURL =
    "https://api.nasa.gov/neo/rest/v1/feed?start_date=" +
    dateInputEl.val() +
    "&endDate=" +
    dateInputEl.val() +
    "&api_key=" +
    nasaAPIKey;

  var closestAsteroid = null;

  fetch(asteroidQueryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var asteroids = data.near_earth_objects[dateInputEl.val()];

      for (var i = 0; i < asteroids.length; i++) {
        var asteroid = asteroids[i];
        var distance = parseFloat(
          asteroid.close_approach_data[0].miss_distance.kilometers
        );
        closestAsteroid = asteroid;
      }
      spaceResultsEl.text(closestAsteroid.name);
      spaceResultsEl.prepend("The closest asteroid to Earth is: ");
      spaceResultsEl.append(
        " with an estimated max diameter of " +
          closestAsteroid.estimated_diameter.feet.estimated_diameter_max +
          " feet."
      );
    });
}
