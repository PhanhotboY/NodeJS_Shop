import client from '../../../config/cache.config';

const cleanCache = async (req, res, next) => {
    // await next();

    const key = JSON.stringify({
        collection: 'Users',
    });

    client.flushAll();

    next();
};

export default cleanCache;
