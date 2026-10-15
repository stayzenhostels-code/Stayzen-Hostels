const fs = require('fs');
let oldHtml = fs.readFileSync('index_old.html', 'utf8');
let currentHtml = fs.readFileSync('index.html', 'utf8');

// Extract Enquiry section from oldHtml
const oldSections = oldHtml.split('<!-- =========================================================');
let enquirySection = '';
oldSections.forEach(s => {
    if (s.includes('FINAL CTA STRIP + ENQUIRY FORM')) {
        enquirySection = '<!-- =========================================================' + s;
    }
});

// Remove floating WhatsApp button from currentHtml
currentHtml = currentHtml.replace(/<a href="[^"]*" class="floating-wa"[\s\S]*?<\/a>/, '');

// Insert Enquiry section before FAQ (or before Footer if FAQ is missing, but FAQ is there)
// The FAQ section starts with <!-- =========================================================\r?\n       FAQ
const faqStart = currentHtml.search(/<!-- =========================================================\r?\n       FAQ/);
if (faqStart !== -1) {
    currentHtml = currentHtml.substring(0, faqStart) + enquirySection + currentHtml.substring(faqStart);
} else {
    const footerStart = currentHtml.search(/<!-- =========================================================\r?\n       FOOTER/);
    if(footerStart !== -1) {
       currentHtml = currentHtml.substring(0, footerStart) + enquirySection + currentHtml.substring(footerStart);
    }
}

fs.writeFileSync('index.html', currentHtml, 'utf8');
console.log('Restored Enquiry and removed floating WA');
