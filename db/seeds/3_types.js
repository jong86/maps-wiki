
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('types').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('types').insert({
          id: 0,
          icon: 'food.png',
          type: 'food'
        }),
        knex('types').insert({
          id: 1,
          icon: 'cafe.png',
          type: 'Coffee Shop'
        }),
        knex('types').insert({
          id: 2,
          icon: 'bar.png',
          type: 'Bar'
        })
      ]);
    });
};
