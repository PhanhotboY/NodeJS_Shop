'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('reviews', {
            userId: {
                type: Sequelize.INTEGER,
            },
            productId: {
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
