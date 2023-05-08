// require('dotenv').config();
// import { WEATHER_API_KEY } from './config.js';

// const apiKey = `${WEATHER_API_KEY}`;
// console.log(apiKey);
// require('dotenv').config();
// const apiKey = process.env.APIKEY;
// console.log(apiKey);

// function to convert text to sentence case
function toSentenceCase(str) {
    // Convert the string to lowercase
    str = str.toLowerCase();

    // Split the string into an array of sentences
    var sentences = str.split(". ");

    // Capitalize the first letter of each sentence
    for (var i = 0; i < sentences.length; i++) {
        sentences[i] = sentences[i][0].toUpperCase() + sentences[i].slice(1);
    }

    // Join the sentences back into a string
    str = sentences.join(". ");

    return str;
}

const apiKey = ""

const weatherData = document.getElementById("weather-data");
const cityName = document.getElementById("cityInput");
const formElement = document.querySelector("form");


formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = cityName.value;
    document.getElementById("city").innerHTML = toSentenceCase(city);
    getWeatherData(city);
    // console.log(city);

});

async function getWeatherData(cityName) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);

        if (!response.ok) {
            throw new Error("Network response not ok");
        }
        const data = await response.json();
        // console.log(data);
        const temp = Math.round(data.main.temp);
        // console.log(temp);
        const description = data.weather[0].description;
        // console.log(description);
        const icon = data.weather[0].icon;
        // console.log(icon);
        const divDetails = [
            `Feels like : ${Math.round(data.main.feels_like)} °C`,
            `Humidity : ${data.main.humidity} %`,
            `Wind Speed : ${data.wind.speed} m/s`,
        ];
        // console.log({ divDetails });
        document.getElementById("icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon">`;
        document.getElementById("temp").innerHTML = `<h2>${temp} °C </h2>`;
        document.getElementById("description").innerHTML = `${description}`;
        const div = weatherData.querySelector("#details");
        div.innerHTML = divDetails.map((detail) => `<div>${detail}</div>`).join("");

        // const parentDiv = document.getElementById("details");
        // console.log(parentDiv);
        // const divElements = divDetails.map(detail => {
        //     const newDiv = document.createElement("div");
        //     newDiv.textContent = detail;
        //     return newDiv;
        // });
        // console.log(divElements);
        // divElements.forEach(div => parentDiv.appendChild(div));
    }

    catch (error) {
        // console.log("An error occurred while fetching the weather data: ", error);
        // // display an error message to the user
        // const errorMessage = document.createElement("p");
        // errorMessage.textContent = "Oops! Something went wrong while fetching the weather data. please check the name of the city and Please try again later.";
        // weatherData.appendChild(errorMessage);
        // location.reload();

        document.getElementById("icon").innerHTML = ""
        document.getElementById("temp").innerHTML = ""
        document.getElementById("description").innerHTML = "An error happened, please try again later";
        weatherData.querySelector("#details").innerHTML = "";
        // alert("Oops ! please check the name of the city and try again later");

    }

}