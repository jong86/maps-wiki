
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('maps_users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('maps_users').insert({
          id: 1,
          user_id: 1,
          map_id: 1,
          favourite : true,
          changed: true
        })
      ]);
    });
};
