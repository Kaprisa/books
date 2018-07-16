const query = require('../connection').query
const errorHandler = require('../../helpers/errorHandler')
const { getCached, setCached, flush } = require('../redis')

class Book {
    static getfields() {
        return ['title', 'description', 'author', 'date', 'image']
    }
    static async create({ title, author_id, description, image, date }) {
        try {
            await query(`INSERT INTO books SET title=?, author_id=?, description=?, image=?, date=?, created_at=?, updated_at=?;`, [title, author_id, description, image, date, 'now()', 'now()'])
            flush()
            return 'Книга успешно добавлена!'
        } catch (e) {
            errorHandler(e)
            return e.message
        }
    }
    static async update(condition, fields) {
        let str = ''
        Object.keys(fields).forEach(f => str += `${f}=?, `)
        try {
            await query(`UPDATE books SET ${str}updated_at=? where ${condition};`, [...Object.values(fields), 'now()'])
            flush()
            return 'Книга успешно обновлена!'
        } catch (e) {
            errorHandler(e)
            return e.message
        }
    }
    static async get({condition = 1, limit = null, orderBy = 'created_at', direction = 'ASC'}) {
        try {
            const queryString = `SELECT b.*, u.name FROM books b JOIN users u ON b.author_id=u.id where ${condition} ORDER BY ${orderBy} ${direction} ${limit ? limit : ''};`
            const cachedBooks = await getCached(queryString)
            if (cachedBooks)
                return cachedBooks
            const books = await query(queryString)
            setCached(queryString, JSON.stringify(books))
            return books
        } catch (e) {
            errorHandler(e)
            return []
        }
    }
    static async count({ condition = 1 }) {
        try {
            const row = await query(`SELECT COUNT(*) as count FROM books where ${condition}`)
            return row[0].count
        } catch (e) {
            errorHandler(e)
            return 0
        }
    }
    static async groupBy(field) {
        try {
            return await query(`SELECT ${field} FROM books b GROUP BY ${field}`)
        } catch (e) {
            errorHandler(e)
            return []
        }
    }

    static async last() {
        try {
            return  await query(`SELECT * FROM books GROUP BY author_id HAVING max(date)`)
        } catch (e) {
            errorHandler(e)
            return []
        }
    }
}

module.exports = Book
