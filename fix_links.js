const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/href="https:\/\/wa.me\/91XXXXXXXXXX\?text=Hi%20Stayzen" target="_blank" rel="noopener"/g, 'href="#enquiry"');
html = html.replace(/href="https:\/\/wa.me\/91XXXXXXXXXX\?text=Hi%20Stayzen"/g, 'href="#enquiry"');

fs.writeFileSync('index.html', html, 'utf8');
