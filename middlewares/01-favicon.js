const favicon = require('koa-favicon')
const path = require('path')

exports.init = app => app.use(favicon(path.resolve(__dirname, '../public/images/favicon.ico')))
