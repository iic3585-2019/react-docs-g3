/* eslint no-unused-vars: "off" */

const faker = require('faker');

module.exports = {
  up(queryInterface, Sequelize) {
    const userdata = [];
    for (let i = 0; i < 10; i += 1) {
      const user = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
      };
      userdata.push(user);
    }

    return queryInterface.bulkInsert('Users', userdata);
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
