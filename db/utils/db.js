module.exports = {
  getMaps: function (callback) {
    const err = null;
    const maps = [
      {
        id: 0,
        name: 'Best cat cafes in Vancouver',
        created_at: Date.now(),
        user_id: 0
      },
      {
        id: 1,
        name: 'Best dog cafes in Vancouver',
        created_at: Date.now(),
        user_id: 1
      },
      {
        id: 2,
        name: 'Best slug cafes in Vancouver',
        created_at: Date.now(),
        user_id: 1
      }
    ];
    callback(maps, err);
  },

  getPinsByMapId: function (map_id, callback) {
    const err = null;
    const pins = [
      {
        id: 0,
        latitude: '49.2827',
        longitude: '-123.1207',
        title: 'Official Vancouver Co-ordinates Cafe',
        description: 'A good cafe with no beans',
        image: 'http://www.fillmurray.com/200/300',
        url: 'https://www.youtube.com/watch?v=IzVqkV_hQjc',
        user_id: 0,
        map_id: 0,
        created_at: Date.now(),
        version: Date.now(),
        icon: 'food.png',
        type: 'food'

      },

      {
        id: 1,
        latitude: '49.2927',
        longitude: '-123.1207',
        title: 'Official Vancouver Co-ordinates Cafe',
        description: 'A good cafe with no beans',
        image: 'http://www.fillmurray.com/200/300',
        url: 'https://www.youtube.com/watch?v=IzVqkV_hQjc',
        user_id: 0,
        map_id: 0,
        created_at: Date.now(),
        version: Date.now(),
        icon: 'cafe.png',
        type: 'cafe'
      },

      {
        id: 2,
        latitude: '49.3027',
        longitude: '-123.1207',
        title: 'Official Vancouver Co-ordinates Cafe',
        description: 'A good cafe with no beans',
        image: 'http://www.fillmurray.com/200/300',
        url: 'https://www.youtube.com/watch?v=IzVqkV_hQjc',
        user_id: 0,
        map_id: 0,
        created_at: Date.now(),
        version: Date.now(),
        icon: 'bar.png',
        type: 'bar'
      }
    ];

    callback(pins, err);
  },

  getMapById: function (map_id, callback) {
    const err = null;
    const map = {
      id: 0,
      name: 'Best cat cafes in Vancouver',
      created_at: Date.now(),
      user_id: 0
    };
    callback(map, err);
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
  }

};
