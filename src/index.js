function showCurrentWeather(weather) {
  let currentTemp = document.querySelector("#current-temp");
  let currentCity = document.querySelector("#city");
  let feelsLike = document.querySelector("#feels-like");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let currentState = document.querySelector("#current-state");
  let high = document.querySelector("#current-high");
  let low = document.querySelector("#current-low");
  let h2 = document.querySelector("#h2");
  currentTemp.innerHTML = `<strong>${Math.round(
    weather.data.main.temp
  )}</strong>`;
  currentCity.innerHTML = weather.data.name.toUpperCase();
  humidity.innerHTML = weather.data.main.humidity;
  wind.innerHTML = Math.round(weather.data.wind.speed);
  feelsLike.innerHTML = Math.round(weather.data.main.feels_like);
  currentState.innerHTML = weather.data.weather[0].main.toUpperCase();
  high.innerHTML = Math.round(weather.data.main.temp_max);
  low.innerHTML = Math.round(weather.data.main.temp_min);
  h2.innerHTML = formatTimeDate(new Date(weather.data.dt * 1000));
  console.log(weather.data);

  function formatTimeDate(timestamp) {
    let hours = timestamp.getHours();
    let minutes = String(timestamp.getMinutes()).padStart(2, "0");
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = days[timestamp.getDay()];
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let month = months[timestamp.getMonth()];
    let date = timestamp.getDate();
    let year = timestamp.getFullYear();
    console.log(timestamp);
    return `${hours}:${minutes} | ${day}, ${month} ${date}, ${year}`;
  }
}

function searchCity() {
  event.preventDefault();
  let city = document.querySelector("#city-search");
  if (city.value.length > 0) {
    let units = "metric";
    let apiKey = "1979bc82187db3756ece8eeb6f265da0";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=${units}&appid=${apiKey}`;
    axios.get(apiUrl).then(showCurrentWeather);
    let h1 = document.querySelector(".city");
    h1.innerHTML = city.value.toUpperCase();
  } else {
    alert("Please enter a city");
  }
}

function getCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "1979bc82187db3756ece8eeb6f265da0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function callCurrent() {
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

function viewFahrenheit() {
  let fahrenheit = document.querySelector("#fahrenheit");
  let celsius = document.querySelector("#celsius");
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = "<strong>48</strong>";
  fahrenheit.classList.add("current-unit");
  celsius.classList.remove("current-unit");
}

function viewCelsius() {
  let celsius = document.querySelector("#celsius");
  let fahrenheit = document.querySelector("#fahrenheit");
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = "<strong>9</strong>";
  celsius.classList.add("current-unit");
  fahrenheit.classList.remove("current-unit");
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

let searchButton = document.querySelector("#button-addon2");
searchButton.addEventListener("click", searchCity);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", viewCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", viewFahrenheit);

let currentLocationBtn = document.querySelector("#current-location-btn");
currentLocationBtn.addEventListener("click", callCurrent);

callCurrent();
