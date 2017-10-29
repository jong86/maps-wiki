'use strict';

const express = require('express');
const favouriteRoutes = express.Router();

module.exports = function (db) {
  favouriteRoutes.post('/:id', function (req, res) {
    if (!req.session.user_id) {
      res.status(401, 'Can\'t like maps without logging in');
      return;
    }
    const mapId = req.params.id;
    const map = {
      user_id: req.session.user_id,
      map_id: mapId
    };
    db.favouriteMapByMapId(map, function (favourite, err) {
      if (err) {
        console.log(err);
      }
      res.json(favourite);
    });
  });
  return favouriteRoutes;
};
