const API_KEY = 'b190fc9a9080ba14e8c30e25b371a1a7';

const searchInput = document.querySelector("#search-input");
const cityName = document.querySelector('.city-name');
const weatherState = document.querySelector('.weather-state');
const icon = document.querySelector('.icon-weather');
const temperature = document.querySelector('.temperature');

const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const humidity = document.querySelector('.humidity');
const wind_speed = document.querySelector('.wind-speed');

searchInput.addEventListener('change', (e)=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${API_KEY}&lang=vi&units=metric`)
        .then(async res=>{
            const data = await res.json();
            console.log('[Search Input]', data);
            cityName.innerHTML = data.name || DEFAULT_VALUE;
      
            weatherState.innerHTML = data.weather[0].description || DEFAULT_VALUE;
            icon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            temperature.innerHTML = Math.round(data.main.temp) || DEFAULT_VALUE;
            sunrise.innerHTML = moment.unix(data.sys.sunrise).format('H:mm') || DEFAULT_VALUE;
            sunset.innerHTML = moment.unix(data.sys.sunset).format('H:mm')|| DEFAULT_VALUE;
            humidity.innerHTML = data.main.humidity || DEFAULT_VALUE;
            wind_speed.innerHTML = (data.wind.speed * 3.6).toFixed(2) || DEFAULT_VALUE;
        })
})
