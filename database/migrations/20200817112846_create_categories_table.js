exports.up = async (knex) => {
  await knex.schema.createTable('categories', (table) => {
    table.increments('id').primary();
    table.string('category_name', 50).collate('utf8_general_ci').notNullable();
    table.string('category_icon', 50).notNullable();
    table.string('category_slug', 50).notNullable();

    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.unique('category_name');

    table.index('category_name');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('categories');
};
