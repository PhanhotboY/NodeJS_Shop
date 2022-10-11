'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('carts', {
            user_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            products: {
                type: Sequelize.JSONB,
            },
            quantity: {
                type: Sequelize.STRING,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('carts');
    },
};
