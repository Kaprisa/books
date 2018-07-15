const pug = require('pug')
const config = require('config')
const path = require('path')

exports.init = app => app.use(async function(ctx, next) {
    ctx.render = function(templatePath, locals) {
        locals = locals || {}
        locals.public_path = path.resolve(__dirname, '../public')
        const templatePathResolved = path.join(config.template.root, templatePath + '.pug')
        return pug.renderFile(templatePathResolved, locals)
    }
    await next()
})
