import express, { json } from 'express' // require -> CommonJS
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

// EN EL FUTURO: el import del json sera asi:
// import movies from './movies.json' with { type: 'json'}

// como leer un json en ESmodules
/* import fs from 'node:fs'
const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8')) */

// como leer un json en ESModules recomendado por ahora

const app = express()
app.use(json())
app.use(corsMiddleware())

app.disable('x-powered-by') // deshabilitar el header x-powered-by: Express

// metodos normales: GET/HEAD/POST
// metodos complejos: PUT/PATCH/DELETE

// CORS PRE-FLIGHT
// OPTIONS

app.use('/movies', moviesRouter)

/* app.options('/movies/:id', (req, res) => {
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  }
  res.send(200)-
}) */

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
