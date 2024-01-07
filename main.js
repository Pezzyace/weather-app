const searchButton = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherCardsDiv = document.querySelector(".weather-cards");
const API_KEY = "d292bd950ad1111c4da438d7967f0848";

const createWeatherCard = (weatherItem) => {
  return`
    <div class="bg-slate-400 rounded p-3 card">
      <div class="border border-dashed border-2 border-slate-900 rounded p-4">
        <div class="text-center font-bold">${weatherItem.dt_txt.split(" ")[0]}</div>
        <div class="relative mb-4">
          <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="cloud" class="w-[5rem] m-auto">
          <h4 class="text-center">Moderate Rain</h4>
        </div>
        <div class="flex justify-between mb-2">
          <h4>Temp -</h4>
          <p class="text-xl font-bold mb-px">${(weatherItem.main.temp - 273.15).toFixed(2)}*C</p>
        </div>
        <div class="flex justify-between  mb-2">
          <h4>Wind -</h4>
          <p class="text-xl font-bold mb-px">${weatherItem.wind.speed} M/S</p>
        </div>
        <div class="flex justify-between ">
          <h4>Humidity -</h4>
          <p class="text-xl font-bold mb-px">${weatherItem.item.main.humidity}%</p>
        </div>
      </div>
    </div>
  `;
}

const getWeatherDetails = (cityName, lat, lon) => {
  const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
    const uniqueForecastDays = [];
    const fourDaysForecast = data.list.filter(forecast => {
      const forecastDate = new Date(forecast.dt_txt).getDate();
      if(!uniqueForecastDays.includes(forecastDate)) {
        return uniqueForecastDays.push(forecastDate);
      }

    });

    cityInput.value = "";
    weatherCardsDiv.innerHTML = "";

    console.log(fourDaysForecast);

    fourDaysForecast.forEach(weatherItem => {
      weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(weatherItem));
    })
  }).catch(() => {
    // alert("An error occurred when fetching the data");
  });
}
 
const getCity = () => {
  const cityName = cityInput.value.trim();
  if(!cityName) return;
  const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

  fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
    if(!data.length) return alert("No Data found for ${cityName");
    const { name, lat, lon} = data[0];
    getWeatherDetails(name, lat, lon); 
  }).catch(() => {
    alert("An error occurred while fetching the data")
  });
}

searchButton.addEventListener("click", getCity);
