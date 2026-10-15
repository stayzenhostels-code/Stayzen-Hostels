const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. We need to add slider-next button right after the end of <div class="gallery">
// Actually, let's just find `</div>\n    </div>\n  </section>`
// First let's check if slider-next is already there
if (!html.includes('slider-next')) {
   // Let's find the end of the gallery.
   // It's followed by </div>\n    </div>\n  </section> (wrapper, container, section) or something similar.
   // Wait, before my update_ux.js, it was:
   // <div class="gallery">
   //    <figure>...</figure>
   // </div>
   // </div> (container)
   // </section>

   // Let's replace the last </figure>\r\n        </div>\r\n      </div>\r\n    </section>
   html = html.replace(/(<\/figure>\s*<\/div>\s*)(<\/div>\s*<\/section>)/, '$1<button class="slider-btn slider-next" aria-label="Next" type="button">❯</button>\n      </div>\n$2');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed slider next button');
