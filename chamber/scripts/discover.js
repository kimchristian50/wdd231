import { places } from '../data/places.mjs'
console.log(places)

//-------get a reference to the division where we display the items
const showHere = document.querySelector("#allPlaces")

//--------- loop through the array of JSON items
function displayItems(places) {
    places.forEach(x => {
        // build the card element

        const thecard = document.createElement('div')
        // build the photo element
        const theFigure = document.createElement('figure')
        const thephoto = document.createElement('img')
        thephoto.src = x.photo_url
        thephoto.alt = x.name
        thephoto.setAttribute("loading", "lazy")
        thephoto.setAttribute("width", 300)
        thephoto.setAttribute("height", 200)
        thephoto.setAttribute("class", "hover")
        theFigure.appendChild(thephoto)
        thecard.appendChild(theFigure)
        // build the title element
        const thetitle = document.createElement('h2')
        thetitle.innerText = x.name
        thecard.appendChild(thetitle)
        // build the address element
        const theaddress = document.createElement('address')
        theaddress.innerText = x.address
        thecard.appendChild(theaddress)
        // build the description element
        const thedesc = document.createElement('p')
        thedesc.innerText = x.description
        thecard.appendChild(thedesc)
        // build the button
        const thelink = document.createElement('a')
        thelink.setAttribute("href", x.website)
        thelink.setAttribute("target", "_blank")
        const thebutton = document.createElement('button')
        thebutton.innerText = `Learn More`
        thelink.appendChild(thebutton)
        thecard.appendChild(thelink)
        // display the card
        showHere.appendChild(thecard)
        console.log(thecard)
    })
}

displayItems(places)

// Use localStorage to store and track the last visit to the page. Each time the discovery.html
// page loads, increment the counter by one. Track the date of the last visit.

// Initialize display element variable
const todayDisplay = document.querySelector("#today");
const visitsDisplay = document.querySelector("#localStorage");

// milliseconds to days constant - 1000 ms/s * 60 s/m * 60 m/h * 24 h/d
const msToDays = 86400000;
// today's date
const theDateToday = new Date();
const today = Date.now();

// Get the stored VALUE for the lastVisit KEY in localStorage if it exists.
// If the lastVisit KEY is missing, then assign 0 to the lastVisit variable.
let numVisits = Number(window.localStorage.getItem("visits-ls")) || 0;
let lastVisit = Number(window.localStorage.getItem("lastVisit-ls")) || 0;

// calculate the raw difference
let rawDifference = (today - lastVisit) / msToDays;
// round it to a whole number of days before running the if statement
let difference = Math.floor(rawDifference);

// visitsDisplay.textContent = difference; // for troubleshooting

// increment the number of reviews by one.
numVisits++;

// Determine if this is the first review or display the number of reviews.
if (lastVisit !== 0) {
    // visitsDisplay.textContent = `numVisits is ${numVisits}`;
    if (difference < 1) {
        todayDisplay.textContent = `Back so soon! Awesome!`;
    }
    else if (difference === 1) {
        todayDisplay.textContent = `You last visited ${difference} day ago.`;
    }
    else {
        todayDisplay.textContent = `You last visited ${difference} day ago.`;
    }
} else {
    todayDisplay.textContent = `Welcome! Let us know if you have any questions.`;
}

// store the new review total into localStorage, key=lastVisit
localStorage.setItem("visits-ls", numVisits);
localStorage.setItem("lastVisit-ls", today);