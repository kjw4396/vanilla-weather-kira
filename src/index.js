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

//Get the temperature of the city and display temperature. City displayed as h1
function showTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
}

function search(place) {
  let unit = `metric`;
  let apiKey = `f033b46527ccaf9538a563b259bae9ba`;
  let city = `Lisbon`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
//"Click" the button finds current location (lon &lat), displays City h1+ Temperature

function displayTemperature(response) {
  let h1 = document.querySelector("h1");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  h1.innerHTML = response.data.name;
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
}
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

//Displays what is searched as the H1
function displaySearchedCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let h1 = document.querySelector("h1");
  let city = searchInput.value;
  h1.innerHTML = `${city}`;
  search(city);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", displaySearchedCity);

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
h2.innerHTML = `${day} ${date} ${month} ${hour}:${minutes}`;
//If statement to correctly display time below 10 minutes past.
if (minutes < 10) {
  minutes = `0${minutes}`;
}

//changes to fahrenheit & shows temp from location in showTemperature function
function clickedFahrenheit(event) {
  event.preventDefault();
  let changeFahrenheit = document.querySelector("#fahrenheit");
  let changeTemperature = document.querySelector("#temperature");
  changeTemperature.innerHTML = 20; //`insert kelvin to fahrenheit formula`
}

let changeFahrenheit = document.querySelector("#fahrenheit");
changeFahrenheit.addEventListener("click", clickedFahrenheit);

//changes to celsius & shows the temp from location in showTemperature function
function clickedCelsius(event) {
  event.preventDefault();
  let changeCelsius = document.querySelector("#celcius");
  let changeTemperature = document.querySelector("#temperature");
  changeTemperature.innerHTML = 14; //`insert formula...`
}

let changeCelsius = document.querySelector("#celsius");
changeCelsius.addEventListener("click", clickedCelsius);
