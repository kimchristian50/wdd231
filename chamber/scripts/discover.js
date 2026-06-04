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
        const thephoto = document.createElement('img')
        thephoto.src = x.photo_url
        thephoto.alt = x.name
        thecard.appendChild(thephoto)
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
        // build the cost element
        // const thecost = document.createElement('p')
        // thecost.innerText = x.cost
        // thecard.appendChild(thecost)
        // display the card
        showHere.appendChild(thecard)
        console.log(thecard)
    })
}

displayItems(places)