# Saad Chughtai – portfolio site

A one-page portfolio in plain HTML, CSS and JavaScript. There is no build step: edit a file, commit, and GitHub Pages republishes it within a minute or two.

Live site: https://sc-freelance.github.io/

## Files

```
index.html     All the content (text, projects, skills, experience, links)
styles.css     Colours, spacing and layout
script.js      Extras: dark mode toggle, fade-in on scroll, the curved timeline line,
               "Copy email" button, highlighting the current section in the top bar
images/        Headshot, project images, hackathon photo, favicon
images/logos/  Skill logos (single-colour SVGs)
cv/            Your CV PDF
```

The page still works if `script.js` fails to load. You only lose the extras.

## Update your CV

Replace `cv/Saad-Chughtai-CV.pdf`, keeping exactly that file name. Every "Download CV" button points to it.
Before uploading, check the PDF doesn't include your phone number or home address, because anyone can download it.

## Add a project

Copy this block into the `<div class="grid">` under "Things I've worked on" in `index.html`:

```html
<article class="card reveal">
  <img class="shot" src="images/my-project.jpg" width="1280" height="720" loading="lazy"
       alt="Describe the screenshot">
  <div class="card-body">
    <h3>Project name</h3>
    <p>One or two lines on what it does and what you used it for.</p>
    <p class="stack">Python · Pandas · SQL</p>
    <a class="card-link" href="https://github.com/sc-freelance/REPO-NAME" target="_blank" rel="noopener">View code <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg></a>
  </div>
</article>
```

- **Charts:** use `class="shot chart"` instead of `class="shot"`. This shows the whole chart on a white background instead of cropping it.
- **No link:** delete the `<a class="card-link" …>` line.
- **No image yet:** use the placeholder box instead of the `<img>`:

```html
<div class="shot placeholder" role="img" aria-label="Screenshot coming soon">
  <span>Image to add: what the screenshot should show</span>
</div>
```

Keep images under about 300 KB. Write the `alt` text as a short description of what's in the picture, for screen-reader users.

## Update "In progress"

These are the small `<article class="mini">` cards under the projects. The label sets the style:

```html
<span class="status status-now">In progress</span>   <!-- teal accent -->
<span class="status">Up next</span>
```

When something is finished, move it into the projects grid as a full card.

## Add a skill logo

1. Find the logo on https://simpleicons.org, download the SVG and save it in `images/logos/`, e.g. `images/logos/tableau.svg`.
2. Add a line to the `<ul class="logos">` list:

```html
<li><i style="--logo:url(images/logos/tableau.svg)"></i>Tableau</li>
```

The logos show in your page colours automatically, including in dark mode, and turn teal on hover.
Skills without a logo go in the "Also:" line underneath.

## Add an experience entry

Copy one `<li class="tl-item">…</li>` block inside the Experience `<ol>`. Put the newest entry at the top. The curved line connects the dots automatically, and entries alternate left and right on wide screens.
To show a year instead of "A-levels", change the text in `<p class="tl-year">`.

## After editing styles.css or script.js

Bump the version number at the end of their links in `index.html`, e.g. `styles.css?v=2` → `styles.css?v=3`.
Otherwise phones that visited before may keep showing the old styles with the new page.

## Change the colours

All colours are at the top of `styles.css`:

- `--ink`: navy headings and buttons
- `--accent`: teal
- `--warm`: the coral "Hi!"

There is one set for light mode and one for dark mode. If you change a colour, check that text on it stays readable, for example with https://webaim.org/resources/contrastchecker/ (aim for at least 4.5:1).

## Publish changes

**On github.com:** open the `sc-freelance.github.io` repository, open a file, click the pencil icon, edit it, then click "Commit changes".
To upload images or the CV, click "Add file" → "Upload files" and drop them into the right folder.

**With Git:**

```bash
git add .
git commit -m "Add DevTrack screenshot"
git push
```

The QR code points to the site's address, not its content, so you never need to regenerate it after editing the page.
