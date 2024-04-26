const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": " give your own API key",
    "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
  },
};

let cityData = {
  Lucknow: { cloud_pct: "", feels_like: "", humidity: "", max_temp: "", min_temp: "", sunrise: "", sunset: "", temp: "", wind_degrees: "" },
  Shimla: { cloud_pct: "", feels_like: "", humidity: "", max_temp: "", min_temp: "", sunrise: "", sunset: "", temp: "", wind_degrees: "" },
  Chandigarh: { cloud_pct: "", feels_like: "", humidity: "", max_temp: "", min_temp: "", sunrise: "", sunset: "", temp: "", wind_degrees: "" },
  Ahmedabad: { cloud_pct: "", feels_like: "", humidity: "", max_temp: "", min_temp: "", sunrise: "", sunset: "", temp: "", wind_degrees: "" },
  Kolkata: { cloud_pct: "", feels_like: "", humidity: "", max_temp: "", min_temp: "", sunrise: "", sunset: "", temp: "", wind_degrees: "" },
  Bhopal: { cloud_pct: "", feels_like: "", humidity: "", max_temp: "", min_temp: "", sunrise: "", sunset: "", temp: "", wind_degrees: "" },
};

let cityNames = Object.keys(cityData);

let defaultCity = "Bhopal";

const getWeather = (city) => {
  defaultCity = city;
  cityName.innerHTML = defaultCity;
  fetch(
    "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=" + city,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);

      const sunriseTime = new Date(response.sunrise * 1000).toUTCString();
      const sunsetTime = new Date(response.sunset * 1000).toUTCString();

      cloud_pct.innerHTML = response.cloud_pct;
      temp.innerHTML = response.temp;
      temp2.innerHTML = response.temp;
      feels_like.innerHTML = response.feels_like;
      humidity.innerHTML = response.humidity;
      humidity2.innerHTML = response.humidity;
      min_temp.innerHTML = response.min_temp;
      max_temp.innerHTML = response.max_temp;
      wind_degrees.innerHTML = response.wind_degrees;
      wind_degrees2.innerHTML = response.wind_degrees;
      sunrise.innerHTML = sunriseTime;
      sunset.innerHTML = sunsetTime;

      cityData[city].cloud_pct = response.cloud_pct;
      cityData[city].feels_like = response.feels_like;
      cityData[city].humidity = response.humidity;
      cityData[city].max_temp = response.max_temp;
      cityData[city].min_temp = response.min_temp;
      cityData[city].sunrise = sunriseTime;
      cityData[city].sunset = sunsetTime;
      cityData[city].temp = response.temp;
      cityData[city].wind_degrees = response.wind_degrees;

      displayWeatherData();
    })
    .catch((err) => console.error(err));
};

getWeather(defaultCity);

const displayWeatherData = () => {
  const tableBody = document.getElementById("weatherbody");
  tableBody.innerHTML = ""; 

  for (let city of cityNames) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <th scope="row" class="text-start">${city}</th>
      <td>${cityData[city].cloud_pct}</td>
      <td>${cityData[city].feels_like}</td>
      <td>${cityData[city].humidity}</td>
      <td>${cityData[city].max_temp}</td>
      <td>${cityData[city].min_temp}</td>
      <td>${cityData[city].sunrise}</td>
      <td>${cityData[city].sunset}</td>
      <td>${cityData[city].temp}</td>
      <td>${cityData[city].wind_degrees}</td>
    `;
    tableBody.appendChild(newRow);
  }
};

cityNames.forEach(getWeather);

submit.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(city.value);
});


