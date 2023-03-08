<script>
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API
import {servicesStore} from '../store/Services'

export default {
  setup() {
    const store = servicesStore()
    return { store }
  },
  data() {
    return {
      services: [],
      // Parameter for search to occur
      searchBy: '',
      serviceName: '',
      serviceDescription: ''
    }
  },
  created() {
    this.services = this.store.getServices();
  },
  methods: {
    handleSubmitForm() {
      this.services = this.store.getServices(this.searchBy, this.serviceName, this.serviceDescription);

    },
    // abstract get Servicess call
    getServices() {
      this.services = this.store.getServices();
      window.scrollTo(0, 0)
    },
    clearSearch() {
      // Resets all the variables
      this.searchBy = ''
      this.serviceName = ''
      this.serviceDescription = ''

      // get all entries
      this.getServices()
    },
    editServices(ServicesID) {
      this.$router.push({ name: 'updateServices', params: { id: ServicesID } })
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
        Find Services
      </h1>
    </div>
    <div class="px-10 pt-20">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <h2 class="text-2xl font-bold">Search Services By</h2>
        <!-- Displays Services Name search field -->
        <div class="flex flex-col">
          <select
            class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="searchBy"
          >
            <option value="Service Name">Service Name</option>
            <option value="Services Description">Services Description</option>
          </select>
        </div>
        <div class="flex flex-col" v-if="searchBy === 'Service Name'">
          <label class="block">
            <input
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="serviceName"
              v-on:keyup.enter="handleSubmitForm"
              placeholder="Enter Service Name"
            />
          </label>
        </div>
        <!-- Displays Services Number search field -->
        <div class="flex flex-col" v-if="searchBy === 'Services Description'">
          <input
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="text"
            v-model="serviceDescription"
            v-on:keyup.enter="handleSubmitForm"
            placeholder="Search Services description"
          />
        </div>
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <div></div>
        <div></div>
        <div class="mt-5 grid-cols-2">
          <button
            class="mr-10 border border-red-700 bg-white text-red-700 rounded"
            @click="clearSearch"
            type="submit"
          >
            Clear Search
          </button>
          <button
            class="bg-red-700 text-white rounded"
            @click="handleSubmitForm"
            type="submit"
          >
            Search Services
          </button>
        </div>
      </div>
    </div>

    <hr class="mt-10 mb-10" />
    <!-- Display Found Data -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
    >
      <div class="ml-10">
        <h2 class="text-2xl font-bold">List of Services</h2>
        <h3 class="italic">Click table row to edit/display an entry</h3>
      </div>
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Service Name</th>
              <th class="p-4 text-left">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr
              @click="editServices(service._id)"
              v-for="service in services"
              :key="service._id"
            >
              <td class="p-2 text-left">
                {{ service.serviceName }}
              </td>
              <td class="p-2 text-left">
                {{ service.serviceDescription }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
