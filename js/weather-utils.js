export {getWeatherCondition};

function getWeatherCondition(weatherCode, isDay) {

    let condition;

    switch (weatherCode) {
        case 0:
            condition = "clear";
            break;

        case 1:
            condition = "mainlyClear";
            break;

        case 2:
            condition = "partlyCloudy";
            break;

        case 3:
            condition = "overcast";
            break;

        case 45:
        case 48:
            condition = "fog";
            break;

        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
            condition = "drizzle";
            break;

        case 61:
        case 63:
        case 65:
            condition = "rain";
            break;

        case 66:
        case 67:
            condition = "freezingRain";
            break;

        case 71:
        case 73:
            condition = "snow";
            break;

        case 75:
            condition = "heavySnow";
            break;

        case 77:
            condition = "snowGrains";
            break;

        case 80:
        case 81:
            condition = "rainShowers";
            break;

        case 82:
            condition = "heavyRainShowers";
            break;

        case 85:
            condition = "snowShowers";
            break;

        case 86:
            condition = "heavySnowShowers";
            break;

        case 95:
        case 96:
        case 99:
            condition = "thunderstorm";
            break;

        default:
            condition = "unknown";
    }

    return {
        condition,
        isDay: isDay === 1,
        timeOfDay: isDay === 1 ? "day" : "night"
    };
}

