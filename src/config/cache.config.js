import { createClient } from 'redis';

import keys from './keys.config';

const client = createClient({
    url: keys.redisURI,
});

client.on('error', (err) => console.log('Redis Client Error', err));

export default client;
