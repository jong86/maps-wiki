'use strict';

const express = require('express');
const mapRoutes = express.Router();

module.exports = function (db) {
  mapRoutes.get('/', function (req, res) {
    db.getMaps(function (maps, err) {
      if (err) {
        console.log(err);
      }
      console.log(maps);
      res.json(maps);
    });
  });

  mapRoutes.get('/:id', function (req, res) {
    const mapId = req.params.id;
    db.getMapById(mapId, function (map, err) {
      if (err) {
        console.log(err);
      }
      res.json(map);
    });
  });

  mapRoutes.get('/:id/pins', function (req, res) {
    const mapId = req.params.id;
    db.getPinsByMapId(mapId, function (pins, err) {
      if (err) {
        console.log(err);
      }
      res.json(pins);
    });
  });

  mapRoutes.post('/', function (req, res) {
    const map = {
      id: 1,
      name: 'Best cat cafes in Vancouver',
      created_at: Date.now(),
      user_id: 0
    };

    db.createMap(map, function (mapId, err) {
      if (err) {
        console.log(err);
      }
      res.json(mapId);
    });
  });

  mapRoutes.put('/:id', function (req, res) {
    const map = {
      id: 0,
      name: 'Best cat cafes in Vancouver',
      created_at: Date.now(),
      user_id: 0
    };

    db.updateMapById(map.id, map, function (err) {
      if (err) {
        console.log(err);
      }
      res.send('edits map if user is authorized');
    });
  });

  mapRoutes.delete('/:id', function (req, res) {
    const mapId = req.params.id;
    db.deleteMapById(mapId, function (err) {
      if (err) {
        console.log(err);
      }
      res.send('deletes map if user is authorized');
    });
  });
  return mapRoutes;
};
