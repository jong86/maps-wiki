'use strict';

const express = require('express');
const router = express.Router();


module.exports = (db) => {
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
