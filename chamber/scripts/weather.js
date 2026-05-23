const myGraphic = document.querySelector('#weathergraphic');
const myTemperature = document.querySelector('#currenttemp');
const weatherDescription = document.querySelector('#description');
const tempHigh = document.querySelector('#temperaturehigh');
const tempLow = document.querySelector('#temperaturelow');
const humidity = document.querySelector('#humidity');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');
const hoy = document.querySelector('#hoy');
const nextDay = document.querySelector('#nextday');
const twoDays = document.querySelector('#twodays');

const myKey = 'f2cedce84a83d49f1712b40027cc6299';
const myLat = 35.16;
const myLong = -106.71;

const todayUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

// fetch the weather data
async function apiFetch() {
    try {
        const response = await fetch(todayUrl);
        if (response.ok) {
            const data = await response.json();
            // console.log(data); // use this to see the array
            displayResults(data);
        }
        else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// fetch the forecaset data, two different apis
async function apiFetchForecast() {
    try {
        const forecastResponse = await fetch(forecastUrl);
        if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();
            // console.log(forecastData); // use this to see the array
            displayForecastResults(forecastData);
        }
        else {
            throw Error(await forecastResponse.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// DISPLAY THE JSON DATA ONTO MY WEB PAGE
// this is the current weather data
function displayResults(data) {
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    myGraphic.setAttribute('src', iconsrc);
    myGraphic.setAttribute('alt', data.weather[0].description);
    myTemperature.innerHTML = `${Math.round(data.main.temp)}&deg; F`;
    weatherDescription.innerHTML = data.weather[0].description;
    tempHigh.innerHTML = `High: ${Math.round(data.main.temp_max)}&deg;`;
    tempLow.innerHTML = `Low: ${Math.round(data.main.temp_min)}&deg;`;
    humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
    sunrise.innerHTML = `Sunrise: ${formatTime(data.sys.sunrise)}`;
    sunset.innerHTML = `Sunset: ${formatTime(data.sys.sunset)}`;
    hoy.innerHTML = `Today: <span id="tempWord">${Math.round(data.main.temp)}&deg; F </span>`;
}

// here's the forecast data, different fetch
function displayForecastResults(forecastData) {
    // get the day names from the forecast data items
    const dayOneName = getDayName(forecastData.list[6].dt);
    const dayTwoName = getDayName(forecastData.list[14].dt);

    nextDay.innerHTML = `${dayOneName}: <span id="tempWord">${Math.round(forecastData.list[6].main.temp)}&deg; F </span>`;
    twoDays.innerHTML = `${dayTwoName}: <span id="tempWord">${Math.round(forecastData.list[14].main.temp)}&deg; F </span>`;
}

// turn a Unix timestamp into a readable time string
function formatTime(unixTimestamp) {
    // multiply by 1000 to convert seconds to milliseconds so the formatter will work
    const dateObject = new Date(unixTimestamp * 1000);

    // use JavaScript's built-in clock formatter
    return dateObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// extract a short day name from a timestamp
function getDayName(unixTimestamp) {
    const dateObject = new Date(unixTimestamp * 1000); // same as function formatTime

    // use Javascript's day formatter
    return dateObject.toLocaleDateString('en-US', { weekday: 'long' });
}


// Start the process
apiFetch();
apiFetchForecast();



