const fs = require('fs');
const path = require('path');

// 1. Update style.css
let css = fs.readFileSync('style.css', 'utf8');
css = css.replace(/h1{ font-size:clamp/, 'h1, h2, h3 { overflow-wrap: break-word; word-break: break-word; }\nh1{ font-size:clamp');
fs.writeFileSync('style.css', css, 'utf8');

// 2. Update all HTML files Footer
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

const oldFooterLocationsRegex = /<ul class="footer-list">\s*<li><a href="https:\/\/maps\.app\.goo\.gl\/kR1MMXnXxMvpX5Bk6\?g_st=aw"[^>]*>.*?Trishakti.*?<\/a><\/li>\s*<li><a href="https:\/\/share\.google\/xhlwhdu8JZihfpCTg"[^>]*>.*?Little Angel.*?<\/a><\/li>\s*<li><a href="\[GMB Link.*?<\/a><\/li>\s*<li><a href="\[GMB Link.*?<\/a><\/li>\s*<\/ul>/s;

const newFooterLocations = `<ul class="footer-list">
            <li><a href="https://maps.app.goo.gl/kR1MMXnXxMvpX5Bk6?g_st=aw" target="_blank" rel="noopener"><svg class="icon" aria-hidden="true"><use href="#i-pin"></use></svg> Trishakti Girls Residency (Bhanwarkuan)</a></li>
            <li><a href="https://share.google/xhlwhdu8JZihfpCTg" target="_blank" rel="noopener"><svg class="icon" aria-hidden="true"><use href="#i-pin"></use></svg> Little Angel Girls Hostel (Geeta Bhawan)</a></li>
            <li><a href="https://maps.app.goo.gl/2HBev5CSWLvbo1r77" target="_blank" rel="noopener"><svg class="icon" aria-hidden="true"><use href="#i-pin"></use></svg> Stayzen Hostel (Palasia Square)</a></li>
          </ul>`;

files.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    
    // Update footer locations
    // We will just do a simpler replace in case regex fails:
    const startLoc = html.indexOf('<h3>Our Locations</h3>');
    if (startLoc !== -1) {
        const endLoc = html.indexOf('</nav>', startLoc);
        if (endLoc !== -1) {
            html = html.substring(0, startLoc) + '<h3>Our Locations</h3>\n          ' + newFooterLocations + '\n        ' + html.substring(endLoc);
        }
    }
    
    // Update footer intro text
    html = html.replace(/across 4 locations in Indore/g, 'across 3 locations in Indore');

    // Update FAQ in index.html
    if (file === 'index.html') {
        html = html.replace(/\[Price — to be added\]/g, 'Starting from ₹3600 for triple sharing to ₹13600 for single sharing');
        html = html.replace(/\[Phone Number\]/g, 'us');
        html = html.replace(/\[Meal Plan & Timings — to be added\]/g, 'Breakfast, Lunch, Evening Snacks, and Dinner are served daily');
        html = html.replace(/\[Rules — to be added\]/g, 'Available at the hostel office');
        html = html.replace(/\[Working Hours \/ Visit Timing — to be added\]/g, '9:00 AM to 7:00 PM');
        html = html.replace(/\[Documents & Deposit — to be added\]/g, 'Aadhar card, ID proof, and a standard security deposit');
        // also replace the ? variants
        html = html.replace(/\[Price \?" to be added\]/g, 'Starting from ₹3600 for triple sharing to ₹13600 for single sharing');
        html = html.replace(/\[Meal Plan & Timings \?" to be added\]/g, 'Breakfast, Lunch, Evening Snacks, and Dinner are served daily');
        html = html.replace(/\[Rules \?" to be added\]/g, 'Available at the hostel office');
        html = html.replace(/\[Working Hours \/ Visit Timing \?" to be added\]/g, '9:00 AM to 7:00 PM');
        html = html.replace(/\[Documents & Deposit \?" to be added\]/g, 'Aadhar card, ID proof, and a standard security deposit');
        
        // Also just replace the fallback strange character `?"` if any others exist
        html = html.replace(/\[Price(.*?)\]/g, 'Starting from ₹3600 for triple sharing to ₹13600 for single sharing');
        html = html.replace(/\[Meal Plan(.*?)\]/g, 'Breakfast, Lunch, Evening Snacks, and Dinner are served daily');
        html = html.replace(/\[Rules(.*?)\]/g, 'Available at the hostel office');
        html = html.replace(/\[Working Hours(.*?)\]/g, '9:00 AM to 7:00 PM');
        html = html.replace(/\[Documents(.*?)\]/g, 'Aadhar card, ID proof, and a standard security deposit');
    }

    fs.writeFileSync(file, html, 'utf8');
});

console.log('Update complete');
