const file = 'data/members.json';
const cards = document.querySelector('#spotlight-container');

async function getSpotlightData() {
    const response = await fetch(file); // request
    const data = await response.json(); // parse the JSON data
    // console.table(data.businesses); // temp output test of data response 
    displaySpotlights(data.businesses);
}

getSpotlightData();

const displaySpotlights = (businesses) => {
    // Filter down to only eligible gold/silver members (levels 2 or 3)
    const eligibleBusinesses = businesses.filter(business => business.level >= 2);
    // console.table(eligibleBusinesses); // turn this on for troubleshooting to see it in the console

    // pick two random, unique businesses from the eligible pool
    const selectedSpotlights = [];

    // loop until there are 2 (or 3?) businesses selected
    while (selectedSpotlights.length < 2 && eligibleBusinesses.length > 1) {

        // generates a random index based on the current length of the eligible business list
        // it creates a random number between 0-1, then multiplies that by the number of businesses in the array
        // then rounds down to the nearest whole integer, giving a random whole number which must map to a position in the array
        const randomIndex = Math.floor(Math.random() * eligibleBusinesses.length);

        // take that business out of the eligible list (splice removes it so it can't be used again)
        // .splice() argument 1 is where to start cutting (randomIndex) and the 2nd argument is how many items to cut (1)
        // the [0] at the end is complicated and has to do with returning only what we want
        const chosenBusiness = eligibleBusinesses.splice(randomIndex, 1)[0];

        // save it to the spotlight array
        selectedSpotlights.push(chosenBusiness);
    }

    selectedSpotlights.forEach((business) => {
        // create the main card section element
        let card = document.createElement('section');
        card.classList.add('spotlight-card');

        // create elements to add to the div.cards element
        let name = document.createElement('h3');
        let tagline = document.createElement('p');
        let phone = document.createElement('p');
        let email = document.createElement('p');
        let url = document.createElement('a');
        let level = document.createElement('p');
        let image = document.createElement('img');

        // create two grid row structural wrappers
        let topRow = document.createElement('div');
        topRow.classList.add('spotlight-top');

        let bottomRow = document.createElement('div');
        bottomRow.classList.add('spotlight-bottom');

        let contactInfo = document.createElement('div');
        contactInfo.classList.add('spotlight-contact');

        // populate the data
        let metal;
        if (business.level == 2) {
            metal = 'Silver';
        }
        else if (business.level == 3) {
            metal = 'Gold';
        }

        name.textContent = `${business.name}`;
        name.setAttribute('class', 'spotlight-name');
        tagline.textContent = `${business.other}`;
        tagline.classList.add('tagline');
        phone.innerHTML = `<span>PHONE: </span>${business.phone}`;
        url.innerHTML = `<span>URL: </span>${business.url}`;
        url.setAttribute('href', business.url);
        level.textContent = `Membership level: ${metal}`
        email.innerHTML = `<span>EMAIL: </span>${business.email}`;

        // build the image portrait by setting all the relevant attributes
        image.setAttribute('src', business.imagefile);
        image.setAttribute('alt', `Logo for ${business.name} in Albuquerque NM`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '200');
        image.setAttribute('height', '150');

        // assemble the sub-structure of the card - top row
        topRow.appendChild(name);
        topRow.appendChild(tagline);

        // right side of the bottom row
        contactInfo.appendChild(email);
        contactInfo.appendChild(phone);
        contactInfo.appendChild(url);
        contactInfo.appendChild(level);

        // full bottom row
        bottomRow.appendChild(image);
        bottomRow.appendChild(contactInfo);

        // append wrappers to main card
        card.appendChild(topRow);
        card.appendChild(bottomRow);
        cards.appendChild(card);
    });
}




