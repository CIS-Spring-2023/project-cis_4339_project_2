const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')


// importing the user schema
const { users } = require('../models/models')

// GET route to fetch matching record based on login form
router.get('/login/:name/:pw', (req, res) => {
    users.findOne(
        {username: req.params.name}
    ).then((user) => {
        console.log("User result:")
        console.log(user)
        if (user) {
                bcrypt.compare(req.params.pw, user.password).then((result) => {
                    console.log(result)
                    if (result) {

                        res.json(user)
                    }
                    else {
                        res.send("Invalid Credentials")
                    }
                })
            
        }
        else {
            res.send("Invalid Credentials");
        }
    })
})


router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.pw, 8).then((hash) => {
    users.create({
        username: req.body.name,
        password: hash,
        role: req.body.role
    })

    res.send('Success!')
})
})
module.exports = router