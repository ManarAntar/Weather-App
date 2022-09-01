let weatherApi;
let responseApi;
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
let currentLoc = 'Cairo';
let todayDay;

// search 
let searchBar = document.getElementById('search');

// todayCardVariables
let today = document.getElementById("today");
let todayDate = document.getElementById("todayDate");
let myLocation = document.getElementById("location");
let todayDegree = document.getElementById("todayDegree");
let todayIcon = document.getElementById("todayIcon");
let todayDesc = document.getElementById("todayDesc");
let humidty = document.getElementById("humidty");
let windSpeed = document.getElementById("windSpeed");
let compass = document.getElementById("compass");

// nextDayVariables
let nextDay = document.getElementsByClassName("nextDay");
let nextDayIcon = document.getElementsByClassName("nextDayIcon");
let maxDegree = document.getElementsByClassName("maxDegree");
let minDegree = document.getElementsByClassName("minDegree");
let forecastDesc = document.getElementsByClassName("forecastDesc");

//Featch Api
async function getWeatherApi() {
    weatherApi = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentLoc}&days=3`);
    responseApi = await weatherApi.json();
    console.log(responseApi);
    displayWeatherData();
    displayNextDayData();
}
getWeatherApi();


// Display Today Data
function displayWeatherData() {
    let date = new Date();
    todayDay = date.getDay();
    today.innerHTML = days[todayDay];
    todayDate.innerHTML = `${date.getDate()} ${months[date.getMonth()]}`;
    myLocation.innerHTML = responseApi.location.name;
    todayDegree.innerHTML = `${responseApi.current.temp_c}<sup>o</sup>C`;
    todayIcon.setAttribute('src', `http:${responseApi.current.condition.icon}`);
    todayDesc.innerHTML = responseApi.current.condition.text;
    humidty.innerHTML = `${responseApi.current.humidity}%`;
    windSpeed.innerHTML = `${responseApi.current.wind_kph} km/h`;
    compass.innerHTML = responseApi.current.wind_dir;
}

// Display Nextday Data
function displayNextDayData() {
    for (let i = 0; i < nextDayIcon.length; i++) {
        nextDay[i].innerHTML = days[new Date(responseApi.forecast.forecastday[i + 1].date).getDay()];
        nextDayIcon[i].setAttribute('src', `https:${responseApi.forecast.forecastday[i + 1].day.condition.icon}`);
        forecastDesc[i].innerHTML = responseApi.forecast.forecastday[i + 1].day.condition.text;
        maxDegree[i].innerHTML = `${responseApi.forecast.forecastday[i + 1].day.maxtemp_c}<sup>o</sup>C`;
        minDegree[i].innerHTML = `${responseApi.forecast.forecastday[i + 1].day.mintemp_c}<sup>o</sup>C`;

    }
}

// real Time Search
searchBar.addEventListener('keyup', function () {
    currentLoc = searchBar.value;
    getWeatherApi();
});
