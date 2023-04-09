'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Users', 'stripeId', Sequelize.STRING);
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    },
};
