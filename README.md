# Saad Chughtai – portfolio site

A one-page portfolio in plain HTML, CSS and JavaScript. There is no build step: edit a file, commit, and GitHub Pages republishes it within a minute or two.

Live site: https://sc-freelance.github.io/

## Files

```
index.html     All the content (text, projects, skills, links)
styles.css     Colours, spacing and layout
script.js      Light/dark toggle (you won't usually need to touch this)
images/        Headshot, project screenshots, hackathon photo, favicon
cv/            Your CV PDF
```

## Add or change your CV

Save your CV as `cv/Saad-Chughtai-CV.pdf` (exactly this name). The "Download CV" button already points there.
Before uploading, check the PDF doesn't include your phone number or home address, since anyone can download it.

## Replace a screenshot placeholder

Each project card starts with a placeholder box like this:

```html
<div class="shot placeholder" role="img" aria-label="Screenshot coming soon">
  <span>Image to add: screenshot of the DevTrack Kanban board</span>
</div>
```

1. Save the screenshot in `images/`, e.g. `images/devtrack.jpg`. Keep it under about 300 KB, and use a wide (16:9) crop.
2. Replace the whole `<div class="shot placeholder" …> … </div>` block with:

```html
<img class="shot" src="images/devtrack.jpg" width="1280" height="720" loading="lazy"
     alt="DevTrack Kanban board showing tasks in To do, In progress and Done columns">
```

Write the `alt` text as a short description of what's in the picture, for screen-reader users.

## Add a project

Copy this block into the `<section id="projects">` part of `index.html`, under the last `</article>`:

```html
<article class="card">
  <img class="shot" src="images/my-project.jpg" width="1280" height="720" loading="lazy"
       alt="Describe the screenshot">
  <div class="card-body">
    <h3>Project name</h3>
    <p>One or two lines on what it does and what you used it for.</p>
    <ul class="tags" aria-label="Technologies">
      <li>Python</li><li>Pandas</li>
    </ul>
    <a class="link" href="https://github.com/sc-freelance/REPO-NAME" target="_blank" rel="noopener">View code <span aria-hidden="true">→</span></a>
  </div>
</article>
```

No screenshot yet? Use the placeholder `<div>` from the section above instead of the `<img>`. No link? Delete the `<a class="link" …>` line.

## Update "Recent and in progress"

Each item in the timeline is an `<li>`. Change the label to show its status:

```html
<span class="status status-now">In progress</span>   <!-- teal, filled dot -->
<span class="status status-next">Up next</span>
<span class="status">Nov 2026</span>                 <!-- finished: just show the date -->
```

When something is finished, consider moving it into Projects as a full card.

## Add or remove a skill

Skills are chips inside `<ul class="chips">`. To add one, put a new `<li>` in the right group:

```html
<ul class="chips"><li>Python</li><li>Pandas</li><li>Power BI</li></ul>
```

To add a whole new group, copy one `<div>` with its `<h3>` and `<ul class="chips">`.

## Change the colours

All colours are at the top of `styles.css`. The main one is `--accent` (teal). There is one set for light mode and one for dark mode. If you change a colour, check that text on it stays readable, e.g. with https://webaim.org/resources/contrastchecker/ (aim for at least 4.5:1).

## Publish changes

On github.com: open the `sc-freelance.github.io` repository, open a file, click the pencil icon, edit, then "Commit changes".
To upload images or the CV: "Add file" → "Upload files" → drop them into the right folder.

With Git:

```bash
git add .
git commit -m "Add DevTrack screenshot"
git push
```

The QR code points to the site's address, not its content, so you never need to regenerate it after editing the page.
