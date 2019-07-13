const mongoose = require('mongoose')

const Address = mongoose.model('Address', new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'},
    domain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Domain'},
    path: { type: String },
    updatedAt: { type: Date, default: Date.now() }
}))

module.exports = Address