const { faker } = require('@faker-js/faker');

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('users').del();
  const users = Array.from({ length: 10 }, () => ({
    email: faker.internet.email(),
    full_name: faker.name.fullName(),
    password: faker.internet.password(),
    // password: bcrypt.hash(faker.internet.password(), salt),
    address: faker.address.streetAddress(),
    gender: Math.floor(Math.random() * 2) + 1,
    role: Math.floor(Math.random() * 2) + 1,
    code: faker.random.alphaNumeric(6),
    date_of_birth: faker.date.past(),
    created_at: faker.date.past(),
    updated_at: faker.date.past(),
    image: faker.image.avatar(),
    refresh_token: faker.random.alphaNumeric(80),
  }));
  await knex('users').insert(users);
};