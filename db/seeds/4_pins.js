
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pins').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('pins').insert({
          latitude: '49.2830428',
          longitude: '-123.1104677',
          title: 'Woodwards',
          description: 'Iconic landmark in gastown',
          image: 'https://en.wikipedia.org/wiki/File:Woodwards_W-43.jpg',
          url: 'https://youtu.be/OHDRcZ0XQPg',
          user_id: 1,
           type_id: 0,
          map_id: 0
        }),
        knex('pins').insert({
          latitude: '49.3028',
          longitude: '-123.147',
          title: 'Bobby',
          description: 'Iconic landmark in gastown',
          image: 'https://en.wikipedia.org/wiki/File:Woodwards_W-43.jpg',
          url: 'https://youtu.be/OHDRcZ0XQPg',
          user_id: 1,
           type_id: 1,
          map_id: 1
        }),
        knex('pins').insert({
          latitude: '49.228',
          longitude: '-123.104677',
          title: 'Official Vancouver Co-ordinates Cafe',
          description: 'A good cafe with no beans',
          image: 'https://en.wikipedia.org/wiki/File:Woodwards_W-43.jpg',
          url: 'https://youtu.be/OHDRcZ0XQPg',
          user_id: 1,
          type_id: 2,
          map_id: 1
        })
      ]);
    });
};
