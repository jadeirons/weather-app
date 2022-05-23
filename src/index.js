function formatTimeDate(localTime) {
  let h2 = document.querySelector("#h2");
  let now = new Date(localTime.data.date_time);
  let hours = String(now.getHours()).padStart(2, "0");
  let minutes = String(now.getMinutes()).padStart(2, "0");
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
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
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();
  h2.innerHTML = `${hours}:${minutes} | ${day}, ${month} ${date}, ${year}`;
}

function updateIcon(iconCode) {
  if (iconCode === "01d") {
    return "fa-solid fa-sun";
  }
  if (iconCode === "02d") {
    return "fa-solid fa-cloud-sun";
  }
  if (iconCode === "03d" || "03n" || "04d" || "04n") {
    return "fa-solid fa-cloud";
  }
  if (iconCode === "09d" || "09n") {
    return "fa-solid fa-cloud-rain";
  }
  if (iconCode === "10d" || "10n") {
    return "fa-solid fa-cloud-showers-heavy";
  }
  if (iconCode === "11d" || "11n") {
    return "fa-solid fa-cloud-bolt";
  }
  if (iconCode === "13d" || "13n") {
    return "fa-solid fa-snowflake";
  }
  if (iconCode === "50d" || "50n") {
    return "fa-solid fa-smog";
  }
  if (iconCode === "01n") {
    return "fa-solid fa-moon";
  }
  if (iconCode === "02n" || "50n") {
    return "fa-solid fa-cloud-moon";
  }
}

function getLocalTime(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiKey = "7ad2b873cae54adc90035c81c86bc039";
  let timeApi = `https://api.ipgeolocation.io/timezone?apiKey=${apiKey}&lat=${lat}&long=${lon}`;
  axios.get(timeApi).then(formatTimeDate);
}

function showCurrentWeather(weather) {
  console.log(weather);
  let icon = document.querySelector("#icon");
  let currentTemp = document.querySelector("#current-temp");
  let currentCity = document.querySelector("#city");
  let feelsLike = document.querySelector("#feels-like");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let currentState = document.querySelector("#current-state");
  let high = document.querySelector("#current-high");
  let low = document.querySelector("#current-low");
  iconCode = weather.data.weather[0].icon;
  celsiusTemp = Math.round(weather.data.main.temp);
  feelsLikeCelsius = Math.round(weather.data.main.feels_like);
  highCelsius = Math.round(weather.data.main.temp_max);
  lowCelsius = Math.round(weather.data.main.temp_min);
  currentTemp.innerHTML = `<strong>${Math.round(
    weather.data.main.temp
  )}</strong>`;
  feelsLike.innerHTML = Math.round(weather.data.main.feels_like);
  currentCity.innerHTML = `${weather.data.name.toUpperCase()}, ${
    weather.data.sys.country
  }`;
  humidity.innerHTML = weather.data.main.humidity;
  wind.innerHTML = Math.round(weather.data.wind.speed);
  currentState.innerHTML = weather.data.weather[0].main.toUpperCase();
  high.innerHTML = Math.round(weather.data.main.temp_max);
  low.innerHTML = Math.round(weather.data.main.temp_min);
  icon.innerHTML = `<i class="${updateIcon(iconCode)}"></i>`;
  getLocalTime(weather.data.coord);
  getForecast(weather.data.coord);
}

function formatDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showForecast(forecast) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let forecastDays = forecast.data.daily;
  console.log(forecast.data.daily);
  forecastDays.forEach(function (forecastDays, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2 upcoming-grid">
        <div class="forecast-day">${formatDays(forecastDays.dt)}</div>
        <i class=" icons ${updateIcon(
          forecast.data.daily[0].weather.icon
        )}"></i>
        
        <div class="weather-forecast-temperatures">
          <span class="forecast-temp-high"> ${Math.round(
            forecastDays.temp.max
          )}°C</span>
          <span class="forecast-temp-low"> | ${Math.round(
            forecastDays.temp.min
          )}°C </span>
        </div>
      </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  updateIcon(iconCode);
  console.log(forecast.data.daily);
}

function getForecast(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let unit = "metric";
  let ForecastApiKey = "1979bc82187db3756ece8eeb6f265da0";
  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&appid=${ForecastApiKey}`;
  axios.get(forecastApiUrl).then(showForecast);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search");
  if (city.value.length > 0) {
    let units = "metric";
    let apiKey = "1979bc82187db3756ece8eeb6f265da0";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=${units}&appid=${apiKey}`;
    axios.get(apiUrl).then(showCurrentWeather);
  } else alert("Please enter a city");
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

function viewFahrenheit(event) {
  event.preventDefault;
  let fahrenheit = document.querySelector("#fahrenheit");
  let celsius = document.querySelector("#celsius");
  let currentTemp = document.querySelector("#current-temp");
  let feelsLike = document.querySelector("#feels-like");
  let feelsLikeUnit = document.querySelector("#fl-unit");
  let high = document.querySelector("#current-high");
  let low = document.querySelector("#current-low");
  currentTemp.innerHTML = `<strong>${Math.round((celsiusTemp * 9) / 5 + 32)}
</strong>`;
  feelsLike.innerHTML = `${Math.round((feelsLikeCelsius * 9) / 5 + 32)}`;
  feelsLikeUnit.innerHTML = "°F";
  high.innerHTML = `${Math.round((highCelsius * 9) / 5 + 32)}`;
  low.innerHTML = `${Math.round((lowCelsius * 9) / 5 + 32)}`;
  fahrenheit.classList.add("current-unit");
  celsius.classList.remove("current-unit");
}

function viewCelsius(event) {
  event.preventDefault;
  let celsius = document.querySelector("#celsius");
  let fahrenheit = document.querySelector("#fahrenheit");
  let currentTemp = document.querySelector("#current-temp");
  let feelsLike = document.querySelector("#feels-like");
  let feelsLikeUnit = document.querySelector("#fl-unit");
  let high = document.querySelector("#current-high");
  let low = document.querySelector("#current-low");
  feelsLike.innerHTML = `${feelsLikeCelsius}`;
  feelsLikeUnit.innerHTML = "°C";
  high.innerHTML = `${Math.round(highCelsius)}`;
  low.innerHTML = `${Math.round(lowCelsius)}`;
  currentTemp.innerHTML = `<strong>${celsiusTemp}</strong>`;
  celsius.classList.add("current-unit");
  fahrenheit.classList.remove("current-unit");
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

let searchButton = document.querySelector("#button-addon2");
searchButton.addEventListener("click", searchCity);

let currentLocationBtn = document.querySelector("#current-location-btn");
currentLocationBtn.addEventListener("click", callCurrent);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", viewCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", viewFahrenheit);

let celsiusTemp = null;
let feelsLikeCelsius = null;
let highCelsius = null;
let lowCelsius = null;
let iconCode = null;
