import { getWeatherCondition } from "./weather-utils.js";

export { RenderHourlyLayouts };


function formatHourlyTime(hour) {

    const date = new Date(2000, 0, 1, hour, 0);

    return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        hour12: true
    }).format(date);
}


function getNextDate(dateString) {

    const date = new Date(`${dateString}T00:00:00Z`);

    date.setUTCDate(
        date.getUTCDate() + 1
    );

    return date.toISOString().slice(0, 10);
}


function RenderHourlyLayouts(weatherInfo) {

    const hourly = weatherInfo.hourly;

    const daily = weatherInfo.daily;

    const cardsWrapper = document.getElementById("hourly-cards-wrapper");


    const forecastWeatherIcons = {

        clear:
            "weather types svg/sunny-weather static.svg",

        mainlyClear:
            "weather types svg/sunny-weather static.svg",

        partlyCloudy:
            "weather types svg/cloud-sun-duotone static.svg",

        overcast:
            "weather types svg/cloudy static.svg",

        fog:
            "weather types svg/cloud-fog-duotone static.svg",

        drizzle:
            "weather types svg/drizzle-drop static.svg",

        freezingDrizzle:
            "weather types svg/drizzle-drop static.svg",

        rain:
            "weather types svg/cloud-rain static.svg",

        freezingRain:
            "weather types svg/cloud-rain static.svg",

        rainShowers:
            "weather types svg/cloud-rain static.svg",

        heavyRainShowers:
            "weather types svg/cloud-thunderstorm static.svg",

        snow:
            "weather types svg/cloud-light snow static.svg",

        snowGrains:
            "weather types svg/cloud-light snow static.svg",

        snowShowers:
            "weather types svg/cloud-light snow static.svg",

        heavySnow:
            "weather types svg/cloud-heavy snow static.svg",

        heavySnowShowers:
            "weather types svg/cloud-heavy snow static.svg",

        thunderstorm:
            "weather types svg/cloud-thunderstorm static.svg"
    };


    const selectedHours = [12, 15, 18, 21, 0];


    const today = daily.time[0];

    const tomorrow = getNextDate(today);


    cardsWrapper.innerHTML = selectedHours.map((targetHour, mapIndex) => {

                const targetDate = targetHour === 0 ? tomorrow : today;


                const index = hourly.time.findIndex(time => {

                        const parts = time.split("T");

                        const date = parts[0];

                        const hour =
                            Number(parts[1].slice(0, 2));


                        return (
                            date === targetDate && hour === targetHour
                        );
                    });


                if (index === -1) {
                    return "";
                }


                const temperature = Math.round(hourly.temperature_2m[index]);


                const windSpeed = Math.round(hourly.wind_speed_10m[index]);


                const windDirection = hourly.wind_direction_10m[index];


                const weatherCode = hourly.weather_code[index];


                const isDay = hourly.is_day[index];


                const weatherData = getWeatherCondition(weatherCode,isDay);


                let weatherIcon = forecastWeatherIcons[weatherData.condition];


                if (!weatherData.isDay && (
                        weatherData.condition === "clear" ||weatherData.condition === "mainlyClear"))
                 {
                        weatherIcon ="weather types svg/moon-stars static.svg";}

                else if (!weatherData.isDay && weatherData.condition === "partlyCloudy")
                {weatherIcon = "weather types svg/cloud-moon-duotone static.svg";}


                const cardThemeClass = (mapIndex === 3 ||mapIndex === 4)? "purple-card": "";


                return `
                    <div class="hourly-forecast-layout ${cardThemeClass}">
                        <span class="hourly-tem-time">
                            ${formatHourlyTime(targetHour)}
                        </span>
                        <div class="hourly-temp-wrapper">
                            <div class="hourly-svg-wrapper">
                                <img
                                    src="${weatherIcon}"
                                    alt="">
                            </div>
                            <span class="Hourly-tem-val">
                                ${temperature}°C
                            </span>
                        </div>
                        <div class="hourly-wind-wrapper">
                            <div class="hourly-nav-svg-wrapper">
                                <img
                                    src="weather types svg/navigation 1.svg"
                                    alt=""
                                    style="transform: rotate(${windDirection}deg);">
                            </div>
                            <span class="Hourly-wind-val">
                                ${windSpeed}km/h
                            </span>
                        </div>
                    </div>
                `;
            })
            .join("");
}