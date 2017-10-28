module.exports = knex => ({

  /**
  * DATABASE FUNCTION 
  * getPinsByMapId gets a list of pins that are associated with a specific map.
  * @function getPinsByMapId
  * @param {integer} mapId 
  * @param {function} callback 
  * @returns {object} Pins = array of pins 
  * @returns {err} if there is an error, err will be returned. 
  */
  getPinsByMapId: function (mapId, callback) {
    const err = null;

    knex('pins')
      .where('map_id', mapId)
      .then(function (rows) {
        callback(rows, err);
      });
  },
  
  /**
  * DATABASE FUNCTION 
  * getPinByPinId gets an individual pin independent of whatever map it's on
  * @function getPinByPinId
  * @param {integer} pinId - integer indicating the pin to find. 
  * @param {function} callback 
  * @returns {object} rowd[0] -  a single pin 
  * @returns {err} if there is an error, err will be returned. 
  */
  getPinByPinId: function (pinId, callback) {
    const err = null;

    knex('pins')
      .where('id', pinId)
      .then(function (rows) {
        callback(rows[0], err);
      });
  },

  /**
  * DATABASE FUNCTION 
  * createPinByMapId returns pinId.
  * @function createPinByMapId
  * @param {integer} mapId - Identifies the map you want the pin to be added to
  * @param {object} pin - pin object, id is ignored. 
  * @param {function} callback 
  * @returns {integer} id -is the id of the pin that was created.
  * @returns {err} if there is an error, err will be returned. 
  */
  createPinByMapId: function (mapId, pin, callback) {
    const err = null;
    // TODO currently hardcoded until finn gets data from jon. 
    knex('pins')
      .insert({
        latitude: pin.latitude,
        longitude: pin.longitude,
        title: pin.title,
        description: pin.description,
        image: pin.image,
        url: pin.url,
        user_id: pin.user_id,
        type: pin.type,
        map_id: mapId
      })
      .returning('id')
      .then(function (id) {
        callback(id, err);
      });
  },

  /**
  * DATABASE FUNCTION 
  * updatePinByPinId updates the entire contents of a pin, searching on pinId
  * @function updatePinByPinId
  * @param {integer} pinId - integer indicating the pin to find. 
  * @param {function} callback 
  * @returns {err} if there is an error, err will be returned. 
  */
  updatePinByPinId: function (pinId, pin, callback) {
    console.log('updatePinByPinId', pinId, pin);
    const err = null;
    knex('pins')
      .where('id', pinId)
      .update({
        latitude: pin.latitude,
        longitude: pin.longitude,
        title: pin.title,
        description: pin.description,
        image: pin.image,
        url: pin.url,
        user_id: pin.user_id,
        type: pin.type,
        map_id: pin.mapId
      })
      .then(function () {
        callback(err);
      });
  },
  /**
  * DATABASE FUNCTION 
  * deletePinByPinId deletes an individual pin
  * @function deletePinByPinId
  * @param {integer} pinId - integer indicating the pin to delete. 
  * @param {function} callback 
  * @returns {err} if there is an error, err will be returned. 
  */
  deletePinByPinId: function (pinId, callback) {
    const err = null;
    knex('pins')
      .where('id', pinId)
      .del()
      .then(function (rows) {
        callback(rows[0], err);
      });
  },

  /**
  * Get Maps Gets a list of all the maps in the system.
  * @function getMaps
  * @param {function} callback 
  * @returns {object} maps = arry of maps
  * @returns {err} if there is an error, err will be returned. 
  */
  getMaps: function (callback) {
    const err = null;
    knex('maps').then(function (rows) {
      callback(rows, err);
    });
  },

  /**
  * Get Maps Gets a list of all the maps in the system.
  * @function getMapsByUserId
  * @param {function} callback 
  * @returns {object} maps = arry of maps
  * @returns {err} if there is an error, err will be returned. 
  */
  getMapsByUserId: function (userId, callback) {
    const err = null;
    knex('maps').then(function (rows) {
      callback(rows, err);
    });
  },

  /**
  * DATABASE FUNCTION 
  * getMapById returns a map for a given mapId
  * @function getMapById
  * @param {integer} mapId - integer indicating the map to find. 
  * @param {function} callback
  * @returns {err} if there is an error, err will be returned. 
  */getMapById: function (mapId, callback) {
    const err = null;
    //
    knex('maps')
      .where('id', mapId)
      .then(function (rows) {
        callback(rows[0], err);
      });
  },
  /**
  * DATABASE FUNCTION 
  * createMap creates an idividial map.
  * @function createMap
  * @param {object} map - map object; includes name and user_id
  * @param {function} callback 
  * @returns {integer} id -is the id of the map that was created. 
  * @returns {err} if there is an error, err will be returned. 
  */
  createMap: function (map, callback) {
    const err = null;
    knex('maps')
      .insert({
        name: map.name,
        user_id: map.user_id
      })
      .returning('id')
      .then(function (id) {
        callback(id, err);
      });
  },
  /**
  * DATABASE FUNCTION 
  * updateMapbyMapId updates an idividial map from the database.
  * @function updateMapbyMapId
  * @param {integer} mapId - map id
  * @param {object} map - map object; includes name and user_id
  * @param {function} callback 
  * @returns {err} if there is an error, err will be returned. 
  */
  updateMapByMapId: function (mapId, map, callback) {
    const err = null;
    knex('maps')
      .where('id', mapId)
      .update({
        name: map.name,
        user_id: map.user_id
      })
      .then(function () {
        callback(err);
      });
  },

  /**
  * DATABASE FUNCTION 
  * deleteMapByMapId deletes an individual map from the database.
  * @function deleteMapByMapId
  * @param {integer} mapId - integer indicating the map to delete. 
  * @param {function} callback 
  * @returns {err} if there is an error, err will be returned. 
  */
  deleteMapByMapId: function (mapId, callback) {
    const err = null;
    knex('maps')
      .where('id', mapId)
      .del()
      .then(function (rows) {
        callback(err);
      });
  },

  /**
  * Get Users returns an array of all the users in system. 
  * @function getUsers
  * @param {function} callback 
  * @returns {object} Users = array of Users
  * @returns {err} if there is an error, err will be returned. 
  */
  getUsers: function (callback) {
    const err = null;
    knex('users').then(function (users) {
      callback(users, err);
    });
  },

  /**
  * getProfileByUserId a list for each map of whether the user liked or changed that map. 
  * @function getProfileByUserId
  * @param {function} callback 
  * @returns {object} the profile for a user which looks like.  {
        "id": 1,
        "user_id": 1,
        "map_id": 1,
        "favourite": true,
        "changed": true
    }
  * @returns {err} if there is an error, err will be returned. 
  */
  getProfileByUserId: function (userId, callback) {
    const err = null;
    knex('maps_users')
    .select("map_id", "favourite", "changed")
    .where('user_id', userId)
    .then(function (rows) {
      callback(rows, err);
    });
  }
});
