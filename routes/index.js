const Router = require('koa-router')
const router = new Router()
const makeRoutes = require('./makeRoutes')

module.exports = app => {
    router.get(/\/([\w])*/, async ctx => {
        ctx.body = await ctx.render('index')
    })
    app.use(makeRoutes('books'))
    app.use(makeRoutes('files'))
    app.use(router.routes())
}
