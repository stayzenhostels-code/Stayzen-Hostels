const fs = require('fs');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');

    // Replace old placeholders or dummy values with the actual contact details
    html = html.replace(/\+91XXXXXXXXXX/g, '+917024473732');
    html = html.replace(/91XXXXXXXXXX/g, '917024473732'); // Specifically for wa.me/91XXXXXXXXXX links
    html = html.replace(/info@stayzen\.com/g, 'stayzenhostels@gmail.com');

    // Just in case any brackets are still hiding
    html = html.replace(/\[Phone Number\]/g, '+917024473732');
    html = html.replace(/\[WhatsApp Number\]/g, '+917024473732');
    html = html.replace(/\[Email\]/g, 'stayzenhostels@gmail.com');

    fs.writeFileSync(file, html, 'utf8');
});

console.log('Contact details updated successfully across all HTML files.');
