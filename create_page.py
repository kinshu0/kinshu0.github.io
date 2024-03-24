import os
import sys
from pathlib import Path
import datetime

posts_dir = Path('_posts')


"""
Sample template example;
---
layout: post
title:  "stock network analysis"
date:   2022-12-18 08:20:52 -0400
categories: jekyll update
---

"""

def create_page(title):
    # Get the current datetime
    date_created = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d %H:%M:%S %z')

    new_file = posts_dir / f'{date_created[:10]}-{title}.markdown'
    new_file.touch()

    # Write the template to the file
    template = f"""---
layout: post
title:  "{title}"
date:   {date_created}
categories: jekyll update
---

"""

    new_file.write_text(template)



if __name__ == '__main__':
    print('Creating a new page...')
    print('Enter the title of the page: ')
    title = input()
    title = title.replace(' ', '-')
    create_page(title)
    print('Done!')