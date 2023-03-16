import db from '../src/config/db/connect.config';

module.exports = async function (globalConfig, projectConfig) {
    await db.close();
};
