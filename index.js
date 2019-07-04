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
        from_address: data.from.pop().address,
        to_address: data.to.pop().address,
        subject: data.headers.subject,
        html: data.html,
        text: data.text
    })
    console.log(mail);
});

app.disable('etag')
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
  res.header("X-Powered-By",' 1.0.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
})

app.use(express.json())

app.get('/recive', async function (req, res) {
    const mails = await Mails.find();
    res.send(mails);
});

app.get('/recive/:id', async function (req, res) {
    const mail = await Mails.findById(req.params.id)
    res.send(mail);
});

app.listen(3005, function () {
    console.log('listening on port 3000!');
});