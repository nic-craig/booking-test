import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private storage: Storage) { }

  async saveCustomerId(customerId) {
    this.storage.set("customer_id", customerId).then((saveResponse) => {
      return saveResponse;
    })
  }

  async getCustomerId() {
    return this.storage.get("customer_id").then((customerId) => {
      return customerId;
    })
  }


  async getPort() {
    return this.storage.get("port").then((port) => {
      return port;
    })
  }

  async setPort() {
    return this.storage.set("port", "8060").then((port) => {
      return port;
    })
  }

  async setIsLoggedIn(status: boolean = false) {
    return this.storage.set("isAuthenticated", status).then((status) => {
      return status;
    })
  }

  getLoggedIn() {
    return this.storage.get("isAuthenticated").then((authenticatedStatus) => {
      return authenticatedStatus;
    })
  }

  clearUser() {
    return this.storage.set("isAuthenticated", false).then((authenticatedStatus) => {
      this.saveCustomerId("");
      return authenticatedStatus;
    })
  }
}
