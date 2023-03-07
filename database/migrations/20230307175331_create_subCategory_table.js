exports.up = async(knex) => {
    await knex.schema.createTable('subCategory', (table) => {
    table.increments('id').primary();
    table.string('subCategory_name', 50).collate('utf8_general_ci').notNullable();
    table.string('subCategory_icon', 50).notNullable();
    table.string('subCategory_slug', 50).notNullable();

    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.integer('category_id').unsigned().references('categories.id').notNullable();

    table.unique('subCategory_name');


    table.index('subCategory_name');
    })
};

exports.down = async(knex) => {
    await knex.schema.dropTable('subCategories');
};
