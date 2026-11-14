---
layout: page
title: Games
permalink: /games/
description: Games I built to play with friends.
---
<p class="meta">Things I built to play with friends</p>

{% for game in site.data.games %}{% if game.listed %}
<div class="entry">
  <div class="txt">
    <h2><a href="{{ game.url }}">{{ game.name }}</a></h2>
    <p>{{ game.description }}</p>
  </div>
</div>
{% endif %}{% endfor %}
