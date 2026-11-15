// Head to Head score calculator for the Castle Challenge post.
// Uses the five fitted curves in predictor-data.js: F[c][x] is the share of the field that
// x soldiers beat on castle c+1, ties counted as half.
(function () {
  var D = window.CASTLE_DATA, root = document.getElementById('castle-predictor');
  if (!D || !root) return;
  var NS = 'http://www.w3.org/2000/svg';
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function svg(tag, attrs) { var e = document.createElementNS(NS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); return e; }
  function score(a) { var s = 0; for (var c = 0; c < 5; c++) s += (c + 1) * D.F[c][a[c]]; return s; }
  function f3(v) { return v.toFixed(3); }

  var W = 220, H = 64, PAD = 5;
  function sx(x) { return PAD + (W - 2 * PAD) * x / 100; }
  function sy(y) { return H - PAD - (H - 2 * PAD) * y; }

  var presets = [['My entry', [4, 5, 36, 48, 7]], ['20 each', [20, 20, 20, 20, 20]], ['First search point', [4, 4, 36, 48, 8]], ['All on castle 5', [0, 0, 0, 0, 100]]];
  var bar = el('div', 'cp-presets');
  presets.forEach(function (p, i) {
    var b = el('button', null, p[0]); b.type = 'button'; b.id = 'cp-preset-' + i;
    b.addEventListener('click', function () { set(p[1]); }); bar.appendChild(b);
  });
  root.appendChild(bar);

  var rows = [], grid = el('div', 'cp-rows');
  for (var c = 0; c < 5; c++) (function (c) {
    var row = el('div', 'cp-row');
    var lab = el('label', 'cp-lab', 'Castle ' + (c + 1)); lab.htmlFor = 'cp-s' + c;
    var inp = el('input'); inp.type = 'range'; inp.min = 0; inp.max = 100; inp.step = 1; inp.id = 'cp-s' + c;
    var num = el('span', 'cp-num'), read = el('span', 'cp-read');
    var g = svg('svg', { viewBox: '0 0 ' + W + ' ' + H, width: W, height: H, role: 'img', 'aria-label': 'Share of the field beaten on castle ' + (c + 1) + ' by number of soldiers' });
    g.appendChild(svg('line', { x1: PAD, y1: sy(0), x2: W - PAD, y2: sy(0), class: 'cp-axis' }));
    g.appendChild(svg('line', { x1: PAD, y1: sy(1), x2: W - PAD, y2: sy(1), class: 'cp-grid' }));
    g.appendChild(svg('polyline', { points: D.F[c].map(function (y, x) { return sx(x) + ',' + sy(y); }).join(' '), class: 'cp-line' }));
    var dot = svg('circle', { r: 4.5, class: 'cp-dot' }); g.appendChild(dot);
    var ctl = el('div', 'cp-ctl'); ctl.appendChild(lab); ctl.appendChild(inp); ctl.appendChild(num);
    row.appendChild(ctl); row.appendChild(g); row.appendChild(read);
    grid.appendChild(row);
    inp.addEventListener('input', update);
    rows.push({ inp: inp, num: num, read: read, dot: dot });
  })(c);
  root.appendChild(grid);
  var out = el('div', 'cp-out'); out.setAttribute('aria-live', 'polite'); root.appendChild(out);

  function set(a) { rows.forEach(function (r, i) { r.inp.value = a[i]; }); update(); }
  function line(label, value, note) {
    var p = el('p', 'cp-line-out'); p.appendChild(el('span', 'cp-k', label)); p.appendChild(el('span', 'cp-v', value));
    if (note) p.appendChild(el('span', 'cp-n', note)); return p;
  }
  function find(list, a) { return list.filter(function (k) { return k[0].join() === a.join(); })[0]; }
  function update() {
    var a = rows.map(function (r) { return +r.inp.value; }), total = 0;
    a.forEach(function (x, c) {
      total += x;
      rows[c].num.textContent = x;
      rows[c].read.textContent = 'beats ' + (100 * D.F[c][x]).toFixed(1) + '% of the field';
      rows[c].dot.setAttribute('cx', sx(x)); rows[c].dot.setAttribute('cy', sy(D.F[c][x]));
    });
    out.textContent = '';
    if (total !== 100) {
      out.appendChild(el('p', 'cp-warn', total < 100 ? (100 - total) + ' soldiers left to place.' : 'Over by ' + (total - 100) + '. An entry has exactly 100 soldiers.'));
      return;
    }
    out.appendChild(line('Model', f3(score(a)), 'from the five curves'));
    var later = find(D.later, a), known = find(D.known, a);
    if (later) out.appendChild(line('Real leaderboard', f3(later[1]), 'an entry that appeared after the fit'));
    else if (known) out.appendChild(line('Real leaderboard', f3(known[1]), 'an entry the fit was given'));
    else out.appendChild(line('Real leaderboard', 'unknown', 'I never submitted this allocation'));
  }

  // the entries that appeared after the fit
  var tb = document.getElementById('castle-known');
  if (tb) {
    var t = el('table'), h = el('tr');
    ['Allocation', 'Model', 'Real', 'Gap'].forEach(function (x) { h.appendChild(el('th', null, x)); });
    t.appendChild(h);
    D.later.slice().sort(function (p, q) { return q[1] - p[1]; }).forEach(function (k) {
      var s = score(k[0]), r = el('tr'), d = s - k[1];
      [k[0].join('-'), f3(s), f3(k[1]), (d >= 0 ? '+' : '−') + Math.abs(d).toFixed(3)].forEach(function (x) { r.appendChild(el('td', null, x)); });
      t.appendChild(r);
    });
    tb.appendChild(t);
  }
  set(presets[0][1]);
})();
