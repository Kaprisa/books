const query = require('../connection').query
const errorHandler = require('../../helpers/errorHandler')

class User {
    static getfields() {
        return ['name']
    }
    static async create({ name }) {
        try {
            const user = await query('REPLACE INTO users SET name=?;', [name])
            const row = await query('SELECT LAST_INSERT_ID() as id')
            return row[0].id
        } catch (e) {
            errorHandler(e)
            return null
        }
    }
    static async get(condition = 1) {
        try {
            return await query(`SELECT * FROM users where ${condition}`)
        } catch (e) {
            errorHandler(e)
            return []
        }
    }
    static async books(id) {
        try {
            return await query(`SELECT * FROM books WHERE author_id=${id}`)
        } catch (e) {
            errorHandler(e)
            return []
        }
    }
}

module.exports = User
