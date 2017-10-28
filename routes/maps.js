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
    if (!req.session.user_id) {
      res.send(401, 'Can\'t create map without logging in');
      return;
    }
    const newMap = req.body;
    const map = {
      name: newMap.name,
      user_id: req.session.user_id
    };

    db.createMap(map, function (map, err) {
      if (err) {
        console.log(err);
      }
      res.json(map);
    });
  });

  mapRoutes.put('/:id', function (req, res) {
    if (!req.session.user_id) {
      res.send(401, 'Can\'t edit map without logging in');
      return;
    }
    const map_id = req.params.id;
    const updatedMap = req.body;
    const map = {
      name: updatedMap.name,
      user_id: req.session.user_id
    };

    db.updateMapByMapId(map_id, map, function (err) {
      if (err) {
        console.log(err);
      }
      res.json(map);
    });
  });

  mapRoutes.delete('/:id', function (req, res) {
    if (!req.session.user_id) {
      res.send(401, 'Can\'t delete map without logging in');
      return;
    }
    const map_id = req.params.id;
    db.deleteMapByMapId(map_id, function (err) {
      if (err) {
        console.log(err);
      }
    });
    res.send(200, 'deleted');
  });
  return mapRoutes;
};
