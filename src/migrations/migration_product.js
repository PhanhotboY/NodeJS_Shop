'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.STRING,
            },
            discount: {
                type: Sequelize.STRING,
            },
            originPrice: {
                type: Sequelize.INTEGER,
            },
            totalRemainder: {
                type: Sequelize.INTEGER,
            },
            total_sold: {
                type: Sequelize.INTEGER,
            },
            UserId: {
                type: Sequelize.INTEGER,
            },
            brandId: {
                type: Sequelize.INTEGER,
            },
            overlay: {
                type: Sequelize.STRING,
            },
            image: {
                type: Sequelize.ARRAY(Sequelize.STRING),
            },
            deals: {
                type: Sequelize.ARRAY(Sequelize.STRING),
            },
            category: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('products');
    },
};
