let city = 'trafford';

document.addEventListener('DOMContentLoaded', function() {
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
    } else {
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
          console.log("removed");
        }
      }

      await getWeather();
    }
    return searchInput;
  });

  getWeather();
});
const currentTimestamp = Date.now();

async function getWeather() {
  const apiKey = '90fe303d20dec43c15e217847bf5532b';
  const api_link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(api_link);
    const data = await response.json();
    console.log(data);

    if (data.cod == "404") {
      document.getElementById("name").textContent = `City not Found`; // Updated line
      return;
    }

    const weatherData = {
      timestamp: currentTimestamp,
      data: data
    };
    localStorage.setItem(city, JSON.stringify(weatherData)); // Store the latest weather data in local storage
    displayWeather(data);
  } catch (error) {
    console.log("Error fetching weather data:", error);
  }
}

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
  document.getElementById("days").textContent = `Day: ${currentDay}`; // Updated line

  let imageUrl;
  switch (data.weather[0].main) {
    case 'Clouds':
    case 'Cloudy':
      document.querySelector('body').style.backgroundImage = "url('https://images.pexels.com/photos/416920/pexels-photo-416920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
      document.querySelector('body').style.backgroundSize = "cover";
      break;
    case 'Rain':
    case 'Rainy':
    case 'Thunderstorm':
      document.querySelector('body').style.backgroundImage = "url('https://images.pexels.com/photos/4396991/pexels-photo-4396991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
      document.querySelector('body').style.backgroundSize = "cover";
      break;
    case 'Snow':
      document.querySelector('body').style.backgroundImage = "url('https://images.pexels.com/photos/688660/pexels-photo-688660.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
      document.querySelector('body').style.backgroundSize = "cover";
      break;
    case 'Haze':
    case 'Mist':
    case 'Smoke':
      document.querySelector('body').style.backgroundImage = "url('https://images.pexels.com/photos/158672/fog-forest-mountain-world-clouds-158672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
      document.querySelector('body').style.backgroundSize = "cover";
      break;
    case 'Fog':
      document.querySelector('body').style.backgroundImage = "url('https://images.pexels.com/photos/158672/fog-forest-mountain-world-clouds-158672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
      document.querySelector('body').style.backgroundSize = "cover";
      break;
    default:
      document.querySelector('body').style.backgroundImage = "url('https://images.pexels.com/photos/1590915/pexels-photo-1590915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
      document.querySelector('body').style.backgroundSize = "cover";
  }
};

async function checkStorage(city) {
  if (navigator.online){
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
    checkUserStatus()
  }
}

// Function to check user's online status and fetch data if necessary

function checkUserStatus() {
  if (!navigator.onLine) {
    city='trafford'
    const cachedData = localStorage.getItem(city);
    if (cachedData) {
      console.log("User is offline. Data fetched from cache");
      displayWeather(JSON.parse(cachedData).data);
      return;
    }
  }
}


// Execute the functions on page load
city = "trafford"; // Provide the default city here

checkStorage(city);