const openButtonNp = document.querySelector("#openButtonNp");
const openButtonBronze = document.querySelector("#openButtonBronze");
const openButtonSilver = document.querySelector("#openButtonSilver");
const openButtonGold = document.querySelector("#openButtonGold");

const dialogBox = document.querySelector("#dialogBox");
const dialogBoxText = document.querySelector("#dialogText");

const closeButton = document.querySelector("#closeButton");



/// Show the dialog button opens the dialog modally
openButtonNp.addEventListener("click", () => {
    dialogBoxText.innerHTML = `<p>Non-profit membership level: No cost</p><p>Benefits:</p><ul><li>Inclusion in the directory</li><li>Event access</li></ul>`;
    dialogBox.showModal();
});

openButtonBronze.addEventListener("click", () => {
    dialogBoxText.innerHTML = `<p>Bronze membership level: $350/year</p><p>Benefits:</p><ul><li>Inclusion in the directory</li><li>Event access</li><li>B2B discounts</li></ul>`;
    dialogBox.showModal();
});

openButtonSilver.addEventListener("click", () => {
    dialogBoxText.innerHTML = `<p>Silver membership level: $2500/year</p><p>Benefits:</p><ul><li>Inclusion in the directory</li><li>Event access</li>
        <li> B2B discounts</li><li>Spotlight advertising on our website</li><li>Exhibitor space at events</li></ul >`;
    dialogBox.showModal();
});

openButtonGold.addEventListener("click", () => {
    dialogBoxText.innerHTML = `<p>Gold membership level: $5000/year</p><p>Benefits:</p><ul><li>Inclusion in the directory</li><li>Event access</li>
        <li> B2B discounts</li><li>Spotlight advertising on our website</li><li>Exhibitor space at events</li><li>VIP Access</li><li>Media Spotlights</li><li>State-level advocacy</li></ul >`;
    dialogBox.showModal();
});

// close button closes the dialog
closeButton.addEventListener("click", () => {
    dialogBox.close();
})

