const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Change section heading "Our 4 Locations" to "Our 3 Locations"
html = html.replace(/<span class="eyebrow eyebrow--accent">Our 4 Locations<\/span>/, '<span class="eyebrow eyebrow--accent">Our 3 Locations</span>');
html = html.replace(/<h2 id="locations-h">4 Prime Locations across Indore<\/h2>/, '<h2 id="locations-h">3 Prime Locations across Indore</h2>');
html = html.replace(/<div class="grid grid--4">/, '<div class="grid grid--3">');

// 2. We need to replace the entire grid--4 contents with our 3 cards.
const startGrid = html.indexOf('<div class="grid grid--3">'); // since we just replaced it
const endGrid = html.indexOf('</div>\n      </div>\n    </section>\n\n  <!-- =========================================================\n       PHOTO GALLERY');

if (startGrid !== -1 && endGrid !== -1) {
    const newCards = `
          <!-- Card 1 -->
          <article class="card loc-card">
            <div class="card-img-wrap" style="aspect-ratio:16/9; margin-bottom:10px;">
              <img src="images/room-deluxe-1.jpg" alt="Stayzen Trishakti Girls Residency PG & Hostel Bhanwarkuan Indore" loading="lazy" width="600" height="340">
            </div>
            <div class="loc-name" style="margin-top:10px">
              <svg class="icon" aria-hidden="true"><use href="#i-pin"></use></svg>
              <h3 class="mb-0" style="font-size:1.05rem;">Trishakti Girls Residency</h3>
            </div>
            <p class="muted" style="font-size:.88rem;">STAYZEN • Bholaram Ustad Marg, Indrapuri &amp; Shivampuri Colony, Bhanwarkuan, Indore</p>
            <a class="btn btn--outline btn--block" href="https://maps.app.goo.gl/kR1MMXnXxMvpX5Bk6?g_st=aw" target="_blank" rel="noopener">View on Google Map</a>
          </article>
          
          <!-- Card 2 -->
          <article class="card loc-card">
            <div class="card-img-wrap" style="aspect-ratio:16/9; margin-bottom:10px;">
              <img src="images/little-angel-main-gate.jpg" alt="Stayzen Little Angel Girls Hostel Main Gate Geeta Nagar Indore" loading="lazy" width="600" height="340">
            </div>
            <div class="loc-name" style="margin-top:10px">
              <svg class="icon" aria-hidden="true"><use href="#i-pin"></use></svg>
              <h3 class="mb-0" style="font-size:1.05rem;">Little Angel Girls Hostel</h3>
            </div>
            <p class="muted" style="font-size:.88rem;">STAYZEN • 60/F Bhaktavar Ram Nagar, Geeta Nagar, Near Ajit Club, Geeta Bhawan, Indore</p>
            <a class="btn btn--outline btn--block" href="https://share.google/xhlwhdu8JZihfpCTg" target="_blank" rel="noopener">View on Google Map</a>
          </article>

          <!-- Card 3 -->
          <article class="card loc-card">
            <div class="card-img-wrap" style="aspect-ratio:16/9; margin-bottom:10px;">
              <img src="images/stayzen-palasia-exterior.jpg" alt="Stayzen Hostel Girls Residency Palasia Square Indore" loading="lazy" width="600" height="340">
            </div>
            <div class="loc-name" style="margin-top:10px">
              <svg class="icon" aria-hidden="true"><use href="#i-pin"></use></svg>
              <h3 class="mb-0" style="font-size:1.05rem;">Stayzen Hostel</h3>
            </div>
            <p class="muted" style="font-size:.88rem;">STAYZEN • Girls Residency, Palasia Square, Indore</p>
            <a class="btn btn--outline btn--block" href="https://maps.app.goo.gl/2HBev5CSWLvbo1r77" target="_blank" rel="noopener">View on Google Map</a>
          </article>
        `;

    // Wait, the match is `html.substring(0, startGrid + '<div class="grid grid--3">'.length) + newCards + '\n        ' + html.substring(endGrid)`
    // BUT what about line endings? It's better to just build the replacement string accurately.
    html = html.substring(0, startGrid + '<div class="grid grid--3">\n'.length) + newCards + '</div>\n      </div>\n    </section>\n\n  <!-- =========================================================\n       PHOTO GALLERY' + html.substring(endGrid + '</div>\n      </div>\n    </section>\n\n  <!-- =========================================================\n       PHOTO GALLERY'.length);
} else {
    console.log("Could not find grid or end Grid. Wait, let me check with a fallback Regex.");
    const regex = /<div class="grid grid--3">[\s\S]*?(?=<\/div>\s*<\/div>\s*<\/section>\s*<!-- =========================================================\r?\n\s*PHOTO GALLERY)/i;
    html = html.replace(regex, `<div class="grid grid--3">
          <!-- Card 1 -->
          <article class="card loc-card">
            <div class="card-img-wrap" style="aspect-ratio:16/9; margin-bottom:10px;">
              <img src="images/room-deluxe-1.jpg" alt="Stayzen Trishakti Girls Residency PG & Hostel Bhanwarkuan Indore" loading="lazy" width="600" height="340">
            </div>
            <div class="loc-name" style="margin-top:10px">
              <svg class="icon" aria-hidden="true"><use href="#i-pin"></use></svg>
              <h3 class="mb-0" style="font-size:1.05rem;">Trishakti Girls Residency</h3>
            </div>
            <p class="muted" style="font-size:.88rem;">STAYZEN • Bholaram Ustad Marg, Indrapuri &amp; Shivampuri Colony, Bhanwarkuan, Indore</p>
            <a class="btn btn--outline btn--block" href="https://maps.app.goo.gl/kR1MMXnXxMvpX5Bk6?g_st=aw" target="_blank" rel="noopener">View on Google Map</a>
          </article>
          
          <!-- Card 2 -->
          <article class="card loc-card">
            <div class="card-img-wrap" style="aspect-ratio:16/9; margin-bottom:10px;">
              <img src="images/little-angel-main-gate.jpg" alt="Stayzen Little Angel Girls Hostel Main Gate Geeta Nagar Indore" loading="lazy" width="600" height="340">
            </div>
            <div class="loc-name" style="margin-top:10px">
              <svg class="icon" aria-hidden="true"><use href="#i-pin"></use></svg>
              <h3 class="mb-0" style="font-size:1.05rem;">Little Angel Girls Hostel</h3>
            </div>
            <p class="muted" style="font-size:.88rem;">STAYZEN • 60/F Bhaktavar Ram Nagar, Geeta Nagar, Near Ajit Club, Geeta Bhawan, Indore</p>
            <a class="btn btn--outline btn--block" href="https://share.google/xhlwhdu8JZihfpCTg" target="_blank" rel="noopener">View on Google Map</a>
          </article>

          <!-- Card 3 -->
          <article class="card loc-card">
            <div class="card-img-wrap" style="aspect-ratio:16/9; margin-bottom:10px;">
              <img src="images/stayzen-palasia-exterior.jpg" alt="Stayzen Hostel Girls Residency Palasia Square Indore" loading="lazy" width="600" height="340">
            </div>
            <div class="loc-name" style="margin-top:10px">
              <svg class="icon" aria-hidden="true"><use href="#i-pin"></use></svg>
              <h3 class="mb-0" style="font-size:1.05rem;">Stayzen Hostel</h3>
            </div>
            <p class="muted" style="font-size:.88rem;">STAYZEN • Girls Residency, Palasia Square, Indore</p>
            <a class="btn btn--outline btn--block" href="https://maps.app.goo.gl/2HBev5CSWLvbo1r77" target="_blank" rel="noopener">View on Google Map</a>
          </article>
        `);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Update script done.');
