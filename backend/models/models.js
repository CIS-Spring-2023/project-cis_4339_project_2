const uuid = require('uuid')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// collection for org
const orgDataSchema = new Schema(
  {
    _id: {
      type: String
    },
    name: {
      type: String,
      required: true
    }
  },
  {
    collection: 'org'
  }
)
// collection for users
const userDataSchema = new Schema(
  {
    _id: {type: String, default: uuid.v1 },
    username: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true}
  },
  {
    collection: 'user'
  }
)

// collection for clients
const clientDataSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    middleName: {
      type: String
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    phoneNumber: {
      primary: {
        type: String,
        required: true
      },
      alternate: {
        type: String
      }
    },
    address: {
      line1: {
        type: String
      },
      line2: {
        type: String
      },
      city: {
        type: String,
        required: true
      },
      county: {
        type: String
      },
      zip: {
        type: String,
        required: true
      }
    },
    orgs: {
      type: [{ type: String, ref: 'org' }],
      required: true,
      validate: [(org) => org.length > 0, 'needs at least one org']
    }
  },
  {
    collection: 'client',
    timestamps: true
  }
)

// collection for events
const eventDataSchema = new Schema(
  {
    _id: { type: String, default: uuid.v1 },
    org: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    services: [
      {
        type: String
      }
    ],
    date: {
      type: Date,
      required: true
    },
    address: {
      line1: {
        type: String
      },
      line2: {
        type: String
      },
      city: {
        type: String
      },
      county: {
        type: String
      },
      zip: {
        type: String
      }
    },
    description: {
      type: String
    },
    attendees: [
      {
        type: String,
        ref: 'client'
      }
    ]
  },
  {
    collection: 'event'
  }
)
const serviceDataSchema = new Schema(
  {
    _id: { type: String, default: uuid.v1 },
    org: {
      type: String,
      required: true
    },
    serviceName: {
      type: String,
      required: true
    },
    serviceDescription: 
      {
        type: String,
        required: true
      }
    ,
    active: {
      type: Boolean,
      required: true
    }
  },
  {
    collection: 'service'
  }
)

// create models from mongoose schemas
const clients = mongoose.model('client', clientDataSchema)
const orgs = mongoose.model('org', orgDataSchema)
const events = mongoose.model('event', eventDataSchema)
const users = mongoose.model('user', userDataSchema)
const services = mongoose.model('service', serviceDataSchema)

// package the models in an object to exportcas
module.exports = { clients, orgs, events, users,services }

