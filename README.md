# Data Platform Project Setup

This project has been developed over time by students in the CIS 4339 course.

The current iteration is based on development done by Elliot Farmer Garcia, Agatha	Molski and Chris Blanco in Fall of 2022.

This iteration is being developed by Kevin Romanazzi, Thuyen Truong, and Alain Nguyen. Find our references below.

Requirements:

This project uses NodeJS and MongoDB.

## Backend Node Application
```
cd backend
```
Follow instructions in backend README for setup and running as a local instance.

## Frontend Vue 3 Application
```
cd frontend 
```
Follow instructions in frontend README for setup and running as a local instance.

## Credentials
The credentials are the following and follow username:password format.
```
editor:edit
viewer:view
```

## Environment Variables
Two .env files should be used to properly run this application. One should be placed in the frontend directory and contain this variable:
VITE_ROOT_API = "http://localhost:3000"

Another .env file should be placed in the backend directory and contain:
MONGO_URL = mongodb+srv://kgromana:KTAProj39@4339-kta.rr5t7uz.mongodb.net/dataplatform?retryWrites=true&w=majority
PORT = 3000
ORG = 'communitygarden'

Change the value of ORG to access data for another organization. The data currently in the database contains information for:
communitygarden
waterfront
municipal

Please be sure that the port assigned to PORT and the port found in the VITE_ROOT_API string match, or you may experience errors.



## References
- https://vuejs.org/tutorial/#step-1
- https://www.chartjs.org/docs/latest/
- https://tailwindcomponents.com/component/login-showhide-password - template for login page
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
- https://www.javascripttutorial.net/es6/javascript-array-find/
- https://masteringjs.io/tutorials/fundamentals/foreach-break
- https://vuelidate-next.netlify.app/guide.html#validating-forms-before-submitting
- https://stackoverflow.com/questions/48042274/conditional-event-binding-vuejs
- https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/array/find
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
- https://vuejs.org/guide/essentials/forms.html#multiline-text
