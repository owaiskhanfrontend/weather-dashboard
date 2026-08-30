export { getCity, getWeather };


async function getCity(city) {
  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=5&country_code=PK`);
  
  if (!response.ok) {
    throw new Error(`The city cannot be found. Status: ${response.status}`);
  }

  const data = await response.json();
  
  if (!data.results || data.results.length === 0) {
      throw new Error("City not found in Pakistan. Please try a valid local city.");
  }

  return data.results[0];
}


async function getWeather(latitude, longitude) {
  const response = await fetch(  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,weather_code,is_day,relative_humidity_2m,wind_speed_10m,surface_pressure,uv_index&hourly=temperature_2m,weather_code,is_day,wind_speed_10m,wind_direction_10m&daily=sunrise,sunset,weather_code,temperature_2m_max&timezone=auto`);

  
  if (!response.ok) {
    throw new Error(`The weather data is incorrect. Status: ${response.status}`);
  }

  return await response.json();
}