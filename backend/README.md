# Backend

This implementation is for NodeJS based on [Express](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/) and uses [mongoose](https://mongoosejs.com/) as the ODM.

## Project setup

    npm install

### Before startup
You need a MongoDB database ready.

Make sure you have a collection named 'org' in your database that contains at least one organization with the orgid listed in your environment variable (see below).

Setup a .env file with the following variables: MONGO_URL, PORT and ORG

- MONGO_URL = mongodb+srv://kgromana:KTAProj39@4339-kta.rr5t7uz.mongodb.net/dataplatform?retryWrites=true&w=majority
- PORT = 3000 ** please be sure this port number matches the port found in the frontend .env VITE_ROOT_API string **
- ORG = 'communitygarden'

Change the value of ORG to access data for another organization. The data currently in the database contains information for:
- communitygarden
- waterfront
- municipal

### Compiles and hot-reloads for development

    npm start

## Postman Documentation

Can be found at <https://documenter.getpostman.com/view/19674869/2s93eSaaw1>
