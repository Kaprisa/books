const uploader = require('koa2-file-upload')

const options = {
    "url": '/api/upload',
    "storeDir": 'images',
    "provider": "local",
    "mimetypes": ['image/png','image/jpg', 'image/jpeg'],
    "folder": "public"
}

exports.init = app => app.use(uploader(options))
