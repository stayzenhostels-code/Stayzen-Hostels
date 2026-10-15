$content = Get-Content -Raw -Path index.html

$parts = $content -split '<!-- ========================================================='

$idxHero = -1; $idxHighlights = -1; $idxFacilities = -1; $idxRooms = -1; $idxGallery = -1; $idxWhy = -1

for ($i = 0; $i -lt $parts.Length; $i++) {
    if ($parts[$i] -match 'HERO') { $idxHero = $i }
    if ($parts[$i] -match 'HOSTEL HIGHLIGHTS') { $idxHighlights = $i }
    if ($parts[$i] -match 'KEY FACILITIES') { $idxFacilities = $i }
    if ($parts[$i] -match 'ROOMS PREVIEW') { $idxRooms = $i }
    if ($parts[$i] -match 'PHOTO GALLERY') { $idxGallery = $i }
    if ($parts[$i] -match 'WHY US') { $idxWhy = $i }
}

Write-Output "Hero: $idxHero, High: $idxHighlights, Fac: $idxFacilities, Rooms: $idxRooms, Gal: $idxGallery, Why: $idxWhy"

$part1 = ""
for ($i=0; $i -lt $idxHighlights; $i++) { 
    if ($i -gt 0) {
        $part1 += "<!-- =========================================================" 
    }
    $part1 += $parts[$i] 
}

$gallery = "<!-- =========================================================" + $parts[$idxGallery]
$rooms = "<!-- =========================================================" + $parts[$idxRooms]
$highlights = "<!-- =========================================================" + $parts[$idxHighlights]
$facilities = "<!-- =========================================================" + $parts[$idxFacilities]

$part_end = ""
for ($i=$idxWhy; $i -lt $parts.Length; $i++) { 
    $part_end += "<!-- =========================================================" + $parts[$i] 
}

$gallery = $gallery -replace '<section class="section" aria-labelledby="gallery-h">', '<section class="section section--surface" aria-labelledby="gallery-h">'
$highlights = $highlights -replace '<section class="section section--surface" aria-labelledby="highlights-h">', '<section class="section" aria-labelledby="highlights-h">'
$facilities = $facilities -replace '<section class="section" aria-labelledby="facilities-h">', '<section class="section section--surface" aria-labelledby="facilities-h">'

$new_content = $part1 + $gallery + $rooms + $highlights + $facilities + $part_end

Set-Content -Path index.html -Value $new_content -Encoding UTF8
Write-Output "Reordered successfully!"
