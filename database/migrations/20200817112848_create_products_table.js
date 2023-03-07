exports.up = async (knex) => {
  await knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.string('product_name', 50).collate('utf8_general_ci').notNullable();
    table.string('product_slug', 50).collate('utf8_general_ci').notNullable();
    
    table.string('product_code', 50).notNullable();
    table.string('product_size', 50).notNullable();
    table.string('product_color', 50).notNullable();
    table.integer('selling_price').unsigned().notNullable();
    table.integer('discount_price').unsigned().notNullable();
    table.string('product_3d').collate('latin1_general_ci').notNullable();
    table.text('product_descp').collate('utf8_general_ci').notNullable();
    table.string('product_thumbnail').notNullable();

    table.integer('category_id').unsigned().references('categories.id').notNullable();
    
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.unique('product_name');

    table.index('category_id');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('products');
};
