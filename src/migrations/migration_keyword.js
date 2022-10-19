'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('keywords', {
            content: {
                primaryKey: true,
                allowNull: false,
                type: Sequelize.STRING,
            },
            image: {
                type: Sequelize.STRING,
            },
            searchPerDay: {
                type: Sequelize.INTEGER,
            },
            searchPerDay: {
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
        await queryInterface.dropTable('keywords');
    },
};
