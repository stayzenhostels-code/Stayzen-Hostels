const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove trust-strip
// Find <div class="trust-strip">
const tsStart = html.indexOf('<div class="trust-strip">');
if (tsStart !== -1) {
    const tsEnd = html.indexOf('</div>\n      </div>\n\n      <div>', tsStart);
    if(tsEnd !== -1) {
        // Find the actual end of the trust-strip div
        // The trust-strip has 4 inner divs.
        const actualEnd = html.indexOf('</div>\n      </div>', tsStart) + 6;
        html = html.substring(0, tsStart) + html.substring(actualEnd);
    }
}

// 2. Remove 4.9 rating badge
const badgeStart = html.indexOf('<div class="hero-float-badge hero-float-badge--top">');
if (badgeStart !== -1) {
    const badgeEnd = html.indexOf('</div>\n            </div>', badgeStart) + 24;
    html = html.substring(0, badgeStart) + html.substring(badgeEnd);
}

// 3. Remove Enquiry section
const enqStart = html.indexOf('<section class="section cta-strip" id="enquiry"');
if (enqStart !== -1) {
    const enqEnd = html.indexOf('</section>', enqStart) + 10;
    html = html.substring(0, enqStart) + html.substring(enqEnd);
}

// 4. Add Auto-scroll logic
const autoScrollScript = `
  // Auto-scroll gallery
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    let scrollAmount = 0;
    setInterval(() => {
      // Only auto scroll if the window is mobile sized
      if (window.innerWidth <= 719) {
        const itemWidth = gallery.querySelector('figure') ? gallery.querySelector('figure').clientWidth + 16 : 300;
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

// Replace Enquiry links with WhatsApp links since enquiry form is gone
html = html.replace(/href="#enquiry"/g, 'href="https://wa.me/91XXXXXXXXXX?text=Hi%20Stayzen" target="_blank" rel="noopener"');
html = html.replace(/href="#enquiry"/g, 'href="https://wa.me/91XXXXXXXXXX?text=Hi%20Stayzen"'); // Catch any remaining

fs.writeFileSync('index.html', html, 'utf8');
console.log('Modified index.html');
