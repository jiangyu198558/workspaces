express = require('express')
router = express.Router()
userBiz = require('./../bizs/userBiz')
commonBiz = require('./../bizs/commonBiz')

router.get('/test', (req, res)->
    res.send('XXX')
)

router.post('/user/register'
 userBiz.validUserExists
 userBiz.register)

router.post(
    '/user/login'
    userBiz.login    
)

router.post(
    '/user/logout'
    commonBiz.setUserInfo
    commonBiz.validateUserInfo
    userBiz.logout
)

router.post(
    '/user/autologin'
    userBiz.autoLogin
)

module.exports = router