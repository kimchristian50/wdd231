const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector('figcaption');
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=f2cedce84a83d49f1712b40027cc6299';

// from video
const myTown = document.querySelector('#town');
const myDescription = document.querySelector('#description');
const myTemperature = document.querySelector('#temperature');
const myGraphic = document.querySelector('#graphic');

const myKey = 'f2cedce84a83d49f1712b40027cc6299';
const myLat = 35.16;
const myLong = -106.71;

const myUrl = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;


async function apiFetch() {
    try {
        const response = await fetch(myUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // use this to see the array
            displayResults(data);
        }
        else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// DISPLAY THE JSON DATA ONTO MY WEB PAGE
// function displayResults(data) {                              - this is from the video, the assignment below is a little different
//     myTown.innerHTML = data.name;
//     myDescription.innerHTML = data.weather[0].description;
//     myTemperature.innerHTML = `${data.main.temp}&deg; F`;
//     const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
//     myGraphic.setAttribute('src', iconsrc);
//     myGraphic.setAttribute('alt', data.weather[0].description);
// }

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg; F`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', data.weather[0].description);
    captionDesc.textContent = data.weather[0].description;
}

// Start the process
apiFetch();
