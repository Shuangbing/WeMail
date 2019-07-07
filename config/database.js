module.exports = app => {
    const mongoose = require("mongoose")
    mongoose.connect('mongodb://shuangbing.me:27017/wemail-dev', {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    require('require-all')(__dirname + '/../model')
}