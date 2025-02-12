const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

const themeToggleBtn = document.getElementById('themeToggleBtn');
const body = document.body;

async function checkWeather(city) {
    const api_key = "0f4260723013926631b8bcf7d5702e18";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

    try {
        const response = await fetch(url);
        const weather_data = await response.json();

        if (weather_data.cod === "404") {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            return;
        }

        location_not_found.style.display = "none";
        weather_body.style.display = "flex";
        temperature.innerHTML = `${Math.round(weather_data.main.temp)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;

        switch (weather_data.weather[0].main) {
            case 'Clouds':
                weather_img.src = "assets/cloud.png";
                break;
            case 'Clear':
                weather_img.src = "assets/clear.png";
                break;
            case 'Rain':
                weather_img.src = "assets/rain.png";
                break;
            case 'Mist':
                weather_img.src = "assets/mist.png";
                break;
            case 'Snow':
                weather_img.src = "assets/snow.png";
                break;
            case 'Haze':
                weather_img.src = "assets/haze.png";
                break;
            default:
                weather_img.src = "assets/default.png";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

searchBtn.addEventListener('click', () => {
    const city = inputBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

function setThemeIcon() {
    if (body.classList.contains('light-theme')) {
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    } else {
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
}

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    setThemeIcon();
});

// Set the initial theme icon
setThemeIcon();
