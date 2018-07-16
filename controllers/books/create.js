import Book from '../../db/models/Book'
import User from '../../db/models/User'
import { flush } from '../../db/redis'

export default router => {
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
        await flush()
        ctx.body = await Book.create({title, description, author_id, date, image})
    })
}
