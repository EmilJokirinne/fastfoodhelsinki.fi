# FastFoodHelsinki.fi – ylläpito-ohje

Staattinen sivusto: ei build-vaihetta, ei tietokantaa. Lataa kaikki tiedostot palvelimen juureen.

## Tiedostot
- `data.js` – **kaikki hinnat, ketjut, toimipisteet, faktat, aikajana ja lähteet.** Päivitä vain tämä.
- `guides.js` – Oppaat-osion artikkelit.
- `app.js` – käyttöliittymä (haku, suodattimet, hintataulukot, kortit).
- `styles.css` – ulkoasu.
- `*.html` – sivut. `opas.html?a=<slug>` näyttää oppaan.
- `sitemap.xml`, `robots.txt`, `favicon.svg`, `og-image.png`, `site.webmanifest`, `404.html`.

## Hinnan päivitys
Muokkaa `data.js` → ketjun `prices`-lista:
```js
{ product: "WHOPPER®", price: 7.45, from: true, source: "Burger King Suomi – hinnasto",
  sourceUrl: "https://burgerking.fi/hinnasto/", lastUpdated: "2026-08", checkedAt: "2026-09-29", level: "€€" }
```
- `price: null` → sivulla näkyy "Hinta tarkistettava ravintolan ajantasaisesta menusta."
- Jos `checkedAt` on yli 90 päivää vanha (tai `needsCheck: true`), hintaan tulee automaattisesti merkintä **"Tarkista ajantasainen hinta"**.
- Päivitä myös `site.lastReviewed`.

## Ravintolan lisäys
Lisää objekti `restaurants`-listaan vain, kun osoite on tarkistettu. `hours: null` → "Tietoa ei ole tällä hetkellä vahvistettu." Aukioloajat muodossa `{ mo: [["10:00","24:00"]], ... }`; yli puolenyön menevä aika esim. `["10:00","02:00"]`. Avoinna nyt -tieto lasketaan Helsingin ajassa.

## Kuvat
Hero käyttää kevyitä SVG-piirroksia. Omia ruokakuvia lisätessä käytä WebP/AVIF-muotoa ja `loading="lazy"` (paitsi heron pääkuva).
