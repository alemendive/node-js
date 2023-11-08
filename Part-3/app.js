const express = require('express') // require -> CommonJS
const crypto = require('node:crypto')
const movies = require('./movies.json')

const app = express()
app.use(express.json())
app.disable('x-powered-by') // deshabilitar el header x-powered-by: Express

// Todos los recursos que sean MOVIES se identifica con /movies
app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }
  res.json(movies)
})

app.get('/movies/:id', (req, res) => { // path-to-regexp(se puede usar)
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  const {
    title,
    genre,
    year,
    director,
    duration,
    rate,
    poster
  } = req.body

  const newMovie = {
    id: crypto.randomUUID(), // uuid v4
    title,
    genre,
    director,
    year,
    duration,
    rate: rate ?? 0,
    poster
  }

  // Esto no seria REST,  porque estamos guardando el estado de la aplicacion en memoria.
  movies.push(newMovie)

  res.status(201).json(newMovie)
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${1234}`)
})
