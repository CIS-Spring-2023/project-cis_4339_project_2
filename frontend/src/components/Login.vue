<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API


export default {
    setup() {
        return { v$: useVuelidate({ $autoDirty: true }) }
    },

    data () {
        return {
            username: '',
            password: '',

            msg: '',

            users: [
                {
                    name: 'viewer',
                    pw: 'view',
                    role: 'read'
                },
                {
                    name: 'editor',
                    pw: 'edit',
                    role: 'write'
                }
            ]
        }
    },


    validations () {
        return {
            username: { required },
            password: { required }
        }
    },

    methods: {
      Login () {
      
        if (this.username == 'viewer' && this.password == 'view') {
            this.msg = 'Success! Logged in as a viewer.'
        }

        else if (this.username == 'editor' && this.password == 'edit') {
          this.msg = 'Nice! Logged in as an editor'
        }
        else {
          this.msg = 'Login attempt failed, please try again.'
        }
        }
      }


}


</script>

<template>
    <main>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Login
      </h1>
      <div class="px-10 py-20">
        <!-- @submit.prevent stops the submit event from reloading the page-->
        <form @submit.prevent="Login">
          <!-- grid container -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
          >
           <!-- <h2 class="text-2xl font-bold">Personal Details</h2> -->
            <!-- form field -->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">Username</span>
                <span style="color: #ff0000">*</span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="username"
                />
                <span class="text-black" v-if="v$.username.$error">
                  <p
                    class="text-red-700"
                    v-for="error of v$.username.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}!
                  </p>
                </span>
              </label>
            </div>
  
  
            <div></div>
            <!-- form field -->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">Password</span>
                <input
                  type="password"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="password"
                />
                <span class="text-black" v-if="v$.password.$error">
                  <p
                    class="text-red-700"
                    v-for="error of v$.password.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}!
                  </p>
                </span>
              </label>
            </div>
            <!-- submit button -->
            <div class="flex justify-between mt-100 mr-200">
              <button class="bg-red-700 text-white rounded" type="submit">
                Log In
              </button>

              <span> {{  msg }}</span>
            </div>
          </div>
        </form>
      </div>
    </main>
  </template>
  

