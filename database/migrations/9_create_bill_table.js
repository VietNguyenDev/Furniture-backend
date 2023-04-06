exports.up = async (knex) => {
  //check if table exists
  const hasTable = await knex.schema.hasTable('bill');
  if (hasTable) return;
  await knex.schema.createTable('bill', (table) => {
    table.increments('id').primary();
    table.string('firstName', 50).notNullable();
    table.string('lastName', 50).notNullable();
    table.string('address1', 50).notNullable();
    table.string('address2', 50).notNullable();
    table.string('city', 50).notNullable();
    table.string('state', 50).notNullable();
    table.string('postcode', 10);
    table.string('country', 50).notNullable();
    table.string('email', 50).notNullable();
    table.string('phone', 50).notNullable();
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .timestamp('updated_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('bill');
};
