import client from '../../../config/cache.config';

const cleanCache = async (req, res, next) => {
    await next();

    const key = JSON.stringify({
        collection: 'Users',
    });

    client.del(key);
};

export default cleanCache;
