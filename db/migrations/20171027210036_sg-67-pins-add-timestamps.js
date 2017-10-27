exports.up = function (knex, Promise) {
  return knex.schema.table('pins', function (table) {
    table.timestamps(true, true);
  });
};
exports.down = function (knex, Promise) {
  return knex.schema.table('pins', (table) => {
    table.dropTimestamps();
  });
};
