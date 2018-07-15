const User = require('./models/User')
const Book = require('./models/Book')
const books = require('./data/books')
const connection = require('./connection')
const pool = connection.pool
const asyncForEach = require('../helpers/asyncForEach')
const errorHandler = require('../helpers/errorHandler')

const createUsers = async _ => {
    await asyncForEach(books, async b => {
        const author_id = await User.create({ name: b.author })
        await Book.create({
            title: b.title,
            author_id,
            image: b.imageLink,
            date: b.year,
            description: '«Происхождение» – пятая книга американского писателя Дэна Брауна о гарвардском профессоре, специалисте по религиозной символике Роберте Лэнгдоне. В этот раз все начинается с, возможно, одного из наиболее знаковых событий в истории: наконец-то стало известно, откуда произошло человечество.'
        })
    })
    pool.end(e => e ? errorHandler(e) : null)
}
createUsers().then(_ => null)
