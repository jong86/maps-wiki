exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          id: 1,
          first: 'Shawn',
          last: 'Griffin',
          email: 'shawn@shawngriffin.com',
          password: 'shawn'
        }),
        knex('users').insert({
          id: 2,
          first: 'Finn',
          last: 'hitlner',
          email: 'finn.hiltner@hotmail.com',
          password: 'finn'
        }),
        knex('users').insert({
          id: 3,
          first: 'Kelvin',
          last: 'Wong',
          email: 'kelvin8wong@gmail.com',
          password: 'kelvin'
        }),
        knex('users').insert({
          id: 4,
          first: 'Jon',
          last: 'Gaspar',
          email: 'jon_gaspar@hotmail.com',
          password: 'jon'
        })
      ]);
    });
};
