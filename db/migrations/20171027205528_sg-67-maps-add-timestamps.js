exports.up = function (knex, Promise) {
  return knex.schema.table('maps', function (table) {
    table.timestamps(true, true);
  });
};
exports.down = function (knex, Promise) {
  return knex.schema.table('maps', (table) => {
    table.dropTimestamps();
  });
};
