const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

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
</script>
`;

html = html.replace('</script>\n\n\n<a href="https://wa.me', autoScrollScript + '\n<a href="https://wa.me');
// Also try with \r\n
html = html.replace('</script>\r\n\r\n\r\n<a href="https://wa.me', autoScrollScript + '\r\n<a href="https://wa.me');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed auto-scroll in index.html');
