/* =====================================================================
   FastFoodHelsinki.fi – KAIKKI SISÄLTÖDATA YHDESSÄ PAIKASSA
   ---------------------------------------------------------------------
   Päivitä hinnat, ravintolat ja faktat vain tässä tiedostossa.
   Kaikki sivut (etusivu, hintavertailu, ravintolat, oppaat) lukevat
   tiedot täältä.

   HINTOJEN SÄÄNNÖT
   - Jokaisella hinnalla: product, price, source, sourceUrl, lastUpdated
   - price: null  → sivulla näkyy "Hinta tarkistettava ravintolan
                    ajantasaisesta menusta."
   - checkedAt: päivä, jolloin hinta on viimeksi tarkistettu lähteestä.
     Jos tarkistuksesta on yli PRICE_MAX_AGE_DAYS päivää, hinnan viereen
     tulee automaattisesti merkintä "Tarkista ajantasainen hinta".
   - needsCheck: true pakottaa saman merkinnän heti.

   RAVINTOLOIDEN SÄÄNNÖT
   - Lisää vain toimipisteitä, joiden osoite on tarkistettu lähteestä.
   - hours: null → "Tietoa ei ole tällä hetkellä vahvistettu."
   - hours-muoto: { mo:[["10:00","24:00"]], ... } – yli puolenyön
     menevä aukiolo merkitään esim. ["10:00","02:00"].
   ===================================================================== */

window.FFH = {
  site: {
    name: "FastFoodHelsinki.fi",
    url: "https://fastfoodhelsinki.fi",
    lastReviewed: "2026-09-29",
    PRICE_MAX_AGE_DAYS: 90,
    NOT_VERIFIED: "Tietoa ei ole tällä hetkellä vahvistettu.",
    PRICE_MISSING: "Hinta tarkistettava ravintolan ajantasaisesta menusta.",
    PRICE_NOTE: "Huom. Hinnat voivat vaihdella toimipisteen, ajankohdan, kampanjoiden ja tilauskanavan mukaan."
  },

  categories: [
    { id: "burger", icon: "🍔", name: "Hampurilaiset", text: "McDonald's, Burger King, Hesburger, Friends & Brgrs ja muut burgeripaikat." },
    { id: "pizza", icon: "🍕", name: "Pizza", text: "Pizza Hut sekä muut Helsingin pizzapaikat." },
    { id: "sub", icon: "🥪", name: "Subit ja sandwichit", text: "Subway sekä muut sandwich-ravintolat." },
    { id: "chicken", icon: "🍗", name: "Kana", text: "Kana-annoksia ja chicken burger -ravintoloita." },
    { id: "veg", icon: "🌱", name: "Kasvis", text: "Kasvis- ja plant-based-vaihtoehtoja." },
    { id: "late", icon: "🌙", name: "Myöhään auki", text: "Ravintoloita, jotka palvelevat myöhään illalla tai yöllä." }
  ],

  /* ------------------------------------------------------------------
     KETJUT
     ------------------------------------------------------------------ */
  chains: [
    {
      id: "mcdonalds",
      name: "McDonald's",
      mono: "M",
      tone: "#B91C1C",
      country: "us",
      countryName: "Yhdysvallat",
      flag: "🇺🇸",
      originCity: "San Bernardino, Kalifornia",
      founded: 1940,
      foundedNote: "Dick ja Mac McDonaldin ravintola Kaliforniassa. Nykyinen yhtiö katsoo perustamisvuodekseen 1955, jolloin Ray Kroc avasi ensimmäisen oman ravintolansa.",
      categories: ["burger", "chicken", "veg"],
      categoryLabel: "Hampurilaiset • Kana • Aamupala • Pikaruoka",
      priceLevel: null,
      description: "McDonald's sai alkunsa Kaliforniassa, jossa Dick ja Mac McDonald avasivat ravintolansa 1940-luvun alussa. Ketjun nykyisenlaisen maailmanlaajuisen franchising-mallin kehityksessä keskeinen henkilö oli Ray Kroc.",
      finland: "Suomen ensimmäinen McDonald's avattiin Tampereen Keskustorille joulukuussa 1984. Helsingin ensimmäinen McDonald's avattiin Forumiin vuonna 1985.",
      priceNote: "McDonald's Suomi on poistanut hinnaston verkkosivuiltaan. Ketjun mukaan hinnat vaihtelevat ravintoloittain, ja ravintolakohtaiset hinnat näkyvät McDonald's-sovelluksessa mobiilitilausta tehdessä.",
      website: "https://www.mcdonalds.com/fi/fi-fi.html",
      finder: "https://www.mcdonalds.com/fi/fi-fi/palvelut/ravintolahaku.html",
      menu: "https://www.mcdonalds.com/fi/fi-fi.html",
      prices: [
        { product: "Hampurilainen", type: "Hampurilainen", price: null, source: "McDonald's Suomi", sourceUrl: "https://www.mcdonalds.com/fi/fi-fi/palvelut/hinnasto.html", lastUpdated: null, checkedAt: "2026-09-29" },
        { product: "Cheeseburger", type: "Hampurilainen", price: null, source: "McDonald's Suomi", sourceUrl: "https://www.mcdonalds.com/fi/fi-fi/palvelut/hinnasto.html", lastUpdated: null, checkedAt: "2026-09-29" },
        { product: "Big Mac", type: "Hampurilainen", price: null, source: "McDonald's Suomi", sourceUrl: "https://www.mcdonalds.com/fi/fi-fi/palvelut/hinnasto.html", lastUpdated: null, checkedAt: "2026-09-29" },
        { product: "Big Mac -ateria", type: "Ateria", price: null, source: "McDonald's Suomi", sourceUrl: "https://www.mcdonalds.com/fi/fi-fi/palvelut/hinnasto.html", lastUpdated: null, checkedAt: "2026-09-29" }
      ],
      sources: ["mcd-historia", "mcd-hinnasto", "como-mcd40"]
    },
    {
      id: "burgerking",
      name: "Burger King",
      mono: "BK",
      tone: "#C2410C",
      country: "us",
      countryName: "Yhdysvallat",
      flag: "🇺🇸",
      originCity: "Miami, Florida",
      founded: 1954,
      categories: ["burger", "chicken", "veg", "late"],
      categoryLabel: "Hampurilaiset • Kana • Kasvis",
      priceLevel: "€–€€",
      description: "Burger King on yhdysvaltalainen hampurilaisketju, joka tunnetaan erityisesti liekillä grillatuista hampurilaisista ja WHOPPER®-hampurilaisesta.",
      finland: "Burger King toimi Suomessa ensimmäisen kerran 1980-luvun alussa: Helsingin Kaisaniemen ravintola avattiin vuonna 1982, ja ketju lopetti Suomessa vuonna 1985. Uusi tuleminen tapahtui joulukuussa 2013 Helsingin Mannerheimintiellä. Tuo Mannerheimintie 12:n ravintola on Burger Kingin sivujen mukaan suljettu pysyvästi 26.4.2026.",
      priceNote: "Burger King Suomen hinnasto on alkaen-hintoja ja voimassa klo 06–24. Yöllä voimassa on erillinen yöhinnasto. Valikoimassa voi olla ravintolakohtaista vaihtelua.",
      website: "https://burgerking.fi/",
      finder: "https://burgerking.fi/etsi-ravintola/",
      menu: "https://burgerking.fi/hinnasto/",
      prices: [
        { product: "Hampurilainen", type: "Hampurilainen", price: 1.50, from: true, source: "Burger King Suomi – hinnasto", sourceUrl: "https://burgerking.fi/hinnasto/", lastUpdated: "2026-08", checkedAt: "2026-09-29", level: "€" },
        { product: "Juustohampurilainen", type: "Hampurilainen", price: 2.00, from: true, source: "Burger King Suomi – hinnasto", sourceUrl: "https://burgerking.fi/hinnasto/", lastUpdated: "2026-08", checkedAt: "2026-09-29", level: "€" },
        { product: "WHOPPER®", type: "Hampurilainen", price: 7.45, from: true, source: "Burger King Suomi – hinnasto", sourceUrl: "https://burgerking.fi/hinnasto/", lastUpdated: "2026-08", checkedAt: "2026-09-29", level: "€€" },
        { product: "WHOPPER®-ateria", type: "Ateria", price: 10.95, from: true, source: "Burger King Suomi – hinnasto", sourceUrl: "https://burgerking.fi/hinnasto/", lastUpdated: "2026-08", checkedAt: "2026-09-29", level: "€€" },
        { product: "Plant-based WHOPPER®", type: "Kasvishampurilainen", price: 6.95, from: true, source: "Burger King Suomi – hinnasto", sourceUrl: "https://burgerking.fi/hinnasto/", lastUpdated: "2026-08", checkedAt: "2026-09-29", level: "€€" },
        { product: "LONG CHICKEN®", type: "Kanahampurilainen", price: 6.45, from: true, source: "Burger King Suomi – hinnasto", sourceUrl: "https://burgerking.fi/hinnasto/", lastUpdated: "2026-08", checkedAt: "2026-09-29", level: "€€" },
        { product: "Chicken Nuggets 9 kpl", type: "Kana", price: 5.95, from: true, source: "Burger King Suomi – hinnasto", sourceUrl: "https://burgerking.fi/hinnasto/", lastUpdated: "2026-08", checkedAt: "2026-09-29", level: "€€" },
        { product: "Ranskalaiset (S)", type: "Lisuke", price: 2.75, from: true, source: "Burger King Suomi – hinnasto", sourceUrl: "https://burgerking.fi/hinnasto/", lastUpdated: "2026-08", checkedAt: "2026-09-29", level: "€" }
      ],
      sources: ["bk-hinnasto", "bk-yritys", "wiki-bk-suomi", "bk-mannerheimintie"]
    },
    {
      id: "hesburger",
      name: "Hesburger",
      mono: "H",
      tone: "#9A3412",
      country: "fi",
      countryName: "Suomi",
      flag: "🇫🇮",
      originCity: "Naantali / Turku",
      founded: 1980,
      foundedNote: "Kievarin grilli perustettiin Naantaliin vuonna 1966. Ensimmäinen Hesburger avattiin Turun keskustaan vuonna 1980.",
      categories: ["burger", "chicken", "veg", "late"],
      categoryLabel: "Hampurilaiset • Kana • Kasvis • Salaatit",
      priceLevel: null,
      finnish: true,
      description: "Hesburger on suomalainen pikaruokaketju. Ketjun historia juontaa juurensa Naantaliin, jossa Heikki ja Kirsti Salmela perustivat Kievarin grillin vuonna 1966. Ensimmäinen Hesburger avattiin Turun keskustaan vuonna 1980, nykyisen kauppakeskus Hansakorttelin paikalle.",
      finland: "Suomalainen perheyritys, joka toimii Suomen lisäksi useissa Euroopan maissa.",
      priceNote: "Hesburger ei julkaise yhtenäistä hinnastoa verkkosivuillaan. Tarkista hinnat Hesburger-sovelluksesta tai ravintolasta.",
      website: "https://www.hesburger.fi/",
      finder: "https://www.hesburger.fi/ravintolat",
      menu: "https://www.hesburger.fi/tuotteet",
      prices: [
        { product: "Hampurilainen", type: "Hampurilainen", price: null, source: "Hesburger", sourceUrl: "https://www.hesburger.fi/tuotteet", lastUpdated: null, checkedAt: "2026-09-29" },
        { product: "Juustohampurilainen", type: "Hampurilainen", price: null, source: "Hesburger", sourceUrl: "https://www.hesburger.fi/tuotteet", lastUpdated: null, checkedAt: "2026-09-29" },
        { product: "Kerroshampurilainen-ateria", type: "Ateria", price: null, source: "Hesburger", sourceUrl: "https://www.hesburger.fi/tuotteet", lastUpdated: null, checkedAt: "2026-09-29" }
      ],
      sources: ["hese-historia", "hese-hakaniemi", "hese-kasarmitori"]
    },
    {
      id: "subway",
      name: "Subway",
      mono: "S",
      tone: "#15803D",
      country: "us",
      countryName: "Yhdysvallat",
      flag: "🇺🇸",
      originCity: "Bridgeport, Connecticut",
      founded: 1965,
      categories: ["sub", "veg"],
      categoryLabel: "Subit • Sandwichit • Salaatit",
      priceLevel: null,
      description: "Subway sai alkunsa vuonna 1965 Bridgeportissa Connecticutissa. Fred DeLuca ja Peter Buck avasivat ensimmäisen ravintolan, joka tunnettiin aluksi nimellä Pete's Super Submarines. Ensimmäisen päivän aikana myytiin 312 sandwichia.",
      finland: "Suomen ensimmäinen Subway avattiin Helsingin Annankadulle 7.7.2000.",
      priceNote: "Subwayn hinnat vaihtelevat ravintoloittain. Tarkista ajantasainen hinta Subwayn tilauspalvelusta tai ravintolasta.",
      website: "https://www.subway.com/fi-fi",
      finder: "https://www.subway.com/fi-fi",
      menu: "https://www.subway.com/fi-fi",
      prices: [
        { product: "Subi 15 cm", type: "Sandwich", price: null, source: "Subway Suomi", sourceUrl: "https://www.subway.com/fi-fi", lastUpdated: null, checkedAt: "2026-09-29" },
        { product: "Subi 30 cm", type: "Sandwich", price: null, source: "Subway Suomi", sourceUrl: "https://www.subway.com/fi-fi", lastUpdated: null, checkedAt: "2026-09-29" }
      ],
      sources: ["subway-historia", "subway-fi-historia"]
    },
    {
      id: "pizzahut",
      name: "Pizza Hut",
      mono: "PH",
      tone: "#B91C1C",
      country: "us",
      countryName: "Yhdysvallat",
      flag: "🇺🇸",
      originCity: "Wichita, Kansas",
      founded: 1958,
      categories: ["pizza", "veg"],
      categoryLabel: "Pizza • Pikaruoka",
      priceLevel: "€€",
      description: "Pizza Hut perustettiin vuonna 1958 Wichitaan Kansasissa. Veljekset Frank ja Dan Carney perustivat ensimmäisen ravintolan äidiltään lainatulla 600 dollarilla.",
      finland: "Pizza Hut on toiminut Suomessa yhtäjaksoisesti vuodesta 1987. Ensimmäinen ravintola, Pizza Hut Citykäytävä, avattiin Helsingissä 15.5.1987 ja toimii edelleen samalla paikalla.",
      priceNote: "Pizza Hutin lounastarjous on voimassa arkisin klo 15 asti. Pan Pizza Buffet on tarjolla vain osassa ravintoloita (Helsingissä Citykäytävä ja Helsinki Outlet).",
      website: "https://www.pizzahut.fi/",
      finder: "https://www.pizzahut.fi/ravintolat/",
      menu: "https://order.pizzahut.fi/fi/fi-fi",
      prices: [
        { product: "Lounas (pizza, juoma, kahvi/tee)", type: "Lounas", price: 14.00, source: "Pizza Hut Suomi – lounas", sourceUrl: "https://www.pizzahut.fi/lounas/", lastUpdated: "2026-09", checkedAt: "2026-09-29", level: "€€" },
        { product: "Pan Pizza Buffet -lounas", type: "Lounas", price: 14.00, source: "Pizza Hut Suomi – lounas", sourceUrl: "https://www.pizzahut.fi/lounas/", lastUpdated: "2026-09", checkedAt: "2026-09-29", level: "€€" }
      ],
      sources: ["ph-tarina", "ph-ravintolat", "ph-lounas"]
    },
    {
      id: "friends",
      name: "Friends & Brgrs",
      mono: "F&B",
      tone: "#1F2937",
      country: "fi",
      countryName: "Suomi",
      flag: "🇫🇮",
      originCity: "Pietarsaari",
      founded: 2014,
      categories: ["burger", "chicken", "veg"],
      categoryLabel: "Hampurilaiset • Ranskalaiset • Pirtelöt",
      priceLevel: "€€–€€€",
      finnish: true,
      description: "Friends & Brgrs on suomalainen burgeriketju, jonka kuusi ystävää perusti Pietarsaaressa vuonna 2014. Ketju tunnetaan paikan päällä leivotuista sämpylöistä, tuoreena jauhetuista pihveistä ja kolmesti kypsennetyistä ranskalaisista. Helsinkiin ketju tuli vuonna 2015.",
      finland: "Kotimainen ketju: ensimmäinen ravintola Pietarsaaressa 2014, Helsinki 2015.",
      priceNote: "Hinnat Friends & Brgrsin verkkosivuilta (burgeri / ateria).",
      website: "https://www.friendsandbrgrs.fi/",
      finder: "https://www.friendsandbrgrs.fi/etsi-ravintola/",
      menu: "https://www.friendsandbrgrs.fi/ruokalista/",
      prices: [
        { product: "Cheese & Onion", type: "Hampurilainen", price: 8.90, source: "Friends & Brgrs", sourceUrl: "https://www.friendsandbrgrs.fi/", lastUpdated: "2026-09", checkedAt: "2026-09-29", level: "€€" },
        { product: "Cheese & Onion -ateria", type: "Ateria", price: 14.90, source: "Friends & Brgrs", sourceUrl: "https://www.friendsandbrgrs.fi/", lastUpdated: "2026-09", checkedAt: "2026-09-29", level: "€€€" },
        { product: "Chicken Friends", type: "Kanahampurilainen", price: 9.50, source: "Friends & Brgrs", sourceUrl: "https://www.friendsandbrgrs.fi/", lastUpdated: "2026-09", checkedAt: "2026-09-29", level: "€€" },
        { product: "Veggie Smash", type: "Kasvishampurilainen", price: 9.00, source: "Friends & Brgrs", sourceUrl: "https://www.friendsandbrgrs.fi/", lastUpdated: "2026-09", checkedAt: "2026-09-29", level: "€€" }
      ],
      sources: ["fb-meista", "fb-etusivu", "fb-sttinfo"]
    }
  ],

  /* ------------------------------------------------------------------
     TOIMIPISTEET HELSINGISSÄ (vain tarkistetut osoitteet)
     ------------------------------------------------------------------ */
  areas: [
    { id: "keskusta", name: "Keskusta" },
    { id: "kamppi", name: "Kamppi" },
    { id: "kallio", name: "Kallio" },
    { id: "pasila", name: "Pasila" },
    { id: "toolo", name: "Töölö" },
    { id: "punavuori", name: "Punavuori" },
    { id: "hakaniemi", name: "Hakaniemi" },
    { id: "lauttasaari", name: "Lauttasaari" },
    { id: "ita", name: "Itä-Helsinki" },
    { id: "pohjoinen", name: "Pohjois-Helsinki" }
  ],

  restaurants: [
    {
      id: "mcd-kamppi", chain: "mcdonalds", name: "McDonald's Kamppi",
      address: "Fredrikinkatu 46, 00100 Helsinki", area: "kamppi",
      hours: null, late: false, h24: false,
      source: "McDonald's Suomi – ravintolasivu", sourceUrl: "https://www.mcdonalds.com/fi/fi-fi/location/helsinki/helsinki-kamppi/12.html"
    },
    {
      id: "bk-kamppi", chain: "burgerking", name: "Burger King Kamppi",
      address: "Urho Kekkosen katu 1, 00100 Helsinki", area: "kamppi",
      hours: null, late: false, h24: false,
      source: "Burger King Suomi – toimipistesivu", sourceUrl: "https://burgerking.fi/toimipiste/burger-king-kamppi-helsinki/"
    },
    {
      id: "hese-hakaniemi", chain: "hesburger", name: "Hesburger Hakaniemi",
      address: "Hämeentie 2, 00530 Helsinki", area: "hakaniemi",
      hours: { mo: [["10:00", "24:00"]], tu: [["10:00", "24:00"]], we: [["10:00", "24:00"]], th: [["10:00", "24:00"]], fr: [["10:00", "02:00"]], sa: [["10:00", "02:00"]], su: [["10:00", "24:00"]] },
      hoursText: "ma–to 10–24, pe–la 10–02, su 10–24",
      late: true, h24: false,
      source: "Hesburger – ravintolasivu", sourceUrl: "https://www.hesburger.fi/ravintolat?tid=249"
    },
    {
      id: "hese-kasarmitori", chain: "hesburger", name: "Hesburger Kasarmitori (Drive-in)",
      address: "Kasarmikatu 19, 00130 Helsinki", area: "keskusta",
      hours: { mo: [["10:00", "22:00"]], tu: [["10:00", "22:00"]], we: [["10:00", "22:00"]], th: [["10:00", "05:00"]], fr: [["10:00", "05:00"]], sa: [["10:00", "05:00"]], su: [["10:00", "21:00"]] },
      hoursText: "ma–ke 10–22, to–la 10–05, su 10–21",
      late: true, h24: false,
      source: "Hesburger – ravintolasivu", sourceUrl: "https://www.hesburger.com/restaurants?tid=197"
    },
    {
      id: "hese-tennispalatsi", chain: "hesburger", name: "Hesburger Tennispalatsi",
      address: "Fredrikinkatu 65, 00100 Helsinki", area: "kamppi",
      hours: null, late: false, h24: false,
      source: "Eat.fi", sourceUrl: "https://eat.fi/en/helsinki/hesburger-tennispalatsi",
      note: "Osoite kolmannen osapuolen lähteestä – tarkista toimipiste Hesburgerin ravintolahausta."
    },
    {
      id: "fb-helsinki", chain: "friends", name: "Friends & Brgrs Helsinki (Mikonkatu)",
      address: "Mikonkatu 8, 00100 Helsinki", area: "keskusta",
      hours: null, late: false, h24: false,
      source: "Finder – yritystiedot", sourceUrl: "https://www.finder.fi/Hampurilaisravintola/Friends+&+Brgrs+Helsinki/Helsinki/yhteystiedot/3087251",
      note: "Tarkista ajantasainen toimipistetieto Friends & Brgrsin ravintolahausta."
    },
    {
      id: "ph-citykaytava", chain: "pizzahut", name: "Pizza Hut Citykäytävä",
      address: "Aleksanterinkatu 21, 00100 Helsinki", area: "keskusta",
      hours: null, late: false, h24: false, buffet: true,
      history: "Suomen ensimmäinen Pizza Hut, avattu 15.5.1987.",
      source: "Pizza Hut Suomi – ravintolat", sourceUrl: "https://www.pizzahut.fi/ravintolat/"
    },
    {
      id: "ph-forum", chain: "pizzahut", name: "Pizza Hut Forum",
      address: "Mannerheimintie 18, 0. krs, 00100 Helsinki", area: "keskusta",
      hours: null, late: false, h24: false,
      source: "Pizza Hut Suomi – ravintolat", sourceUrl: "https://www.pizzahut.fi/ravintolat/"
    },
    {
      id: "ph-postipuisto", chain: "pizzahut", name: "Pizza Hut Postipuisto",
      address: "Rullakkokatu 3, 00240 Helsinki", area: "pasila",
      hours: null, late: false, h24: false,
      source: "Pizza Hut Suomi – ravintolat", sourceUrl: "https://www.pizzahut.fi/ravintolat/"
    },
    {
      id: "ph-tripla", chain: "pizzahut", name: "Pizza Hut Tripla",
      address: "Tornikuja 1 B, 00520 Helsinki", area: "pasila",
      hours: null, late: false, h24: false,
      source: "Pizza Hut Suomi – ravintolat", sourceUrl: "https://www.pizzahut.fi/ravintolat/"
    },
    {
      id: "ph-easton", chain: "pizzahut", name: "Pizza Hut Easton",
      address: "Kauppakartanonkatu 3, 00930 Helsinki", area: "ita",
      hours: null, late: false, h24: false,
      source: "Pizza Hut Suomi – ravintolat", sourceUrl: "https://www.pizzahut.fi/ravintolat/"
    },
    {
      id: "ph-outlet", chain: "pizzahut", name: "Pizza Hut Helsinki Outlet",
      address: "Tatti 17, 00760 Helsinki", area: "pohjoinen",
      hours: null, late: false, h24: false, buffet: true,
      source: "Pizza Hut Suomi – ravintolat", sourceUrl: "https://www.pizzahut.fi/ravintolat/"
    }
  ],

  /* ------------------------------------------------------------------
     TIESITKÖ? -FAKTAT (jokaisella lähde)
     ------------------------------------------------------------------ */
  facts: [
    { text: "McDonald'sin tarina alkoi Kaliforniassa, kun Dick ja Mac McDonald avasivat ravintolansa 1940-luvun alussa.", source: "mcd-historia" },
    { text: "Subway aloitti Bridgeportissa Connecticutissa vuonna 1965.", source: "subway-historia" },
    { text: "Pizza Hut syntyi Wichitassa Kansasissa vuonna 1958 – äidiltä lainatulla 600 dollarilla.", source: "ph-tarina" },
    { text: "Hesburger on suomalainen pikaruokaketju, jonka juuret ovat Naantalissa vuonna 1966 perustetussa grillissä.", source: "hese-historia" },
    { text: "Subwayn ensimmäinen nimi oli Pete's Super Submarines, ja avauspäivänä myytiin 312 sandwichia.", source: "subway-historia" },
    { text: "Burger King ehti Suomeen ennen McDonald'sia: Kaisaniemen Burger King avattiin vuonna 1982.", source: "wiki-bk-suomi" },
    { text: "Suomen ensimmäinen Pizza Hut avattiin Helsingin Citykäytävään 15.5.1987 – ja toimii yhä samalla paikalla.", source: "ph-tarina" },
    { text: "Suomen ensimmäinen Subway avattiin Helsingin Annankadulle 7.7.2000.", source: "subway-fi-historia" }
  ],

  /* ------------------------------------------------------------------
     AIKAJANA
     ------------------------------------------------------------------ */
  timeline: [
    { year: "1940", title: "McDonald's, San Bernardino", text: "Dick ja Mac McDonald avaavat ravintolansa Kaliforniassa.", source: "mcd-historia" },
    { year: "1954", title: "Burger King, Miami", text: "James McLamore ja David Edgerton aloittavat Burger Kingin Miamissa.", source: "bk-yritys" },
    { year: "1955", title: "Ray Kroc ja McDonald's", text: "Ray Kroc avaa ensimmäisen oman McDonald's-ravintolansa ja rakentaa ketjusta franchising-verkoston.", source: "mcd-historia" },
    { year: "1958", title: "Pizza Hut, Wichita", text: "Frank ja Dan Carney avaavat ensimmäisen Pizza Hutin.", source: "ph-tarina" },
    { year: "1965", title: "Subway, Bridgeport", text: "Pete's Super Submarines avataan Connecticutissa.", source: "subway-historia" },
    { year: "1966", title: "Hesburgerin historia alkaa Naantalissa", text: "Heikki ja Kirsti Salmela perustavat Kievarin grillin.", source: "hese-historia" },
    { year: "1980", title: "Ensimmäinen Hesburger avataan Turussa", text: "Ravintola avataan Turun keskustaan, nykyisen Hansakorttelin paikalle.", source: "hese-historia" }
  ],

  timelineFinland: [
    { year: "1982", title: "Burger King Kaisaniemeen", text: "Ensimmäinen Burger King Suomessa. Ketju lopettaa Suomessa vuonna 1985.", source: "wiki-bk-suomi" },
    { year: "1984", title: "McDonald's Tampereelle", text: "Suomen ensimmäinen McDonald's avataan Tampereen Keskustorille joulukuussa.", source: "mcd-historia" },
    { year: "1985", title: "McDonald's Helsinkiin", text: "Helsingin ensimmäinen McDonald's avataan Forumiin.", source: "como-mcd40" },
    { year: "1987", title: "Pizza Hut Citykäytävään", text: "Suomen ensimmäinen Pizza Hut avataan Helsingissä 15.5.1987.", source: "ph-tarina" },
    { year: "2000", title: "Subway Annankadulle", text: "Suomen ensimmäinen Subway avataan Helsingissä 7.7.2000.", source: "subway-fi-historia" },
    { year: "2013", title: "Burger Kingin paluu", text: "Burger King palaa Suomeen Helsingin Mannerheimintielle joulukuussa 2013.", source: "wiki-bk-suomi" },
    { year: "2015", title: "Friends & Brgrs Helsinkiin", text: "Pietarsaaressa vuonna 2014 aloittanut ketju avaa ravintolan Helsinkiin.", source: "fb-meista" }
  ],

  /* ------------------------------------------------------------------
     LÄHTEET (tunnisteella viitataan muualla datassa)
     ------------------------------------------------------------------ */
  sources: [
    { id: "mcd-historia", title: "McDonald'sin historia", publisher: "McDonald's Suomi", url: "https://www.mcdonalds.com/fi/fi-fi/mcdonalds/historia.html", checked: "2026-09-29" },
    { id: "mcd-hinnasto", title: "Hinnasto (hinnasto poistettu verkkosivuilta)", publisher: "McDonald's Suomi", url: "https://www.mcdonalds.com/fi/fi-fi/palvelut/hinnasto.html", checked: "2026-09-29" },
    { id: "como-mcd40", title: "Mäkkäri eli McDonald's Suomessa 40 vuotta", publisher: "Como.fi", url: "https://www.como.fi/uutiset/makkari-eli-mcdonalds-suomessa-40-vuotta-tata-et-hampurilaisravintolasta-tiennyt/", checked: "2026-09-29" },
    { id: "bk-hinnasto", title: "Hinnasto", publisher: "Burger King Suomi", url: "https://burgerking.fi/hinnasto/", checked: "2026-09-29" },
    { id: "bk-yritys", title: "Burger King® – yritys", publisher: "Burger King Suomi", url: "https://burgerking.fi/yritys/", checked: "2026-09-29" },
    { id: "bk-mannerheimintie", title: "Burger King Mannerheimintie 12 – suljettu pysyvästi 26.4.2026", publisher: "Burger King Suomi", url: "https://burgerking.fi/toimipiste/burger-king-mannerheimintie-12-helsinki/", checked: "2026-09-29" },
    { id: "wiki-bk-suomi", title: "Burger King Suomessa", publisher: "Wikipedia (suomi)", url: "https://fi.wikipedia.org/wiki/Burger_King_Suomessa", checked: "2026-09-29" },
    { id: "hese-historia", title: "Mistä kaikki alkoi?", publisher: "Hesburger", url: "https://www.hesburger.fi/hesburger-yrityksena/liiketoiminta/mista-kaikki-alkoi-", checked: "2026-09-29" },
    { id: "hese-hakaniemi", title: "Hesburger Helsinki Hakaniemi", publisher: "Hesburger", url: "https://www.hesburger.fi/ravintolat?tid=249", checked: "2026-09-29" },
    { id: "hese-kasarmitori", title: "Hesburger Helsinki Kasarmitori Drive-in", publisher: "Hesburger", url: "https://www.hesburger.com/restaurants?tid=197", checked: "2026-09-29" },
    { id: "subway-historia", title: "Subway® History", publisher: "Subway", url: "https://www.subway.com/en-us/aboutus/history", checked: "2026-09-29" },
    { id: "subway-fi-historia", title: "Subwayn historia", publisher: "Subway Suomi", url: "https://www.subway.com/fi-fi/aboutus/history", checked: "2026-09-29" },
    { id: "ph-tarina", title: "Maailman suurimman pizzatalon tarina", publisher: "Pizza Hut Suomi", url: "https://www.pizzahut.fi/tarina/", checked: "2026-09-29" },
    { id: "ph-ravintolat", title: "Ravintolat", publisher: "Pizza Hut Suomi", url: "https://www.pizzahut.fi/ravintolat/", checked: "2026-09-29" },
    { id: "ph-lounas", title: "Pizza Hut Lounas", publisher: "Pizza Hut Suomi", url: "https://www.pizzahut.fi/lounas/", checked: "2026-09-29" },
    { id: "fb-meista", title: "About us", publisher: "Friends & Brgrs", url: "https://www.friendsandbrgrs.fi/en/about-us/", checked: "2026-09-29" },
    { id: "fb-etusivu", title: "Friends & Brgrs – Parempia burgereita (hinnat)", publisher: "Friends & Brgrs", url: "https://www.friendsandbrgrs.fi/", checked: "2026-09-29" },
    { id: "fb-sttinfo", title: "Lehdistötiedotteet", publisher: "STT Info / Friends & Brgrs Oy Ab", url: "https://www.sttinfo.fi/uutishuone/69820907/friends-brgrs-oy-ab", checked: "2026-09-29" }
  ]
};
