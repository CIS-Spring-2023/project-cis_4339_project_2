<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import {servicesStore} from '../store/Services'
import { loggedInUser } from '../store/LoggedIn'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
   props: ['id'],
   setup() {
    const store = servicesStore()
    const user = loggedInUser()
    return {
        v$: useVuelidate({ $autoDirty: true}),
        store,
        user
    }
  },
  data() {
    return {
      // removed unnecessary extra array to track services

        service:{
            serviceName:'',
            serviceDescription:'',
        }
      
    }
  },
  created() {
    if (this.user.role != 'write') {
      this.$router.push('/')
    }
  const serviceId = this.$route.params.id;
  this.service = this.store.getService(serviceId)
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  methods: {
    async handleSubmitForm() {
      // Checks to see if there are any errors in validation
      const isFormCorrect = await this.v$.$validate()
      // If no errors found. isFormCorrect = True then the form is submitted
      if (isFormCorrect) {
        const serviceId = this.$route.params.id
        this.store.updateService(serviceId,this.service);
        this.$router.push({name:'findservices'})

      }
    }
  },
  // sets validations for the various data properties
  validations() {
    return {
      service: {
        serviceName: { required },
        serviceDescription: { required }
      }
    }
  }
}
</script>
<template>
  <main>
    <div>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Edit Services
      </h1>
    </div>
    <div class="px-10 py-20">
      <!-- @submit.prevent stops the submit event from reloading the page-->
      <form @submit.prevent="handleSubmitForm">
        <!-- grid container -->
        <div
        >
          <h2 class="text-2xl font-bold">Service Details</h2>

          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Service Name</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="service.serviceName"
              />
              <span class="text-black" v-if="v$.service.serviceName.$error">
                <p
                  class="text-red-700"
                  v-for="error of v$.service.serviceName.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}!
                </p>
              </span>
            </label>
          </div>

          <div></div>
          <div></div>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Service Description</span>
              <span style="color: #ff0000">*</span>
              <textarea
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="2"
                v-model="service.serviceDescription"
              ></textarea>
              <span class="text-black" v-if="v$.service.serviceDescription.$error">
                <p
                  class="text-red-700"
                  v-for="error of v$.service.serviceDescription.$errors"
                  :key="error.$uid"
                  
                >
                  {{ error.$message }}!
                </p>
              </span>
            </label>
          </div>

          <div></div>
          <div></div>
          <div></div>
          <!-- form field -->
        
        </div>

        <!-- grid container -->

        <div class="flex justify-between mt-10 mr-20">
          <button class="bg-red-700 text-white rounded" type="submit">
            Update Service
          </button>
        </div>
      </form>
    </div>
  </main>
</template>
