express = require('express')
router = express.Router()

# GET home page.
router.get('/faq', (req, res, next) ->
    res.send('I\'m fine')
)

module.exports = router
