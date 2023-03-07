import { defineStore } from 'pinia'

export const servicesStore = defineStore({
  id: 'services',
  state: () => ({
    servicesList: []
  }),
  actions: {
    getServices() {
      // Hardcoded a list of services with name and description properties
      const servicesList = [
        { _id:0,serviceName: 'Service 1', serviceDescription: 'This is the first service' },
        { _id:1,serviceName: 'Service 2', serviceDescription: 'This is the second service' },
        { _id:2,serviceName: 'Service 3', serviceDescription: 'This is the third service' }
      ]
      // Update the servicesList state
      this.servicesList = servicesList
      return this.servicesList
    }
  }
})
