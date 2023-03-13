import { defineStore } from 'pinia'

export const servicesStore = defineStore({
  id: 'services',
  state: () => ({
    // Hardcoded a list of services with name and description properties
    services: [
      { _id: 0, serviceName: 'Family Support', serviceDescription: 'Group-oriented Activities', active: true },
      { _id: 1, serviceName: 'Adult Education', serviceDescription: 'Classes for Adults', active: true},
      { _id: 2, serviceName: 'Youth Services Program', serviceDescription: 'Activities for Children', active: true},
      { _id: 3, serviceName: 'Early Childhood Education', serviceDescription: 'Education for Toddlers', active: true},
    ],
    increment: 4
  }),
  actions: {
    getServices(searchBy, serviceName, serviceDescription) { // method for filtering and returning services search results
      let services = this.services;
      if (searchBy === 'Service Name') {
        services = services.filter((service) => service.serviceName.includes(serviceName));
      } else if (searchBy === 'Services Description') {
        services = services.filter((service) => service.serviceDescription.includes(serviceDescription));
      }
      return services.filter((s) => s.active); // return function will always return active-only services
    },
    // CRUD methods found below

    updateService(id,service) {
      let services = this.services;
      let index = services.findIndex((service) => service._id == id)
      this.services[index] = service
    },
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
