'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('joins', {
            FlashsaleId: {
                type: Sequelize.INTEGER,
            },
            ProductId: {
                type: Sequelize.INTEGER,
            },
            maxQuantity: {
                type: Sequelize.INTEGER,
            },
            discount: {
                type: Sequelize.STRING,
            },
            sold: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('joins');
    },
};
