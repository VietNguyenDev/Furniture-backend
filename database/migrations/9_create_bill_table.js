exports.up = async (knex) => {
  //check if table exists
  const hasTable = await knex.schema.hasTable('bill');
  if (hasTable) return;
  await knex.schema.createTable('bill', (table) => {
    table.increments('id').primary();
    table.int('profit').notNullable();
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .timestamp('updated_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('bill');
};
