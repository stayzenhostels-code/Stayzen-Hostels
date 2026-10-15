# [Hostel Group Name] — Website Editing Guide

A plain, static website. No build step, no CMS, no database.
You edit text in an HTML file with any text editor (Notepad++, VS Code, Sublime)
and upload the folder to hosting. That is the whole workflow.

---

## 1. What is in this folder

| File / folder | What it is |
|---|---|
| `index.html` | HOME page |
| `about.html` | ABOUT US page |
| `contact.html` | CONTACT US page |
| `blog.html` | BLOG listing page (cards, categories, search, pagination) |
| `blog-post.html` | Template for ONE blog article — copy it for every new post |
| `css/style.css` | All styling. **All colours live at the top of this file.** |
| `js/main.js` | Tiny script: mobile menu, footer year, form message |
| `images/` | Put the real photos and logos here |
| `sitemap.xml` | List of pages for Google |
| `robots.txt` | Crawler instructions |

To preview the site, just double-click `index.html`. It opens in the browser.

---

## 2. Find and replace every placeholder

Every value the client still has to supply is written inside square brackets,
for example `[Phone Number]`. To fill the site in:

1. Open each `.html` file in a text editor.
2. Use **Find & Replace** (Ctrl+H) to replace one placeholder at a time across the file.

### The full placeholder list

| Placeholder | Where it appears | What to put there |
|---|---|---|
| `[Logo Here]` / `[Logo/Photo Here]` | Header + footer on all pages | Replace the `<span class="brand-logo">` with `<img src="images/logo.png" alt="[Hostel Group Name] logo" width="44" height="44">` |
| `[Hostel Group Name]` | Everywhere | The group's registered / trading name |
| `[Brand Name 1]`, `[Brand Name 2]`, `[Brand Name 3]` | Home, footer, schema | The three hostel brand names |
| `[Location 1 Name]` … `[Location 4 Name]` | Home, Contact, footer | Area name, e.g. the locality in Indore |
| `[Hostel Address – Location 1..4]` | Home, Contact, footer | Full postal address incl. PIN |
| `[GMB Link – Location 1..4]` | Home, Contact, footer, schema | The Google Business Profile / Google Maps link |
| `[Phone Number]` | Header, footer, CTAs, schema | Display number, e.g. +91 98xxx xxxxx |
| `+91XXXXXXXXXX` (in `tel:` links) | All pages | The same number, digits only, with country code |
| `91XXXXXXXXXX` (in `wa.me` links) | All pages | WhatsApp number, digits only, no + and no spaces |
| `[WhatsApp Number]` | Contact page, footer | Display version of the WhatsApp number |
| `[Email]` | Contact page, footer, schema | e.g. info@domain.com |
| `[Instagram Link]`, `[Facebook Link]`, `[YouTube Link]` | Footer | Full profile URLs |
| `[Working Hours – to be added]` / `[Working Hours / Visit Timing – to be added]` | Contact, footer | e.g. Mon–Sat 10:00–18:00 |
| `[Price – to be added]` | Home (rooms), FAQ, schema | Rent per room type. **Only real prices.** |
| `[Room Photo Here]`, `[Canteen Photo Here]`, `[Common Area Photo Here]`, `[Building Photo Here]`, `[Study Area Photo Here]`, `[Washroom Photo Here]`, `[Entrance Photo Here]`, `[Open Area Photo Here]` | Home, About | Real photographs |
| `[Google Map – Location 1..4]` | Contact page | The Google Maps `<iframe>` embed |
| `[Review 1]`, `[Review 2]`, `[Review 3]` + `[Reviewer Name 1..3]` | Home | **Real** reviews only, copied exactly |
| `[Text to be added by client]`, `[Mission Statement – to be added]`, `[Short about line – to be added]` | About, footer | The client's own words |
| `[Rules – to be added]`, `[Gate Timings – to be added]`, `[Visitor Policy – to be added]`, `[Rent, Deposit & Refund Policy – to be added]`, `[Notice Period – to be added]`, `[Discipline & Damages Policy – to be added]` | About | Actual hostel policy |
| `[Meal Plan & Timings – to be added]`, `[Weekly Menu – to be added]`, `[Kitchen Hygiene Policy – to be added]`, `[Special Diet Policy – to be added]` | Home, About | Actual mess details |
| `[Documents & Deposit – to be added]`, `[Extra Charges – to be added]`, `[Deposit – to be added]`, `[Guest Policy – to be added]`, `[Parking Details – to be added]`, `[Room Details – to be added]`, `[Fire Safety Details – to be added]`, `[Parent Communication Policy – to be added]` | Home, About, Contact | Actual operational details |
| `[Blog Title 1..4]`, `[Blog Image 1..4 Here]`, `[Date – to be added]`, `[Author – to be added]`, `[Short excerpt …]` | Blog, blog post | Real articles |
| `[Founding Year – to be added]`, `[Founder / Owner Name – to be added]`, `[Number of Beds – to be added]`, `[Number of Residents – to be added]` | About | Real numbers only |

**Do not invent any value.** If the client has not given it, leave the placeholder in
place — a visible `[Price – to be added]` is safer than a wrong price.

---

## 3. Change the colours (30 seconds)

Open `css/style.css` and edit only the `:root` block at the very top.
Every colour on every page reads from these variables.

```css
:root{
  --c-primary:        #12566B;   /* main brand colour */
  --c-primary-dark:   #0B3B4A;   /* darker shade for hovers, footer */
  --c-primary-light:  #E6F1F4;   /* soft tint background */
  --c-accent:         #E8A33D;   /* warm accent — highlights, prices */
  --c-accent-dark:    #C47F17;
  --c-accent-light:   #FDF4E4;
}
```

Change `--c-primary` and `--c-accent` to the client's brand colours and the whole
site follows. Current palette: deep teal-blue (trust, calm) + warm amber (hospitality).

---

## 4. Swap a placeholder for a real photo

Every photo placeholder is a `<div class="ph ...">` with `role="img"` and an
`aria-label` (that is the alt-text equivalent, so the page is accessible even before
real images exist).

Replace this:

```html
<div class="ph ph--img" role="img" aria-label="[Room Photo Here]">[Room Photo Here]</div>
```

with this:

```html
<img src="images/room-double-sharing.jpg"
     alt="Double sharing hostel room in Indore with two beds, study tables and wardrobe"
     loading="lazy" width="1200" height="900">
```

Rules for real images:
- Write a **descriptive alt** that includes the place ("…hostel in Indore") — good for
  both accessibility and Google Images.
- Keep `loading="lazy"` on everything except the hero image (make the hero `loading="eager"`
  once it is a real photo).
- Always set `width` and `height` so the page does not jump while loading.
- Compress images to **under 200 KB** each (use squoosh.app or tinypng.com).
  Ideally export as `.webp` or `.jpg` at roughly 1600 px wide.

---

## 5. Add a Google Map to the Contact page

1. Open Google Maps → find the location → **Share** → **Embed a map** → **Copy HTML**.
2. In `contact.html`, find `[Google Map – Location 1]` and replace the whole
   `<div class="ph ph--map" ...>...</div>` with the copied `<iframe>`, then add
   `loading="lazy"` and `title="Google Map of [Hostel Address – Location 1]"` to the iframe.

---

## 6. Connect the enquiry form (important)

Right now the form has **no backend**. When someone submits it, `js/main.js` shows a
friendly message and nothing is sent anywhere. Choose one of these:

**Option A — easiest, no coding:** use a form service.
Create a form at formspree.io / getform.io / web3forms.com, then in `index.html` and
`contact.html` change:

```html
<form class="form" method="post" action="" data-placeholder-form>
```

to

```html
<form class="form" method="post" action="https://formspree.io/f/YOUR_ID">
```

Then delete the `data-placeholder-form` attribute. Finally, in `js/main.js`, delete the
whole block that starts with `/* ---------- 2. Enquiry form ----------` so the browser
submits normally.

**Option B — PHP (if hosting supports it):** set `action="send-enquiry.php"` and write a
small mail-sending script on the server.

**Option C — WhatsApp instead of email:** point the form action at a service that
forwards submissions to WhatsApp, or simply keep the Call/WhatsApp buttons as the primary
conversion path (they are already on every screen, sticky on mobile).

---

## 7. Add a new blog post

1. Copy `blog-post.html` → rename it, e.g. `how-to-choose-a-hostel-in-indore.html`.
   Use lowercase words separated by hyphens — this is your SEO-friendly URL.
2. In the new file, update: `<title>`, `<meta name="description">`, `<link rel="canonical">`,
   `og:title`, `og:description`, `og:url`, `og:image`, and the **BlogPosting** schema block
   (headline, description, image, datePublished, dateModified, author).
3. Change the one `<h1>` to the article title, then fill in the headings and paragraphs.
4. Add a card for it on `blog.html` (copy an existing `<article class="card post-card">`
   block and point its link at the new file).
5. Add a `<url>` block for it in `sitemap.xml`.

Keep one `<h1>` per page. Use `<h2>` for main sections and `<h3>` for sub-points.

---

## 8. Add the Hindi version later

The structure is already prepared:

1. Create a folder `hi/` and copy all pages into it.
2. In each Hindi page change `<html lang="en">` to `<html lang="hi">`.
3. Translate the visible text (keep the `class` names and file names in English).
4. Uncomment the `hreflang` block in the `<head>` of the English pages (it is already
   written there, commented out) and add the matching block to the Hindi pages.
5. Add both versions to `sitemap.xml`.

---

## 9. Before going live — checklist

- [ ] Replace `https://www.example.com/` with the real domain in every page's
      `canonical`, `og:url`, `twitter` tags, in the JSON-LD blocks, in `sitemap.xml`
      and in `robots.txt`.
- [ ] Replace `+91XXXXXXXXXX` and `91XXXXXXXXXX` everywhere (search both).
- [ ] Add the real logo to `images/logo.png` and a favicon to `images/favicon.png`.
- [ ] Fill in the four `Hostel` schema entries in `index.html` with real name, address,
      phone, PIN and GMB link.
- [ ] **Only after you have real, verifiable Google reviews**, add an
      `aggregateRating` to the schema. It is deliberately absent now — inventing
      ratings can get the site penalised.
- [ ] Replace the three `[Review …]` blocks with real reviews, copied word for word.
- [ ] Submit `sitemap.xml` in Google Search Console and Bing Webmaster Tools.
- [ ] Create / claim the Google Business Profiles for all four locations.
- [ ] Test the Call and WhatsApp buttons on a real phone.
- [ ] Run the site through PageSpeed Insights and fix any large images.

---

## 10. Hosting and custom domain

The site is plain HTML/CSS/JS, so it works on any host:

- **Shared hosting (cPanel):** upload the contents of this folder into `public_html`.
- **Netlify / Vercel / Cloudflare Pages:** drag the folder onto the dashboard.
- **GitHub Pages:** push the folder to a repo and enable Pages.

To attach a custom domain that is registered in the client's own name: add the domain in
the host's dashboard, then set the DNS records the host shows you (an `A` record for the
root and a `CNAME` for `www`) inside the client's domain registrar account. Nothing in
this website needs to change when the domain changes — only the `example.com`
replacements listed in the checklist above.

---

## 11. Built-in SEO, AEO and GEO

Already in place, page by page:

- Unique `<title>` and `<meta name="description">` on all 5 pages.
- Exactly one `<h1>` per page, then a clean `<h2>` / `<h3>` hierarchy.
- Local keywords used naturally: *hostel in Indore, boys hostel Indore, girls hostel
  Indore, student hostel Indore, PG in Indore*.
- **Schema (JSON-LD):** `Organization` + four `Hostel`/`LocalBusiness` entities,
  `FAQPage`, `BreadcrumbList`, `Blog`, `BlogPosting`, `AboutPage`, `ContactPage`.
  No `aggregateRating` — see the checklist.
- **AEO / GEO:** every FAQ answer opens with a short, direct, quotable sentence, and the
  About page has an "In short" summary block — the format Google snippets and AI
  assistants lift.
- Open Graph + Twitter card tags on every page for clean link previews on WhatsApp,
  Instagram and Facebook.
- `geo.region` / `geo.placename` meta on Home and Contact.
- `sitemap.xml` + `robots.txt` ready, with `hreflang` scaffolding for the Hindi version.
- Accessible: skip link, real `<label>`s on every form field, `aria-label` on icon-only
  links, visible focus outlines, and colour contrast checked for the palette.

---

## 12. Performance notes

- No frameworks, no jQuery, no web fonts — so there is nothing to download except the
  page itself, one CSS file and one small JS file.
- The JS is deferred and optional: the pages work fully with JavaScript switched off.
- Everything is mobile-first: the layout is designed for a 360 px phone first, then
  scaled up at 720 px (tablet) and 1000 px (desktop).
- Sticky **Call Now** and **WhatsApp** bar on mobile (under 720 px) — the two actions
  that matter most for a hostel enquiry.
- All placeholder visuals are pure CSS, so the site stays fast until real photos
  (compressed) are added.
