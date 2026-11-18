# behwal-web

The behwal game studio website: a static page (HTML, CSS, a little JS), served by GitHub Pages from `main` (root).

- `index.html`: the page. `assets/css/style.css`, `assets/js/main.js`.
- `assets/img/`: web images made from the game folders (`behwal/<Game>/...`), resized to WebP.
- No build step. Preview locally with `python -m http.server` in this folder.
- Custom domain: add a `CNAME` file with the domain once DNS points to GitHub Pages.
