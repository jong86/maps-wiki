exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          first: 'Shawn',
          last: 'Griffin',
          email: 'shawn@shawngriffin.com',
          password: 'shawn'
        }),
        knex('users').insert({
          first: 'Finn',
          last: 'hitlner',
          email: 'finn.hiltner@hotmail.com',
          password: 'finn'
        }),
        knex('users').insert({
          first: 'Kelvin',
          last: 'Wong',
          email: 'kelvin8wong@gmail.com',
          password: 'kelvin'
        }),
        knex('users').insert({
          first: 'Jon',
          last: 'Gaspar',
          email: 'jon_gaspar@hotmail.com',
          password: 'jon'
        })
      ]);
    });
};
