export {hideWeatherUI, showWeatherUI,hideErrorScreen,showErrorScreen};


function hideWeatherUI(navbar, weatherDashboard) {
    if (navbar) navbar.style.display = "none";
    if (weatherDashboard) weatherDashboard.style.display = "none";
}

function showWeatherUI(navbar, weatherDashboard) {
    if (navbar) navbar.style.display = "";
    if (weatherDashboard) weatherDashboard.style.display = "";
}

function hideErrorScreen() {
    const existingError = document.getElementById("dynamic-error-page");
    if (existingError) {
        existingError.remove();
    }
}

function showErrorScreen(cityName) {
    hideErrorScreen(); 

    const errorScreen = document.createElement("div");
    errorScreen.id = "dynamic-error-page";


    errorScreen.innerHTML = `
        <div class="error-svg-wrapper"><img src="weather types svg/errorpage loader.svg" alt="Error 404"></div>
        <h1 id="error-404-text">#404</h1>
        <h2>City not found</h2>
        <p class="search-result-error">
            We couldn't find "${cityName}".
            Please search for a valid city.
        </p>
    `;

    document.body.appendChild(errorScreen);
}