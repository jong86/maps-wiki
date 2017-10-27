exports.up = function (knex, Promise) {
  return knex.schema.table('maps', function (table) {
    table.dropColumn('created_at');
  });
};
exports.down = function (knex, Promise) {
  return knex.schema.table('maps', (table) => {
    table.timestamp('created_at');
  });
};
