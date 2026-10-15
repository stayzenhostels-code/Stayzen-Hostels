const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const sections = html.split('<!-- =========================================================');
// 0: Document start
// 1: Icon Sprite
// 2: Header
// 3: Hero
// 4: Hostel Highlights
// 5: Key Facilities
// 6: Rooms Preview
// 7: Photo Gallery
// 8: Why Choose Us
// 9: Our 4 Locations
// 10: Final CTA
// 11: FAQ
// 12: Footer

const newOrder = [
  0,
  1,
  2,
  3, // Hero
  9, // Locations
  7, // Gallery
  6, // Rooms
  4, // Highlights
  5, // Facilities
  8, // Why Choose Us
  // No 10 because we remove the enquiry form completely
  11, // FAQ
  12  // Footer
];

let finalHtml = '';
for(let i=0; i<newOrder.length; i++) {
   finalHtml += (i === 0 ? '' : '<!-- =========================================================') + sections[newOrder[i]];
}

// Now do all the replacements on finalHtml

// 2. Remove mobile-bar
finalHtml = finalHtml.replace(/<div class="mobile-bar">[\s\S]*?<\/div>/, '');

// 3. Add floating-wa
const waButton = `
<a href="https://wa.me/91XXXXXXXXXX?text=Hello%2C%20I%20want%20hostel%20details%20in%20Indore" class="floating-wa" target="_blank" rel="noopener" aria-label="WhatsApp Us">
  <svg class="icon" aria-hidden="true" style="width:28px;height:28px;"><use href="#i-wa"></use></svg>
</a>
`;
finalHtml = finalHtml.replace('</body>', waButton + '\n</body>');

// 5. Replace Enquiry links with WhatsApp links
finalHtml = finalHtml.replace(/href="#enquiry"/g, 'href="https://wa.me/91XXXXXXXXXX?text=Hi%20Stayzen" target="_blank" rel="noopener"');

// 6. Remove trust-strip (4 prime locations)
const tsStart = finalHtml.indexOf('<div class="trust-strip">');
if (tsStart !== -1) {
    const tsEnd = finalHtml.indexOf('</div>\n      </div>\n\n      <div>', tsStart);
    if(tsEnd !== -1) {
        const actualEnd = finalHtml.indexOf('</div>\n      </div>', tsStart) + 6;
        finalHtml = finalHtml.substring(0, tsStart) + finalHtml.substring(actualEnd);
    } else {
        const fallbackEnd = finalHtml.indexOf('</div>\r\n      </div>', tsStart) + 6;
        if(fallbackEnd > tsStart) {
             finalHtml = finalHtml.substring(0, tsStart) + finalHtml.substring(fallbackEnd);
        }
    }
}

// 7. Remove top 4.9 badge
const badgeStart = finalHtml.indexOf('<div class="hero-float-badge hero-float-badge--top">');
if (badgeStart !== -1) {
    const badgeEnd = finalHtml.indexOf('</div>\n            </div>', badgeStart);
    if (badgeEnd !== -1) {
       finalHtml = finalHtml.substring(0, badgeStart) + finalHtml.substring(badgeEnd + 24);
    } else {
       const fallbackEnd = finalHtml.indexOf('</div>\r\n            </div>', badgeStart);
       if (fallbackEnd !== -1) finalHtml = finalHtml.substring(0, badgeStart) + finalHtml.substring(fallbackEnd + 26);
    }
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
finalHtml = finalHtml.replace('</script>\r\n\r\n</body>', autoScrollScript + '\r\n\r\n</body>');
finalHtml = finalHtml.replace('</script>\n\n</body>', autoScrollScript + '\n\n</body>'); // unix fallback

// Final touch: Adjust section backgrounds so they alternate correctly
// Order is now: Hero(bg), Locations(none), Gallery(none), Rooms(tint), Highlights(none), Facilities(none), Why Us(surface), FAQ(none)
// Let's make alternating classes: Locations(surface), Gallery(none), Rooms(tint), Highlights(none), Facilities(surface), Why Us(none), FAQ(surface)
// Actually, let's leave them as they are defined in their original sections unless it looks terrible. The user just cares about the order and not being broken.

fs.writeFileSync('index.html', finalHtml, 'utf8');
console.log('Build complete');
