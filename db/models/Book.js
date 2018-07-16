const query = require('../connection').query
const errorHandler = require('../../helpers/errorHandler')

class Book {
    static getfields() {
        return ['title', 'description', 'author', 'date', 'image']
    }
    static async create({ title, author_id, description, image, date }) {
        try {
            await query(`INSERT INTO books SET title=?, author_id=?, description=?, image=?, date=?, created_at=?, updated_at=?;`, [title, author_id, description, image, date, 'now()', 'now()'])
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
            return 'Книга успешно обновлена!'
        } catch (e) {
            errorHandler(e)
            return e.message
        }
    }
    static async get(queryString) {
        try {
            return await query(queryString)
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
