const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const target = '<span class="muted" style="font-size:.7rem;margin-left:4px">Menu</span>';
const replacement = '<span style="font-size:.85rem;margin-left:6px;letter-spacing:0.02em;">Menu</span>';

html = html.replace(target, replacement);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Replaced Menu span');
