const Book = require('../../db/models/Book')
const User = require('../../db/models/User')

module.exports = router => {
    router.post('/create', async ctx => {
        const body = ctx.request.body
        let missingFields = ''
        Book.getfields().forEach(f => {
            if (!body[f])
                missingFields += `f, `
        })
        if (missingFields)
            ctx.body = `Поля ${missingFields}обязательны для заполнения.`
        const { title, description, author, date, image } = body
        const author_id = await User.create({ name: author })
        ctx.body = await Book.create({title, description, author_id, date, image})
    })
}
