import { defineStore } from 'pinia'

export const servicesStore = defineStore({
  id: 'services',
  state: () => ({
    // Hardcoded a list of services with name and description properties
    services: [
      { _id:0,serviceName: 'Service 1', serviceDescription: 'This is the first service' },
      { _id:1,serviceName: 'Service 2', serviceDescription: 'This is the second service' },
      { _id:2,serviceName: 'Service 3', serviceDescription: 'This is the third service' }
    ]
  }),
  actions: {
    getServices(searchBy, serviceName, serviceDescription) {
      const services = this.services;
      if (searchBy === 'Service Name'){
        services = services.filter((service) => service.serviceName.includes(serviceName));
      } else if (searchBy ==='Services Description'){
        services = services.filter((service) => service.serviceDescription.includes(serviceDescription));
      }
      return services;
    },
    addService(service) {
      this.services.push(service);
    },

  }
})
