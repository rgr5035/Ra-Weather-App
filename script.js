var cityButtonEl = document.getElementById("city-form");
cityInputEl = document.getElementById("city-input");
citynamesearchEl = document.getElementById("city-search-term");


submitCity = function(e) {
    e.preventDefault();
    console.log('clicked');

    var cityInput = cityInputEl.value.trim();

    if (cityInput) {
        getCityInput(cityInput);

    }
}


var getCityInput = function (city) {

    apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=cb9f638b983772109f5be92fa81ecd11'

    fetch(apiURL)
     .then(function (response){

      if(response.ok) {
        console.log(response);
        response.json().then(function (data) {
            console.log(data);
            citynamesearchEl.textContent = data[i].name;

        });

      }

        })

}















cityButtonEl.addEventListener('click', submitCity);