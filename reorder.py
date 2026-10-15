import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

highlights_start = content.find('<!-- =========================================================\n       HOSTEL HIGHLIGHTS (8 icon cards)')
facilities_start = content.find('<!-- =========================================================\n       KEY FACILITIES (detailed)')
rooms_start = content.find('<!-- =========================================================\n       ROOMS PREVIEW')
gallery_start = content.find('<!-- =========================================================\n       PHOTO GALLERY')
why_start = content.find('<!-- =========================================================\n       WHY US')

part1 = content[:highlights_start] 
highlights = content[highlights_start:facilities_start]
facilities = content[facilities_start:rooms_start]
rooms = content[rooms_start:gallery_start]
gallery = content[gallery_start:why_start]
part_end = content[why_start:]

gallery = gallery.replace('<section class="section" aria-labelledby="gallery-h">', '<section class="section section--surface" aria-labelledby="gallery-h">')
highlights = highlights.replace('<section class="section section--surface" aria-labelledby="highlights-h">', '<section class="section" aria-labelledby="highlights-h">')
facilities = facilities.replace('<section class="section" aria-labelledby="facilities-h">', '<section class="section section--surface" aria-labelledby="facilities-h">')

new_content = part1 + gallery + rooms + highlights + facilities + part_end

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)
print("Reordered successfully!")
