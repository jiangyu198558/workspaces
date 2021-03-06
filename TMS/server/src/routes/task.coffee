express = require('express')
router = express.Router()
taskBiz = require('./../bizs/taskBiz')
commonBiz = require('./../bizs/commonBiz')

router.post('/task', commonBiz.setUserInfo, commonBiz.validateUserInfo, taskBiz.addTask)

router.put('/task', commonBiz.setUserInfo, commonBiz.validateUserInfo, taskBiz.updateTask)

router.get('/task/:id', commonBiz.setUserInfo, commonBiz.validateUserInfo, taskBiz.getTask)

router.get('/task', commonBiz.setUserInfo, commonBiz.validateUserInfo, taskBiz.getTasks)

module.exports = router