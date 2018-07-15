const Book = require('../../db/models/Book')

module.exports = router => {
    router.get('/', async ctx => {
        const query = ctx.request.query
        const condition = query.like ? `title LIKE '${query.like}%'` : 1
        const books = await Book.get({
            limit: query ? `LIMIT ${query.offset}, ${query.limit}` : 1,
            condition,
            orderBy: query.order || 'created_at',
            direction: query.direction || 'ASC'
        })
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
