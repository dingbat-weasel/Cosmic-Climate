var APIKey = "S7totvp99lZVSFYYOyQf6MWFjfqmkXftXQguSU6k";
var searchButtonEl = $('#search-button');
var dateInputEl = $('#datepicker');

//  // Date autocomplete
$(function () {
    dateInputEl.datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'yy-mm-dd'
    });
});

searchButtonEl.on("click", function (event) {
    event.preventDefault();

    var searchValue = dateInputEl.val();
    console.log(searchValue);

    getAstronomyPhoto();
});

//  // Pulls image from selected date
function getAstronomyPhoto() {
    console.log(dateInputEl)
    var queryURL = "https://api.nasa.gov/planetary/apod?date=" + dateInputEl.val() + "&api_key=" + APIKey;

    fetch(queryURL)
        .then(res => res.json())
        .then(response => {
            document.querySelector('#space-photo').src = response.hdurl
            // Facts about the photo
            document.querySelector('#photo-description').textContent = response.explanation
        })
}





// //  // FETCHNG WEATHERSTACK API:

var WeatherstackAccessKeyApi = "cd6e68596f1256478d4f74585fda2916";
var locationValue = document.querySelector(".location-value");
// var currentWeatherApiUrl = "https://api.weatherstack.com/current?access_key=" + WeatherstackAccessKeyApi + "&query=" + locationValue.value + "&units=m";

// searchButtonEl.on("click", function () {

//     if (locationValue.value !== "") {
//         console.log(locationValue);
//         getCurrentWeatherApi();

//     } else {
//         getAstronomyPhoto();
//     }
// });



// //  // https://api.weatherstack.com/current?access_key=cd6e68596f1256478d4f74585fda2916&query=seattle

// //  // https://api.weatherstack.com/current
// //  //     ? access_key = YOUR_ACCESS_KEY
// //  //     & query = New York





// function getCurrentWeatherApi(currentWeatherApiUrl) {
//     fetch(currentWeatherApiUrl)
//         .then(function (response) {
//             console.log(response);
//             if (response.status === 200) {
//                 console.log(response.status);
//             }
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data);
//         })

// }


fetch("https://api.weatherstack.com/current?access_key=" + WeatherstackAccessKeyApi + "&query=" + locationValue.value + "&units=m")
.then (res => res.json())
.then(data =>console.log(data))




// //   // FETCHNG -- HISTORICAL -- WEATHERSTACK API:
// //   // IMPORTANT: To look up historical weather data all the way back to 2008, simply pass one date of your choice (later than July 2008)

var historicalWeatherApiUrl = "https://api.weatherstack.com/historical?access_key=" + WeatherstackAccessKeyApi + "&query=" + locationValue.value + "& historical_date =" + dateInputEl.val() + "&hourly=1&units=m";


// searchButtonEl.on("click", function () {

//     if (locationValue.value !== "" && dateInputEl.val() !== "") {
//         console.log(locationValue);
//         console.log(dateInputEl);
//         getHistoricalWeatherApi();

//     } else {
//         getAstronomyPhoto();
//     }
// });

// function getHistoricalWeatherApi(historicalWeatherApiUrl) {
//     fetch(historicalWeatherApiUrl)
//         .then(function (response) {
//             console.log(response);
//             if (response.status === 200) {
//                 console.log(response.status);
//             }
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data);
//         })

// }


fetch("https://api.weatherstack.com/historical?access_key=" + WeatherstackAccessKeyApi + "&query=" + locationValue.value + "& historical_date =" + dateInputEl.val() + "&hourly=1&units=m")
.then (res => res.json())
.then(data =>console.log(data))




// // // https://api.weatherstack.com/autocomplete
// // //     ? access_key = YOUR_ACCESS_KEY
// // //     & query = london

fetch("https://api.weatherstack.com/autocomplete?access_key=" + WeatherstackAccessKeyApi + "&query=" + locationValue.value)
.then (res => res.json())
.then(data =>console.log(data))





// var currentWeatherApiUrl = "https://api.weatherstack.com/current?access_key=" + WeatherstackAccessKeyApi + "&query=" + locationValue.value + "&units=m";

// searchButtonEl.on("click", function () {

//     if (locationValue.value !== "") {
//         console.log(locationValue);
//         getCurrentWeatherApi();

//     } else {
//         getAstronomyPhoto();
//     }
// });


fetch("https://api.weatherstack.com/current?access_key=" + WeatherstackAccessKeyApi + "&query=" + locationValue.value + "&units=m")
.then (res => res.json())
.then(data =>console.log(data))







//  TRYING AJAX :

// $.ajax({
//     url: 'https://api.weatherstack.com/current',
//     data: {
//       access_key: 'YOUR_ACCESS_KEY',
//       query: 'New York'
//     },
//     dataType: 'json',
//     success: function(apiResponse) {
//       console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
//     }
//   });


// var currentWeatherApiUrl = "https://api.weatherstack.com/current?access_key=" + WeatherstackAccessKeyApi + "&query=" + locationValue.value + "&units=m";

// $.ajax({
//     url: 'https://api.weatherstack.com/current',
//     data: {
//       access_key: WeatherstackAccessKeyApi,
//       query: locationValue.value
//     },
//     dataType: 'json',
//     success: function(apiResponse) {
//       console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
//     }
//   });




