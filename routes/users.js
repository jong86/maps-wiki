'use strict';

const express = require('express');
const router = express.Router();
const db = require('../db/utils/db');

module.exports = (knex) => {
  router.get('/', (req, res) => {
    db.getUsers(function (users, err) {
      if (err) {
        console.log(err);
      }
      console.log(users);
      res.json(users);
    });
  });

  return router;
};
