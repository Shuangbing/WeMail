const mongoose = require('mongoose')

const Domain = mongoose.model('Domain', new mongoose.Schema({
    domain: { type: String }
}))

module.exports = Domain