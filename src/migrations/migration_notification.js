'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('notifications', {
            id: {
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            thumbnail: {
                type: Sequelize.STRING,
            },
            title: {
                type: Sequelize.STRING,
            },
            content: {
                type: Sequelize.TEXT,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('notifications');
    },
};
