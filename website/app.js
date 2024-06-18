/* Global Variables */
const openWeatherMapBaseURL =
  "http://api.openweathermap.org/data/2.5/weather?appid=";
const serverBaseURL = "http://localhost:3000";
const dataPath = "/data";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const APIKey = "2bfa9aa6dc803bc06292c5a85d1375e5&units=imperial";

/* Function called by event listener */
const generateCallback = async () => {
  let zip = document.getElementById("zip").value;
  let weatherData = await retrieveWeather(openWeatherMapBaseURL, APIKey, zip);
  let temp = weatherData.main.temp;
  let content = document.getElementById("feelings").value;
  await updateData(temp, content);
  let dataAfterUpdate = await getData();
  console.log(dataAfterUpdate);
  // Write updated data to DOM elements
  document.getElementById("temp").innerHTML =
    Math.round(dataAfterUpdate.temperature) + "degrees";
  document.getElementById("content").innerHTML = dataAfterUpdate.content;
  document.getElementById("date").innerHTML = dataAfterUpdate.date;
};
/* Function to GET Web API Data*/
const retrieveWeather = async (baseURL, APIKey, zip) => {
  let url = baseURL + APIKey + "&zip=" + zip;
  let response = await fetch(url);
  try {
    const data = await response.json();
    console.log("RESPONSE FROM OPENWEATHER: ", data);
    return data;
  } catch (exception) {
    console.log("ERROR WHILE CALL OPEN WEATHER", exception);
  }
};
/* Function to POST data */
const updateData = async (temp, content) => {
  let body = {
    date: newDate,
    temperature: temp,
    content: content,
  };
  let url = serverBaseURL + dataPath;
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  try {
    const data = await response.json();
    return data;
  } catch (exception) {
    console.log("ERROR WHILE CALL API FROM LOCAL SERVER", exception);
  }
};

/* Function to GET Project Data */
const getData = async () => {
  let url = serverBaseURL + dataPath;
  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  try {
    const data = await response.json();
    return data;
  } catch (exception) {
    console.log("ERROR WHILE CALL API FROM LOCAL SERVER", exception);
  }
};

// Event listener to add function to existing HTML DOM element
const button = document.getElementById("generate");
button.addEventListener("click", generateCallback);
