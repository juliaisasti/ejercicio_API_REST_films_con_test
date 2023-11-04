const express = require('express');
const app = express();
const port = 3000;
const filmRoute = require('./routes/films')

app.use(express.json());

app.use('/api/film', filmRoute)

module.exports = app;