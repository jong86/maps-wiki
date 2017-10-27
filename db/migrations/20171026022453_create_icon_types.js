exports.up = function(knex, Promise) {
  return knex.schema.createTable('types', function (table) {
    table.increments();
    table.string('icon');
    table.string('type');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('types');
};
