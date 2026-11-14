---
layout: page
title: About
permalink: /about/
redirect_from: /contact/
description: About Kinshu Gupta and how to get in touch.
---

{% comment %}
Hidden for now (2026-11-13). Remove the comment tags to show it again.

Achievements Summary:

Placed top 0.3% globally at IMC Prosperity Trading Challenge out of 10,000+ teams, 3rd place winner of Hack4Delta state hackathon's final round out of 150+ teams, 3x champion of QU hackathon out of 100+ participants, finalist of the Harvard Pear VC startup accelerator pitch. Experience building large scale ML-driven financial systems at DraftKings, processing $170M+ in single-day transactions and 13,500+ deposits/min at Super Bowl peak. High-impact projects including risk-based ACH routing to drive $10M+ in annual savings. Co-authored research on psychoeducational variables affecting student competencies using data from 25,000+ students, presented at the MAA conference. Developed XAI methods to explain deep neural network outcomes for prostate cancer MRI classification, presented at the 2024 ASEE Northeast Conference.
{% endcomment %}

{% if site.avatar %}<img class="avatar about-photo" src="{{ site.avatar | relative_url }}" alt="{{ site.title }}" width="104" height="104">{% endif %}

Away from work I boulder, run and ski.

## Books

<div class="shelf" aria-hidden="true">{% for book in site.data.books %}<span style="--c: {{ book.colour }}">{{ book.title }}</span>{% endfor %}</div>
<div class="books">
{% for book in site.data.books %}
<div class="book" style="--c: {{ book.colour }}">
  <div class="bt"><strong>{{ book.title }}</strong>, {{ book.author }}{% if book.detail %} <span class="bd">({{ book.detail }})</span>{% endif %}</div>
  <p class="bn">{{ book.note }}</p>
</div>
{% endfor %}
</div>

[Resume](/files/resume.pdf)

<h2 id="contact">Contact</h2>

Questions and conversations are welcome. Email me at kinshugupta2002 at gmail.com, or message me on [X (@spacepiratexz)](https://x.com/spacepiratexz). My code is on [GitHub](https://github.com/kinshu0).
