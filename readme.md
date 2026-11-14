# kinshu.co

Source for https://kinshu.co. Pushing to `main` builds the site and publishes it
(S3 behind CloudFront) through `.github/workflows/deploy.yml`.

- Preview locally: `bundle exec jekyll serve`
- New post: `uv run python create_page.py`, then fill in `description`, `thumb` and `image`.
- Math: add `math: true` to a post's front matter, then write `$$ ... $$` inside a paragraph for
  inline math, or on its own block for a displayed formula. Rendered with KaTeX.
- Documents (resume, papers, slides): put the PDF in `files/`. It is served at
  `kinshu.co/files/<name>.pdf`. Use lowercase names with dashes.
- Games shown on `/games/`: edit `_data/games.yml`.
- The PDF links at the repo root and in `assets/` are symlinks into `files/`. They keep old
  `kinshu0.github.io` document links working. Do not add a `CNAME` file: it redirects every
  GitHub Pages site on the account, including the other repos' project sites.
