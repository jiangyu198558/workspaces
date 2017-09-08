express = require('express')
router = express.Router()
db = require('./../libs/db')

# GET home page.
router.get('/faq', (req, res, next) ->
    db.users.insert({test: '1'}, (err, user)->
        return next(err) if err
        res.json(user)
    )
    #res.send('I\'m fine')
)

module.exports = router
