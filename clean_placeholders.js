const fs = require('fs');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');

    // Replace Social/Contact placeholders
    html = html.replace(/\[Facebook Link\]/g, '#');
    html = html.replace(/\[YouTube Link\]/g, '#');
    html = html.replace(/\[Instagram Link\]/g, 'https://www.instagram.com/harji_nder1965/');
    html = html.replace(/\[WhatsApp Number\]/g, '+91XXXXXXXXXX'); // Or keep +91XXXXXXXXXX
    html = html.replace(/\[Phone Number\]/g, '+91XXXXXXXXXX');
    html = html.replace(/\[Email\]/g, 'info@stayzen.com');

    // Replace content placeholders
    html = html.replace(/\[Room Details(.*?)\]/g, 'Attached washrooms available');
    html = html.replace(/\[Parking Details(.*?)\]/g, 'Safe two-wheeler parking available');
    html = html.replace(/\[Hostel Group Name\]/g, 'STAYZEN');

    // Remove the unused structured data for locations 2 and 3 if they exist
    // This is a bit risky with regex, we can just leave it as is or replace with generic
    html = html.replace(/\[Location 2 Name\]/g, 'Little Angel Hostel');
    html = html.replace(/\[Location 3 Name\]/g, 'Stayzen Hostel');
    html = html.replace(/\[Hostel Address(.*?)\]/g, 'Indore, Madhya Pradesh');
    html = html.replace(/\[PIN Code\]/g, '452001');
    html = html.replace(/\[GMB Link(.*?)\]/g, 'https://maps.google.com/?q=Stayzen+Indore');

    // Fix the weird currency thing if it exists in other files
    html = html.replace(/,1/g, 'Rs. ');
    html = html.replace(/\?/g, '-');
    html = html.replace(/\?"/g, '-');
    
    // Specifically for about.html, fix any cut off text (though CSS handled it, ensure no weird breaks)
    
    fs.writeFileSync(file, html, 'utf8');
});

console.log('Cleaned up all placeholders');
