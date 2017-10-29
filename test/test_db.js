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

// db.getMaps(function (maps, err) {
//   if (err) {
//     console.log(err);
//   }
//   console.log('getMaps', maps);
// });

// for (let i = 1; i < 2; i++) {
//   db.getMapById(i, function (map, err) {
//     if (err) {
//       console.log(err);
//     }
//     console.log('getMapById', i, map);
//   });
// }

// for (let i = 1; i < 2; i++) {
//   db.getPinsByMapId(i, function (pins, err) {
//     if (err) {
//       console.log(err);
//     }
//     console.log('getPinsByMapId', i, pins);
//     console.log('Individual pins[0]', pins[0]);
//   });
// }
// db.getPinByPinId(1, function (pin, err) {
//   if (err) {
//     console.log(err);
//   }
//   console.log('getPinByPinId', 0, pin);
//   console.log('Individual pins[0]', pin);
// });

// db.getUsers(function (users, err) {
//   if (err) {
//     console.log(err);
//   }
//   console.log('getUsers', users);
// });

// const pin = {
//   latitude: '49.2827 N',
//   longitude: '123.1207 W',
//   title: 'Official Vancouver Co-ordinates Cafe',
//   description: 'A good cafe with no beans',
//   image: 'http://www.fillmurray.com/200/300',
//   url: 'https://www.youtube.com/watch?v=IzVqkV_hQjc',
//   user_id: 1,
//   type_id: 1,
//   map_id: 1
// };

// db.createPinByMapId(1, pin, function (pinId, err) {
//   if (err) {
//     console.log(err);
//   }
//   console.log('createPinByMapId', pinId);
// });

// console.log('updatePinByPinId change title to', 'updated pin');

// pin.title = 'updated pin';

// db.updatePinByPinId(1, pin, function (err) {
//   if (err) {
//     console.log(err);
//   }
//   console.log('createPinByPinId', err);
// });
// db.getPinByPinId(1, function (pin, err) {
//   if (err) {
//     console.log(err);
//   }
//   console.log('getPinByPinId', 1, pin);
//   console.log('Individual pins[0]', pin);
// });

// db.deletePinByPinId(2, function (err) {
//   if (err) {
//     console.log(err);
//   }
//   console.log('deletePinByPinId', 1);
// });

// db.createMap({ name: "Breweries", user_id: 9 }, function(map_id, err) {
//   console.log(map_id, err);
// })

db.createMapsUsersChanged(15, 1, function(id, err) {
  console.log(id, err);
})