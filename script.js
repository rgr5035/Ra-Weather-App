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
var mainArtcicleEl = document.getElementById("main-article");

//function that is called when cityButtonEl event handler is clicked to generate city's specific weather information
submitCity = function (e) {
  e.preventDefault();

  var cityInput = cityInputEl.value.trim();
  localStorage.setItem("city", cityInput);

  //creating elements for saved city searches to generate below city button
  var savedCityCard = document.createElement("div");
  savedCityCard.classList = "card";

  var savedCityList = document.createElement("ul");
  savedCityList.classList = "list-group list-group-flush";

  var savedCityBtn = document.createElement("button");
  savedCityBtn.classList = "list-group-item";

  savedCityBtn.textContent = localStorage.getItem("city");

  //appending elements to parent elements in HTML
  mainArtcicleEl.appendChild(savedCityCard);
  savedCityCard.appendChild(savedCityList);
  savedCityList.appendChild(savedCityBtn);

  if (cityInput) {
    getCityInput(cityInput);
  }
};

//function that generates city-specific information which is run inside submitCity function
var getCityInput = function (city) {
  //API URL to pull information based on city entered
  currentWeatherapiURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=cb9f638b983772109f5be92fa81ecd11";

  //API call for current weather generated inside current weather card
  fetch(currentWeatherapiURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        var cityLat = data.coord.lat;
        var cityLon = data.coord.lon;

        //API URL to pull information for UV index based on the city entered
        uvindexapiURL =
          "https://api.openweathermap.org/data/2.5/uvi?lat=" +
          cityLat +
          "&lon=" +
          cityLon +
          "&appid=cb9f638b983772109f5be92fa81ecd11";

        //API Call for UV Index of city entered
        fetch(uvindexapiURL).then(function (response) {
          if (response.ok) {
            response.json().then(function (datatwo) {
              var getIcon = data.weather[0].icon;

              icon = "http://openweathermap.org/img/wn/" + getIcon + "@2x.png";

              //API URL for five-day forecast based on city entered
              fivedayapiURL =
                "https://api.openweathermap.org/data/2.5/onecall?lat=" +
                cityLat +
                "&lon=" +
                cityLon +
                "&exclude=current,hourly,minutely,alerts&units=imperial&appid=cb9f638b983772109f5be92fa81ecd11";

              //API Call to generate five-day forecast based on city entered
              fetch(fivedayapiURL).then(function (response) {
                if (response.ok) {
                  console.log(response);
                  response.json().then(function (datathree) {
                    console.log(datathree);

                    var fivedayDiv = document.getElementById("five-day-cards");
                    var fiveDays = [];

                    fivedayDiv.innerHTML = "";

                    for (var i = 1; i < 6; i++) {
                      //creating elements for five-day forecast to generate in the empty div in HTML
                      var dayColumnsEl = document.createElement("div");
                      dayColumnsEl.classList = "col";

                      var dayCardsEl = document.createElement("div");
                      dayCardsEl.classList =
                        "card card-body text-white bg-info shadow";

                      var dayDateEl = document.createElement("h5");
                      dayDateEl.classList = "card-title";

                      var fivedayIconEl = document.createElement("img");
                      fivedayIconEl.classList = "icon-size";

                      var dayTempEl = document.createElement("h6");
                      dayTempEl.classList = "card-subtitle mb-2";

                      var dayHumidEl = document.createElement("h6");
                      dayHumidEl.classList = "card-subtitle mb-2";

                      var getfivedayIcon = datathree.daily[i].weather[0].icon;

                      fivedayIcon =
                        "http://openweathermap.org/img/wn/" +
                        getfivedayIcon +
                        "@2x.png";

                      forecastTitleEl.classList.remove("hide");

                      //setting text content for requested city stats for five-day forecast
                      dayDateEl.textContent = moment
                        .unix(datathree.daily[i].dt)
                        .format("MM/DD/YYYY");

                      fivedayIconEl.setAttribute("src", fivedayIcon);

                      dayTempEl.textContent =
                        "Temp: " +
                        datathree.daily[i].temp.day +
                        " " +
                        String.fromCharCode(176) +
                        "F";

                      dayHumidEl.textContent =
                        "Humidity: " + datathree.daily[i].humidity + "%";

                      //appending elements to parent elements in HTML
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

              //setting text content for requested city stats for current weather
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

              //generating a color background for UV Index based on the severity of UV Index to generate in current weather
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

//event handler for city search button to generate weather information
cityButtonEl.addEventListener("click", submitCity);
