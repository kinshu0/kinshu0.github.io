"""Create a new post: `uv run python create_page.py`"""
from pathlib import Path
import datetime

posts_dir = Path('_posts')


def create_page(title):
    now = datetime.datetime.now().astimezone()
    slug = title.lower().replace(' ', '-')
    new_file = posts_dir / f'{now:%Y-%m-%d}-{slug}.markdown'

    # description: one sentence, used on the homepage, in search results and link previews
    # thumb: small picture for the homepage list (optional)
    # image: large picture for link previews on X, iMessage, Slack (optional)
    # math: set to true if the post uses $$ ... $$ formulas
    template = f"""---
layout: post
title: "{title}"
date: {now:%Y-%m-%d %H:%M:%S %z}
description: ""
thumb:
image:
math: false
---

"""
    new_file.write_text(template)
    return new_file


if __name__ == '__main__':
    title = input('Title of the post: ').strip()
    print('Created', create_page(title))
