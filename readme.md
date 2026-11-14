# kinshu.co

Source for https://kinshu.co. Pushing to `main` builds the site and publishes it
(S3 behind CloudFront) through `.github/workflows/deploy.yml`.

- Preview locally: `bundle exec jekyll serve`
- New post: `uv run python create_page.py`, then fill in `description`, `thumb` and `image`.
- Documents (resume, papers, slides): put the PDF in `files/`. It is served at
  `kinshu.co/files/<name>.pdf`. Use lowercase names with dashes.
- Games shown on `/games/`: edit `_data/games.yml`.
- `CNAME` makes the old `kinshu0.github.io` addresses redirect to `kinshu.co`.
