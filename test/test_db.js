'use strict';

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || 'development';
const express = require('express');
const bodyParser = require('body-parser');
const sass = require('node-sass-middleware');
const app = express();

const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

const db = require('../db/utils/db.js')(knex);

db.getMaps(function (maps, err) {
  if (err) {
    console.log(err);
  }
  console.log('getMaps', maps);
});

for (let i = 0; i < 2; i++) {
  db.getMapById(i, function (map, err) {
    if (err) {
      console.log(err);
    }
    console.log('getMapById', i, map);
  });
}

for (let i = 0; i < 2; i++) {
  db.getPinsByMapId(i, function (pins, err) {
    if (err) {
      console.log(err);
    }
    console.log('getPinsByMapId', i, pins);
    console.log('Individual pins[0]', pins[0]);
  });
}
db.getPinByPinId(0, function (pin, err) {
  if (err) {
    console.log(err);
  }
  console.log('getPinByPinId', 0, pin);
  console.log('Individual pins[0]', pin);
});

db.getUsers(function (users, err) {
  if (err) {
    console.log(err);
  }
  console.log('getUsers', users);
});

const pin = {
  // id: 0,
  latitude: '49.2827 N',
  longitude: '123.1207 W',
  title: 'Official Vancouver Co-ordinates Cafe',
  description: 'A good cafe with no beans',
  image: 'http://www.fillmurray.com/200/300',
  url: 'https://www.youtube.com/watch?v=IzVqkV_hQjc',
  user_id: 0,
  type_id: 0,
  map_id: 0,
  created_at: '2017-05-02',
  version: '2017-05-02'
};

db.createPinByMapId(0, pin, function (pin_id, err) {
  if (err) {
    console.log(err);
  }
  console.log('createPinByMapId', pin_id);
});
