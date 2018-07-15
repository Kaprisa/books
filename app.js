const Koa = require('koa')
const app = new Koa()

const config = require('config')

const path = require('path')
const fs = require('fs')

const middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort()
middlewares.forEach(m => require('./middlewares/' + m).init(app))

require('./routes')(app)

app.listen(config.get('port'))
