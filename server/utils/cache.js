const { redisClient } = require("../config/redis");

const getCache = async (key) => {
    try {
        const data = await redisClient.get(key);

        if (!data) {
            console.log(`❌ CACHE MISS -> ${key}`);
            return null;
        }

        console.log(`✅ CACHE HIT -> ${key}`);

        return JSON.parse(data);
    } catch (err) {
        console.error(`Error fetching from cache: ${err}`);
        return null;
    }
}

const setCache = async (key, value, ttl) => {
    try {
        const stringValue = JSON.stringify(value);
        await redisClient.set(key, stringValue, 'EX', ttl);
        console.log(`✅ CACHE SET -> ${key} (TTL: ${ttl}s)`);
    } catch (err) {
        console.error(`Error setting cache: ${err}`);
        return null;
    }
}

const deleteCache = async (key) => {
    try {
        await redisClient.del(key);
        console.log(`✅ CACHE DELETED -> ${key}`);
    } catch (err) {
        console.error(`Error deleting cache: ${err}`);
        return null;
    }
}

const expireCache = async (key, ttl) => {
    try {
        await redisClient.expire(key, ttl);
        console.log(`✅ CACHE EXPIRED -> ${key} (TTL: ${ttl}s)`);
    } catch (err) {
        console.error(`Error expiring cache: ${err}`);
        return null;
    }
}


module.exports = { getCache, setCache, deleteCache, expireCache };