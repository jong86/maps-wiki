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
      type: 'bar.png',
      map_id: 0
    };
    res.json(pin);
  });

  pinRoutes.post('/', function (req, res) {
    if (!req.session.user_id) {
      res.status(401, 'Can\'t create pin without logging in');
      return;
    }
    const newPin = req.body;
    const pin = {
      latitude: newPin.latitude,
      longitude: newPin.longitude,
      title: newPin.title,
      description: newPin.description,
      image: newPin.image,
      url: newPin.url,
      user_id: req.session.user_id,
      type: newPin.type,
      map_id: newPin.map_id
    };
    // TODO get jon to pass in mapid, and pin information. Construct pin object. 
    db.createPinByMapId(pin.map_id, pin, function (pinId, err) {
      if (err) {
        console.log(err);
      }
      console.log('pinId: ', pinId);
      db.updateMapsUsersChanged(pin.map_id, req.session.user_id, true, function (id, err) {
        res.json(pinId);
      });
    });
  });

  pinRoutes.put('/:id', function (req, res) {
    if (!req.session.user_id) {
      res.send(401, 'Can\'t edit pin without logging in');
      return;
    }
    const pinId = req.params.id
    const updatedPin = req.body;
    const pin = {
      latitude: updatedPin.latitude,
      longitude: updatedPin.longitude,
      title: updatedPin.title,
      description: updatedPin.description,
      image: updatedPin.image,
      url: updatedPin.url,
      user_id: req.session.user_id,
      type: updatedPin.type,
      map_id: updatedPin.map_id
    };

    db.updatePinByPinId(pinId, pin, function (err) {
      if (err) {
        console.log(err);
      }
      db.updateMapsUsersChanged(pin.map_id, req.session.user_id, true, function (id, err) {
        res.json(pin);
      });
    });
  });

  pinRoutes.delete('/:id', function (req, res) {
    if (!req.session.user_id) {
      res.send(401, 'Can\'t delete pin without logging in');
      return;
    }
    const pinId = req.params.id;
    db.deletePinByPinId(pinId, function (err) {
      if (err) {
        console.log(err);
      }
      db.updateMapsUsersChanged(req.body.map_id, req.session.user_id, true, function (id, err) {
        res.send(200, 'deleted');
      });
    });
  });

  return pinRoutes;
};
