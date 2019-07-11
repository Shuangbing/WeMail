module.exports = options => {
    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')
    const Users = require('../model/User')

    return async(req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, 'ログインしてください')
        const { uid } = jwt.verify(token, req.app.get('secret'))
        assert(uid, 401, 'もう一度ログインしてください')
        req.user = await Users.findById(uid)
        assert(req.user, 403, 'もう一度ログインしてください')
        await next()
    }
}