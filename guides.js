/* =====================================================================
   FastFoodHelsinki.fi – OPPAAT / TIETOPANKKI
   Lisää uusi artikkeli lisäämällä objekti listaan. Kenttä `chain`
   liittää artikkeliin automaattisesti ketjun hintataulukon ja
   Helsingin toimipisteet data.js-tiedostosta. `show` voi olla
   "prices", "late", "veg" tai "restaurants".
   ===================================================================== */

window.FFH_GUIDES = [
  {
    slug: "fast-food-helsinki-opas",
    title: "Fast food Helsingissä – täydellinen opas",
    lead: "Mitä pikaruokaketjuja Helsingissä on, mistä ne tulevat ja mitä niissä maksaa? Kokosimme perusasiat yhteen oppaaseen.",
    tag: "Opas",
    updated: "2026-09-29",
    show: ["prices", "restaurants"],
    body: [
      ["h2", "Helsingin pikaruokakartta lyhyesti"],
      ["p", "Helsingissä toimivat kaikki suurimmat kansainväliset hampurilaisketjut sekä kaksi suomalaista burgeriketjua. Suurin osa toimipisteistä on keskustan kauppakeskuksissa, Kampin ja Rautatientorin liikenteen solmukohdissa sekä Pasilan ja Itäkeskuksen kaltaisissa alakeskuksissa."],
      ["p", "Tässä oppaassa käsitellyt ketjut ovat McDonald's, Burger King, Hesburger, Subway, Pizza Hut ja Friends & Brgrs. Neljä niistä on lähtöisin Yhdysvalloista ja kaksi Suomesta."],
      ["h2", "Mitä pikaruoka maksaa?"],
      ["p", "Hintojen vertailu on hankalampaa kuin voisi luulla: osa ketjuista julkaisee valtakunnallisen hinnaston verkossa, osa näyttää hinnat vain omassa sovelluksessaan. Burger King, Pizza Hut ja Friends & Brgrs kertovat hintoja verkkosivuillaan, McDonald's Suomi ohjaa hinnat sovellukseen. Alla oleva taulukko päivittyy suoraan sivuston hintatietokannasta."],
      ["h2", "Vinkit fiksumpaan pikaruokailuun"],
      ["ul", [
        "Vertaa hintaa sovelluksen ja kassan välillä – ketjujen sovelluksissa on usein kuponkeja.",
        "Kotiinkuljetuksen hinta voi poiketa ravintolahinnasta, ja päälle tulee toimitusmaksu.",
        "Yöllä voi olla voimassa eri hinnasto (esimerkiksi Burger Kingillä erillinen yöhinnasto).",
        "Tarkista aukioloajat aina ravintolan omalta sivulta ennen lähtöä."
      ]]
    ]
  },
  {
    slug: "mcdonalds-helsinki",
    title: "McDonald's Helsinki – hinnat, ravintolat ja historia",
    lead: "Maailman tunnetuin hampurilaisketju tuli Suomeen vuonna 1984 ja Helsinkiin vuotta myöhemmin. Näin löydät ravintolan ja ajantasaiset hinnat.",
    tag: "Ketjut",
    chain: "mcdonalds",
    updated: "2026-09-29",
    show: ["prices", "restaurants"],
    body: [
      ["h2", "Kaliforniasta Kamppiin"],
      ["p", "McDonald'sin nimi tulee Dick ja Mac McDonaldilta, jotka avasivat ravintolansa Kaliforniassa 1940-luvun alussa. Kultaiset kaaret esiteltiin San Bernardinon ravintolassa vuonna 1948. Ketjun nykyinen franchising-malli on kuitenkin Ray Krocin luomus – hän avasi ensimmäisen oman ravintolansa vuonna 1955."],
      ["p", "Suomen ensimmäinen McDonald's avattiin Tampereen Keskustorille joulukuussa 1984, ja Helsingin ensimmäinen avattiin Forumiin vuonna 1985. Suomessa kehitettiin myös maailman ensimmäinen vegaaninen McDonald's-hampurilainen, McVegan, vuonna 2017."],
      ["h2", "Paljonko Big Mac maksaa Helsingissä?"],
      ["p", "McDonald's Suomi on poistanut hinnaston verkkosivuiltaan. Ketjun oman ilmoituksen mukaan hinnat vaihtelevat ravintoloittain, eivätkä verkossa näytetyt alkaen-hinnat aina vastanneet kassan hintaa. Ravintolakohtaiset hinnat näkyvät McDonald's-sovelluksessa mobiilitilausta tehdessä."],
      ["p", "Siksi emme julkaise McDonald'sille arvioituja euromääriä. Verkossa kiertävät \"McDonald's-hinnastot\" ovat usein kolmansien osapuolten arvioita tai vanhentuneita."]
    ]
  },
  {
    slug: "burger-king-helsinki",
    title: "Burger King Helsinki – hinnat ja ravintolat",
    lead: "WHOPPER® maksaa Burger Kingin hinnaston mukaan alkaen 7,45 €. Katso koko hintakooste ja Helsingin toimipisteet.",
    tag: "Ketjut",
    chain: "burgerking",
    updated: "2026-09-29",
    show: ["prices", "restaurants"],
    body: [
      ["h2", "Burger Kingin kaksi tuloa Suomeen"],
      ["p", "Harva muistaa, että Burger King ehti Suomeen ennen McDonald'sia. Helsingin Kaisaniemen Burger King avattiin vuonna 1982, mutta ketju lopetti Suomessa jo vuonna 1985. Uusi tuleminen tapahtui joulukuussa 2013, kun Restel avasi ravintolan Helsingin Mannerheimintielle."],
      ["p", "Mannerheimintie 12:n ravintola on Burger Kingin omien sivujen mukaan suljettu pysyvästi 26.4.2026. Keskustan lähin toimipiste löytyy Kampin keskuksesta."],
      ["h2", "Hinnat"],
      ["p", "Burger King Suomi julkaisee valtakunnallisen hinnaston, jonka hinnat ovat alkaen-hintoja ja voimassa klo 06–24. Yöaikaan voimassa on erillinen yöhinnasto. Alla oleva taulukko perustuu hinnastoon."]
    ]
  },
  {
    slug: "hesburger-helsinki",
    title: "Hesburger Helsinki – suomalaisen ketjun historia",
    lead: "Naantalin grillistä yhdeksi Suomen tunnetuimmista brändeistä. Tämä on Hesburgerin tarina ja Helsingin toimipisteitä.",
    tag: "Ketjut",
    chain: "hesburger",
    updated: "2026-09-29",
    show: ["prices", "restaurants"],
    body: [
      ["h2", "Kievarin grillistä Hesburgeriksi"],
      ["p", "Hesburgerin historia alkaa vuodesta 1966, jolloin Heikki Salmela perusti vaimonsa Kirstin kanssa Kievarin grillin Naantaliin. 1970-luvulla yrittäjäpariskunta siirtyi Turkuun, jossa erityisesti Puutorin grilli oli paikallisten suosiossa."],
      ["p", "1980-luvulla pikaruokakulttuuri vahvistui Suomessa, ja ensimmäinen Hesburger avattiin vuonna 1980 Turun keskustaan, nykyisen kauppakeskus Hansakorttelin paikalle. Hesburger on edelleen perheyritys."],
      ["h2", "Hesburger Helsingissä"],
      ["p", "Helsingissä Hesburgereita on keskustassa, Kampissa, Hakaniemessä ja monissa kaupunginosissa. Osa ravintoloista on auki pitkälle yöhön, erityisesti viikonloppuisin. Listasimme alle toimipisteet, joiden tiedot olemme tarkistaneet."]
    ]
  },
  {
    slug: "subway-helsinki",
    title: "Subway Helsinki – ravintolat ja hinnat",
    lead: "Suomen ensimmäinen Subway avattiin Helsingin Annankadulle vuonna 2000. Näin toimit, kun haluat tietää subin hinnan.",
    tag: "Ketjut",
    chain: "subway",
    updated: "2026-09-29",
    show: ["prices"],
    body: [
      ["h2", "Pete's Super Submarinesista maailmanlaajuiseksi ketjuksi"],
      ["p", "Subway sai alkunsa vuonna 1965, kun 17-vuotias Fred DeLuca ja perheystävä Peter Buck avasivat Bridgeportissa Connecticutissa ravintolan nimeltä Pete's Super Submarines. Avauspäivänä myytiin 312 sandwichia."],
      ["p", "Suomen ensimmäinen Subway avattiin Helsingin Annankadulle 7.7.2000. Suomessa Subway-ravintolat ovat franchise-yrittäjien omistamia."],
      ["h2", "Mitä subi maksaa?"],
      ["p", "Subway ei julkaise Suomessa yhtenäistä hinnastoa, ja hinnat voivat vaihdella ravintoloittain. Tarkista hinta Subwayn tilauspalvelusta tai ravintolasta. Ravintolahaku löytyy Subwayn Suomen sivuilta."]
    ]
  },
  {
    slug: "pizza-hut-helsinki",
    title: "Pizza Hut Helsinki – ravintolat ja hinnat",
    lead: "Pizza Hutin lounas maksaa 14 € arkisin klo 15 asti. Helsingissä ravintoloita on mm. Citykäytävässä, Forumissa, Triplassa ja Eastonissa.",
    tag: "Ketjut",
    chain: "pizzahut",
    updated: "2026-09-29",
    show: ["prices", "restaurants"],
    body: [
      ["h2", "600 dollarin lainasta maailman suurimmaksi pizzaketjuksi"],
      ["p", "Pizza Hutin tarina alkoi Wichitassa Kansasissa vuonna 1958, kun veljekset Frank ja Dan Carney avasivat ravintolan äidiltään lainatulla 600 dollarilla. Nimi syntyi osittain sattumalta: rakennus muistutti mökkiä, ja kylttiin mahtui vain kahdeksan kirjainta."],
      ["p", "Suomessa Pizza Hut on toiminut yhtäjaksoisesti vuodesta 1987. Ensimmäinen ravintola, Pizza Hut Citykäytävä, avattiin 15.5.1987 ja palvelee yhä samalla paikalla Aleksanterinkadulla."],
      ["h2", "Lounas ja buffet"],
      ["p", "Pizza Hutin lounas (pizza, juoma sekä kahvi tai tee) maksaa 14 € arkisin klo 15 asti. Pan Pizza Buffet on tarjolla vain osassa ravintoloita – Helsingissä Citykäytävässä ja Helsinki Outletissa. Lapset maksavat buffetissa 1 € ikävuotta kohden 12-vuotiaisiin asti."]
    ]
  },
  {
    slug: "halpa-ruoka-helsinki",
    title: "Halpa ruoka Helsingissä – mitä pikaruoka maksaa?",
    lead: "Edullisimmat pikaruoat maksavat Helsingissä muutaman euron. Vertailimme ketjujen julkaisemia hintoja.",
    tag: "Hinnat",
    updated: "2026-09-29",
    show: ["prices"],
    body: [
      ["h2", "Edullisimmat tuotteet"],
      ["p", "Julkaistuista hinnoista edullisimpia ovat perushampurilaiset: Burger Kingin hinnaston mukaan hampurilainen maksaa alkaen 1,50 € ja juustohampurilainen alkaen 2,00 €. Ateriat maksavat selvästi enemmän – esimerkiksi WHOPPER®-ateria alkaen 10,95 €."],
      ["p", "Friends & Brgrsin burgerit maksavat verkkosivujen mukaan noin 9 € ja ateriat noin 15 €. Pizza Hutin lounas on 14 € ja sisältää pizzan lisäksi juoman ja kahvin tai teen."],
      ["h2", "Näin säästät"],
      ["ul", [
        "Katso ketjun sovellus ennen tilaamista – kupongit voivat muuttaa hintaa merkittävästi.",
        "Lounastarjoukset ovat usein edullisempia kuin iltahinnat.",
        "Tilaa noutona kuljetuksen sijaan, jos haluat välttää toimitusmaksut.",
        "Huomioi yöhinnastot: myöhään illalla hinta voi olla eri kuin päivällä."
      ]]
    ]
  },
  {
    slug: "pikaruoka-myohaan-illalla-helsinki",
    title: "Pikaruoka myöhään illalla Helsingissä",
    lead: "Mistä saa ruokaa, kun kello on yli puolenyön? Listasimme toimipisteet, joiden myöhäiset aukioloajat olemme tarkistaneet.",
    tag: "Aukiolo",
    updated: "2026-09-29",
    show: ["late"],
    body: [
      ["h2", "Myöhäinen nälkä keskustassa"],
      ["p", "Helsingin keskustassa pikaruokaa saa myöhään erityisesti viikonloppuisin. Aukioloajat vaihtelevat toimipisteittäin ja muuttuvat esimerkiksi juhlapyhinä, joten tarkista aika aina ravintolan omalta sivulta."],
      ["p", "Alla listatuille ravintoloille olemme tarkistaneet aukioloajat ketjun omalta sivulta. Muiden toimipisteiden aukioloajat löydät ketjujen ravintolahauista."],
      ["h2", "Hinnat yöllä"],
      ["p", "Huomaa, että osalla ketjuista on erillinen yöhinnasto. Esimerkiksi Burger King Suomen normaali hinnasto on voimassa klo 06–24."]
    ]
  },
  {
    slug: "24h-pikaruoka-helsinki",
    title: "24h pikaruokaravintolat Helsingissä",
    lead: "Ympäri vuorokauden auki olevat ravintolat ovat harvinaisia, ja niiden aukioloajat muuttuvat usein. Näin löydät ajantasaisen tiedon.",
    tag: "Aukiolo",
    updated: "2026-09-29",
    show: ["late"],
    body: [
      ["h2", "Ympäri vuorokauden – mutta missä?"],
      ["p", "Emme ole tällä hetkellä pystyneet vahvistamaan ketjujen omista lähteistä yhtään Helsingin kaupungin alueella sijaitsevaa pikaruokaravintolaa, joka olisi auki 24 tuntia vuorokaudessa. Siksi emme listaa niitä."],
      ["p", "Ympärivuorokautiset ravintolat sijaitsevat Suomessa tyypillisesti liikenneasemien ja pääväylien yhteydessä, usein autokaistalla. Tarkista ajantasainen tieto ketjujen ravintolahauista, joissa aukioloajat päivitetään ravintolakohtaisesti."],
      ["h2", "Seuraavaksi paras vaihtoehto"],
      ["p", "Alla näet toimipisteet, joiden olemme vahvistaneet olevan auki myöhään yöhön."]
    ]
  },
  {
    slug: "kasvispikaruoka-helsinki",
    title: "Kasvispikaruoka Helsingissä",
    lead: "Kasvisburgerit kuuluvat nykyään kaikkien suurten ketjujen valikoimaan. Kokosimme kasvisvaihtoehdot, joille löytyy julkaistu hinta.",
    tag: "Kasvis",
    updated: "2026-09-29",
    show: ["veg"],
    body: [
      ["h2", "Kasvis on arkea myös pikaruoassa"],
      ["p", "Kaikilla tässä oppaassa käsitellyillä ketjuilla on kasvisvaihtoehtoja. Suomi on ollut kasvispikaruoan edelläkävijä: McDonald's lanseerasi maailman ensimmäisen vegaanisen McDonald's-hampurilaisen, McVeganin, Suomessa vuonna 2017."],
      ["p", "Burger Kingillä on Plant-based-tuotteita ja halloumihampurilaisia, Friends & Brgrsillä mustapapupihviin perustuva Veggie Smash ja Pizza Hutilla kasvispizzoja. Myös Hesburgerilla on laaja kasvistuotteiden valikoima."],
      ["h2", "Tarkista ruokavaliosi sopivuus"],
      ["p", "Kasvis ei aina tarkoita vegaanista. Tarkista ainesosat ja allergeenit ketjun omilta allergeenisivuilta ja kerro allergioista henkilökunnalle."]
    ]
  }
];
