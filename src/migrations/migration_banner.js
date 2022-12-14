'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('banners', {
            id: {
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            bannerType: {
                type: Sequelize.STRING,
            },
            promoType: {
                type: Sequelize.STRING,
            },
            image: {
                type: Sequelize.STRING,
            },
            ordinal: {
                type: Sequelize.SMALLINT,
            },
            position: {
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
        await queryInterface.dropTable('banners');
    },
};
