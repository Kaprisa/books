const defer = require('config/defer').deferConfig
const path = require('path')

module.exports = {
    jsonLimit: '56kb',
    port: 3000,
    secret: 'secret',
    root: process.cwd(),
    db: {
        user: 'root',
        password: 'root',
        database: 'books',
        port: '8889',
        host: 'localhost'
    },
    template: {
        root: defer(function(cfg) {
            return path.join(cfg.root, 'views')
        })
    },
    redis: {
        url: 'redis://127.0.0.1:6379'
    }
}
