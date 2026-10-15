const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newGalleryItems = `
          <figure class="mb-0 reveal">
            <div class="gallery-img-wrap">
              <img src="images/stayzen-palasia-room1.jpg" alt="Stayzen Hostel Girls Residency Palasia Square spacious sharing room" loading="lazy" width="800" height="600">
            </div>
            <figcaption>Spacious Room • Stayzen Palasia</figcaption>
          </figure>
          <figure class="mb-0 reveal">
            <div class="gallery-img-wrap">
              <img src="images/stayzen-palasia-room2.png" alt="Stayzen Hostel Girls Residency Palasia Square room another angle" loading="lazy" width="800" height="600">
            </div>
            <figcaption>Comfortable Stay • Stayzen Palasia</figcaption>
          </figure>`;

// Find the end of the gallery.
// It ends with:
//         </figure>
//         <button class="slider-btn slider-next" aria-label="Next" type="button">❯</button>
//       </div>
//     </div>
//   </section>

// Let's insert the new items before the closing </figure> wait, no, AFTER the last </figure> and before the <button class="slider-btn slider-next"
html = html.replace(/(<\/figure>\s*)(<button class="slider-btn slider-next")/i, `$1${newGalleryItems}\n        $2`);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Gallery updated");
