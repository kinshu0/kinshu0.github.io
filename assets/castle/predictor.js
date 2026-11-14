// Head to Head score predictor for the Castle Challenge post.
// Uses only the single-castle probe measurements in predictor-data.js.
(function () {
  var D = window.CASTLE_DATA, root = document.getElementById('castle-predictor');
  if (!D || !root) return;
  var NS = 'http://www.w3.org/2000/svg';
  var curves = [1, 2, 3, 4, 5].map(function (c) {
    var p = D.pts[c].slice().sort(function (a, b) { return a[0] - b[0]; }), m = 0;
    return p.map(function (q) { m = Math.max(m, q[1]); return [q[0], m]; });
  });
  // share beaten at x soldiers: exact at a measured point, otherwise bounded by its neighbours
  function share(c, x) {
    var p = curves[c], i = 0;
    while (i + 1 < p.length && p[i + 1][0] <= x) i++;
    if (p[i][0] === x || i === p.length - 1) return { lo: p[i][1], mid: p[i][1], hi: p[i][1], exact: true };
    var a = p[i], b = p[i + 1];
    return { lo: a[1], hi: b[1], mid: a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]), exact: false };
  }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function svg(tag, attrs) { var e = document.createElementNS(NS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); return e; }

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
    g.appendChild(svg('polyline', { points: curves[c].map(function (q) { return sx(q[0]) + ',' + sy(q[1]); }).join(' '), class: 'cp-line' }));
    curves[c].forEach(function (q) { g.appendChild(svg('circle', { cx: sx(q[0]), cy: sy(q[1]), r: 1.6, class: 'cp-pt' })); });
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
  function f3(v) { return v.toFixed(3); }
  function line(label, value, note) {
    var p = el('p', 'cp-line-out'); p.appendChild(el('span', 'cp-k', label)); p.appendChild(el('span', 'cp-v', value));
    if (note) p.appendChild(el('span', 'cp-n', note)); return p;
  }
  function update() {
    var a = rows.map(function (r) { return +r.inp.value; }), total = 0, lo = 0, mid = 0, hi = 0, exact = true;
    a.forEach(function (x, c) {
      var s = share(c, x); total += x; lo += (c + 1) * s.lo; mid += (c + 1) * s.mid; hi += (c + 1) * s.hi; exact = exact && s.exact;
      rows[c].num.textContent = x;
      rows[c].read.textContent = 'beats ' + (100 * s.mid).toFixed(1) + '%' + (s.exact ? '' : ' (between ' + (100 * s.lo).toFixed(0) + ' and ' + (100 * s.hi).toFixed(0) + ')');
      rows[c].dot.setAttribute('cx', sx(x)); rows[c].dot.setAttribute('cy', sy(s.mid));
    });
    out.textContent = '';
    if (total !== 100) {
      out.appendChild(el('p', 'cp-warn', total < 100 ? (100 - total) + ' soldiers left to place.' : 'Over by ' + (total - 100) + '. An entry has exactly 100 soldiers.'));
      return;
    }
    out.appendChild(line('From the probes', f3(mid), exact ? 'every castle value was measured directly' : 'between ' + f3(lo) + ' and ' + f3(hi) + '; some values fall between measured points'));
    out.appendChild(line('Plus the 0.113 constant', f3(mid + D.offset), 'see the next section'));
    var hit = D.known.filter(function (k) { return k[0].join() === a.join(); })[0];
    out.appendChild(line('Real leaderboard', hit ? f3(hit[1]) : 'unknown', hit ? 'I had this entry on the board' : 'I never submitted this allocation'));
  }

  // table of every fully measured entry
  var tb = document.getElementById('castle-known');
  if (tb) {
    var t = el('table'), h = el('tr');
    ['Allocation', 'From probes', 'Real', 'Gap'].forEach(function (x) { h.appendChild(el('th', null, x)); });
    t.appendChild(h);
    D.known.slice().sort(function (p, q) { return q[1] - p[1]; }).forEach(function (k) {
      var s = 0; k[0].forEach(function (x, c) { s += (c + 1) * share(c, x).mid; });
      var r = el('tr'); [k[0].join('-'), f3(s), f3(k[1]), f3(k[1] - s)].forEach(function (x) { r.appendChild(el('td', null, x)); });
      t.appendChild(r);
    });
    tb.appendChild(t);
  }
  set(presets[0][1]);
})();
