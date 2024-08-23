let city = 'trafford';

// Adding event Listener to search for other cities
const form = document.querySelector('form');
const searchInput = document.querySelector('#searchbar');
form.addEventListener('submit', async function(event) {
  event.preventDefault();
  city = searchInput.value;
  console.log(city);

  const cachedData = localStorage.getItem(city);
  if (!navigator.onLine) {
    const cachedData = localStorage.getItem(city);
    if (cachedData) {
      console.log("User is offline. Data fetched from cache");
      displayWeather(JSON.parse(cachedData).data);
    }

  }else{

  if (cachedData) {
    const parsedData = JSON.parse(cachedData);
    const cacheTimestamp = parsedData.timestamp;
    const currentTime = Date.now();
    const timeDifference = currentTime - cacheTimestamp;
    const fiveMinutesInMilliseconds = 5 * 60 * 1000;

    if (timeDifference < fiveMinutesInMilliseconds) {
      console.log("Data fetched from cache");
      displayWeather(parsedData.data);
      return;
    } else {
      // Clear the key from local storage if the time difference exceeds 5 minutes
      localStorage.removeItem(city);
      console.log("removed")
    }
  }

  await getWeather();
    
  
  }
  return searchInput;
});

const getWeather = async () => {
  
    const API_KEY = '526f1ac5cce94c390f972b13c12309ce';
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(API_URL);
    const data = await response.json();
    const currentTimestamp = Date.now();
    const weatherData = {
      timestamp: currentTimestamp,
      data: data
    };
    localStorage.setItem(city, JSON.stringify(weatherData)); // Store the latest weather data in local storage
    return displayWeather(data);
  };

  const displayWeather = (data) => {
  console.log(data);
  
  // Adding Date
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  // Adding Days
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDate = new Date();
  const currentDay = days[currentDate.getDay()];

  // Throws error message if city not found
  const { "1h": rain1h, "3h": rain3h } = data.rain || {};
  const rainfall = rain1h ? rain1h + " mm (1h)" : rain3h ? rain3h + " mm (3h)" : "N/A";
  
  
  const displayWeather = (data) => {
    document.getElementById("name").textContent = data.name; // Updated line
    document.getElementById("tempe").textContent = `Temperature: ${data.main.temp}°C`; // Updated line
    document.getElementById("pressure").textContent = `Pressure: ${data.main.pressure}hpa`; // Updated line
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`; // Updated line
    document.getElementById("pic").innerHTML = `<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">`;
    document.getElementById("wind-speed").textContent = `Wind speed: ${data.wind.speed} m/s`; // Updated line
    document.getElementById("condition").innerHTML = `Weather Condition: <br> <span id="wcondition">${data.weather[0].description}</span>`; // Updated line
  
    const currentdate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    document.getElementById("date").textContent = `Date: ${currentdate}`; // Updated line
  
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDay = days[new Date().getDay()];
    document.getElementById("days").textContent = `Day: ${currentDay}`; 
}
    // Updated line
  // Function to check user's online status and fetch data if necessary
function checkStatus(){
    if (!navigator.onLine) {
  
    const cachedData = localStorage.getItem(city);
    if (cachedData) {
      console.log("User is offline. Data fetched from cache");
      displayWeather(JSON.parse(cachedData).data);
      
    }
    }
}
  }
