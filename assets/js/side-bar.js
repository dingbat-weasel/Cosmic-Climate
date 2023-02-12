var sideBarContainer = document.querySelector(".sidebar-container");
var sideBar = document.querySelector(".sidebar");
var toggle = document.querySelector(".toggle");
var searchBtn = document.querySelector(".search-box");
var modeSwitch = document.querySelector(".toggle-switch");
var modeText = document.querySelector(".mode-text");


toggle.addEventListener ("click", () => {
    sideBar.classList.toggle("close");
});

searchBtn.addEventListener ("click", () => {
    sideBar.classList.remove("close");
});


modeSwitch.addEventListener ("click", () => {
    sideBarContainer.classList.toggle("dark");

    if(sideBarContainer.classList.contains("dark")) {
        modeText.innerText = "Light Mode"
    } else {
        modeText.innerText = "Dark Mode"
    }
});