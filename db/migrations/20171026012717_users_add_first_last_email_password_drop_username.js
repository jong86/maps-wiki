exports.up = function (knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.dropColumn('name');
    table.string('first');
    table.string('last');
    table.string('email');
    table.string('password');
  });
};
exports.down = function (knex, Promise ) {
  return knex.schema.table('users', (table) => {
    table.dropColumns('first', 'last', 'email', 'password');
    table.string('name');
  });
};
