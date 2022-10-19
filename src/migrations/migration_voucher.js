'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('vouchers', {
            code: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            category: {
                type: Sequelize.STRING,
            },
            percent: {
                type: Sequelize.STRING,
            },
            maxDiscount: {
                type: Sequelize.STRING,
            },
            minOrder: {
                type: Sequelize.STRING,
            },
            quantity: {
                type: Sequelize.STRING,
            },
            type: {
                type: Sequelize.STRING,
            },
            quantityUsed: {
                type: Sequelize.STRING,
            },
            startTime: {
                type: Sequelize.DATE,
            },
            expire: {
                type: Sequelize.DATE,
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
        await queryInterface.dropTable('vouchers');
    },
};
