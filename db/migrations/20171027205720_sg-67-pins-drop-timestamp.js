exports.up = function (knex, Promise) {
  return knex.schema.table('pins', function (table) {
    table.dropColumn('created_at');
    table.dropColumn('version');
  });
};
exports.down = function (knex, Promise) {
  return knex.schema.table('pins', (table) => {
    table.timestamp('created_at');
    table.timestamp('version');
  });
};
