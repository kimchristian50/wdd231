const getString = window.location.search;
// console.log(getString);

const myInfo = new URLSearchParams(getString);
// console.log(myInfo);

// console.log(myInfo.get('name'));

document.querySelector('#results').innerHTML = `
<p>Thanks, ${myInfo.get('name')} -</p>
    <p>when new recipes are added, you will receive an email at ${myInfo.get('email')}. </p>`
