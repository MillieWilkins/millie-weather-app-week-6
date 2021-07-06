//show today's date

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature-now").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#icon-today"
  ).innerHTML = `<img src="http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png" />`;

  document.querySelector("#condition").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
}

function searchCity(city) {
  let apiKey = "d0396532b866960166a3f033f404e163";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-location-input").value;
  searchCity(city);
}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "d0396532b866960166a3f033f404e163";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let searchForm = document.querySelector("#search-button");
searchForm.addEventListener("click", handleSearch);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);

searchCity("London");

function convertToF(event) {
  event.preventDefault();
  let temperatureToday = document.querySelector("#temperature-now");
  temperatureToday.innerHTML = 10;
}

function convertToC(event) {
  event.preventDefault();
  let temperatureToday = document.querySelector("#temperature-now");
  temperatureToday.innerHTML = 20;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToF);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToC);
