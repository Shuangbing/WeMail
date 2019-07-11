const mongoose = require('mongoose')

const Domain = mongoose.model('Domain', new mongoose.Schema({
    domain: { type: String, index: true, unique: true}
}))

module.exports = Domain