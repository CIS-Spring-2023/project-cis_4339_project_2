<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { loggedInUser } from '../store/LoggedIn'
const apiURL = import.meta.env.VITE_ROOT_API


export default {
    setup() {
      const store = loggedInUser()
        return { 
          v$: useVuelidate({ $autoDirty: true }),
          store
       }
    },

    data () {
        return {
            username: '',
            password: '',

            msg: ''
        }
    },


    validations () {  // Vuelidate constraints for form validation
        return {
            username: { required },
            password: { required }
        }
    },

    methods: {  // the submit function uses the login store function as a callback function post-validation
      submitLogin(f) {
        this.v$.$validate().then((valid) => {
          if (valid) {
            console.log(valid)
            f(this.username, this.password)
          }
        })
      }
    }
}


</script>




<template> <!-- Fairly simple login form starts here -->
           <!-- to log in, use name and pw 'viewer' and 'view', or 'editor' and 'edit' -->
          <form class="mt-8" @submit.prevent="submitLogin(store.login)"> <!-- Call to the Login method with callback -->
            <div class="mx-auto max-w-lg">
              <div class="py-2">
                <span class="px-1 text-sm text-gray-600">Username</span>
                <input type="text" v-model="username"
                  class="text-md block px-3 py-2  rounded-lg w-full 
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none">
                <span class="text-black" v-if="v$.username.$error">
                  <p
                    class="text-red-700"
                    v-for="error of v$.username.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}! <!-- Validation errors will show here -->
                  </p>
                </span>
              </div>
              <div class="py-2">
                <span class="px-1 text-sm text-gray-600">Password</span>
                <div class="relative">
                  <input type="password" v-model="password" class="text-md block px-3 py-2 rounded-lg w-full 
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md
                focus:placeholder-gray-500
                focus:bg-white 
                focus:border-gray-600  
                focus:outline-none">
                <span class="text-black" v-if="v$.password.$error">
                  <p
                    class="text-red-700"
                    v-for="error of v$.password.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}! <!-- Validation errors for password input shown here -->
                  </p>
                </span>
                </div>
              </div>
               
                      <button class="mt-3 text-lg font-semibold 
                bg-red-700 w-full text-white rounded-lg
                px-6 py-3 block shadow-xl hover:text-white hover:bg-black" type="submit">
                Login
              </button>
              <span v-if="store.loginErr"> {{  store.loginErr }}! </span> <!-- Errors caught by the store login function will show here -->
            </div>
          </form>



</template>