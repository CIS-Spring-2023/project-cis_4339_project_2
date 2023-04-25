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
router.post('/add/', (req, res) => 
{
  try {
  services.create({
    serviceName: req.body.serviceName,
    serviceDescription: req.body.serviceDescription,
    active: true,
    org: org
  })
  res.send('Added service successfully')
} catch (error) {
  res.send("An error occurred")
} })

module.exports = router










































