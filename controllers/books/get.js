import Book from '../../db/models/Book'
const { getCached, setCached } = require('../../db/redis')

export default router => {
    router.get('/', async ctx => {
        const query = ctx.request.query
        const condition = query.like ? `title LIKE '${query.like}%'` : 1
        const queryString = `SELECT b.*, u.name FROM books b JOIN users u ON b.author_id=u.id where ${condition} ORDER BY ${query.order || 'created_at'} ${query.direction || 'ASC'} ${query ? `LIMIT ${query.offset}, ${query.limit}` : 1};`
        let books = await getCached(queryString)
        if (!books) {
            books = await Book.get(queryString)
            await setCached(queryString, JSON.stringify(books))
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
