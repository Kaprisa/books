const fs = require('fs')

module.exports = router => {
    router.post('/remove', async ctx => {
        await fs.unlink(path.resolve(__dirname, `../../public/images/${ctx.request.body.filename}`))
        ctx.body = 'Файл успешно удалён'
    })
}
