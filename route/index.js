module.exports = app => {
    const router = require('express').Router({
        mergeParams: true
    })
    const assert = require('http-assert')
    const mongoose = require('mongoose')
    const Users = mongoose.model('User')
    const Mails = mongoose.model('Mail')

    app.get('/admin/api/test', async (req, res) => {
        assert(!true, 400, 'bad')
    })

    router.get('/mail/recive', async function (req, res) {
        const mails = await Mails.find();
        res.send(mails);
    })
    
    router.get('/mail/recive/:id', async function (req, res) {
        const mail = await Mails.findById(req.params.id)
        res.send(mail);
    })

    router.post('/user/register', async (req, res) => {
        const {username, password} = req.body
        const user = await Users.create({
            username: username,
            password: password
        })
        res.send(user)
    })

    router.post('/user/login', async (req, res) => {
        const {username, password} = req.body
        const user = await Users.findOne({
            username: username,
            password: password
        })
        res.send(user)
    })

    app.use('/api', router)

    app.use(async (err, req, res, next) => {
        // console.log(err)
        res.status(err.statusCode || 500).send({
          message: err.message
        })
    })
    
}