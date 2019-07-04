var express = require('express');
var app = express();
const mailin = require('mailin');
const mongoose = require('mongoose');
const database = require('./config/database')
const Mails = require('./model/mail')

mongoose.connect(database.mongo_path, {
    useNewUrlParser: true,
    useCreateIndex: true
})

mailin.start({
    host: '0.0.0.0',
    port: 25,
    disableWebhook: true
});

mailin.on('error', function(err) {
    console.error(err.stack);
});

mailin.on('message', async function (connection, data, content) {
    console.log('Get new Mail');
    const mail = await Mails.create({
        from_address: data.headers.from,
        to_address: data.headers.to,
        subject: data.headers.subject,
        html: data.html
    })
    console.log(mail);
});

app.use(express.json())

app.get('/recive', async function (req, res) {
    const mails = await Mails.find();
    res.send(mails);
});
  
app.listen(3005, function () {
    console.log('listening on port 3000!');
});