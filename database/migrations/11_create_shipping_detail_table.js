exports.up = async (knex) => {
  //check if table exists
  const hasTable = await knex.schema.hasTable('shipping_detail');
  if (hasTable) return;
  await knex.schema.createTable('shipping_detail', (table) => {
    table.increments('id').primary();
    table
      .integer('shippingId')
      .unsigned()
      .references('shipping.id')
      .notNullable();
    table.integer('userId').unsigned().references('users.id').notNullable();
    table.string('fullName', 50).collate('utf8_general_ci').notNullable();
    table.string('address', 255).collate('utf8_general_ci');
    table.string('province', 255).collate('utf8_general_ci').notNullable();
    table.string('district', 255).collate('utf8_general_ci').notNullable();
    table.string('ward', 255).collate('utf8_general_ci').notNullable();
    table.string('postcode', 50).collate('utf8_general_ci').notNullable();
    table.string('phone', 255).collate('utf8_general_ci').notNullable();
    table.integer('shippingTotal').notNullable();
    table.integer('shippingTax', 10).notNullable();
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .timestamp('updated_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('shipping_detail');
};
