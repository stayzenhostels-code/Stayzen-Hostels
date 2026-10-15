const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(/flex: 0 0 85%;/g, 'flex: 0 0 75%;');

const newCSS = `

/* Gallery Wrapper & Slider Buttons */
.gallery-wrapper {
  position: relative;
}
.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: rgba(0,0,0,0.4);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.1rem;
  backdrop-filter: blur(4px);
}
.slider-btn:hover {
  background: rgba(0,0,0,0.7);
}
.slider-prev {
  left: 8px;
}
.slider-next {
  right: 8px;
}

@media (min-width: 720px) {
  .slider-btn { display: none; }
}
`;

css += newCSS;

fs.writeFileSync('style.css', css, 'utf8');
console.log('CSS updated');
