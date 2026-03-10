// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

const tempDummyNews = {
  data: [
    {
      id: 1,
      slug: "laatste-kans-nabloei-duizendblad",
      title: "Laatste kans om de nabloei te zien van de duizendblad",
      body: "De bloei van duizendblad is bijna voorbij, maar de plant is nog goed te zien. De bloemen zijn aan het opdrogen en blijven nog even zichtbaar. Dit is een laatste moment om te zien hoe duizendblad eruitziet na de bloei, voordat de bloemen niet meer zichtbaar zijn. Wat wel mooi zichtbaar blijft zijn de mooie bladeren.",
      date: "2025-11-20",
      image: "ccc47447-c2db-441b-a18b-183ab5a0b280"
    },
    {
      id: 2,
      slug: "zadenknoppen-teunisbloem",
      title: "De zadenknoppen van de teunisbloem zijn nu goed te zien",
      body: "De bloei van duizendblad is bijna voorbij, maar de plant is nog goed te zien. De bloemen zijn aan het opdrogen en blijven nog even zichtbaar. Dit is een laatste moment om te zien hoe duizendblad eruitziet na de bloei, voordat de bloemen niet meer zichtbaar zijn. Wat wel mooi zichtbaar blijft zijn de mooie bladeren.",
      date: "2025-11-20",
      image: "ccc47447-c2db-441b-a18b-183ab5a0b280"
    },
    {
      id: 3,
      slug: "teunisbloem-zaden-3",
      title: "De zadenknoppen van de teunisbloem zijn nu goed te zien 3",
      body: "De bloei van duizendblad is bijna voorbij, maar de plant is nog goed te zien. De bloemen zijn aan het opdrogen en blijven nog even zichtbaar. Dit is een laatste moment om te zien hoe duizendblad eruitziet na de bloei, voordat de bloemen niet meer zichtbaar zijn. Wat wel mooi zichtbaar blijft zijn de mooie bladeren.",
      date: "2025-11-20",
      image: "ccc47447-c2db-441b-a18b-183ab5a0b280"
    },
    {
      id: 4,
      slug: "teunisbloem-zaden-4",
      title: "De zadenknoppen van de teunisbloem zijn nu goed te zien 4",
      body: "De bloei van duizendblad is bijna voorbij, maar de plant is nog goed te zien. De bloemen zijn aan het opdrogen en blijven nog even zichtbaar. Dit is een laatste moment om te zien hoe duizendblad eruitziet na de bloei, voordat de bloemen niet meer zichtbaar zijn. Wat wel mooi zichtbaar blijft zijn de mooie bladeren.",
      date: "2025-11-20",
      image: "ccc47447-c2db-441b-a18b-183ab5a0b280"
    }
  ]
}

console.log('Hieronder moet je waarschijnlijk nog wat veranderen')
// Doe een fetch naar de data die je nodig hebt
// const apiResponse = await fetch('...')

// Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen
// const apiResponseJSON = await apiResponse.json()

// Controleer eventueel de data in je console
// (Let op: dit is _niet_ de console van je browser, maar van NodeJS, in je terminal)
// console.log(apiResponseJSON)


// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({extended: true}))

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express()); 

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')

// Maak een GET route voor de index (meestal doe je dit in de root, als /)
app.get('/', async function (request, response) {
   // Render index.liquid uit de Views map
   // Geef hier eventueel data aan mee
   response.render('index.liquid')
})

// !!!! route naar VELDVERKENNER PAGINA !!!!  
app.get('/veldverkenner', async function (request, response) {
  console.log(tempDummyNews)
   // Render index.liquid uit de Views map
   // Geef hier eventueel data aan mee
   response.render('veldverkenner.liquid', {nieuws: tempDummyNews.data})
})

// !!!! route naar NIEUWS PAGINA !!!!  
app.get('/nieuws', async function (request, response) {
  console.log(tempDummyNews)
   // Render index.liquid uit de Views map
   // Geef hier eventueel data aan mee
   response.render('nieuws.liquid', {nieuws: tempDummyNews.data})
})

// !!!! dit zorgt ervoor dat het artikel die je aanklikt op de nieuwspagina het goede artikel verschijnt vanuit database !!!!  
app.get('/nieuws/:slug', async function (request, response) {
  const nieuwSlug = request.params.slug
  const artikel = tempDummyNews.data.find(item => item.slug === nieuwSlug)

  response.render('artikel.liquid', { artikel: artikel })
})

// !!!! route naar COLLECTIE PAGINA !!!!  
app.get('/collectie', async function (request, response) {
  console.log(tempDummyNews)
   // Render index.liquid uit de Views map
   // Geef hier eventueel data aan mee
   response.render('collectie.liquid', {nieuws: tempDummyNews.data})
})

// Maak een POST route voor de index; hiermee kun je bijvoorbeeld formulieren afvangen
// Hier doen we nu nog niets mee, maar je kunt er mee spelen als je wilt
app.post('/', async function (request, response) {
  // Je zou hier data kunnen opslaan, of veranderen, of wat je maar wilt
  // Er is nog geen afhandeling van een POST, dus stuur de bezoeker terug naar /
  response.redirect(303, '/')
})

// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000, als dit ergens gehost wordt, is het waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})

// !!!!  404 error pagina !!!! 
app.use((req, res, next) => {
  res.status(404).render("error.liquid")
})


