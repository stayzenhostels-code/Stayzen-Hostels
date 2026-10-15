const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Fix the corrupted Rupee symbol in the JSON-LD FAQ and HTML FAQ
html = html.replace(/Starting from [^3]*3600 for triple sharing to [^1]*13600 for single sharing/g, 'Starting from Rs. 3600 for triple sharing to Rs. 13600 for single sharing');
html = html.replace(/,13,600 to ,17,400/g, 'Rs. 3600 to Rs. 7400');
html = html.replace(/,18,600 to ,113,600/g, 'Rs. 8600 to Rs. 13600');
// Also the original text in the HTML FAQ was probably corrupted too
html = html.replace(/\[Price(.*?)]/g, 'Starting from Rs. 3600 for triple sharing to Rs. 13600 for single sharing');

html = html.replace(/\[Extra Charges(.*?)]/g, 'None');
html = html.replace(/\[Deposit(.*?)]/g, '1 month rent (varies by location)');
html = html.replace(/\[Guest Policy(.*?)]/g, 'Guests allowed in reception area');

fs.writeFileSync('index.html', html, 'utf8');

console.log('Fixed FAQ encoding and extra brackets');
