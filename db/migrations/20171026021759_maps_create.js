exports.up = function(knex, Promise) {
  return knex.schema.createTable('maps', function (table) {
    table.increments();
    table.string('name');
    table.timestamp('created_at');
    table.integer("user_id").unsigned();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('maps');
};
