module.exports = name => {
    const Router = require('koa-router')
    const router = new Router({
        prefix: `/api/${name}`
    })

    const fs = require('fs')
    const path = require('path')

    const p = `../controllers/${name}/`

    const controllers = fs.readdirSync(path.resolve(__dirname, p))
    controllers.forEach(c => require(p + c)(router))

    return router.routes()
}

