'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('products', {
            product_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING,
            },
            origin_price: {
                type: Sequelize.STRING,
            },
            discount: {
                type: Sequelize.STRING,
            },
            flashsale_discount: {
                type: Sequelize.STRING,
            },
            total_remainder: {
                type: Sequelize.STRING,
            },
            total_sold: {
                type: Sequelize.STRING,
            },
            total_review: {
                type: Sequelize.STRING,
            },
            rating: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.STRING,
            },
            user_id: {
                type: Sequelize.INTEGER,
            },
            flag_id: {
                type: Sequelize.STRING,
            },
            overlay_id: {
                type: Sequelize.STRING,
            },
            brand_id: {
                type: Sequelize.STRING,
            },
            flashsale_id: {
                type: Sequelize.INTEGER,
            },
            image: {
                type: Sequelize.ARRAY(Sequelize.STRING),
            },
            categories: {
                type: Sequelize.ARRAY(Sequelize.STRING),
            },
            relate_keyword: {
                type: Sequelize.ARRAY(Sequelize.STRING),
            },
            deals: {
                type: Sequelize.ARRAY(Sequelize.STRING),
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
