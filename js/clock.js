export {updateCityTimeUI};

const timeDisplay = document.querySelector(".time-display");
const cityTitle = document.querySelector(".city-title");
const dateDisplay = document.querySelector(".date-display");

let clockInterval; 

function updateCityTimeUI(cityName, timezone, rawAPItime) {
  cityTitle.textContent = cityName;

  const dateObj = new Date(rawAPItime);
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dayName = days[dateObj.getDay()];
  const dateNumber = dateObj.getDate();
  const monthName = months[dateObj.getMonth()];

  dateDisplay.textContent = `${dayName}, ${dateNumber} ${monthName}`;

  if (clockInterval) {
      clearInterval(clockInterval);
  }

  function updateClock() {
      const now = new Date();
      const formattedTime = new Intl.DateTimeFormat("en-GB", {
          timeZone: timezone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
      }).format(now).toUpperCase();
      
      timeDisplay.textContent = formattedTime;
  }

  updateClock(); 
  clockInterval = setInterval(updateClock, 1000); 
}