---
layout: page
title: Protocol Stories
permalink: /podcast/
description: A podcast of crypto and prediction-market stories, each checked against the protocols' own data.
image: /assets/podcast/cover-dark.png
---
<div class="pod-head">
  <picture>
    <source srcset="{{ '/assets/podcast/cover-dark.png' | relative_url }}" media="(prefers-color-scheme: dark)">
    <img class="pod-cover" src="{{ '/assets/podcast/cover-light.png' | relative_url }}" alt="Protocol Stories cover: a price spike with the gap to the reference price shaded" width="200" height="200">
  </picture>
  <div>
    <p>Stories from crypto and prediction markets, about fifteen minutes each. Each episode follows one story or theme and checks its claims against the primary source: the protocol's on-chain data or the exchange's own records.</p>
    <p class="meta">Made with a lot of help from AI tools, including the research, the script and the two voices.</p>
    <p class="pod-follow">
      <a class="pod-main" href="podcast://kinshu.co/podcast/feed.xml" data-follow="apple" aria-label="Follow in Apple Podcasts"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="10" r="2.2" fill="currentColor" stroke="none"/><path d="M12 14.5v6"/><path d="M7.8 14.2a6 6 0 1 1 8.4 0"/><path d="M4.9 17a10 10 0 1 1 14.2 0"/></svg>Apple Podcasts</a>
      <a class="pod-main" href="https://subscribeonandroid.com/kinshu.co/podcast/feed.xml" data-follow="android" aria-label="Follow in an Android podcast app"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="10" r="2.2" fill="currentColor" stroke="none"/><path d="M12 14.5v6"/><path d="M7.8 14.2a6 6 0 1 1 8.4 0"/><path d="M4.9 17a10 10 0 1 1 14.2 0"/></svg>Android</a>
    </p>
    <p class="meta pod-other">Using another app? <button type="button" id="pod-copy" data-follow="copy">Copy the feed address</button></p>
  </div>
</div>

<p class="label">Episodes</p>
<div id="pod-episodes"><p class="meta">Loading episodes. If nothing appears, open the <a href="{{ '/podcast/feed.xml' | relative_url }}">feed</a> in a podcast app.</p></div>

<script>
(function () {
  var FEED = "https://kinshu.co/podcast/feed.xml";
  function track(name, params) { if (window.gtag) gtag("event", name, params); }
  function text(node, tag) { var e = node.getElementsByTagName(tag)[0]; return e ? e.textContent.trim() : ""; }
  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt) e.textContent = txt; return e; }

  document.querySelectorAll("[data-follow]").forEach(function (a) {
    a.addEventListener("click", function () { track("podcast_follow", { method: a.dataset.follow }); });
  });
  var copy = document.getElementById("pod-copy");
  copy.addEventListener("click", function () {
    navigator.clipboard.writeText(FEED).then(function () {
      copy.textContent = "Copied"; setTimeout(function () { copy.textContent = "Copy the feed address"; }, 1600);
    }, function () { window.prompt("Feed address", FEED); });
  });

  fetch("{{ '/podcast/feed.xml' | relative_url }}").then(function (r) {
    if (!r.ok) throw new Error(r.status); return r.text();
  }).then(function (xml) {
    var items = new DOMParser().parseFromString(xml, "text/xml").getElementsByTagName("item");
    if (!items.length) return;
    var box = document.getElementById("pod-episodes"); box.textContent = "";
    Array.prototype.forEach.call(items, function (it) {
      var title = text(it, "title"), enc = it.getElementsByTagName("enclosure")[0];
      var secs = parseInt(text(it, "itunes:duration"), 10), date = new Date(text(it, "pubDate"));
      var row = el("div", "pod-ep");
      row.appendChild(el("h2", "", title));
      var bits = [];
      if (!isNaN(date)) bits.push(date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }));
      if (secs) bits.push(Math.round(secs / 60) + " min");
      row.appendChild(el("p", "meta", bits.join(" · ")));
      row.appendChild(el("p", "pod-desc", text(it, "description")));
      if (enc) {
        var audio = el("audio"); audio.controls = true; audio.preload = "none"; audio.src = enc.getAttribute("url");
        var played = false;
        audio.addEventListener("play", function () { if (!played) { played = true; track("podcast_play", { episode: title }); } });
        audio.addEventListener("ended", function () { track("podcast_complete", { episode: title }); });
        row.appendChild(audio);
      }
      box.appendChild(row);
    });
  }).catch(function () {});
})();
</script>
