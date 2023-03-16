exports.up = async (knex) => {
  await knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.string('productName', 50).collate('utf8_general_ci').notNullable();
    table.string('productSlug', 255).collate('utf8_general_ci').notNullable();

    table.string('productCode', 255).notNullable();
    table.string('productSize', 50).notNullable();
    table.string('productColor', 50).notNullable();
    table.integer('sellingPrice').unsigned().notNullable();
    table.integer('discountPrice').unsigned().notNullable();
    table.string('product3D').collate('latin1_general_ci').notNullable();
    table.text('productDescription').collate('utf8_general_ci').notNullable();
    table.string('productThumbnail').collate('latin1_general_ci').notNullable();

    table.integer('categoryId').unsigned().references('categories.id').notNullable();
    table.integer('subCategoryId').unsigned().references('subCategories.id').notNullable();

    table.timestamp('createdAt').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.unique('productName');

    table.index('categoryId');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('products');
};
