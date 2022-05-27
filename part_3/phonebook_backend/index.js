/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const Person = require('./models/mongo');

const app = express();

app.use(morgan('tiny'));
app.use(express.static('build'));
app.use(express.json());

const date = new Date();

app.get('/info', (request, response, next) => {
  Person.find({})
    .then((people) => {
      response.send(`
        <div>Phonebook has info for ${people.length} people</div>
        <div>${date}</div>
      `);
    })
    .catch((error) => next(error));
});

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((people) => {
      response.json(people);
    })
    .catch((error) => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((contact) => {
      if (contact) {
        response.json(contact);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const { body } = request;

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing',
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'number missing',
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save()
    .then((newPerson) => {
      response.json(newPerson);
    })
    .catch((error) => next(error));
});

app.put('/api/person/:id', (request, response, next) => {
  const { body } = request;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedContact) => {
      response.json(updatedContact);
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'CastError') {
    return response.status(404).send({ error: 'unknown endpoint' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
