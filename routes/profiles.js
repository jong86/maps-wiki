'use strict';

const express = require('express');
const profileRoutes = express.Router();

module.exports = function (db) {
  
  

  profileRoutes.get('/:id', function (req, res) {
    const userId = req.params.id;
    db.getProfileByUserId(userId, function (profile, err) {
      if (err) {
        console.log(err);
      }
      res.json(profile);
    });
  });

  // profileRoutes.get('/:id/pins', function (req, res) {
  //   // const mapId = req.params.id;
  //   // db.getPinsByMapId(mapId, function (pins, err) {
  //   //   if (err) {
  //   //     console.log(err);
  //   //   }
  //   //   res.json(pins);
  //   // });
  // });

  // profileRoutes.post('/', function (req, res) {
  //   // if (!req.session.user_id) {
  //   //   res.send(401, 'Can\'t create map without logging in');
  //   //   return;
  //   // }
  //   // const newMap = req.body;
  //   // const map = {
  //   //   name: newMap.name,
  //   //   user_id: req.session.user_id
  //   // };

  //   // db.createMap(map, function (map, err) {
  //   //   if (err) {
  //   //     console.log(err);
  //   //   }
  //   //   res.json(map);
  //   // });
  // });

  // profileRoutes.put('/:id', function (req, res) {
  //   // if (!req.session.user_id) {
  //   //   res.send(401, 'Can\'t edit map without logging in');
  //   //   return;
  //   // }
  //   // const map_id = req.params.id;
  //   // const updatedMap = req.body;
  //   // const map = {
  //   //   name: updatedMap.name,
  //   //   user_id: req.session.user_id
  //   // };

  //   // db.updateMapByMapId(map_id, map, function (err) {
  //   //   if (err) {
  //   //     console.log(err);
  //   //   }
  //   //   res.json(map);
  //   // });
  // });

  // profileRoutes.delete('/:id', function (req, res) {
  //   // if (!req.session.user_id) {
  //   //   res.send(401, 'Can\'t delete map without logging in');
  //   //   return;
  //   // }
  //   // const map_id = req.params.id;
  //   // db.deleteMapByMapId(map_id, function (err) {
  //   //   if (err) {
  //   //     console.log(err);
  //   //   }
  //   // });
  //   // res.send(200, 'deleted');
  // });
  return profileRoutes;
};
