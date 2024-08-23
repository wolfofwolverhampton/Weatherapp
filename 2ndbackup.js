let city = 'Doncaster';

// Adding event Listener to search for other cities
const form = document.querySelector('form');
const searchInput = document.querySelector('#bar');
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

// Adding button to get back to the city that was assigned
const getBackButton = document.getElementById("get_back");
getBackButton.addEventListener("click", () => {
  location.reload();
});

const pastButton = document.getElementById("past");
pastButton.addEventListener("click", () => {
  window.location.href = 'http://localhost/cofee/ISA/WeatherApplication%20part%202/Aryan_Dangol_ 2329477(WeatherApp).php';
});

// Code for fetching the URL
const getWeather = async () => {
  let load = "Loading...";
  document.getElementById("box").innerHTML = load;

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
  if (data.cod == "404") {
    document.getElementById("box").innerHTML = `Error, City not found!`;
  }

  const { "1h": rain1h, "3h": rain3h } = data.rain || {};
  const rainfall = rain1h ? rain1h + " mm (1h)" : rain3h ? rain3h + " mm (3h)" : "N/A";

  // Code for displaying the weather on HTML
  document.getElementById("main").innerHTML = `
    <h2 id="name">${data.name}</h2>
    <h5 id="timee">Updated as of ${date}/ ${month}/ ${year}, ${currentDay}</h5>
    <div id="box">
      <div class="forimage">
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="You are currenty offline" id="weatherimage">
        <h2 id="temperature">${data.main.temp}</h2>
      </div>
      <div class="display">
        <h4 id="condition">${data.weather[0].main}</h4>
        <div style="display: inline-block;" class="d1 aa"><p>Max-Temp: ${data.main.temp}c</p></div>
          <div style="display: inline-block;" class="d1 ab"><p>Humidity: ${data.main.humidity}%</p></div>
          <div style="display: inline-block;" class="d1 ac"><p>Wind: ${data.wind.speed}m/s</p></div>
          <div style="display: inline-block;" class="d1 ad"><p>Rain: ${rainfall}</p></div>
          <div style="display:inline-block;" class="d1 ae"><p>Pressure: ${data.main.pressure}hpa</p></div>
        </div>
      </div>
    </div>
  `;
  
    // Set background image based on weather condition
    let imageUrl;
    switch (data.weather[0].main) {
      case 'Clouds':
      case 'Cloudy':
        document.querySelector('body').style.backgroundImage = "url('clouddd.jpg')";
        break;
      case 'Rain':
      case 'Rainy':
      case 'Thunderstorm':
        document.querySelector('body').style.backgroundImage = "url('rainy.jpg')";
        break;
      case 'Snow':
        document.querySelector('body').style.backgroundImage = "url('snoww.jpg')";
        break;
      case 'Haze':
      case 'Mist':
      case 'Smoke':
        document.querySelector('body').style.backgroundImage = "url('haze.jpg')";
        break;
      case 'Fog':
        document.querySelector('body').style.backgroundImage = "url('foggy.jpg')";
        break;
      default:
        document.querySelector('body').style.backgroundImage = "url('sunshine-clouds-sky-during-morning-background-blue-white-pastel-heaven-soft-focus-lens-flare-sunlight-abstract-blurred-cyan-gradient-peaceful-nature-open-view-out-windows-beautiful-summer-spri.avif')";
    }
  };
  
//   // Check if data exists in local storage for the default city
// async function checkStorage() {
//   const cachedData = localStorage.getItem(city);
//   if (cachedData) {
//     const parsedData = JSON.parse(cachedData);
//     const cacheTimestamp = parsedData.timestamp;
//     const currentTime = Date.now();
//     const timeDifference = currentTime - cacheTimestamp;
//     const fiveMinutesInMilliseconds = 5 * 60 * 1000;

//     if (timeDifference < fiveMinutesInMilliseconds) {
//       console.log("Data fetched from cache");
//       displayWeather(parsedData.data);
//       return;
//     } else {
//       // Clear the key from local storage if the time difference exceeds 5 minutes
//       localStorage.removeItem(city);
//     }
//   }

//   await getWeather();
// }

  
//   // Check if user is offline and fetch data if necessary
//   function checkUserStatus() {
//     if (!navigator.onLine) {
//       const cachedData = localStorage.getItem(city);
//       if (cachedData) {
//         console.log("User is offline. Data fetched from cache");
//         displayWeather(JSON.parse(cachedData).data);
//       }
//     }
//   }
//   city = "Doncaster";
//   // Execute the functions on page load
//   checkUserStatus();
//   checkStorage();

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

async function checkStorage(city) {
  if (navigator.onLine) {
    const cachedData = localStorage.getItem(city);
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
        localStorage.removeItem(city);
        console.log("Removed old data from local storage");
      }
    }

    await getWeather(city);
  }else{
    checkStatus()
  }
}




city = "Doncaster"; 
checkStorage(city);

  
  



  
