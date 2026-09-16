import Redis from 'ioredis';

let redis;

const dummyRedis = {
    get: async () => null,
    set: async () => 'OK',
    del: async () => 0,
    keys: async () => [],
    on: () => {}
};

const isRedisEnabled = process.env.ENABLE_REDIS === 'true';

if (isRedisEnabled && process.env.REDIS_URL) {
    try {
        redis = new Redis(process.env.REDIS_URL, {
            tls: {},
            enableReadyCheck: false,
            maxRetriesPerRequest: null,
            retryStrategy: (times) => {
                if (times > 2) return null;
                return 1000;
            }
        });

        redis.on('connect', () => console.log('Redis connected'));
        redis.on('error', (err) => console.log('Redis error (handled):', err.message));
    } catch (err) {
        console.log('Redis initialization failed, falling back to dummy Redis:', err.message);
        redis = dummyRedis;
    }
} else {
    console.log('Redis is disabled — using fallback dummy Redis.');
    redis = dummyRedis;
}

export default redis;