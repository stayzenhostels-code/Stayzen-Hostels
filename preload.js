const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const preloads = `
<link rel="preload" as="image" href="images/hero-bg-2.jpg" fetchpriority="high">
<link rel="preload" as="image" href="images/hero-room-luxury.jpg" fetchpriority="high">
`;

// Insert after <head>
if (!html.includes('fetchpriority="high"')) {
    html = html.replace(/<head>/, '<head>' + preloads);
}

// Add decoding="async" to all images that don't have it
html = html.replace(/<img (?!.*decoding)/g, '<img decoding="async" ');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Added preloads for fast loading');
