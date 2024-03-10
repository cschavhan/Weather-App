const apiKey = "";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");
const error = document.querySelector(".error");

// fetching api responce
async function checkWeather(city) {
  const res = await fetch(apiUrl + city + `&appid=${apiKey}`);
  const data = await res.json();
  showWeatherData(data);
}

// show the data on UI
function showWeatherData(data) {
  if (data.cod === "404") {
    error.style.display = "block";
  } else {
    city.innerHTML = data.name;
    temp.innerHTML = Math.floor(data.main.temp) + "°c";
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + "km/h";

    // render the weather image according to the weather condition
    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = `Assets/clouds.png`;
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = `Assets/clear.png`;
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = `Assets/rain.png`;
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = `Assets/drizzle.png`;
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = `Assets/mist.png`;
    }

    weather.style.display = "block";
  }
}

searchBtn.addEventListener("click", async () => {
  await checkWeather(searchBox.value);
});
