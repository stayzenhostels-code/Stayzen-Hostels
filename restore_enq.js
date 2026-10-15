const fs = require('fs');
const execSync = require('child_process').execSync;

const oldHtml = execSync('git show 08051d4:index.html', {encoding: 'utf8'});
const currentHtml = fs.readFileSync('index.html', 'utf8');

const startIdx = oldHtml.indexOf('<!-- =========================================================\n       FINAL CTA STRIP');
const endIdx = oldHtml.indexOf('</section>', startIdx) + 10;
const enquiryHtml = oldHtml.substring(startIdx, endIdx);

let newHtml = currentHtml.replace(/<a href="[^"]*" class="floating-wa"[\s\S]*?<\/a>\r?\n?/g, '');

const faqStart = newHtml.search(/<!-- =========================================================\r?\n       FAQ/);
if (faqStart !== -1) {
    newHtml = newHtml.substring(0, faqStart) + enquiryHtml + '\n\n  ' + newHtml.substring(faqStart);
    fs.writeFileSync('index.html', newHtml, 'utf8');
    console.log('Done');
} else {
    console.log('FAQ not found');
}
