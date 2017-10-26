'use strict';

const express = require('express');
const pinRoutes = express.Router();

module.exports = function (db) {

  pinRoutes.get('/:id', function (req, res) {
    const pin = {
      id: 0,
      latitude: '49.2827 N',
      longitude: '123.1207 W',
      title: 'Official Vancouver Co-ordinates Cafe',
      description: 'A good cafe with no beans',
      image: 'http://www.fillmurray.com/200/300',
      url: 'https://www.youtube.com/watch?v=IzVqkV_hQjc',
      user_id: 0,
      type_id: 0,
      map_id: 0,
      created_at: Date.now(),
      version: Date.now()
    };
    res.json(pin);
  });

  pinRoutes.post('/', function (req, res) {
    //  creates new pin
    //  dummy data
    const pin = {
      id: 0,
      latitude: '49.2827 N',
      longitude: '123.1207 W',
      title: 'Official Vancouver Co-ordinates Cafe',
      description: 'A good cafe with no beans',
      image: 'http://www.fillmurray.com/200/300',
      url: 'https://www.youtube.com/watch?v=IzVqkV_hQjc',
      user_id: 0,
      type_id: 0,
      map_id: 0,
      created_at: Date.now(),
      version: Date.now()
    };
    res.json(pin);
  });

  pinRoutes.put('/:id', function (req, res) {
    const pinId = req.params.id;
    //  update pin if user is authorized
    //  dummmyy data
    const pin = {
      id: 0,
      latitude: '49.2827 N',
      longitude: '123.1207 W',
      title: 'Official Vancouver Co-ordinates Cafe',
      description: 'A good cafe with no beans',
      image: 'http://www.fillmurray.com/200/300',
      url: 'https://www.youtube.com/watch?v=IzVqkV_hQjc',
      user_id: 0,
      type_id: 0,
      map_id: 0,
      created_at: Date.now(),
      version: Date.now()
    };
    res.json(pin);
  });

  pinRoutes.delete('/:id', function (req, res) {
    const pinId = req.params.id;
    //  delete pin if user is authorized
    res.redirect('./maps/');
  });

  return pinRoutes;
};
