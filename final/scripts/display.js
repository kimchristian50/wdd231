// Bring in the tools from your library file
import { displayItems } from './recipeTools.js';

// 1. Initialize your recipes array as an empty baseline list
let recipes = [];

// 2. Gather your explicit DOM references exactly like you had them
const showHere = document.querySelector("#showHere");
const searchInput = document.querySelector("#recipeSearch");
const searchForm = document.querySelector("#searchForm");

// 3. Create the asynchronous function to load the external data
async function getRecipeData() {
    try {
        // Fetch the local JSON file (adjust path to '../data/recipes.json' if needed)
        const response = await fetch('data/recipes.json');

        // Verify the network status response code is completely OK
        if (response.ok === false) {
            throw new Error("HTTP connection error while reading the file.");
        }

        // Convert the incoming text stream into a usable Javascript array
        recipes = await response.json();

        // Print to the console to verify data landed safely
        console.log("Recipes data array successfully loaded:", recipes);

        // Start the initial card creation display process on page load
        // 🌟 Crucial: We pass 'recipes' data AND 'showHere' container destination!
        displayItems(recipes, showHere);

    } catch (error) {
        // Log the exact mistake details to the console log for easy debugging
        console.error("Could not fetch recipe data:", error);
        showHere.innerHTML = "<p class='error'>Sorry, we couldn't load the recipes right now.</p>";
    }
}

// 4. Fire off the asynchronous function routine to populate the page
getRecipeData();

// 5. Prevent the search form from submitting and triggering a full page reload
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
});

// 6. Listen for standard typing events inside the input search field text box
searchInput.addEventListener("input", function (event) {
    // Collect the user's keystroke search keyword string
    const query = event.target.value.toLowerCase().trim();

    // Loop through the master recipes array to filter out matching cards
    const filteredRecipes = recipes.filter(function (recipe) {

        // Match condition A: Check the main recipe title name
        const matchesName = recipe.name.toLowerCase().includes(query);

        // Match condition B: Check the text matching strings inside ingredients array
        const matchesIngredient = recipe.ingredients.some(function (ingredient) {
            return ingredient.toLowerCase().includes(query);
        });

        // Match condition C: Safety-checked evaluation of categories array lists
        let matchesCategories = false;
        if (recipe.categories) {
            matchesCategories = recipe.categories.some(function (category) {
                return category.toLowerCase().includes(query);
            });
        }

        // Return true if ANY of the three conditions hit a target match query
        if (matchesName === true || matchesIngredient === true || matchesCategories === true) {
            return true;
        } else {
            return false;
        }
    });

    // Clear the current inner HTML grid layout completely to reset the page view
    showHere.innerHTML = "";

    // Repopulate the clean grid using exclusively our filtered data collection list
    displayItems(filteredRecipes, showHere);
});


