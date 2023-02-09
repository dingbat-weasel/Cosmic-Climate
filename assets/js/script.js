var APIKey = "S7totvp99lZVSFYYOyQf6MWFjfqmkXftXQguSU6k";
var searchButtonEl = $('#search-button');
var dateInputEl = $('#datepicker');

// Date autocomplete
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

// Pulls image from selected date
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
