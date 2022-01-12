// ```
// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// ```
var searchEl = document.querySelector('#search-bar');
var locationEl = document.querySelector('.location');
var btn = document.querySelector('button');
var currentTemp = document.querySelector('#currTemp');
var currentWind = document.querySelector('#currWind');
var currentHum = document.querySelector('#currHumid');
var currentUv = document.querySelector('#currUV');
var APIKEY = '2b914da3e4df952eab660c3233a288c0';
var queryURL2;
var lat;
var lon;


function getApi(request) {
    fetch(request)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            
            lat = data.city.coord.lat;
            lon = data.city.coord.lon;
            queryURL2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + APIKEY;
            getApi2(queryURL2);
        });

}

function getApi2(request2) {
    fetch(request2)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        currentTemp.innerHTML = 'Temp: ' + data.current.temp +'°F';
        currentWind.innerHTML = 'Wind: ' + data.current.wind_speed + ' MPH';
        currentHum.innerHTML = 'Humidity: ' + data.current.humidity + ' %';
        currentUv.innerHTML = 'UV Index: ' + data.current.uvi;

    });
}

function getUrl() {
    var city = searchEl.value;
    var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + APIKEY;
    getApi(queryURL);
}

btn.addEventListener('click', getUrl)