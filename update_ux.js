const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove "Enquire Now" from hero CTA
html = html.replace(/<a class="btn btn--primary btn--block" href="#enquiry">[\s\S]*?<\/a>\r?\n\s*/, '');

// 2. Remove "Enquire" from room cards and make WA button fill width
html = html.replace(/<a class="btn btn--primary" style="flex:1;" href="#enquiry">Enquire<\/a>\r?\n\s*/g, '');
html = html.replace(/<a class="btn btn--wa" style="padding:10px 14px;" href="https:\/\/wa.me\/91XXXXXXXXXX\?text=[^"]*" target="_blank">/g, '<a class="btn btn--wa" style="flex:1; justify-content:center; padding:10px 14px;" href="https://wa.me/91XXXXXXXXXX?text=Hi%20Stayzen" target="_blank">');

// 3. Put back the floating WA button
const waButton = `
<a href="https://wa.me/91XXXXXXXXXX?text=Hello%2C%20I%20want%20hostel%20details%20in%20Indore" class="floating-wa" target="_blank" rel="noopener" aria-label="WhatsApp Us">
  <svg class="icon" aria-hidden="true" style="width:28px;height:28px;"><use href="#i-wa"></use></svg>
</a>
`;
if (!html.includes('class="floating-wa"')) {
    html = html.replace('</body>', waButton + '\n</body>');
}

// 4. Update Gallery Wrapper
const galleryWrapper = `
<div class="gallery-wrapper">
  <button class="slider-btn slider-prev" aria-label="Previous" type="button">❮</button>
  <div class="gallery">
`;
html = html.replace('<div class="gallery">', galleryWrapper);

// We need to close the wrapper right after the gallery ends.
// Search for <div class="gallery"> then find the matching closing div.
// It's followed by </section> usually.
// Or just replace </section>\n\n  <!-- =========================================================\n       ROOMS PREVIEW
// But easier: replace  </figure>\n      </div>\n    </section> with </figure>\n      </div>\n      <button class="slider-btn slider-next" aria-label="Next" type="button">❯</button>\n    </div>\n    </section>

html = html.replace(/(<\/figure>\s*<\/div>)\s*(<\/section>)/i, '$1\n      <button class="slider-btn slider-next" aria-label="Next" type="button">❯</button>\n    </div>\n    $2');

// 5. Update JS Script at the bottom
const oldScriptStart = html.indexOf('  // Auto-scroll gallery');
if (oldScriptStart !== -1) {
    const oldScriptEnd = html.indexOf('</script>', oldScriptStart);
    const newScript = `
  // Auto-scroll gallery
  const gallery = document.querySelector('.gallery');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  if (gallery) {
    const getStep = () => {
       const fig = gallery.querySelector('figure');
       return fig ? fig.clientWidth + 16 : 300;
    };
    
    if(prevBtn) prevBtn.addEventListener('click', () => { gallery.scrollBy({left: -getStep(), behavior: 'smooth'}); });
    if(nextBtn) nextBtn.addEventListener('click', () => { gallery.scrollBy({left: getStep(), behavior: 'smooth'}); });

    let scrollAmount = 0;
    let autoScroll = setInterval(() => {
      if (window.innerWidth <= 719) {
        scrollAmount += getStep();
        if (scrollAmount >= gallery.scrollWidth - gallery.clientWidth) {
          scrollAmount = 0;
        }
        gallery.scrollTo({
          top: 0,
          left: scrollAmount,
          behavior: 'smooth'
        });
      }
    }, 2000); // 2 sec fast scroll

    // Stop auto-scroll when user touches/scrolls manually
    gallery.addEventListener('touchstart', () => clearInterval(autoScroll), {passive: true});
    gallery.addEventListener('mousedown', () => clearInterval(autoScroll), {passive: true});
  }
`;
    html = html.substring(0, oldScriptStart) + newScript + html.substring(oldScriptEnd);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Done modifying index.html');
