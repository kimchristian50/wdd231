console.log("ClydeBank Coffee Shop is Now Open")

let menu = {
    inventory: {
        "Regular Coffee": 3.00,
        "Espresso": 3.50,
        "Cappuccino": 4.00,
        "Latte": 4.25
    },
    populate: function(container) {
        for (let item in this.inventory) {
            let price = this.inventory[item]
            container.innerHtml += "<li>" + item + " - $" + price.toFixed(2) + "</li>"
        }
    }
}

// let inventory = ["Regular Coffee", "Espresso", "Cappuccino", "Latte"]
// let inventoryPrices = [3.00, 3.50, 4.00, 4.25]

let menuList = document.getElementById("coffee-menu")

// function populateMenu(container) {
//     for (let i = 0; i < inventory.length; i++) {
//         menuList.innerHTML += "<li>" + inventory[i] + " - $" + inventoryPrices[i].toFixed(2) + "</li>"
//     }
// }

menu.populate(menuList)



function getFormattedCurrency(amount, region = "en-US") {
    return amount.toLocaleString(region, { maxiumumFractionDigits: 2 })
}

function calculateSalesTax(subtotal, taxRate = 0.08) {
    return subtotal * taxRate
}

let subtotal = 42.94
let salesTax = calculateSalesTax(subtotal)
let total = parseFloat((subtotal + salesTax).toFixed(2))
let stringTotal = getFormattedCurrency(total)


const cartItem = (function (price, quantity = 1) {
    let lineCost = 0.00
    let formattedLineCost = ""
    let totalQuantity = 0

    function calculateLineCost() {
        lineCost = price * totalQuantity
    }

    function getFormattedCurrency(region = "en-US") {
        return lineCost.toLocaleString(region, { maximumFractionDigits: 2 })
    }

    return function () {
        totalQuantity += quantity
        calculateLineCost()
        return getFormattedCurrency()
    }
})

