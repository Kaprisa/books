import path from 'path'
import fs from 'fs'
import Router from 'koa-router'

export default name => {

    const router = new Router({
        prefix: `/api/${name}`
    })

    const p = `../controllers/${name}/`

    const controllers = fs.readdirSync(path.resolve(__dirname, p))
    controllers.forEach(c => require(p + c).default(router))

    return router.routes()
}

