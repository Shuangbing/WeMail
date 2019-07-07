const mongoose = require('mongoose')

const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, unique: true},
    password: { type: String, select: false,
        set(val) {
        return require('bcrypt').hashSync(val, 10)
    }},
    access_token: String,
    lastlogin: {type: Date, default: Date.now}
}))

module.exports = User