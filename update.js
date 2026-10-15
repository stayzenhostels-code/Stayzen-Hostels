const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// 1. Move "OUR 4 LOCATIONS" to be right after "HERO"
let parts = c.split('<!-- =========================================================');

// parts[3] is HERO
// parts[9] is OUR 4 LOCATIONS
// We want: 0, 1, 2, 3, 9, 4, 5, 6, 7, 8, 10, 11, 12

const newOrder = [0, 1, 2, 3, 9, 4, 5, 6, 7, 8, 10, 11, 12];
let newContent = newOrder.map((i, index) => {
    return (index === 0 ? '' : '<!-- =========================================================') + parts[i];
}).join('');

// Make sure to remove mobile-bar
newContent = newContent.replace(/<div class="mobile-bar">[\s\S]*?<\/div>/, '');

// Insert floating WA button before </body>
const waButton = `
<a href="https://wa.me/91XXXXXXXXXX?text=Hello%2C%20I%20want%20hostel%20details%20in%20Indore" class="floating-wa" target="_blank" rel="noopener" aria-label="WhatsApp Us">
  <svg class="icon" aria-hidden="true" style="width:28px;height:28px;"><use href="#i-wa"></use></svg>
</a>
`;
newContent = newContent.replace('</body>', waButton + '\n</body>');

fs.writeFileSync('index.html', newContent);
console.log('Modified index.html');
