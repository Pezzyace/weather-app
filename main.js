const searchButton = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const API_KEY = "d292bd950ad1111c4da438d7967f0848";


const getWeatherDetails = (cityName, lat, lon) => {
  const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
    const uniqueForecastDays = [];
    const fiveDaysForecast = data.list.filter(forecast => {
      const forecastDate = new Date(forecast.dt_text).getDate();
      if(!uniqueForecastDays.includes(forecastDate)) {
        return uniqueForecastDays.push(forecastDate);
      }

    });
    console.log(data);
  }).catch(() => {
    alert("AN error occurred when fetching the data");
  })
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
