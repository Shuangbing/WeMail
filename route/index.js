module.exports = app => {
    const router = require('express').Router()
    const assert = require('http-assert')
    const mongoose = require('mongoose')
    const Users = mongoose.model('User')
    const Mails = mongoose.model('Mail')

    router.get('/mail/recive', async function (req, res) {
        const mails = await Mails.find();
        res.send(mails);
    })
    
    router.get('/mail/recive/:id', async function (req, res) {
        const mail = await Mails.findById(req.params.id)
        res.send(mail);
    })

    router.post('/user/register', async function(req, res){
        const {username, password} = req.body
        const user = await Users.create({
            username: username,
            password: password
        })
        res.send(user)
    })
    
    app.use('/api', router)

    
}