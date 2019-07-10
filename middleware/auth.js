module.exports = options => {
    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')
    const Users = require('../model/User')

    return async(req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, 'ログインしてください')
        await next()
    }
}