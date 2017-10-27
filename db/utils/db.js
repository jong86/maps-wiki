module.exports = knex => ({
  /**
  * Get Maps Gets a list of all the maps in the system regardless.
  * @function getMaps
  * @param {function} callback 
  * @returns {object} maps = arry of maps
  */
  getMaps: function (callback) {
    const err = null;
    knex('maps').then(function (rows) {
      callback(rows, err);
    });
  },
  /**
  * DATABASE FUNCTION 
  * getPinsByMapId gets a list of pins that are associated with a specific map.
  * @function getPinsByMapId
  * @param {integer} map_id 
  * @param {function} callback 
  * @returns {object} Pins = array of pins 
  */
  getPinsByMapId: function (map_id, callback) {
    const err = null;

    knex('pins')
      .where('map_id', map_id)
      .then(function (rows) {
        callback(rows, err);
      });
  },
  /**
  * DATABASE FUNCTION 
  * getPinByPinId gets an individual pin independent of whatever map it's on
  * @function getPinByPinId
  * @param {integer} pin_id - integer indicating the pin to find. 
  * @param {function} callback 
  * @returns {object} rowd[0] -  a single pin 
  */
  getPinByPinId: function (pinId, callback) {
    const err = null;

    knex('pins')
      .where('id', pinId)
      .then(function (rows) {
        callback(rows[0], err);
      });
  },

  getMapById: function (map_id, callback) {
    const err = null;
    //
    knex('maps')
      .where('id', map_id)
      .then(function (rows) {
        callback(rows[0], err);
      });
  },

  createMap: function (map, callback) {
    const err = null;
    const mapId = 1;
    callback(mapId, err);
  },

  updateMapById: function (map_id, map, callback) {
    const err = null;
    callback(err);
  },

  deleteMapById: function (map_id, callback) {
    const err = null;
    callback(err);
  },

  /**
  * Get Users returns an array of all the users in system. 
  * @function getUsers
  * @param {function} callback 
  * @returns {object} Users = array of Users
  */
  getUsers: function (callback) {
    const err = null;
    knex('users').then(function (users) {
      callback(users, err);
    });
  },
  /**
  * DATABASE FUNCTION 
  * createPinByMapId returns an array of all the users in system.
  * @function createPinByMapId
  * @param {integer} map_id - Identifies the map you want the pin to be added to
  * @param {object} pin - pin object, id is ignored. 
  * @param {function} callback 
  * @returns {integer} id -is the id of the pin that was created. 
  */
  createPinByMapId: function (map_id, pin, callback) {
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
        type_id: pin.type_id,
        map_id: map_id
      })
      .returning('id')
      .then(function (id) {
        callback(id, err);
      });
  }
});
