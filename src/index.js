/*
when a user searches for a city (example: New York), 
it should display 
the name of the city on the result page 
and the current temperature of the city.

Bonus point:
Add a Current Location button. When clicking on it, it uses the Geolocation 
API to get your GPS coordinates 
and display and the city and current temperature 
using the OpenWeather API.
*/

function search(city) {
  let unit = `metric`;
  let apiKey = `f033b46527ccaf9538a563b259bae9ba`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}
//"Click" the button finds current location (lon &lat), displays City h1+ Temperature
function displayTemperature(response) {
  let h1 = document.querySelector("h1");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconTodayElement = document.querySelector("#icon-today");
  let temperatureElement = document.querySelector("#temperature");

  celsiusTemperature = response.data.main.temp;

  h1.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconTodayElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
//Displays what is searched as the H1
function handleSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInputElement.value;
  search(searchInputElement.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//display current date and time
let now = new Date();
let listDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let listMonth = [
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
let day = listDays[now.getDay()];
let month = listMonth[now.getMonth()];
let date = now.getDate();
let hour = `${now.getHours()}`;
let minutes = `${now.getMinutes()}`;
let h2 = document.querySelector("h2");
//If statement to correctly display time below 10 minutes past.
if (minutes < 10) {
  minutes = `0${minutes}`;
}
if (hour < 10) {
  hour = `0${hour}`;
}
h2.innerHTML = `${day} ${date} ${month} ${hour}:${minutes}`;

//Temperature conversion Celsius and Fahrenheit
function displayFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsius);

/*
function getCoords(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = `metric`;
  let apiKey = `f033b46527ccaf9538a563b259bae9ba`;
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}


let button = document.querySelector("button");
button.addEventListener("click", displayTemperature);
navigator.geolocation.getCurrentPosition(getCoords);
*/
