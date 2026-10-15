const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace('<span class="hero-h1-sub"><span style="color:var(--c-primary); font-weight:800;">Radhe Radhe</span> <span style="opacity:0.4; margin:0 4px;">&amp;</span> <span style="color:var(--c-primary); font-weight:800;">Little Angel</span></span>', 
'<span class="hero-h1-sub"><span class="brand-text-light" style="font-weight:800;">Radhe Radhe</span> <span style="opacity:0.6; margin:0 4px;">&amp;</span> <span class="brand-text-light" style="font-weight:800;">Little Angel</span></span>');

fs.writeFileSync('index.html', html, 'utf8');
