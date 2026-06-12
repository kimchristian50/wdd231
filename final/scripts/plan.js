// import displayItems and showStuff from display.js so we can use the functions in plan.js
import { displayItems, showStuff } from './recipeTools.js'

// get a reference to where we display the items
const listHere = document.querySelector("#listHere")

let recipes = [];

// check the localStorage to see which recipes are selected
let storedData = localStorage.getItem("selected-ls") || "[]";
let selectedList = JSON.parse(storedData)
// listHere.textContent = storedData

// get the recipe data
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

        // Loop through the master recipes array to filter out matching cards
        const filteredRecipes = recipes.filter(function (recipe) {

            // Match condition A: Check the main recipe number
            const matchesNumber = selectedList.includes(recipe.number)

            // Return true if the recipe number is a match
            if (matchesNumber === true) {
                return true;
            } else {
                return false;
            }
        })
        // Start the initial card creation display process on page load
        displayItems(filteredRecipes, listHere, true)

    } catch (error) {
        // Log the exact mistake details to the console log for easy debugging
        console.error("Could not fetch recipe data:", error);
        listHere.innerHTML = "<p class='error'>Sorry, we couldn't load the recipes right now.</p>";
    }
}

// fire off the asynchronous function routine to populate the page
getRecipeData();
