
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('types').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('types').insert({
          id: 1,
          icon: 'pin',
          type: 'pin'
        })
      ]);
    });
};
