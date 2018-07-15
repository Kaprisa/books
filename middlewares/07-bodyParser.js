const config = require('config')
const bodyParser = require('koa-bodyparser')

exports.init = app => app.use(bodyParser({
    // jsonLimit: config.get('jsonLimit'),
    // formidable: {uploadDir: './public/images'},
    // multipart: true,
    // urlencoded: true
}))
