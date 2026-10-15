const fs = require('fs');

// 1. Fix CSS paddings
let css = fs.readFileSync('style.css', 'utf8');
css = css.replace(/padding: 80px 0;/g, 'padding: 50px 0;'); // reduce section padding
css = css.replace(/padding: 100px 0 60px;/g, 'padding: 100px 0 30px;'); // reduce hero padding
css = css.replace(/margin-bottom: 40px;/g, 'margin-bottom: 30px;'); // reduce section head margin

// We can also completely remove .reveal stuff or just leave the CSS but strip the class from HTML.
fs.writeFileSync('style.css', css, 'utf8');


// 2. Strip 'reveal' from all HTML files and fix hero CTA button
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    
    // Remove "reveal" class so nothing is hidden waiting for scroll
    html = html.replace(/ class="([^"]*)reveal([^"]*)"/g, ' class="$1$2"');
    // clean up empty class attributes or double spaces if they occur
    html = html.replace(/ class=" "/g, '');
    html = html.replace(/  /g, ' '); // general double space cleanup in classes might be messy, let's just do:
    html = html.replace(/class="([^"]*) reveal"/g, 'class="$1"');
    html = html.replace(/class="reveal (.*?)"/g, 'class="$1"');
    html = html.replace(/class="reveal"/g, '');
    
    // Specifically for index.html hero CTA button
    if (file === 'index.html') {
        html = html.replace(/<a class="btn btn--wa btn--block"/, '<a class="btn btn--wa" style="display:inline-flex; min-width: 250px; justify-content:center;"');
        // Let's make it look prominent but not full-screen width.
        
        // Remove the scroll reveal script from index.html if it exists
        html = html.replace(/<script>\s*function reveal\(\) \{[\s\S]*?window\.addEventListener\("scroll", reveal\);\s*reveal\(\);\s*<\/script>/, '<!-- reveal script removed for faster loading -->');
    }

    fs.writeFileSync(file, html, 'utf8');
});

console.log('Fixed gaps, removed reveal animation, fixed CTA button.');
