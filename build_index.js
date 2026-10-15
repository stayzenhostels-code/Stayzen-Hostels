const fs = require('fs');

// 1. Read clean index.html
let html = fs.readFileSync('index.html', 'utf8');

// 2. Remove mobile-bar
html = html.replace(/<div class="mobile-bar">[\s\S]*?<\/div>/, '');

// 3. Add floating-wa
const waButton = `
<a href="https://wa.me/91XXXXXXXXXX?text=Hello%2C%20I%20want%20hostel%20details%20in%20Indore" class="floating-wa" target="_blank" rel="noopener" aria-label="WhatsApp Us">
  <svg class="icon" aria-hidden="true" style="width:28px;height:28px;"><use href="#i-wa"></use></svg>
</a>
`;
html = html.replace('</body>', waButton + '\n</body>');

// 4. Remove Enquiry section completely
const enqStart = html.indexOf('<section class="section cta-strip" id="enquiry"');
if (enqStart !== -1) {
    const enqEnd = html.indexOf('</section>', enqStart) + 10;
    html = html.substring(0, enqStart) + html.substring(enqEnd);
}
// Remove <!-- ===== FINAL CTA STRIP + ENQUIRY FORM ===== --> comment
html = html.replace(/<!-- =========================================================\r?\n       FINAL CTA STRIP \+ ENQUIRY FORM\r?\n       ========================================================= -->\r?\n/g, '');


// 5. Replace Enquiry links with WhatsApp links
html = html.replace(/href="#enquiry"/g, 'href="https://wa.me/91XXXXXXXXXX?text=Hi%20Stayzen" target="_blank" rel="noopener"');

// 6. Remove trust-strip
const tsStart = html.indexOf('<div class="trust-strip">');
if (tsStart !== -1) {
    const tsEnd = html.indexOf('</div>\n      </div>\n\n      <div>', tsStart);
    if(tsEnd !== -1) {
        const actualEnd = html.indexOf('</div>\n      </div>', tsStart) + 6;
        html = html.substring(0, tsStart) + html.substring(actualEnd);
    } else {
        // Fallback matching
        const fallbackEnd = html.indexOf('</div>\n      </div>', tsStart) + 6;
        if(fallbackEnd > tsStart) {
             html = html.substring(0, tsStart) + html.substring(fallbackEnd);
        }
    }
}

// 7. Remove top 4.9 badge
const badgeStart = html.indexOf('<div class="hero-float-badge hero-float-badge--top">');
if (badgeStart !== -1) {
    const badgeEnd = html.indexOf('</div>\n            </div>', badgeStart) + 24;
    html = html.substring(0, badgeStart) + html.substring(badgeEnd);
}

// 8. Auto-scroll logic
const autoScrollScript = `
  // Auto-scroll gallery
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    let scrollAmount = 0;
    setInterval(() => {
      // Only auto scroll if the window is mobile sized
      if (window.innerWidth <= 719) {
        const figure = gallery.querySelector('figure');
        const itemWidth = figure ? figure.clientWidth + 16 : 300;
        scrollAmount += itemWidth;
        if (scrollAmount >= gallery.scrollWidth - gallery.clientWidth) {
          scrollAmount = 0;
        }
        gallery.scrollTo({
          top: 0,
          left: scrollAmount,
          behavior: 'smooth'
        });
      }
    }, 3000); // scrolls every 3 seconds
  }
</script>`;
html = html.replace('</script>\n\n</body>', autoScrollScript + '\n\n</body>');

// 9. REORDER SECTIONS
// We will split by the exact HTML comment blocks.
const sections = html.split('<!-- =========================================================');

// In clean 08051d4 index.html without Enquiry, the parts are:
// 0: Document start to before Icon Sprite
// 1: Icon Sprite
// 2: Header
// 3: Hero
// 4: Hostel Highlights
// 5: Key Facilities
// 6: Rooms Preview
// 7: Photo Gallery
// 8: Why Choose Us
// 9: Our 4 Locations
// 10: FAQ
// 11: Footer

// Let's verify by printing them out in the script:
sections.forEach((s, i) => {
    let nameMatch = s.match(/^\s*(.+)\n/);
    if(nameMatch) console.log(i, nameMatch[1].trim());
});

const newOrder = [
  0, // Top
  1, // Icon Sprite
  2, // Header
  3, // Hero
  9, // Locations
  7, // Gallery
  6, // Rooms
  4, // Highlights
  5, // Facilities
  8, // Why Choose Us
  10, // FAQ
  11  // Footer
];

let finalHtml = '';
for(let i=0; i<newOrder.length; i++) {
   let idx = newOrder[i];
   if(idx < sections.length) {
       finalHtml += (i === 0 ? '' : '<!-- =========================================================') + sections[idx];
   }
}

fs.writeFileSync('index.html', finalHtml, 'utf8');
console.log('Build complete');
