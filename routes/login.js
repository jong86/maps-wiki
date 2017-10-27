'use strict';

const express = require('express');
const loginRoutes = express.Router();
// const db = require('../db/utils/db');

module.exports = function () {
  loginRoutes.post('/', function (req, res) {
    req.session.userId = '0';
    res.send('logged in');
  });

  loginRoutes.delete('/', function (req, res) {
    if (req.session) {
      req.session = null;
      res.send(`logged out`);
    }
  });
  return loginRoutes;
};
