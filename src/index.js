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

function getLocalTime(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiKey = "7ad2b873cae54adc90035c81c86bc039";
  let timeApi = `https://api.ipgeolocation.io/timezone?apiKey=${apiKey}&lat=${lat}&long=${lon}`;
  axios.get(timeApi).then(formatTimeDate);
}

function formatDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function updateIcon(iconCode) {
  if (iconCode === "01d") {
    return "fa-solid fa-sun";
  }
  if (iconCode === "02d") {
    return "fa-solid fa-cloud-sun";
  }
  if (iconCode === "03d") {
    return "fa-solid fa-cloud";
  }
  if (iconCode === "03n") {
    return "fa-solid fa-cloud";
  }
  if (iconCode === "04d") {
    return "fa-solid fa-cloud";
  }
  if (iconCode === "04n") {
    return "fa-solid fa-cloud";
  }
  if (iconCode === "09d") {
    return "fa-solid fa-cloud-rain";
  }
  if (iconCode === "09n") {
    return "fa-solid fa-cloud-rain";
  }
  if (iconCode === "10d") {
    return "fa-solid fa-cloud-showers-heavy";
  }
  if (iconCode === "10n") {
    return "fa-solid fa-cloud-showers-heavy";
  }
  if (iconCode === "11d") {
    return "fa-solid fa-cloud-bolt";
  }
  if (iconCode === "11n") {
    return "fa-solid fa-cloud-bolt";
  }
  if (iconCode === "13d") {
    return "fa-solid fa-snowflake";
  }
  if (iconCode === "13n") {
    return "fa-solid fa-snowflake";
  }
  if (iconCode === "50d") {
    return "fa-solid fa-smog";
  }
  if (iconCode === "50n") {
    return "fa-solid fa-smog";
  }
  if (iconCode === "01n") {
    return "fa-solid fa-moon";
  }
  if (iconCode === "02n") {
    return "fa-solid fa-cloud-moon";
  }
  if (iconCode === "50n") {
    return "fa-solid fa-cloud-moon";
  }
}

function showForecast(forecast) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let forecastDays = forecast.data.daily;
  forecastDays.forEach(function (forecastDays, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2 upcoming-grid">
        <div class="forecast-day">${formatDays(
          forecastDays.dt
        ).toUpperCase()}</div>
        <i class=" icons ${updateIcon(forecastDays.weather[0].icon)}"></i>
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
}

function getForecast(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let unit = "metric";
  let ForecastApiKey = "1979bc82187db3756ece8eeb6f265da0";
  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&appid=${ForecastApiKey}`;
  axios.get(forecastApiUrl).then(showForecast);
}

function showCurrentWeather(weather) {
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
  currentTemp.innerHTML = `${Math.round(weather.data.main.temp)}`;
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

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search");
  city.value = city.value.trim();
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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

let searchButton = document.querySelector("#button-addon2");
searchButton.addEventListener("click", searchCity);

let currentLocationBtn = document.querySelector("#current-location-btn");
currentLocationBtn.addEventListener("click", callCurrent);
