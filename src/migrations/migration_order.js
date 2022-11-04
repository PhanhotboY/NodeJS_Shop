'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('orders', {
            OrderId: { type: Sequelize.INTEGER },
            ProductId: { type: Sequelize.INTEGER },
            quantity: { type: Sequelize.INTEGER },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('orders');
    },
};
