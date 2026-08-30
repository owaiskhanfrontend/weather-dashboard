import { getCity, getWeather } from "./api.js";
import { getCurrentLocation } from "./location.js";
import { updateCityTimeUI } from "./clock.js";
import { updateTemperatureUI,updateWeatherVisualUI,updateWeatherDetailsUI } from "./current-weather-ui.js";
import { forecastlayout } from "./forecast-ui.js";
import { RenderHourlyLayouts } from "./hourly-ui.js";
import { hideWeatherUI,showWeatherUI,hideErrorScreen,showErrorScreen} from "./app-state.js";
import { handleThemeToggle } from "./theme.js";


const searchInput = document.getElementById("searchlocations");

const currentLocationButton = document.getElementById("Get-CurrentLocation");


async function runWeatherPipeline(cityName,latitude = null,longitude = null) {

    let loader = document.getElementById("dynamic-loader");
    if (!loader) {
        loader = document.createElement("div");
        loader.id = "dynamic-loader";
        document.body.appendChild(loader);
    }
    loader.innerHTML = `
    <div role="status" aria-live="polite" class="loader-container">
    <div class="loader-wrapper">
      <img
        src="weather types svg/thunder loader.svg"
        alt=""
        aria-hidden="true">
    </div>
    <p id="loader-text">
        Please wait, fetching weather data...
    </p>
</div>
    `;
    const navbar = document.getElementById("weather-navbar");
    const weatherDashboard = document.getElementById("weather-dashboard");
    hideWeatherUI(navbar,weatherDashboard);
    hideErrorScreen();
    if (!navigator.onLine) {
        document.getElementById("loader-text").textContent ="Waiting for the network. Please wait...";
        window.addEventListener("online",() =>runWeatherPipeline(cityName,
            latitude,
            longitude),{once: true});
        return;
    }

    try {
        let cityData;
        if (latitude !== null && longitude !== null) {cityData = {name: cityName,
            latitude,
            longitude};
        } else {
            cityData = await getCity(cityName);}
            
        const weatherInfo = await getWeather(cityData.latitude,cityData.longitude);

        updateCityTimeUI( cityData.name,weatherInfo.timezone,weatherInfo.current.time);
        updateTemperatureUI(weatherInfo);
        updateWeatherVisualUI(weatherInfo);
        updateWeatherDetailsUI(weatherInfo);
        forecastlayout( weatherInfo);
        RenderHourlyLayouts(weatherInfo);
        showWeatherUI(navbar, weatherDashboard);
        loader.remove();
    } catch (error) {

        if (
            error.message === "Failed to fetch") {
            document.getElementById("loader-text").textContent = "Waiting for the network. Please wait...";
            window.addEventListener("online",() => runWeatherPipeline(cityName,
                latitude,
                longitude),
                { once: true });
            return;
        }

        loader.remove();if (navbar) {navbar.style.display = "";}
        showErrorScreen(cityName);
    }
}


currentLocationButton.addEventListener("click",async () => {if (!navigator.onLine) {return;}
        try {const locationData = await getCurrentLocation();


            await runWeatherPipeline(locationData.city,locationData.latitude,locationData.longitude);
        } catch (error) {
            console.error("Current location error:",error.message);
        }
    }
);


searchInput.addEventListener("keydown",event => {
        if (event.key !== "Enter"){return;}
        const userTypedValue = searchInput.value.trim();
        if (userTypedValue === "") {return;}
        runWeatherPipeline(
        userTypedValue
     );
   }
);

handleThemeToggle();
runWeatherPipeline("Karachi");







