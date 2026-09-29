/* FastFoodHelsinki.fi – käyttöliittymä. Kaikki sisältö luetaan data.js- ja guides.js-tiedostoista. */
(function () {
  "use strict";
  var D = window.FFH || {}, G = window.FFH_GUIDES || [], S = D.site || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (t) { return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var chainById = {}; (D.chains || []).forEach(function (c) { chainById[c.id] = c; });
  var srcById = {}; (D.sources || []).forEach(function (s) { srcById[s.id] = s; });
  var areaById = {}; (D.areas || []).forEach(function (a) { areaById[a.id] = a; });
  var catById = {}; (D.categories || []).forEach(function (c) { catById[c.id] = c; });
  var params = new URLSearchParams(location.search);

  /* ---------- apurit ---------- */
  function euro(n) { return n.toFixed(2).replace(".", ",") + " €"; }
  function priceText(p) { return p.price == null ? null : (p.from ? "alkaen " : "") + euro(p.price); }
  function isStale(p) {
    if (p.needsCheck) return true;
    if (!p.checkedAt) return true;
    var age = (Date.now() - new Date(p.checkedAt + "T00:00:00").getTime()) / 864e5;
    return age > (S.PRICE_MAX_AGE_DAYS || 90);
  }
  var STALE = '<span class="flag-stale" title="Hinta on tarkistettu yli ' + (S.PRICE_MAX_AGE_DAYS || 90) + ' päivää sitten">Tarkista ajantasainen hinta</span>';
  function monthFi(ym) { if (!ym) return ""; var p = ym.split("-"); return p.length === 2 ? p[1].replace(/^0/, "") + "/" + p[0] : ym; }
  function dateFi(iso) { if (!iso) return ""; var p = iso.split("-"); return +p[2] + "." + +p[1] + "." + p[0]; }
  function mono(c, extra) { return '<span class="mono" aria-hidden="true" style="background:' + esc(c.tone) + '"' + (extra || "") + ">" + esc(c.mono) + "</span>"; }
  function mapsUrl(r) { return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(r.name + ", " + r.address); }
  function srcLink(id) { var s = srcById[id]; return s ? '<a href="' + esc(s.url) + '" rel="noopener" target="_blank">' + esc(s.publisher) + "</a>" : ""; }
  function levelSet(lv) { return lv ? lv.split("–") : []; }

  /* Helsingin aika ja "avoinna nyt" */
  var DAYS = ["su", "mo", "tu", "we", "th", "fr", "sa"];
  function helsinkiNow() {
    var f = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Helsinki", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false });
    var parts = {}; f.formatToParts(new Date()).forEach(function (x) { parts[x.type] = x.value; });
    var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return { day: map[parts.weekday], min: (+parts.hour % 24) * 60 + +parts.minute };
  }
  function toMin(t) { var p = t.split(":"); return +p[0] * 60 + +p[1]; }
  function isOpenNow(r) {
    if (!r.hours) return null;
    var n = helsinkiNow(), today = r.hours[DAYS[n.day]] || [], prev = r.hours[DAYS[(n.day + 6) % 7]] || [];
    var open = today.some(function (iv) { var a = toMin(iv[0]), b = toMin(iv[1]); if (b === 0) b = 1440; return b > a ? n.min >= a && n.min < b : n.min >= a; });
    if (!open) open = prev.some(function (iv) { var a = toMin(iv[0]), b = toMin(iv[1]); return b < a && b !== 0 && n.min < b; });
    return open;
  }

  /* ---------- navigaatio ---------- */
  var btn = $(".menu-btn"), nav = $("#site-nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var o = nav.classList.toggle("open"); btn.setAttribute("aria-expanded", o ? "true" : "false");
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("open")) { nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); btn.focus(); } });
  }

  /* ---------- haku ---------- */
  function buildIndex() {
    var idx = [];
    (D.chains || []).forEach(function (c) { idx.push({ label: c.name, sub: c.categoryLabel, kind: "Ketju", url: "ravintolat.html?chain=" + c.id, text: [c.name, c.categoryLabel, c.countryName, c.originCity].join(" ") }); });
    (D.restaurants || []).forEach(function (r) { var c = chainById[r.chain]; idx.push({ label: r.name, sub: r.address, kind: "Ravintola", url: "ravintolat.html?q=" + encodeURIComponent(r.name), text: [r.name, r.address, (areaById[r.area] || {}).name, c && c.categoryLabel].join(" ") }); });
    (D.categories || []).forEach(function (c) { idx.push({ label: c.icon + " " + c.name, sub: c.text, kind: "Kategoria", url: c.id === "late" ? "ravintolat.html?open=late" : "ravintolat.html?cat=" + c.id, text: c.name + " " + c.text }); });
    (D.chains || []).forEach(function (c) { (c.prices || []).forEach(function (p) { idx.push({ label: p.product, sub: c.name + (p.price != null ? " · " + priceText(p) : ""), kind: "Tuote", url: "hinnat.html?chain=" + c.id, text: p.product + " " + p.type + " " + c.name }); }); });
    (D.areas || []).forEach(function (a) { idx.push({ label: "Pikaruoka: " + a.name, sub: "Alueen ravintolat", kind: "Alue", url: "ravintolat.html?area=" + a.id, text: a.name }); });
    G.forEach(function (g) { idx.push({ label: g.title, sub: g.tag, kind: "Opas", url: "opas.html?a=" + g.slug, text: g.title + " " + g.lead }); });
    return idx;
  }
  function norm(t) { return (t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/['’®]/g, ""); }
  var SYN = { burger: "hampurilai", burgeri: "hampurilai", hampurilainen: "hampurilai", subi: "sub", kasvis: "kasvi", vegaani: "kasvi plant", yo: "myohaan", mcd: "mcdonalds", mäkkäri: "mcdonalds", makkari: "mcdonalds", hese: "hesburger", bk: "burger king", kana: "kana chicken" };
  $$("[data-search]").forEach(function (form) {
    var input = $("input", form), list = $(".search-results", form), idx = buildIndex(), active = -1, items = [];
    function render(q) {
      var nq = norm(q).trim();
      if (!nq) { list.hidden = true; input.setAttribute("aria-expanded", "false"); return; }
      var terms = nq.split(/\s+/).map(function (t) { return SYN[t] || t; }).join(" ").split(/\s+/);
      items = idx.filter(function (it) { var h = norm(it.text + " " + it.label); return terms.every(function (t) { return h.indexOf(t) > -1; }); }).slice(0, 8);
      active = -1;
      list.innerHTML = items.length ? items.map(function (it, i) {
        return '<li role="option" id="sr-' + i + '"><a href="' + esc(it.url) + '"><span><b>' + esc(it.label) + '</b><br><span class="muted small">' + esc(it.sub || "") + '</span></span><span class="kind">' + esc(it.kind) + "</span></a></li>";
      }).join("") : '<li class="empty">Ei osumia haulla "' + esc(q) + '". Kokeile esimerkiksi "burger", "pizza" tai "Kamppi".</li>';
      list.hidden = false; input.setAttribute("aria-expanded", "true");
    }
    input.addEventListener("input", function () { render(input.value); });
    input.addEventListener("keydown", function (e) {
      var links = $$("a", list);
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        if (!links.length) return; e.preventDefault();
        active = (active + (e.key === "ArrowDown" ? 1 : -1) + links.length) % links.length;
        links.forEach(function (a, i) { a.setAttribute("aria-selected", i === active ? "true" : "false"); });
        input.setAttribute("aria-activedescendant", "sr-" + active);
      } else if (e.key === "Escape") { list.hidden = true; input.setAttribute("aria-expanded", "false"); }
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (active > -1 && items[active]) { location.href = items[active].url; return; }
      if (items.length === 1) { location.href = items[0].url; return; }
      location.href = "ravintolat.html?q=" + encodeURIComponent(input.value.trim());
    });
    document.addEventListener("click", function (e) { if (!form.contains(e.target)) { list.hidden = true; input.setAttribute("aria-expanded", "false"); } });
  });

  /* ---------- ketjukortit ---------- */
  function chainCard(c, headingTag) {
    var h = headingTag || "h3";
    var ex = (c.prices || []).slice(0, 3);
    var anyPrice = ex.some(function (p) { return p.price != null; });
    var priceHtml = anyPrice
      ? "<ul>" + ex.map(function (p) { return "<li><span>" + esc(p.product) + "</span><b>" + (p.price != null ? esc(priceText(p)) + (isStale(p) ? STALE : "") : '<span class="missing">tarkistettava</span>') + "</b></li>"; }).join("") + '</ul><p class="small muted" style="margin:6px 0 0">Esimerkkihintoja. Ravintolakohtaisia eroja voi olla. Lähde: ' + esc(ex[0].source) + (ex[0].lastUpdated ? ", " + monthFi(ex[0].lastUpdated) : "") + ".</p>"
      : '<p class="missing" style="margin:0">' + esc(S.PRICE_MISSING) + "</p>";
    return '<article class="chain-card' + (c.finnish ? " fi" : "") + '">' +
      '<div class="chain-top">' + mono(c) + "<div><" + h + ">" + esc(c.name) + '</' + h + '><div class="origin">' + c.flag + " " + esc(c.countryName) + " · " + esc(c.originCity) + "</div></div></div>" +
      (c.finnish ? '<span class="fi-ribbon">🇫🇮 Suomen oma pikaruokaketju</span>' : "") +
      '<div class="chain-body"><p>' + esc(c.description) + "</p>" +
      '<dl class="facts"><div><dt>Perustettu</dt><dd>' + esc(c.founded) + '</dd></div><div><dt>Hintataso</dt><dd>' + (c.priceLevel ? esc(c.priceLevel) : '<span class="muted" style="font-weight:600;font-size:.85rem">Ei vahvistettu</span>') + "</dd></div></dl>" +
      '<ul class="tags">' + c.categoryLabel.split(" • ").map(function (t) { return '<li class="tag">' + esc(t) + "</li>"; }).join("") + "</ul>" +
      '<div class="price-mini"><h4>Esimerkkihintoja Helsingissä</h4>' + priceHtml + "</div>" +
      '<div class="chain-actions"><a class="btn btn-primary btn-sm" href="ravintolat.html?chain=' + c.id + '">Katso ravintolat</a><a class="btn btn-ghost btn-sm" href="hinnat.html?chain=' + c.id + '">Hinnat</a></div>' +
      "</div></article>";
  }
  $$("[data-chains]").forEach(function (el) { el.innerHTML = (D.chains || []).map(function (c) { return chainCard(c); }).join(""); });

  /* ---------- alkuperämaa ---------- */
  var origin = $("#origin");
  if (origin) {
    var countries = [
      { id: "us", flag: "🇺🇸", name: "Yhdysvallat", short: "USA" },
      { id: "fi", flag: "🇫🇮", name: "Suomi", short: "Suomi" }
    ];
    var tabs = $(".origin-tabs", origin), panel = $("#origin-panel");
    tabs.innerHTML = countries.map(function (co, i) {
      var n = D.chains.filter(function (c) { return c.country === co.id; }).length;
      return '<button type="button" role="tab" class="origin-tab" id="otab-' + co.id + '" aria-controls="origin-panel" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '" data-country="' + co.id + '"><span class="flag" aria-hidden="true">' + co.flag + "</span><span><strong>" + co.name + '</strong><span class="count">' + n + " ketjua</span></span></button>";
    }).join("");
    function show(id) {
      $$(".origin-tab", tabs).forEach(function (t) { var on = t.dataset.country === id; t.setAttribute("aria-selected", on); t.tabIndex = on ? 0 : -1; });
      panel.setAttribute("aria-labelledby", "otab-" + id);
      $$("[data-region]", origin).forEach(function (r) { r.setAttribute("fill", r.dataset.region === id ? "#C2410C" : "#D9D3CA"); });
      $$("[data-pin]", origin).forEach(function (p) { p.style.opacity = p.dataset.pin === id ? "1" : ".25"; });
      var list = D.chains.filter(function (c) { return c.country === id; });
      $(".origin-list", origin).innerHTML = list.map(function (c) {
        return '<a class="origin-item" style="text-decoration:none;color:inherit" href="ravintolat.html?chain=' + c.id + '">' + mono(c) + "<span><b>" + esc(c.name) + "</b><span>" + esc(c.originCity) + " · " + esc(c.founded) + "</span></span></a>";
      }).join("");
    }
    tabs.addEventListener("click", function (e) { var b = e.target.closest(".origin-tab"); if (b) show(b.dataset.country); });
    tabs.addEventListener("keydown", function (e) {
      if (["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].indexOf(e.key) < 0) return;
      e.preventDefault(); var all = $$(".origin-tab", tabs), i = all.indexOf(document.activeElement);
      var nx = all[(i + (e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1) + all.length) % all.length]; nx.focus(); show(nx.dataset.country);
    });
    show("us");
  }

  /* ---------- hintataulukko ---------- */
  function priceRows(opts) {
    var rows = [];
    (D.chains || []).forEach(function (c) {
      if (opts.chain && c.id !== opts.chain) return;
      (c.prices || []).forEach(function (p) {
        if (opts.veg && !/kasvis|veggie|plant/i.test(p.type + " " + p.product)) return;
        if (opts.onlyKnown && p.price == null) return;
        rows.push({ c: c, p: p });
      });
    });
    if (opts.limit) rows = rows.slice(0, opts.limit);
    return rows;
  }
  function priceTable(opts) {
    var rows = priceRows(opts);
    if (!rows.length) return '<p class="muted">Tälle valinnalle ei ole julkaistuja hintoja.</p>';
    return '<div class="table-wrap"><table class="prices"><caption>Hinnat tarkistettu ketjujen omista lähteistä. Päivitetty ' + dateFi(S.lastReviewed) + '.</caption><thead><tr><th scope="col">Ravintola</th><th scope="col">Tuote / tuotetyyppi</th><th scope="col" class="num">Esimerkkihinta</th><th scope="col">Hintataso</th></tr></thead><tbody>' +
      rows.map(function (r) {
        var p = r.p, t = priceText(p);
        return "<tr><th scope=\"row\">" + esc(r.c.name) + "</th><td>" + esc(p.product) + '<span class="src">' + esc(p.type) + "</span></td>" +
          (t ? '<td class="num"><b>' + esc(t) + "</b>" + (isStale(p) ? STALE : "") + '<span class="src"><a href="' + esc(p.sourceUrl) + '" target="_blank" rel="noopener">' + esc(p.source) + "</a>" + (p.lastUpdated ? " · " + monthFi(p.lastUpdated) : "") + "</span></td>"
            : '<td class="missing">' + esc(S.PRICE_MISSING) + '<span class="src"><a href="' + esc(p.sourceUrl) + '" target="_blank" rel="noopener">' + esc(p.source) + "</a></span></td>") +
          "<td>" + (p.level ? esc(p.level) : '<span class="muted">–</span>') + "</td></tr>";
      }).join("") + "</tbody></table></div>" +
      '<p class="table-note">' + esc(S.PRICE_NOTE) + "</p>";
  }
  $$("[data-price-table]").forEach(function (el) {
    var opts = { chain: el.dataset.chain || null, limit: +el.dataset.limit || 0, veg: el.dataset.veg === "1", onlyKnown: el.dataset.known === "1" };
    if (el.dataset.filterable === "1") {
      var cur = params.get("chain") || "";
      var bar = document.createElement("div"); bar.className = "table-filter"; bar.setAttribute("role", "group"); bar.setAttribute("aria-label", "Suodata ketjun mukaan");
      bar.innerHTML = '<button type="button" class="chip" data-c="">Kaikki</button>' + D.chains.map(function (c) { return '<button type="button" class="chip" data-c="' + c.id + '">' + esc(c.name) + "</button>"; }).join("");
      var out = document.createElement("div"); el.appendChild(bar); el.appendChild(out);
      var noteEl = document.createElement("div"); el.appendChild(noteEl);
      var draw = function (id) {
        opts.chain = id || null;
        $$(".chip", bar).forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.c === (id || "")); });
        out.innerHTML = priceTable(opts);
        var c = chainById[id];
        noteEl.innerHTML = c && c.priceNote ? '<p class="note note-neutral"><b>' + esc(c.name) + ":</b> " + esc(c.priceNote) + "</p>" : "";
      };
      bar.addEventListener("click", function (e) { var b = e.target.closest(".chip"); if (!b) return; draw(b.dataset.c); var u = new URL(location.href); if (b.dataset.c) u.searchParams.set("chain", b.dataset.c); else u.searchParams.delete("chain"); history.replaceState(null, "", u); });
      draw(chainById[cur] ? cur : "");
    } else el.innerHTML = priceTable(opts);
  });
  $$("[data-chain-notes]").forEach(function (el) {
    el.innerHTML = D.chains.map(function (c) { return '<li><b>' + esc(c.name) + ":</b> " + esc(c.priceNote) + "</li>"; }).join("");
  });

  /* ---------- ravintolakortti ---------- */
  function restCard(r) {
    var c = chainById[r.chain] || {}, open = isOpenNow(r);
    var hours = r.hoursText
      ? esc(r.hoursText) + (open === true ? '<span class="open-badge yes">Avoinna nyt</span>' : open === false ? '<span class="open-badge no">Suljettu nyt</span>' : "")
      : '<span class="unv">' + esc(S.NOT_VERIFIED) + "</span>";
    return '<article class="rest-card"><div class="rest-head">' + mono(c) + "<div><h3>" + esc(r.name) + '</h3><div class="chainname">' + esc(c.name) + "</div></div></div>" +
      '<ul class="rest-meta">' +
      '<li><span aria-hidden="true">⭐</span><span><span class="sr-only">Arvio: </span><span class="unv">Arvio: ' + esc(S.NOT_VERIFIED) + "</span></span></li>" +
      '<li><span aria-hidden="true">📍</span><span><span class="sr-only">Sijainti: </span>' + esc((areaById[r.area] || {}).name) + " · " + esc(r.address) + "</span></li>" +
      '<li><span aria-hidden="true">🍔</span><span><span class="sr-only">Tyyppi: </span>' + esc(c.categoryLabel) + "</span></li>" +
      '<li><span aria-hidden="true">💶</span><span><span class="sr-only">Hintataso: </span>' + (c.priceLevel ? "Hintataso " + esc(c.priceLevel) : '<span class="unv">Hintataso: ' + esc(S.NOT_VERIFIED) + "</span>") + "</span></li>" +
      '<li><span aria-hidden="true">🕐</span><span><span class="sr-only">Aukioloajat: </span>' + hours + "</span></li>" +
      '<li><span aria-hidden="true">🌍</span><span><span class="sr-only">Alkuperämaa: </span>' + c.flag + " " + esc(c.countryName) + " (" + esc(c.originCity) + ", " + esc(c.founded) + ")</span></li>" +
      '<li><span aria-hidden="true">📖</span><span><span class="sr-only">Historia: </span>' + esc(r.history || c.finland || "") + "</span></li>" +
      "</ul>" +
      (r.note ? '<p class="note" style="margin:0">' + esc(r.note) + "</p>" : "") +
      '<div class="rest-actions"><a class="btn btn-primary btn-sm" href="' + esc(mapsUrl(r)) + '" target="_blank" rel="noopener">Näytä kartalla</a><a class="btn btn-ghost btn-sm" href="' + esc(c.menu) + '" target="_blank" rel="noopener">Katso menu</a><a class="btn btn-ghost btn-sm" href="' + esc(c.website) + '" target="_blank" rel="noopener">Virallinen verkkosivusto</a></div>' +
      '<p class="rest-src" style="margin:0">Tietolähde: <a href="' + esc(r.sourceUrl) + '" target="_blank" rel="noopener">' + esc(r.source) + "</a> · tarkistettu " + dateFi(S.lastReviewed) + "</p></article>";
  }
  function restLd(list) {
    var el = document.createElement("script"); el.type = "application/ld+json";
    el.textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "ItemList", name: "Fast food -ravintolat Helsingissä",
      itemListElement: list.map(function (r, i) {
        var c = chainById[r.chain], m = r.address.match(/^(.*),\s*(\d{5})\s+(.*)$/);
        return { "@type": "ListItem", position: i + 1, item: { "@type": "FastFoodRestaurant", name: r.name, brand: { "@type": "Brand", name: c.name }, servesCuisine: c.categoryLabel.split(" • ")[0], address: m ? { "@type": "PostalAddress", streetAddress: m[1], postalCode: m[2], addressLocality: m[3], addressCountry: "FI" } : r.address, url: c.website } };
      })
    });
    document.head.appendChild(el);
  }

  /* ---------- ravintolahaku / suodattimet ---------- */
  var finder = $("#finder");
  if (finder) {
    var form = $("#filters", finder), grid = $("#rest-grid"), countEl = $("#rest-count");
    form.querySelector("[data-opts=area]").innerHTML = D.areas.map(function (a) { return '<label class="check"><input type="checkbox" name="area" value="' + a.id + '"><span>' + esc(a.name) + "</span></label>"; }).join("");
    form.querySelector("[data-opts=chain]").innerHTML = D.chains.map(function (c) { return '<label class="check"><input type="checkbox" name="chain" value="' + c.id + '"><span>' + esc(c.name) + "</span></label>"; }).join("");
    var qInput = $("#rest-q");
    // URL-parametrit → valinnat
    ["area", "cat", "price", "open", "chain"].forEach(function (k) {
      (params.get(k) || "").split(",").filter(Boolean).forEach(function (v) { var i = form.querySelector('input[name="' + k + '"][value="' + v + '"]'); if (i) i.checked = true; });
    });
    if (params.get("q")) qInput.value = params.get("q");
    var vals = function (n) { return $$('input[name="' + n + '"]:checked', form).map(function (i) { return i.value; }); };
    function apply(push) {
      var f = { area: vals("area"), cat: vals("cat"), price: vals("price"), open: vals("open"), chain: vals("chain"), q: norm(qInput.value.trim()) };
      var list = D.restaurants.filter(function (r) {
        var c = chainById[r.chain];
        if (f.area.length && f.area.indexOf(r.area) < 0) return false;
        if (f.chain.length && f.chain.indexOf(r.chain) < 0) return false;
        if (f.cat.length && !f.cat.some(function (x) { return c.categories.indexOf(x) > -1; })) return false;
        if (f.price.length) { var ls = levelSet(c.priceLevel); if (!f.price.some(function (x) { return ls.indexOf(x) > -1; })) return false; }
        if (f.open.indexOf("now") > -1 && isOpenNow(r) !== true) return false;
        if (f.open.indexOf("late") > -1 && !r.late) return false;
        if (f.open.indexOf("24h") > -1 && !r.h24) return false;
        if (f.q) { var h = norm([r.name, r.address, c.name, c.categoryLabel, (areaById[r.area] || {}).name].join(" ")); if (!f.q.split(/\s+/).every(function (t) { return h.indexOf(SYN[t] || t) > -1; })) return false; }
        return true;
      });
      countEl.textContent = list.length + (list.length === 1 ? " ravintola" : " ravintolaa");
      var tips = [];
      if (f.open.indexOf("24h") > -1) tips.push("Emme ole voineet vahvistaa ketjujen omista lähteistä yhtään Helsingin 24h-pikaruokaravintolaa.");
      if (f.open.indexOf("now") > -1) tips.push("Avoinna nyt -suodatin näyttää vain ravintolat, joiden aukioloajat on vahvistettu.");
      if (f.price.length) tips.push("Hintatasosuodatin ohittaa ketjut, joiden hintatasoa ei ole vahvistettu (McDonald's, Hesburger, Subway).");
      grid.innerHTML = list.length ? list.map(restCard).join("") :
        '<div class="empty-state" style="grid-column:1/-1"><h3>Ei vahvistettuja ravintoloita näillä valinnoilla</h3><p>Listaamme vain toimipisteet, joiden tiedot olemme tarkistaneet. Löydät kaikki toimipisteet ketjujen omista ravintolahauista:</p><p>' +
        D.chains.map(function (c) { return '<a href="' + esc(c.finder) + '" target="_blank" rel="noopener">' + esc(c.name) + "</a>"; }).join(" · ") + '</p><button type="button" class="btn btn-ghost btn-sm" data-reset>Tyhjennä suodattimet</button></div>';
      $("#rest-tips").innerHTML = tips.map(function (t) { return '<p class="note note-neutral" style="margin:0 0 10px">' + esc(t) + "</p>"; }).join("");
      if (push) {
        var u = new URL(location.href);
        ["area", "cat", "price", "open", "chain"].forEach(function (k) { if (f[k].length) u.searchParams.set(k, f[k].join(",")); else u.searchParams.delete(k); });
        if (qInput.value.trim()) u.searchParams.set("q", qInput.value.trim()); else u.searchParams.delete("q");
        history.replaceState(null, "", u);
      }
    }
    form.addEventListener("change", function () { apply(true); });
    qInput.addEventListener("input", function () { apply(true); });
    form.addEventListener("submit", function (e) { e.preventDefault(); });
    finder.addEventListener("click", function (e) {
      if (e.target.closest("[data-reset]")) { $$("input[type=checkbox]", form).forEach(function (i) { i.checked = false; }); qInput.value = ""; apply(true); }
    });
    var ft = $(".filter-toggle", finder);
    if (ft) ft.addEventListener("click", function () { var col = form.dataset.collapsed === "true"; form.dataset.collapsed = col ? "false" : "true"; ft.setAttribute("aria-expanded", col ? "true" : "false"); });
    apply(false);
    restLd(D.restaurants);
  }

  /* pienet ravintolalistat (etusivu, alueet, oppaat) */
  $$("[data-rest-list]").forEach(function (el) {
    var k = el.dataset.restList, v = el.dataset.value, list = D.restaurants;
    if (k === "area") list = list.filter(function (r) { return r.area === v; });
    if (k === "chain") list = list.filter(function (r) { return r.chain === v; });
    if (k === "late") list = list.filter(function (r) { return r.late; });
    if (el.dataset.limit) list = list.slice(0, +el.dataset.limit);
    el.innerHTML = list.length ? list.map(restCard).join("") : '<div class="empty-state" style="grid-column:1/-1"><p>' + esc(S.NOT_VERIFIED) + " Tarkista toimipisteet ketjujen omista ravintolahauista.</p></div>";
  });
  $$("[data-area-count]").forEach(function (el) {
    var n = D.restaurants.filter(function (r) { return r.area === el.dataset.areaCount; }).length;
    el.textContent = n ? n + (n === 1 ? " vahvistettu toimipiste" : " vahvistettua toimipistettä") : "Ei vielä vahvistettuja toimipisteitä";
  });

  /* ---------- faktat, aikajana, lähteet ---------- */
  $$("[data-facts]").forEach(function (el) {
    var list = D.facts.slice(0, +el.dataset.limit || D.facts.length);
    el.innerHTML = list.map(function (f) { return '<figure class="fact" style="margin:0"><span class="q" aria-hidden="true">Tiesitkö?</span><p>' + esc(f.text) + '</p><figcaption class="src">Lähde: ' + srcLink(f.source) + "</figcaption></figure>"; }).join("");
  });
  $$("[data-timeline]").forEach(function (el) {
    var list = el.dataset.timeline === "fi" ? D.timelineFinland : D.timeline;
    el.innerHTML = list.map(function (t) { return '<li><span class="yr">' + esc(t.year) + "</span><div><h3>" + esc(t.title) + "</h3><p>" + esc(t.text) + '</p><span class="src">Lähde: ' + srcLink(t.source) + "</span></div></li>"; }).join("");
  });
  $$("[data-sources]").forEach(function (el) {
    el.innerHTML = D.sources.map(function (s) { return '<li><b>' + esc(s.title) + '</b><div class="pub">' + esc(s.publisher) + " · tarkistettu " + dateFi(s.checked) + '</div><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.url) + "</a></li>"; }).join("");
  });

  /* ---------- oppaat ---------- */
  function guideCard(g) { return '<a class="guide-card" href="opas.html?a=' + g.slug + '"><span class="tag">' + esc(g.tag) + "</span><h3>" + esc(g.title) + "</h3><p>" + esc(g.lead) + '</p><span class="link-arrow small">Lue opas</span></a>'; }
  $$("[data-guides]").forEach(function (el) { el.innerHTML = G.slice(0, +el.dataset.limit || G.length).map(guideCard).join(""); });

  var art = $("#article");
  if (art) {
    var g = G.filter(function (x) { return x.slug === params.get("a"); })[0];
    if (!g) {
      art.innerHTML = '<h1>Opasta ei löytynyt</h1><p>Etsimääsi opasta ei löytynyt. Katso kaikki oppaat <a href="oppaat.html">Oppaat-sivulta</a>.</p>';
      document.title = "Opasta ei löytynyt – FastFoodHelsinki.fi";
      var mr = document.createElement("meta"); mr.name = "robots"; mr.content = "noindex"; document.head.appendChild(mr);
    } else {
      var url = S.url + "/opas.html?a=" + g.slug;
      document.title = g.title + " – FastFoodHelsinki.fi";
      var md = $('meta[name="description"]'); if (md) md.content = g.lead;
      var cl = $('link[rel="canonical"]'); if (cl) cl.href = url;
      var og = $('meta[property="og:title"]'); if (og) og.content = g.title;
      var ogd = $('meta[property="og:description"]'); if (ogd) ogd.content = g.lead;
      var ogu = $('meta[property="og:url"]'); if (ogu) ogu.content = url;
      var bodyHtml = g.body.map(function (b) {
        if (b[0] === "ul") return "<ul>" + b[1].map(function (li) { return "<li>" + esc(li) + "</li>"; }).join("") + "</ul>";
        return "<" + b[0] + ">" + esc(b[1]) + "</" + b[0] + ">";
      }).join("");
      var extra = "", show = g.show || [];
      if (show.indexOf("prices") > -1) extra += "<h2>" + (g.chain ? esc(chainById[g.chain].name) + " – esimerkkihinnat" : "Esimerkkihintoja Helsingissä") + "</h2>" + priceTable({ chain: g.chain || null }) + (g.chain ? '<p class="note note-neutral">' + esc(chainById[g.chain].priceNote) + "</p>" : "");
      if (show.indexOf("veg") > -1) extra += "<h2>Kasvisvaihtoehtojen hintoja</h2>" + priceTable({ veg: true });
      var rl = show.indexOf("late") > -1 ? D.restaurants.filter(function (r) { return r.late; }) : show.indexOf("restaurants") > -1 ? D.restaurants.filter(function (r) { return !g.chain || r.chain === g.chain; }) : [];
      if (rl.length) extra += "<h2>" + (show.indexOf("late") > -1 ? "Myöhään auki (vahvistetut aukioloajat)" : "Toimipisteitä Helsingissä") + '</h2><div class="grid grid-2">' + rl.map(restCard).join("") + "</div>";
      else if (show.indexOf("restaurants") > -1 && g.chain) extra += '<h2>Toimipisteet</h2><p>' + esc(S.NOT_VERIFIED) + ' Katso ajantasaiset toimipisteet <a href="' + esc(chainById[g.chain].finder) + '" target="_blank" rel="noopener">' + esc(chainById[g.chain].name) + "n ravintolahausta</a>.</p>";
      art.innerHTML = '<nav class="crumbs" aria-label="Murupolku"><a href="index.html">Etusivu</a> / <a href="oppaat.html">Oppaat</a> / <span aria-current="page">' + esc(g.title) + "</span></nav>" +
        '<span class="eyebrow">' + esc(g.tag) + "</span><h1>" + esc(g.title) + '</h1><p class="lead">' + esc(g.lead) + '</p><p class="small muted">Päivitetty ' + dateFi(g.updated) + " · FastFoodHelsinki.fi</p>" + bodyHtml + extra;
      var ld = document.createElement("script"); ld.type = "application/ld+json";
      ld.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: g.title, description: g.lead, inLanguage: "fi", dateModified: g.updated, mainEntityOfPage: url, publisher: { "@type": "Organization", name: "FastFoodHelsinki.fi", url: S.url } });
      document.head.appendChild(ld);
      var more = $("#more-guides"); if (more) more.innerHTML = G.filter(function (x) { return x.slug !== g.slug; }).slice(0, 3).map(guideCard).join("");
    }
  }

  var yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();
})();
