const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const hStart = content.indexOf('<!-- =========================================================\r\n       HOSTEL HIGHLIGHTS') !== -1 ? content.indexOf('<!-- =========================================================\r\n       HOSTEL HIGHLIGHTS') : content.indexOf('<!-- =========================================================\n       HOSTEL HIGHLIGHTS');
const fStart = content.indexOf('<!-- =========================================================\r\n       KEY FACILITIES') !== -1 ? content.indexOf('<!-- =========================================================\r\n       KEY FACILITIES') : content.indexOf('<!-- =========================================================\n       KEY FACILITIES');
const rStart = content.indexOf('<!-- =========================================================\r\n       ROOMS PREVIEW') !== -1 ? content.indexOf('<!-- =========================================================\r\n       ROOMS PREVIEW') : content.indexOf('<!-- =========================================================\n       ROOMS PREVIEW');
const gStart = content.indexOf('<!-- =========================================================\r\n       PHOTO GALLERY') !== -1 ? content.indexOf('<!-- =========================================================\r\n       PHOTO GALLERY') : content.indexOf('<!-- =========================================================\n       PHOTO GALLERY');
const wStart = content.indexOf('<!-- =========================================================\r\n       WHY CHOOSE US') !== -1 ? content.indexOf('<!-- =========================================================\r\n       WHY CHOOSE US') : content.indexOf('<!-- =========================================================\n       WHY CHOOSE US');

if (hStart === -1 || fStart === -1 || rStart === -1 || gStart === -1 || wStart === -1) {
    console.log("Error finding sections!", {hStart, fStart, rStart, gStart, wStart});
    process.exit(1);
}

const part1 = content.substring(0, hStart);
let highlights = content.substring(hStart, fStart);
let facilities = content.substring(fStart, rStart);
let rooms = content.substring(rStart, gStart);
let gallery = content.substring(gStart, wStart);
const partEnd = content.substring(wStart);

gallery = gallery.replace('<section class="section" aria-labelledby="gallery-h">', '<section class="section section--surface" aria-labelledby="gallery-h">');
highlights = highlights.replace('<section class="section section--surface" aria-labelledby="highlights-h">', '<section class="section" aria-labelledby="highlights-h">');
facilities = facilities.replace('<section class="section" aria-labelledby="facilities-h">', '<section class="section section--surface" aria-labelledby="facilities-h">');

const newContent = part1 + gallery + rooms + highlights + facilities + partEnd;
fs.writeFileSync('index.html', newContent, 'utf8');
console.log('Reordered successfully!');
