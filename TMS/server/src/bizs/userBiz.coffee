express = require('express')
router = express.Router()
db = require('./../libs/db')
jwt = require('jsonwebtoken')
config = require('./../config/config')

validUserExists = (req, res, next)->
    body = req.body
    return next(new Error('请提交用户注册信息。')) if not body or not body.username or not body.password
    db.users.findOne({username: body.username}, (err, user)->
        return next(err) if err
        if user
            return next(new Error('用户已注册，无法再注册!'))
        next()
    )

register = (req, res, next)->
    body = req.body
    # 正常注册
    postData = {
        username: body.username
        password: body.password
        token: '',
        expriedTime: Date.now()
    }

    db.users.insert(postData, (err, user)->
        return next(err) if err
        res.json(true)
    )

login = (req, res, next) ->
    username = req.body.username
    password = req.body.password
    db.users.findOne({username: username, password: password}, (err, user)->
        return next(err) if err
        return next(new Error('登录失败，请重试!未找到用户信息！')) if !user
        expiredTime = Date.now() + 1000*60*60*24
        token = jwt.sign({username: username}, config.secret)
        db.users.update({_id: user._id}, {$set: {token: token, expiredTime: expiredTime}}, (err, numReplaced)->
            return next(err) if err
            return next(new Error('登录失败，请重试！')) if numReplaced is 0
        )
        res.json({token: token})
    )

autoLogin = (req, res, next) ->
    token = req.body.token
    return next('缺少token') if !token
    db.users.findOne({token: token, expiredTime: {$gt: Date.now()}}, (err, user)->
        return next(err) if err
        return next('自动登录失败') if !user
        res.json(true)
    )

logout = (req, res, next) ->
    db.users.update({_id: req.userInfo._id}, {$set: {token: token, expiredTime: expiredTime}}, (err, num)->
        return next(err) if err
        return next(new Error('注销失败，请重试！')) if num is 0
    )

module.exports = {
    validUserExists: validUserExists
    register: register
    login: login
    logout: logout
    autoLogin: autoLogin
}