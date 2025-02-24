const Redis = require("ioredis")
require('dotenv').config()

const redis = new Redis(process.env.UPSTASH_REDIS_URL)

async function test() {
    await redis.set("testKey", "sentio_key")
    const value = await redis.get("testKey")
}

test()

module.exports = redis