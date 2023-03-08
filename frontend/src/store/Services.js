import { defineStore } from 'pinia'

export const servicesStore = defineStore({
  id: 'services',
  state: () => ({
    // Hardcoded a list of services with name and description properties
    services: [
      { _id: '0', serviceName: 'Service 1', serviceDescription: 'This is the first service', active: true },
      { _id: '1', serviceName: 'Service 2', serviceDescription: 'This is the second service', active: true},
      { _id: '2', serviceName: 'Service 3', serviceDescription: 'This is the third service', active: true}
    ],
    increment: 2
  }),
  actions: {
    getServices(searchBy, serviceName, serviceDescription) {
      let services = this.services;
      if (searchBy === 'Service Name') {
        services = services.filter((service) => service.serviceName.includes(serviceName));
      } else if (searchBy === 'Services Description') {
        services = services.filter((service) => service.serviceDescription.includes(serviceDescription));
      }
      return services.filter((s) => s.active);
    },
    updateService(id,service) {
      let services = this.services;
      let index = services.findIndex((service) => service._id === id)
      this.services[index] = service
    },
    getService(id) {
      let services = this.services;
      let service = services.find((service) => service._id === id)
      return service;
    },
    addService(service) {
      let s = this.services.findIndex((serv) => serv == service)
      if (s != -1){
        this.services[s].active = true;
      }
      else {
      this.services.push({_id: this.increment++,
        serviceName: service.serviceName,
        serviceDescription: service.serviceDescription,
        active: true }) }
    }
  }
}
)
