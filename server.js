'use strict';

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || 'development';
const express = require('express');
const bodyParser = require('body-parser');
const sass = require('node-sass-middleware');
const app = express();

const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

const cookieSession = require('cookie-session');

// Seperated Routes for each Resource
const usersRoutes = require('./routes/users');
const mapRoutes = require('./routes/maps');
const pinRoutes = require('./routes/pins');
const loginRoutes = require('./routes/login');
const profileRoutes = require('./routes/profiles');
// const db = require('./db/util/db');
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.use(cookieSession({
  name: 'session',
  keys: ['put this in .env', 'key'],
  maxAge: 24 * 60 * 60 * 1000
}));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  '/styles',
  sass({
    src: './styles',
    dest: './public/styles',
    debug: true,
    outputStyle: 'expanded'
  })
);
app.use(express.static('public'));

// Mount all resource routes
const db = require('./db/utils/db.js')(knex);
app.use('/users', usersRoutes(db));
app.use('/maps', mapRoutes(db));
app.use('/pins', pinRoutes(db));
app.use('/profiles', profileRoutes(db));
app.use('/login', loginRoutes());

// Home page
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});
