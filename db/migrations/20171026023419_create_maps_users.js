exports.up = function (knex, Promise) {
  return knex.schema.createTable('maps_users', function (table) {
    table.increments();
    table.integer('user_id').unsigned();
    table.integer('map_id').unsigned();
    table.boolean('favourite');
    table.boolean('changed');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('maps_users');
};
