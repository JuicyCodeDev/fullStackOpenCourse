const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(morgan('tiny'))
app.use(express.static('build'))
app.use(express.json())

let phone_book = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const date = new Date

app.get('/info', (request, response) => {
  response.send(`
    <div>Phonebook has info for ${phone_book.length} people</div>
    <div>${date}</div>
  `)
})

app.get('/api/persons', (request, response) => {
  response.json(phone_book);
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const contact = phone_book.find(contact => contact.id === id)
  if(contact) {
    response.json(contact)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  phone_book = phone_book.filter(contact => contact.id !== id)

  response.status(204).end()
})

const generateId = () => {
  return Math.floor(Math.random() * 500)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  for(let person of phone_book) {
    if (person.name === body.name) {
      return response.status(400).json({ 
        error: 'name already exsists' 
      })
    }
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  phone_book = phone_book.concat(person)

  response.json(phone_book)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})