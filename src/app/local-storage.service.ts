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
}
