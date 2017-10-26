exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('maps')
    .del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('maps').insert({
          id: 1,
          name: 'Gastown',
          created_at: '2017-10-24',
          user_id: 1
        })
      ]);
    });
};
