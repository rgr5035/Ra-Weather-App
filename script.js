//VARIABLE DECLARATIONS
var cityButtonEl = document.getElementById("search-btn");
var cityInputEl = document.getElementById("city-input");
var currentweathercardEl = document.getElementById("current-weather-card");
var citynamesearchEl = document.getElementById("city-search-term");
var iconimgEl = document.getElementById("icon-img");
var tempsearchEl = document.getElementById("temperature");
var humiditysearchEL = document.getElementById("humidity");
var windspeedsearchEL = document.getElementById("wind-speed");
var uvindexEL = document.getElementById("uv-index");

submitCity = function (e) {
  e.preventDefault();
  console.log("clicked");

  var cityInput = cityInputEl.value.trim();

  if (cityInput) {
    getCityInput(cityInput);
    getfivedayInput(cityInput);
  }
};

var getCityInput = function (city) {
  currentWeatherapiURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=cb9f638b983772109f5be92fa81ecd11";

  fetch(currentWeatherapiURL).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data);

        var cityLat = data.coord.lat;
        var cityLon = data.coord.lon;

        uvindexapiURL =
          "http://api.openweathermap.org/data/2.5/uvi?lat=" +
          cityLat +
          "&lon=" +
          cityLon +
          "&appid=cb9f638b983772109f5be92fa81ecd11";

        fetch(uvindexapiURL).then(function (response) {
          if (response.ok) {
            console.log(response);
            response.json().then(function (datatwo) {
              console.log(datatwo);

              var getIcon = data.weather[0].icon;
              console.log(getIcon);

              icon = "http://openweathermap.org/img/wn/" + getIcon + "@2x.png";

              currentweathercardEl.classList.remove("hide");
              citynamesearchEl.textContent =
                data.name + ": " + moment().format("dddd, MMMM Do YYYY");

              iconimgEl.setAttribute("src", icon);

              tempsearchEl.textContent =
                "Temperature: " +
                data.main.temp +
                " " +
                String.fromCharCode(176) +
                "F";
              humiditysearchEL.textContent =
                "Humidity: " + data.main.humidity + "%";
              windspeedsearchEL.textContent =
                "Wind Speed: " + data.wind.speed + " MPH";
              uvindexEL.textContent = "UV Index: " + datatwo.value;

              uvindexapiURL =
                "http://api.openweathermap.org/data/2.5/uvi?lat=" +
                cityLat +
                "&lon=" +
                cityLon +
                "&appid=cb9f638b983772109f5be92fa81ecd11";
            });
          }
        });
      });
    }
  });
};

var getfivedayInput = function (city) {
  fivedayapiURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial&&appid=cb9f638b983772109f5be92fa81ecd11";

  fetch(fivedayapiURL).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (datathree) {
        console.log(datathree);

        //FOR LOOP FOR DATA I NEED IN URL
      });
    }
  });
};

cityButtonEl.addEventListener("click", submitCity);
