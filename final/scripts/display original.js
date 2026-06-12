// create a global or block-scoped variable to hold data once loaded
let recipes = [];

// get a reference to where we display the items
const showHere = document.querySelector("#showHere")
// get a reference to the html dialog element
const mydialog = document.querySelector("#mydialog")
const mytitle = document.querySelector("#mydialog h2")
const myimg = document.querySelector("#mydialog img")
const ingredients = document.querySelector("#mydialog ul")
const instructions = document.querySelector("#mydialog ol")
const myclose = document.querySelector("#mydialog button")
// get a reference to the search input element
const searchInput = document.querySelector("#recipeSearch")
const searchForm = document.querySelector("#searchForm")
// get a reference for the selectRecipe button element
const recipeSelect = document.querySelector("#recipeSelect")

// 2. Create an asynchronous function to request the file safely
async function getRecipeData() {
    try {
        // Fetch the local JSON data stream
        const response = await fetch('data/recipes.json');

        // Ensure the network request actually succeeded
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the stream into a clean usable JavaScript array
        recipes = await response.json();

        // start the display loop
        displayItems(recipes);

    } catch (error) {
        // Graceful error logging if a typo breaks the JSON structure
        console.error("Could not fetch recipe data:", error);
        showHere.innerHTML = `<p class="error">Sorry, we couldn't load the recipes right now.</p>`;
    }
}

// Call the function to fire up the page data fetch on load
getRecipeData();

// prevent the form from reloading the page if the user hits the 'Enter' key
searchForm.addEventListener("submit", (event) => {
    event.preventDefault()
})

// listen for typing events ('input' activates every time a letter is added or deleted)
searchInput.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase().trim()

    // Filter the master recipes array
    const filteredRecipes = recipes.filter(recipe => {
        // Check if the search query matches the recipe name
        const matchesName = recipe.name.toLowerCase().includes(query)

        // Check if the search query matches any of the ingredients strings
        const matchesIngredient = recipe.ingredients.some(ingredient =>
            ingredient.toLowerCase().includes(query)
        )

        // check if the search query matches any of the categories strings
        const matchesCategories = recipe.categories.some(category =>
            category.toLowerCase().includes(query)
        )

        return matchesName || matchesIngredient || matchesCategories
    })

    // clear the current card display gallery
    showHere.innerHTML = ""

    // repopulate the gallery with only the matching recipe results
    displayItems(filteredRecipes)
})

// loop through the array of json items and create cards
export function displayItems(recipes) {
    console.log(recipes)
    recipes.forEach(x => {
        const card = document.createElement('div')
        const title = document.createElement('h2')
        title.innerHTML = x.name
        const photo = document.createElement('img')
        photo.src = x.image
        photo.alt = x.name
        photo.width = "500"
        photo.height = "350"
        card.appendChild(title)
        card.appendChild(photo)
        card.addEventListener('click', () => showStuff(x));
        showHere.appendChild(card)
    })
}

// a listener to close the dialog box when the close button is clicked
myclose.addEventListener("click", () => mydialog.close())

// fill in the dialog box
export function showStuff(x) {
    mytitle.textContent = x.name
    myimg.src = x.image
    myimg.alt = x.name
    myimg.width = "300"
    myimg.height = "210"
    ingredients.textContent = ""
    instructions.textContent = ""

    x.ingredients.forEach(item => {
        const li = document.createElement('li')
        li.textContent = item
        ingredients.appendChild(li)
    })

    x.instructions.forEach(item => {
        const li = document.createElement('li')
        li.textContent = item
        instructions.appendChild(li)
    })

    // Reset the button state inside the modal whenever a new recipe is opened
    recipeSelect.textContent = "Select this Recipe";
    recipeSelect.disabled = false;

    mydialog.showModal()

    // create a listener to monitor the recipeSelect button
    recipeSelect.addEventListener("click", () => {
        // Get the stored VALUE for the selected KEY in localStorage if it exists.
        let storedData = localStorage.getItem("selected-ls") || "[]";

        // convert the string back into a real Javascript array
        let selectedList = JSON.parse(storedData);

        // only push if the recipe onto the array if it is not already selected
        if (!selectedList.includes(x.number)) {
            selectedList.push(x.number)
        }

        // convert the array back into a plain text string and save it to localStorage, key=selected-ls
        localStorage.setItem("selected-ls", JSON.stringify(selectedList));

        recipeSelect.textContent = "Added! ✓";
        recipeSelect.disabled = true; // Prevents the user from spamming the button for the same recipe
    });
}


