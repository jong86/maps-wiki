
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('types').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('types').insert({
          icon: 'food.png',
          type: 'food'
        }),
        knex('types').insert({
          icon: 'cafe.png',
          type: 'Coffee Shop'
        }),
        knex('types').insert({
          icon: 'bar.png',
          type: 'Bar'
        })
      ]);
    });
};
