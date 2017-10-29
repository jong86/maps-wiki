'use strict';

const express = require('express');
const favouriteRoutes = express.Router();

module.exports = function (db) {
  favouriteRoutes.post('/', function (req, res) {
    if (!req.session.user_id) {
      res.status(401, 'Can\'t like maps without logging in');
    }
    res.send('it works!');
  });
  return favouriteRoutes;
}
