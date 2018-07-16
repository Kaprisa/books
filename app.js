import 'babel-polyfill'
import Koa from 'koa'
const app = new Koa()

import config from 'config'

import path from 'path'
import fs from 'fs'

const middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort()
middlewares.forEach(m => require('./middlewares/' + m).default(app))

require('./routes').default(app)

app.listen(config.get('port'))
