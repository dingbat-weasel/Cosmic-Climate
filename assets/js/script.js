const nasaAPIKey = "S7totvp99lZVSFYYOyQf6MWFjfqmkXftXQguSU6k";
const weatherAPIKey = "cd6e68596f1256478d4f74585fda2916";
const unsplashAPI = "6CNuMUBWat5swNnIhwjW2O3Wc4RgVRCKRbkaCK5i5gI";

const searchButtonEl = $("#search-button");
const dateInputEl = $("#datepicker");
const locationInputEl = $("#location-search");
const searchInputEl = $("#search-input");
const searchHistoryListEl = $("#search-history");
const searchHistory = [];
const today = dayjs().format("YYYY-MM-DD");

const currentLocationEl = $("#current-location");
const currentTempEl = $("#temp");
const currentUVEl = $("#uv");
const moonriseEl = $("#moonrise");
const moonsetEl = $("#moonset");
const weatherTitleEl = $("#weather-title");
const spaceResultsEl = $("#space-results");

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

  const searchValue = dateInputEl.val();
  console.log(searchValue);
  console.log(locationInputEl.val());

  getEarthPhoto();
  getWeather();
  getAstronomyPhoto();
  getRoverManifests();
  getRoverPhoto();
  getAsteroid();

  history(locationInputEl.val(), searchValue);
});

// Gets weather based off user location and date input
function getWeather() {
  console.log(dateInputEl.val());

  if (dateInputEl.val() === today) {
    const currentQueryURL =
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
    const historicalQueryURL =
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
    weatherTitleEl.text("Current weather!");
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
    const avgtemp = Object.values(data.historical);

    weatherTitleEl.text("Weather in the past!");
    currentLocationEl.text(data.location.name);
    currentLocationEl.prepend("Location: ");
    console.log(avgtemp);
    currentTempEl.text(avgtemp[0].avgtemp);
    currentTempEl.prepend("Average Temperature: ");
    currentTempEl.append("&deg;F");
    currentUVEl.text(avgtemp[0].uv_index);
    currentUVEl.prepend("UV Index: ");
    currentUVEl.append(" mW/m" + "<sup>2</sup>");
    moonriseEl.text(avgtemp[0].astro.moonrise);
    moonriseEl.prepend("Moonrise: ");
    moonsetEl.text(avgtemp[0].astro.moonset);
    moonsetEl.prepend("Moonset: ");
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
    return Math.floor(Math.random() * max + 1);
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
  const apodQueryURL =
    "https://api.nasa.gov/planetary/apod?date=" +
    dateInputEl.val() +
    "&api_key=" +
    nasaAPIKey;
  fetch(apodQueryURL)
    .then((response) => response.json())
    .then((response) => {
      document.querySelector("#space-photo").src = response.hdurl;
      // Facts about the photo
      document.querySelector("#photo-description").textContent =
        response.explanation;
    });
}

// Pulls earth image
function getEarthPhoto() {
  const unsplashApiUrl =
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
  const asteroidQueryURL =
    "https://api.nasa.gov/neo/rest/v1/feed?start_date=" +
    dateInputEl.val() +
    "&endDate=" +
    dateInputEl.val() +
    "&api_key=" +
    nasaAPIKey;

  let closestAsteroid = null;

  fetch(asteroidQueryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const asteroids = data.near_earth_objects[dateInputEl.val()];

      for (i = 0; i < asteroids.length; i++) {
        let asteroid = asteroids[i];
        let distance = parseFloat(
          asteroid.close_approach_data[0].miss_distance.kilometers
        );
        closestAsteroid = asteroid;
      }
      spaceResultsEl.text(closestAsteroid.name);
      spaceResultsEl.prepend("The closest asteroid to Earth is ");
      spaceResultsEl.append(
        " with an estimated max diameter of " +
          closestAsteroid.estimated_diameter.feet.estimated_diameter_max +
          " feet."
      );
    });
}

// Saves the search history of cities to an array
function history(locationInputEl, searchValue) {
  if (locationInputEl && searchValue) {
    if (searchHistory.indexOf(locationInputEl + " " + searchValue) === -1) {
      searchHistory.push(locationInputEl + " " + searchValue);
      listArray();
    }
  }
}

// Lists array of search history
function listArray() {
  searchHistoryListEl.empty();
  searchHistory.forEach(function (findings) {
    const searchHistoryItem = $('<p class="list-group-item">');
    searchHistoryItem.attr("data-value", findings);
    searchHistoryItem.text(findings);
    searchHistoryListEl.prepend(searchHistoryItem);
  });
  localStorage.setItem("searches", JSON.stringify(searchHistory));
}