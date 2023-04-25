import { defineStore } from 'pinia'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API
export const servicesStore = defineStore({
  id: 'services',
  state: () => ({
    // Hardcoded a list of services with name and description properties
    services: []
  }),
  actions: {
    getServices(searchBy, serviceName, serviceDescription) { // method for filtering and returning services search results
      console.log(this.getServices)
      if (searchBy === 'Service Name') {
        this.services = this.services.filter((service) => service.serviceName.includes(serviceName));
      } else if (searchBy === 'Services Description') {
        this.services = this.services.filter((service) => service.serviceDescription.includes(serviceDescription));
      }
      return this.services.filter((s) => s.active); // return function will always return active-only services
    },
    // CRUD methods found below
    getService(id) {
      let services = this.services;
      let service = services.find((service) => service._id == id)
      return service;
    },
    addService(service) {
      let s = this.services.findIndex((serv) => serv.serviceName == service.serviceName)
      // A conditional block is used to check if the added service is already in the list of services
      if (s != -1){
        this.services[s].active = true;
      } // If it is, simply make sure it's active...
      else {
      this.services.push(
        {_id: this.increment++,
        serviceName: service.serviceName,
        serviceDescription: service.serviceDescription,
        active: true }
        )} // ...otherwise, add it into the array
        
    }
  }
}
)
