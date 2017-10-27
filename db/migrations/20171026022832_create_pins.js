exports.up = function (knex, Promise) {
  return knex.schema.createTable('pins', function (table) {
    table.increments();
    table.string('latitude');
    table.string('longitude');
    table.string('title');
    table.string('description');
    table.string('image');
    table.string('url');
    table.integer('user_id').unsigned();
    table.timestamp('created_at');
    table.timestamp('version');
    table.integer('type_id').unsigned();
    table.integer('map_id').unsigned();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('pins');
};
