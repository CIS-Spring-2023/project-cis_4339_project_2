const express = require('express')
const router = express.Router()

const org = process.env.ORG
const { services } = require('../models/models')

router.get('/', (req, res, next) => {
    services
      .find({ org: org }, (error, data) => {
        if (error) {
          return next(error)
        } else {
          return res.json(data)
        }
      })
      .limit(10)
  })

  module.exports = router










































