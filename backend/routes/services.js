const express = require('express')
const router = express.Router()

const org = process.env.ORG
const { services } = require('../models/models')
//Get api to show the 10 services.  Only shows services that have active as true
router.get('/', (req, res, next) => {
  services
    .find({ org: org,active:true }, (error, data) => {
      if (error) {
        return next(error)
      } else {
        return res.json(data)
      }
    })
})
// Get to allow filtering of services
router.get('/search', (req, res, next) => {
  const dbQuery = { orgs: org }
  switch (req.query.searchBy) {
    case 'name':
      dbQuery.serviceName = { $regex: `^${req.query.serviceName}`, $options: 'i' }
      break
    case 'desc':
      dbQuery.serviceDescription = {
        $regex: `^${req.query.serviceDescription}`,
        $options: 'i'
      }
      break
    default:
      return res.status(400).send('invalid searchBy')
  }
  services.find(dbQuery, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

//post method to add a service name and service description
router.post('/add/:serviceName/:serviceDescription', (req, res) => {
  //Sends an error back if the add api fails
  try {
    services.create({
      serviceName: req.params.serviceName,
      serviceDescription: req.params.serviceDescription,
      active: true,
      org: org
    })
    res.send('Added service successfully')
  } catch (error) {
    res.send("An error occurred")
  }
})

//update method to update current services if provided id
router.put('/update/:id', (req, res, next) => {
  try {
    services.findByIdAndUpdate(req.params.id,
      req.body,{new:true},
      (error, data) => {
        if (error) {
          return next(error)
        }
        else
          res.json(data)
      }
    )
  }
  catch (error) {
    res.send("An error occurred")
  }
})
//Soft deletes an entry based on given id
router.delete('/delete/:id', (req, res, next) => {
  try {
    const service = req.body;
    service.active = false;
    services.findByIdAndUpdate(req.params.id,
      service,{new:true},
      (error, data) => {
        if (error) {
          return next(error)
        }
        else
          res.json(data)
      }
    )
  }
  catch (error) {
    res.send("An error occurred")
  }
})

module.exports = router










































