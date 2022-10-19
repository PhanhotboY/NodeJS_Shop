'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('allcodes', {
            key: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            type: {
                type: Sequelize.STRING,
            },
            value_vi: {
                type: Sequelize.STRING,
            },
            value_en: {
                type: Sequelize.STRING,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('allcodes');
    },
};
