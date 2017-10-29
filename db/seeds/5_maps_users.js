
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('maps_users').del()
 };
