const getString = window.location.search;
// console.log(getString);

const myInfo = new URLSearchParams(getString);
// console.log(myInfo);

// console.log(myInfo.get('first'));

document.querySelector('#results').innerHTML = `
<p>Membership Application for ${myInfo.get('first')} ${ myInfo.get('last') }</p >
    <p>Title: ${myInfo.get('org-title')} </p>
    <p>Email: ${myInfo.get('email')}</p>
    <p>Phone: ${myInfo.get('phone')}</p>
    <p>Business/Organization name: ${myInfo.get('org-name')} </p>
    <p>Membership level: ${myInfo.get('level')}</p>
    <p>Business/Organization description: ${myInfo.get('org-description')}</p>
    <p>Submission timestamp: ${myInfo.get('timestamp')}</p>`