'use strict';

const express = require('express');
const mapRoutes = express.Router();

module.exports = function () {
  mapRoutes.get('/', function (req, res) {
    //  returns list of all maps
    res.send('returns list of all maps');
  });

  mapRoutes.get('/:id', function (req, res) {
    //  returns specific map
    //  dummy data
    const map = {
      id: 0,
      name: 'Best cat cafes in Vancouver',
      created_at: Date.now(),
      user_id: 0
    };
    res.json(map);
  });

  mapRoutes.post('/', function (req, res) {
    //  creates new map
    res.send('creates new map');
  });

  mapRoutes.put('/:id', function (req, res) {
    // edits map if user is authorized
    res.send('edits map if user is authorized');
  });

  mapRoutes.delete('/:id', function (req, res) {
    // deletes map if user is authorized
    res.send('deletes map if user is authorized');
  });
  return mapRoutes;
};
