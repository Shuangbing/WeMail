module.exports = app => {
    const router = require('express').Router({
        mergeParams: true
    })
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const mongoose = require('mongoose')
    const Users = mongoose.model('User')
    const Mails = mongoose.model('Mail')
    const Address = mongoose.model('Address')
    const Domain = mongoose.model('Domain')

    const AuthMiddleware = require('../middleware/auth')

    router.post('/mail/address', async(req, res) => {
        const addressList = await Address.find({user: req.user._id})
        assert(addressList.length < 10, 401, 'アドレス作成の上限に至りました')
        const {random, domain, path} = req.body
        const domains = await Domain.find()
        assert(domains.length > 0, 405, 'ご利用可能のドメインがありません')
        const RandomDomain = Math.floor(Math.random() * Math.floor(domains.length))
        const RandomPath = Math.random().toString(36).slice(-5)
        if(!random){
            //isn't random adrress
        }
        const hasSameAddress = await Address.find({
            domain: domains[RandomDomain]._id,
            path: RandomPath
        })
        assert(hasSameAddress, 401, 'このアドレスすでに使用されています')
        await Address.create({
            user: req.user._id,
            domain: domains[RandomDomain]._id,
            path: RandomPath
        }, (error, data) => {
            res.send({
                message: '新しいアドレス作成できました',
                data: {
                    aid: data._id,
                    address: RandomPath+'@'+domains[RandomDomain].domain
                }
            })
        })
    })

    router.get('/mail/address', async(req, res) => {
        const address = await Address.find({user: req.user._id}).sort({updatedAt: -1}).populate('domain')
        var addressList = []
        await address.forEach((data) => {
            addressList.push({
                aid: data._id,
                address: data.path+'@'+data.domain.domain
            })
        })
        res.send({
            message: '完了',
            data: addressList
        })
    })

    router.get('/mail/recive', async (req, res) => {
        const address = await Address.find({user: req.user._id})
        const mails = await Mails.find({ address: address });
        res.send({
            message: '完了',
            data: mails
        })
    })
    
    router.get('/mail/recive/:id', async(req, res) => {
        const address = await Address.findById(req.params.id)
        assert(address, 401, 'このアドレス存在していません')
        console.log(String(address.user), String(req.user._id))
        assert(String(address.user) == String(req.user._id), 403, 'アクセス権限がありません')
        const mail = await Mails.find({
            address: address._id
        })
        res.send({
            message: '完了',
            data: mail
        })
    })

    app.use('/api/app', AuthMiddleware(), router)

    app.post('/api/auth/register', async (req, res) => {
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

    app.post('/api/auth/login', async (req, res) => {
        const {username, password} = req.body
        const user = await Users.findOne({
            username: username
        }).select('+password')
        assert(user, 402, '入力したユーザが見つかりませんでした')
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 402, 'パスワードが正しくありません')
        const token = jwt.sign({ uid: user._id }, app.get('secret'))
        res.send({
            uid: user._id,
            username: user.username,
            access_token: token
        })
    })

    //==================for test=================
    app.post('/test/domain', async (req, res) => {
        const {domain} = req.body
        assert(domain, 401, 'ドメインを入力してください')
        const create_domain = await Domain.create({domain: domain})
        res.send(create_domain)
    })

    app.get('/test/domain', async (req, res) => {
        const domain = await Domain.find()
        res.send(domain)
    })

    app.get('/test/address', async (req, res) => {
        const domain = await Domain.find()
        res.send(domain)
    })
    //==================for test=================

    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
          message: err.message
        })
    })
    
}