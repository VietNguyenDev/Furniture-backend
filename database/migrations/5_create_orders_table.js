exports.up = async (knex) => {
  //check if table exists
  const hasTable = await knex.schema.hasTable('orders');
  if (hasTable) return;
  await knex.schema.createTable('orders', (table) => {
    table.increments('id').primary();
    table.string('status', 50).collate('utf8_general_ci').notNullable();
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .timestamp('updated_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.string('productColor').collate('utf8_general_ci');
    table.string('productSize').collate('utf8_general_ci');
    table.integer('quantity').notNullable();
    table.integer('subTotal').notNullable();

    table
      .integer('shippingId')
      .unsigned()
      .references('shipping.id')
      .notNullable();
    table.integer('billId').unsigned().references('bill.id').notNullable();
    table.integer('userId').unsigned().references('users.id').notNullable();
    table
      .integer('productId')
      .unsigned()
      .references('products.id')
      .notNullable();

    table.index('userId');
    table.index('productId');
    table.index('shippingId');
    table.index('billId');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('orders');
};
