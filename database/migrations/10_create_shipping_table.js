exports.up = async (knex) => {
  //check if table exists
  const hasTable = await knex.schema.hasTable('shipping');
  if (hasTable) return;
  await knex.schema.createTable('shipping', (table) => {
    table.increments('id').primary();
    table.string('methodName').notNullable();
    table.string('methodTitle').notNullable();
    table.string('total').notNullable();
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .timestamp('updated_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('shipping');
};
