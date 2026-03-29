const lat = 7.90;   // San Fernando de Apure latitude
const lon = -67.47; // San Fernando de Apure longitude
const apiKey = '63c597bef200844bd7f9d777a85941bb';

const currentWeatherURL =
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

const forecastURL =
  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

async function getWeather() {
  try {
    const response = await fetch(currentWeatherURL);
    if (!response.ok) throw new Error('Weather data not available');
    const data = await response.json();
    displayCurrentWeather(data);
  } catch (error) {
    console.error(error);
  }
}

async function getForecast() {
  try {
    const response = await fetch(forecastURL);
    if (!response.ok) throw new Error('Forecast data not available');
    const data = await response.json();
    displayForecast(data);
  } catch (error) {
    console.error(error);
  }
}

function displayCurrentWeather(data) {
  document.querySelector('#current-temp').textContent =
    `${Math.round(data.main.temp)}°F`;

  document.querySelector('#weather-desc').textContent =
    data.weather[0].description;

  document.querySelector('#high-temp').textContent =
    `${Math.round(data.main.temp_max)}°F`;

  document.querySelector('#low-temp').textContent =
    `${Math.round(data.main.temp_min)}°F`;

  document.querySelector('#humidity').textContent =
    `${data.main.humidity}%`;

  const sunrise = new Date(data.sys.sunrise * 1000);
  const sunset = new Date(data.sys.sunset * 1000);

  document.querySelector('#sunrise').textContent =
    sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  document.querySelector('#sunset').textContent =
    sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const icon = data.weather[0].icon;
  const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  const weatherIcon = document.querySelector('#weather-icon');
  weatherIcon.src = iconURL;
  weatherIcon.alt = data.weather[0].description;
}

function displayForecast(data) {
  const forecastContainer = document.querySelector('#forecast-list');
  forecastContainer.innerHTML = '';

  const noonForecasts = data.list.filter(item =>
    item.dt_txt.includes('12:00:00')
  ).slice(0, 3);

  noonForecasts.forEach(day => {
    const temp = Math.round(day.main.temp);
    const date = new Date(day.dt * 1000).toLocaleDateString('en-US', {
      weekday: 'short'
    });

    const p = document.createElement('p');
    p.textContent = `${date} — ${temp}°F`;
    forecastContainer.appendChild(p);
  });
}

getWeather();
getForecast();