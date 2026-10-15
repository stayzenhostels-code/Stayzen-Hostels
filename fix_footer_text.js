const fs = require('fs');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');

    // Fix the "us" text in the footer phone link
    html = html.replace(/<use href="#i-phone"><\/use><\/svg> us<\/a>/g, '<use href="#i-phone"></use></svg> 7024473732</a>');

    fs.writeFileSync(file, html, 'utf8');
});

console.log('Fixed footer phone text');
