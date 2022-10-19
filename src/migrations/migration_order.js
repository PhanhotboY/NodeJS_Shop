'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('orders', {
            orderId: { type: Sequelize.INTEGER },
            productId: {
                type: Sequelize.INTEGER,
            },
            quantity: {
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('orders');
    },
};
