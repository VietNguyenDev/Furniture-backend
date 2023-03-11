const { faker } = require('@faker-js/faker');

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('categories').del();
  const categories = Array.from({ length: 5 }, () => ({
    categoryName: faker.commerce.department(),
    categoryIcon: faker.image.imageUrl(),
    categorySlug: faker.lorem.slug(),
  }));
  await knex('categories').insert(categories);
};
