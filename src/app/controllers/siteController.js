const { sequelize } = require('../../config/db');
import { pool } from '../../config/db';

const siteController = {
    home(req, res, next) {
        const data = {};
        pool.query('SELECT keyword FROM trending_search')
            .then((resp) => {
                data.options = resp.rows;

                return data;
            })
            .then(async (data) => {
                data.bannerImages = (await pool.query('SELECT * FROM banner')).rows;
                return data;
            })
            .then(async (data) => {
                data.dealOptions = (await pool.query('SELECT title,logo FROM deal_options')).rows;
                return data;
            })
            .then(async (data) => {
                data.categoryList = (
                    await pool.query('SELECT displayname,image FROM category_list')
                ).rows;
                return data;
            })
            .then(async (data) => {
                data.flashsaleItems = (await pool.query('SELECT * FROM flashsale_items')).rows;
                return data;
            })
            .then(async (data) => {
                data.mallShops = (await pool.query('SELECT * FROM mall_shops')).rows;
                return data;
            })
            .then(async (data) => {
                data.topSearch = (await pool.query('SELECT * FROM topsearch')).rows;
                return data;
            })
            .then(async (data) => {
                data.recommendItems = (
                    await pool.query('SELECT * FROM recommend_items ORDER BY data_type')
                ).rows;
                return data;
            })
            .then(async (data) => {
                data.sliderImages = (await pool.query('SELECT * FROM slider ORDER BY stt')).rows;

                res.render('home', data);
            })
            .catch((err) => console.debug(err));
    },
};

module.exports = siteController;
