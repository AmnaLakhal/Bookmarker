exports.up = function(knex) {
  return knex.schema.createTable('bookmarks', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('url').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('bookmarks');
};
