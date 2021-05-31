let db = require('../config/db')
let moment = require('../config/moment')

class Message {

    constructor(row) {
        this.row = row
    }

    get id() {
        return this.row.id
    }

    get content() {
        return this.row.content
    }

    get created_at() {

        return moment(this.row.created_at)
    }

    static create(content, cb) {
        db.query('INSERT INTO messages SET content = ?, created_at = ?', [
            content,
            new Date()
        ], (err, result) => {
            if (err) throw err
            cb(result)
        })
    }

    static get(id, cb) {
        db.query('SELECT * from messages WHERE id = ? limit 1', [ id ], (err, message) => {
            if (err) throw err
            cb(new Message(message[0]))
        })
    }

    static all(cb) {
        db.query('SELECT * from messages ORDER BY created_at DESC', (err, messages) => {
            if (err) throw err
            cb(messages.map((message) => new Message(message)))
        })
    }
}

module.exports = Message