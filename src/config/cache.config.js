import { createClient } from 'redis';

const client = createClient({
    url: 'redis://phanhotboy:phan1495575753@localhost:6379',
});

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();

export default client;
