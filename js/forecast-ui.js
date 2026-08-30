export { forecastlayout };

import { getWeatherCondition } from "./weather-utils.js";


function forecastlayout(weatherInfo) {

    const ForecastdaysContainer = document.getElementById("Forecastdays-container");

    const daily = weatherInfo.daily;

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


    const ForeCastTitleHTML = `
        <div class="forecast-wrapper">
            <span class="forecast-title">
                5 Days Forecast:
            </span>
        </div>
    `;


    const forecastlayoutHTML = daily.time
        .slice(0, 5)
        .map((date, index) => {

            const weatherCode = daily.weather_code[index];

            const temperature = Math.round( daily.temperature_2m_max[index]);

            const today = new Date().toLocaleDateString("en-CA");

            const isToday = date === today;

            let isNight = false;


            if (isToday) { isNight = weatherInfo.current.is_day === 0;}


            const weatherData = getWeatherCondition(weatherCode,isToday
                        ? weatherInfo.current.is_day
                        : 1
                );


            let icon = forecastWeatherIcons[ weatherData.condition];

           if (
            isToday &&
            isNight &&(
            weatherData.condition === "clear" ||
            weatherData.condition === "mainlyClear"
 )
) 
{
    icon = "weather types svg/moon-stars static.svg";
}

else if (
            isToday &&
            isNight &&
            weatherData.condition === "partlyCloudy"
)
 {
    icon = "weather types svg/cloud-moon-duotone static.svg";
}


            const dateObject = new Date(`${date}T12:00:00`);

            const formattedDate =
                new Intl.DateTimeFormat("en-GB", {
                    weekday: "long",
                    day: "numeric",
                    month: "short"
                }).format(dateObject);

            return `
                <div class="forcast-details">
                    <div class="forecast-icon-svg">
                        <img
                            src="${icon}"
                            alt="">
                    </div>
                    <span class="forecast-tem-val">
                        ${temperature}°C
                    </span>
                    <div class="forecast-date-info">
                        <span class="forecast-date">
                            ${formattedDate}
                        </span>
                    </div>
                </div>
            `;
        })
        .join("");


        ForecastdaysContainer.innerHTML =
        ForeCastTitleHTML +
        forecastlayoutHTML;
}