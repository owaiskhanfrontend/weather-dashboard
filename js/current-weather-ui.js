export {updateTemperatureUI,updateWeatherVisualUI,updateWeatherDetailsUI};
import { getWeatherCondition } from "./weather-utils.js";



function formatTimeOnly(isoString) {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
}

function updateTemperatureUI(weatherInfo) {
    const tempValue = document.querySelector(".temp-value");
    const feelsValue = document.querySelector(".feels-val");
    const sunriseTime = document.getElementById("sunrise-time");
    const sunsetTime = document.getElementById("sunset-time");
    tempValue.textContent = `${Math.round(weatherInfo.current.temperature_2m)}°C`;
    feelsValue.textContent = `${Math.round(weatherInfo.current.apparent_temperature)}°C`;

    sunriseTime.textContent = formatTimeOnly(weatherInfo.daily.sunrise[0]);
    sunsetTime.textContent = formatTimeOnly(weatherInfo.daily.sunset[0]);
}


function updateWeatherVisualUI(weatherInfo) {

    const weatherVisuals = {
        clearDay: {
            icon: "weather types svg/sunny weather loader.svg",
            text: "Sunny"
        },

        clearNight: {
            icon: "weather types svg/moon loader.svg",
            text: "Clear"
        },

        mainlyClearDay: {
            icon: "weather types svg/sunny weather loader.svg",
            text: "Mainly Clear"
        },

        mainlyClearNight: {
            icon: "weather types svg/moon loader.svg",
            text: "Mainly Clear"
        },

        partlyCloudyDay: {
            icon: "weather types svg/partly Cloudy Day loader.svg",
            text: "Partly Cloudy"
        },

        partlyCloudyNight: {
            icon: "weather types svg/partly Cloudy Night loader.svg",
            text: "Partly Cloudy"
        },

        overcast: {
            icon: "weather types svg/overcast loader.svg",
            text: "Overcast"
        },

        fog: {
            icon: "weather types svg/fog loader.svg",
            text: "Fog"
        },

        drizzle: {
            icon: "weather types svg/cloudy drizzle loader.svg",
            text: "Drizzle"
        },

        freezingDrizzle: {
            icon: "weather types svg/cloudy drizzle loader.svg",
            text: "Freezing Drizzle"
        },

        rain: {
            icon: "weather types svg/raining loader.svg",
            text: "Rain"
        },

        freezingRain: {
            icon: "weather types svg/raining loader.svg",
            text: "Freezing Rain"
        },

        snow: {
            icon: "weather types svg/cloudy light snow loader.svg",
            text: "Snow"
        },

        heavySnow: {
            icon: "weather types svg/cloudy heavy snow loader.svg",
            text: "Heavy Snow"
        },

        snowGrains: {
            icon: "weather types svg/cloudy light snow loader.svg",
            text: "Snow Grains"
        },

        rainShowers: {
            icon: "weather types svg/raining loader.svg",
            text: "Rain Showers"
        },

        heavyRainShowers: {
            icon: "weather types svg/thunderstorm loader.svg",
            text: "Heavy Rain Showers"
        },

        snowShowers: {
            icon: "weather types svg/cloudy light snow loader.svg",
            text: "Snow Showers"
        },

        heavySnowShowers: {
            icon: "weather types svg/cloudy heavy snow loader.svg",
            text: "Heavy Snow Showers"
        },

        thunderstorm: {
            icon: "weather types svg/thunderstorm loader.svg",
            text: "Thunderstorm"
        }
    };

    const weatherData = getWeatherCondition(
        weatherInfo.current.weather_code,
        weatherInfo.current.is_day
    );


    let visualKey = weatherData.condition;


    if (weatherData.condition === "clear") {

        visualKey =
            weatherData.isDay
                ? "clearDay"
                : "clearNight";

    }

    else if (weatherData.condition === "mainlyClear") {

        visualKey = weatherData.isDay ? "mainlyClearDay": "mainlyClearNight";}

    else if (weatherData.condition === "partlyCloudy") { visualKey =
                weatherData.isDay
                ? "partlyCloudyDay"
                : "partlyCloudyNight";

    }
    const selectedWeather = weatherVisuals[visualKey];


    const weatherIcon = document.querySelector(".sunny-svg-icon img");

    const weatherConditionText = document.getElementById("weather-condition-text");


    if (!selectedWeather) { return;}


    weatherIcon.src = selectedWeather.icon;
    weatherConditionText.textContent = selectedWeather.text;
}

function updateWeatherDetailsUI(weatherInfo) {
const humidityvalue = document.querySelector(".humidity-val");
const windValue = document.querySelector(".wind-val");
const pressureValue = document.querySelector(".pressure-val");
const uvValue = document.querySelector(".uv-val");

        humidityvalue.textContent = `${weatherInfo.current.relative_humidity_2m}%`;

        windValue.textContent = `${Math.round(weatherInfo.current.wind_speed_10m)}km/h`;

        pressureValue.textContent = `${Math.round(weatherInfo.current.surface_pressure)}hPa`;

        uvValue.textContent = `${weatherInfo.current.uv_index}UV`;
}