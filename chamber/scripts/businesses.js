const file = 'data/members.json';
const cards = document.querySelector('#cards');

async function getBusinessData() {
    const response = await fetch(file); // request
    const data = await response.json(); // parse the JSON data
    // console.table(data.businesses); // temp output test of data response 
    displayBusinesses(data.businesses);
}

getBusinessData();

const displayBusinesses = (businesses) => {
    businesses.forEach((business) => {
        // create elements to add to the div.cards element
        let card = document.createElement('section');
        let name = document.createElement('h3');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let url = document.createElement('a');
        let image = document.createElement('img');

        name.textContent = `${business.name}`;
        address.textContent = `${business.address}`;
        phone.textContent = `${business.phone}`;
        url.textContent = `${business.url}`;
        url.setAttribute('href', business.url);

        // build the image portrait by setting all the relevant attributes
        image.setAttribute('src', business.imagefile);
        image.setAttribute('alt', `Logo for ${business.name} in Albuquerque NM`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '340');
        image.setAttribute('height', '440');

        // append the section (card) with the created elements
        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(url);
        cards.appendChild(card);
    });
}



