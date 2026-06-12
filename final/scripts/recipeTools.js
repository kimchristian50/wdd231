// A utility file that holds function but doesn't run them on load

export function displayItems(recipes, outputContainer, isPlannerPage = false) {
    if (!outputContainer) return; // Guard ring to prevent null container errors

    outputContainer.innerHTML = ""; // Clear container out safely

    recipes.forEach(x => {
        const card = document.createElement('div')
        const title = document.createElement('h2')
        title.innerHTML = x.name
        const photo = document.createElement('img')
        photo.src = x.image
        photo.alt = x.name
        photo.width = "200"
        photo.height = "140"

        if (isPlannerPage === true) {

            // create a Remove X button
            const removeBtn = document.createElement("button")
            removeBtn.textContent = "❌ Remove"

            // give it a click listener to unselect the recipe
            removeBtn.addEventListener("click", (event) => {
                event.stopPropagation(); // stops the card click/modal from opening

                // Pull the list, filter out THIS recipe number, and save it back to localStorage
                let storedData = JSON.parse(localStorage.getItem("selected-ls") || "[]")
                let updatedList = storedData.filter(id => id !== x.number)
                localStorage.setItem("selected-ls", JSON.stringify(updatedList))

                // remove the card from the screen
                card.remove()
            })
            card.appendChild(photo)
            card.appendChild(title)
            card.appendChild(removeBtn)

            const ingredients = document.createElement('ul')
            ingredients.textContent = ""
            x.ingredients.forEach(item => {
                const li = document.createElement('li')
                li.textContent = item
                ingredients.appendChild(li)
            })
            card.appendChild(ingredients)
        }

        else {
            card.appendChild(title)
            card.appendChild(photo)
        }

        // Listen for standard card clicks to trigger the popup modal
        card.addEventListener('click', () => showStuff(x));
        outputContainer.appendChild(card)
    })
}

export function showStuff(x) {
    // Grab modal DOM elements dynamically ONLY when a card is clicked
    const mydialog = document.querySelector("#mydialog")
    const mytitle = document.querySelector("#mydialog h2")
    const myimg = document.querySelector("#mydialog img")
    const ingredients = document.querySelector("#mydialog ul")
    const instructions = document.querySelector("#mydialog ol")
    const recipeSelect = document.querySelector("#recipeSelect")
    const myclose = document.querySelector("#mydialog button")

    if (!mydialog) return; // Safety check if a page skips the modal HTML structure

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

    // Setup close handling reactively
    myclose.onclick = () => mydialog.close();

    // Check localStorage to see if this recipe number is already planned
    let storedData = localStorage.getItem("selected-ls") || "[]";
    let selectedList = JSON.parse(storedData);

    if (recipeSelect) {
        if (selectedList.includes(x.number)) {
            recipeSelect.textContent = "Added! ✓";
            recipeSelect.disabled = true;
        } else {
            recipeSelect.textContent = "Select this Recipe";
            recipeSelect.disabled = false;
        }

        // Fresh event handler that doesn't pile up listeners permanently
        recipeSelect.onclick = () => {
            let currentData = localStorage.getItem("selected-ls") || "[]";
            let currentList = JSON.parse(currentData);

            if (!currentList.includes(x.number)) {
                currentList.push(x.number);
            }
            localStorage.setItem("selected-ls", JSON.stringify(currentList));

            recipeSelect.textContent = "Added! ✓";
            recipeSelect.disabled = true;
        };
    }

    mydialog.showModal()
}