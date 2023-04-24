const express = require('express')
const router = express.Router()


// importing the user schema
const { users } = require('../models/models')

// GET route to fetch matching record based on login form
router.get('/login/:name/:pw', (req, res) => {
    users.findOne(
        {username: req.params.name,
        password: req.params.pw}
    ).then((user) => {
        console.log(user)
        if (user) {
            res.json(user);
        }
        else {
            throw new Error("Invalid Credentials");
        }
    })
})

module.exports = router