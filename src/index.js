let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mai",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let toDay = days[now.getDay()];
let currentMonth = months[now.getMonth()];
let hours = now.getHours();
let date = now.getDate();
let minutes = now.getMinutes();
let year = now.getFullYear();

if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes} `;
}

let nowDate = document.querySelector("#nowDate");
nowDate.innerHTML = `${toDay},</br>
 ${currentMonth} ${date}, ${year} </br>${hours}:${minutes}`;

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = `<div class="row">`;
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
                <div class="col ">
                    <div class="weather-forecast-date">${day}</div>
                    <img src="images/cloudy.png" class="picCloudy" /><br />
                    <div class="weather-forecast-temp"><span class="weather-forecast-temp-max">36º</span><span
                            class="weather-forecast-min"> 22º</span></div>

           

            
        </div>`;
  });

  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

function getWeather(response) {
  let temp = document.querySelector("#temperature");
  let apiTemp = Math.round(response.data.main.temp);
  temp.innerHTML = apiTemp;

  let feelTemp = document.querySelector("#feelsLike");
  let apifeelTemp = Math.round(response.data.main.feels_like);
  feelTemp.innerHTML = apifeelTemp;

  let highTemp = document.querySelector("#high");
  let apihighTemp = Math.round(response.data.main.temp_max);
  highTemp.innerHTML = `${apihighTemp}ºC`;

  let lowTemp = document.querySelector("#low");
  let apilowTemp = Math.round(response.data.main.temp_min);
  lowTemp.innerHTML = `${apilowTemp}ºC`;

  let humidity = document.querySelector("#humid");
  let apiHumidity = Math.round(response.data.main.humidity);
  humidity.innerHTML = apiHumidity;

  let desc = document.querySelector("#weatherStat");
  let apiDesc = response.data.weather[0].description;
  desc.innerHTML = apiDesc;

  let country = document.querySelector("#country");
  let apicountry = response.data.sys.country;
  country.innerHTML = apicountry;

  let iconElement = document.querySelector("#sunnyIcon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemp = response.data.main.temp;
}

function searchCity(city) {
  let citybasic = document.querySelector("#cityTitle");
  citybasic.innerHTML = city;

  let key = `20a6e66bea2ebb75c5362a5675b2ff7b`;
  let unit = `metric`;
  let urlcore = `https://api.openweathermap.org/data/2.5/weather`;
  let url = `${urlcore}?q=${city}&appid=${key}&units=${unit}`;
  console.log(url);
  axios.get(url).then(getWeather);
}
function getCity(event) {
  event.preventDefault();

  let city = document.querySelector("#city-text-input").value;

  searchCity(city);
}

let submitButton = document.querySelector("#search-button");
submitButton.addEventListener("click", getCity);

function showfahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}
function showcelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

let fahrenheitLink = document.querySelector("#farenheit");
fahrenheitLink.addEventListener("click", showfahrenheitTemp);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showcelsiusTemp);

let celsiusTemp = null;

searchCity("Winnipeg");
displayForecast();
