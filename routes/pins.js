'use strict';

const express = require('express');
const pinRoutes = express.Router();

module.exports = function (db) {
  pinRoutes.get('/:id', function (req, res) {
    const pin = {
      id: 0,
      latitude: '49.2819163',
      longitude: '-123.1105114',
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
    //  some dummy data
    const newPin = req.body;
    const pin = {
      latitude: newPin.latitude,
      longitude: newPin.longitude,
      title: newPin.title,
      description: newPin.description,
      image: newPin.image,
      url: newPin.url,
      user_id: req.session.user_id,
      type_id: newPin.type_id,
      map_id: newPin.map_id
    };
    // TODO get jon to pass in mapid, and pin information. Construct pin object. 
    db.createPinByMapId(0, pin, function (pinId, err) {
      if (err) {
        console.log(err);
      }
      console.log('pinId: ', pinId);
      res.json(pinId);
    });
  });

  pinRoutes.put('/:id', function (req, res) {
    const pinId = req.params.id;
    //  update pin if user is authorized
    //  dummmyy data
    const pin = {
      id: 0,
      latitude: '49.2827',
      longitude: '-123.1207',
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
