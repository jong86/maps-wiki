exports.up = function (knex, Promise) {
  return knex.schema.table('pins', function (table) {
    table.dropColumn('type_id');
    table.string('type');
  });
};
exports.down = function (knex, Promise) {
  return knex.schema.table('pins', (table) => {
    table.dropColumn('type');
    table.integer('type_id').unsigned();
  });
};
