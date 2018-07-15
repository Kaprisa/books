const errorHandler = require('../../helpers/errorHandler')

exports.up = async query => {
    try {
        await query(`CREATE TABLE IF NOT EXISTS books (
              id int(10) unsigned NOT NULL AUTO_INCREMENT,
              title varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
              image varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'f1.jpeg',
              author_id int(10) unsigned NOT NULL,
              date varchar(30) NOT NULL,
              description text COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
              created_at timestamp NULL DEFAULT NULL,
              updated_at timestamp NULL DEFAULT NULL,
              PRIMARY KEY (id),
              CONSTRAINT author_id_foreign FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`, []
        )
    } catch (e) {errorHandler(e)}
}

exports.down = async query => {
    try {
        await query(`DROP TABLE IF EXISTS books;`, [])
    } catch (e) {errorHandler(e)}
}
