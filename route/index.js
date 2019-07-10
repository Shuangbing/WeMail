module.exports = app => {
    const router = require('express').Router({
        mergeParams: true
    })
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const mongoose = require('mongoose')
    const Users = mongoose.model('User')
    const Mails = mongoose.model('Mail')

    const AuthMiddleware = require('../middleware/auth')

    router.get('/mail/recive', AuthMiddleware, async function (req, res) {
        const mails = await Mails.find();
        res.send(mails)
    })
    
    router.get('/mail/recive/:id', AuthMiddleware, async function (req, res) {
        const mail = await Mails.findById(req.params.id)
        res.send(mail)
    })

    router.post('/user/register', async (req, res) => {
        const {username, password} = req.body
        const user = await Users.create({
            username: username,
            password: password
        })
        res.send({
            message: '新規登録完了',
            uid: user.id,
            username: user.username
        })
    })

    router.post('/user/login', async (req, res) => {
        const {username, password} = req.body
        const user = await Users.findOne({
            username: username
        }).select('+password')
        assert(user, 401, '入力したユーザが見つかりませんでした')
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 401, 'パスワードが正しくありません')
        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send({
            uid: user._id,
            username: user.username,
            access_token: token
        })
    })

    app.use('/api', router)

    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
          message: err.message
        })
    })
    
}