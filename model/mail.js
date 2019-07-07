const mongoose = require('mongoose')

const Mail = mongoose.model('Mail', new mongoose.Schema({
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'},
    from_address: { type: String },
    to_address: { type: String },
    subject: { type: String },
    text: { type: String },
    html: { type: String },
    read: { type: Boolean, default: false },
    received: {type: Date, default: Date.now}
}))

module.exports = Mail