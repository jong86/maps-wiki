
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pins').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('pins').insert({
          id: 1,
          latitude: '49.2830428',
          longitude: '-123.1104677',
          title: 'Woodwards',
          description: 'Iconic landmark in gastown',
          image: 'https://en.wikipedia.org/wiki/File:Woodwards_W-43.jpg',
          url: 'https://youtu.be/OHDRcZ0XQPg',
          user_id: 1,
          created_at: '2017-10-24',
          version: '2017-10-24',
          type_id: 1,
          map_id: 1
        })
      ]);
    });
};
