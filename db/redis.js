const redis = require('redis')
const config = require('config')
const util = require('util')
const errorHandler = require('../helpers/errorHandler')

const client = redis.createClient(config.redis.url)

client.get = util.promisify(client.get)

exports.getCached = async (key) => {
    try {
        const cached = await client.get(key)
        if (cached)
            return JSON.parse(cached)
        return null
    } catch (e) {
        errorHandler(e)
        return null
    }
}

exports.setCached = async (key, data) => {
    try {
        await client.set(key, JSON.stringify(data))
    } catch (e) {
        errorHandler(e)
    }
}

exports.flush = async _ => {
    try {
        await client.flushdb()
    } catch (e) {
        errorHandler(e)
    }
}
