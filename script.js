//VARIABLE DECLARATIONS
var cityButtonEl = document.getElementById("search-btn");
var cityInputEl = document.getElementById("city-input");
var currentweathercardEl = document.getElementById("current-weather-card");
var citynamesearchEl = document.getElementById("city-search-term");
var tempsearchEl = document.getElementById("temperature");
var humiditysearchEL = document.getElementById("humidity");
var windspeedsearchEL = document.getElementById("wind-speed");
var uvindexEL = document.getElementById("uv-index");


submitCity = function(e) {
    e.preventDefault();
    console.log('clicked');

    var cityInput = cityInputEl.value.trim();

    if (cityInput) {
        getCityInput(cityInput);

    }
}


var getCityInput = function (city) {

    apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=cb9f638b983772109f5be92fa81ecd11'

    

    fetch(apiURL)
     .then(function (response){

      if(response.ok) {
        console.log(response);
        response.json().then(function (data) {
            console.log(data);

            // var getIcon = data.weather[0].icon;
            // console.log(getIcon);
            
            // icon = 'http://openweathermap.org/img/wn/' + getIcon + '@2x.png';

            currentweathercardEl.classList.remove('hide');
            citynamesearchEl.textContent = data.name + ": " + moment().format("dddd, MMMM Do YYYY");
            tempsearchEl.textContent = "Temperature: " + data.main.temp + " " + String.fromCharCode(176) + "F";
            humiditysearchEL.textContent = "Humidity: " + data.main.humidity + "%";
            windspeedsearchEL.textContent = "Wind Speed: " + data.wind.speed + " MPH";
            uvindexEL.textContent = "UV Index:";
        });

      }

        })

}

cityButtonEl.addEventListener('click', submitCity);