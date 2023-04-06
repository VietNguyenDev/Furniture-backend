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
    table.string('firstName', 50).collate('utf8_general_ci').notNullable();
    table.string('lastName', 50).collate('utf8_general_ci').notNullable();
    table.string('address1', 255).collate('utf8_general_ci').notNullable();
    table.string('address2', 255).collate('utf8_general_ci');
    table.string('city', 50).collate('utf8_general_ci').notNullable();
    table.string('state', 50).collate('utf8_general_ci').notNullable();
    table.string('country', 50).collate('utf8_general_ci').notNullable();
    table.string('postcode', 50).collate('utf8_general_ci').notNullable();
    table.string('shippingTotal', 50).collate('utf8_general_ci').notNullable();
    table.string('shippingTax', 50).collate('utf8_general_ci').notNullable();
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .timestamp('updated_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('shipping_detail');
};
