const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url); // request
    const data = await response.json(); // parse the JSON data
    // console.table(data.prophets); // temp output test of data response 
    displayProphets(data.prophets);
}

getProphetData();

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        // create elements to add to the div.cards element
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let birthdate = document.createElement('p');
        let birthplace = document.createElement('p');
        let portrait = document.createElement('img');

        // build the h2 content out to show the prophet's full namel
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        birthdate.textContent = `Date of birth: ${prophet.birthdate}`;
        birthplace.textContent = `Place of birth: ${prophet.birthplace}`;

        // build the image portrait by setting all the relevant attributes
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // append the section (card) with the created elements
        card.appendChild(fullName);
        card.appendChild(birthdate);
        card.appendChild(birthplace);
        card.appendChild(portrait);
        cards.appendChild(card);
    });
}
