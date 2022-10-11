import { sequelize } from '../../config/db';

const productController = {
    async all(req, res, next) {
        const data = {};
        try {
            const { results, metadata } = await sequelize.query(
                'SELECT * FROM user'
            );
            return res.json({
                results: results,
                metadata: metadata,
            });
        } catch {
            (error) => {
                res.json(error);
            };
        }
    },
};

module.exports = productController;
