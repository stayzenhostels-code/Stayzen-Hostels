const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// The script block looks like:
// <script>
//    function reveal() { ... }
//    window.addEventListener("scroll", reveal);
//    reveal(); // Trigger on initial load
// 

// Let's just remove the function reveal() ... reveal(); block
html = html.replace(/function reveal\(\) \{[\s\S]*?window\.addEventListener\("scroll", reveal\);\s*reveal\(\);[^\n]*\n/g, '');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Removed reveal JS');
