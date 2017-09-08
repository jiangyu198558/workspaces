express = require('express')
router = express.Router()
userBiz = require('./../bizs/userBiz')

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

module.exports = router