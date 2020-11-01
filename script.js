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
var forecastTitleEl = document.getElementById("forecast-title");

submitCity = function (e) {
  e.preventDefault();

  var cityInput = cityInputEl.value.trim();

  if (cityInput) {
    getCityInput(cityInput);
  }
};

var getCityInput = function (city) {
  currentWeatherapiURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=cb9f638b983772109f5be92fa81ecd11";

  fetch(currentWeatherapiURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
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
            response.json().then(function (datatwo) {
              var getIcon = data.weather[0].icon;

              icon = "http://openweathermap.org/img/wn/" + getIcon + "@2x.png";

              fivedayapiURL =
                "https://api.openweathermap.org/data/2.5/onecall?lat=" +
                cityLat +
                "&lon=" +
                cityLon +
                "&exclude=current,hourly,minutely,alerts&units=imperial&appid=cb9f638b983772109f5be92fa81ecd11";

              fetch(fivedayapiURL).then(function (response) {
                if (response.ok) {
                  console.log(response);
                  response.json().then(function (datathree) {
                    console.log(datathree);

                    var fivedayDiv = document.getElementById("five-day-cards");
                    var fiveDays = [];

                    // fivedayDiv.removeChild(dayColumnsEl);
                    for (var i = 1; i < 6; i++) {
                      var dayColumnsEl = document.createElement("div");
                      dayColumnsEl.classList = "col";

                      var dayCardsEl = document.createElement("div");
                      dayCardsEl.classList =
                        "card card-body text-white bg-info shadow";

                      var dayDateEl = document.createElement("h5");
                      dayDateEl.classList = "card-title";

                      var fivedayIconEl = document.createElement("img");

                      var dayTempEl = document.createElement("h6");
                      dayTempEl.classList = "card-subtitle mb-2";

                      var dayHumidEl = document.createElement("h6");
                      dayHumidEl.classList = "card-subtitle mb-2";

                      var getfivedayIcon = datathree.daily[i].weather[0].icon;
                      console.log(getfivedayIcon);

                      fivedayIcon =
                        "http://openweathermap.org/img/wn/" +
                        getfivedayIcon +
                        "@2x.png";

                      forecastTitleEl.classList.remove("hide");

                      dayDateEl.textContent = moment
                        .unix(datathree.daily[i].dt)
                        .format("MM/DD/YYYY");
                      console.log(dayDateEl);

                      fivedayIconEl.setAttribute("src", fivedayIcon);

                      dayTempEl.textContent =
                        "Temp: " +
                        datathree.daily[i].temp.day +
                        String.fromCharCode(176) +
                        "F";

                      dayHumidEl.textContent =
                        "Humidity: " + datathree.daily[i].humidity + "%";

                      fivedayDiv.appendChild(dayColumnsEl);
                      dayColumnsEl.appendChild(dayCardsEl);
                      dayCardsEl.appendChild(dayDateEl);
                      dayCardsEl.appendChild(fivedayIconEl);
                      dayCardsEl.appendChild(dayTempEl);
                      dayCardsEl.appendChild(dayHumidEl);

                      fiveDays.push(dayCardsEl);
                    }
                  });
                }
              });

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
              uvindexEL.textContent = datatwo.value;

              if (datatwo.value >= 5.1) {
                uvindexEL.classList.add("bad");
              } else if (datatwo.value <= 2) {
                uvindexEL.classList.add("good");
              } else if (datatwo.value >= 2.1 && datatwo.value <= 5) {
                uvindexEL.classList.add("average");
              }
            });
          }
        });
      });
    }
  });
};

cityButtonEl.addEventListener("click", submitCity);
