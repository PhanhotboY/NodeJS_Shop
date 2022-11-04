'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('reviews', {
            id: {
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            UserId: {
                type: Sequelize.INTEGER,
            },
            ProductId: {
                type: Sequelize.INTEGER,
            },
            rating: {
                type: Sequelize.SMALLINT,
            },
            comment: {
                type: Sequelize.TEXT,
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
        await queryInterface.dropTable('reviews');
    },
};
