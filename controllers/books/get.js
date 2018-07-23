import Book from '../../db/models/Book'
const { getCached, setCached } = require('../../db/redis')

export default router => {
    router.get('/', async ctx => {
        const query = ctx.request.query
        const condition = query.like ? `title LIKE '${query.like}%'` : 1
        const key = `${condition}${query.order || 'created_at'}${query.direction || 'ASC'}${query.offset}${query.limit}`
        const queryString = `SELECT b.*, u.name FROM books b JOIN users u ON b.author_id=u.id where ${condition} ORDER BY ${query.order || 'created_at'} ${query.direction || 'ASC'} ${`LIMIT ${query.offset}, ${query.limit}`};`
        let books = await getCached(key)
        if (!books) {
            books = await Book.get(queryString)
            await setCached(key, JSON.stringify(books))
        }
        const count = await Book.count({ condition })
        ctx.body = { books, count }
    })
    .get('/:id', async ctx => {
        const book = await Book.get({ condition: `b.id=${ctx.params.id}`})
        ctx.body = book.length ? book[0] : null
    })
    .get('/count', async ctx => {
        ctx.body = await Book.count({})
    })
}
