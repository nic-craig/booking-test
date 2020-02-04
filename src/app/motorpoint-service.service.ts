import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class MotorpointServiceService {
  url = 'https://motorpointarenanottingham.com:8060';

  constructor(private http: HttpClient, private storage: Storage) { }


  requestLogin(username: string, password: string) {
    /**
     * Request authentication from the AudienceView API
     * map the result to return only the results that we need
     *
     * @param username username
     * @param password password
     * @returns promise
     */

   const requestUrl = this.url + '/app/WebAPI/session/authenticateUser';

   const formData: FormData = new FormData();
   formData.append('userid', username);
   formData.append('password', password);

   const bodyForm = 'userid=' + username + '&password=' + password +'&GET=customer_id';

   return fetch(requestUrl, {
      method: 'POST',
      body: bodyForm,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then((responseData) => {
      return responseData.text();
    })
    .then((responseDataObject) => {
      return responseDataObject;
    })

  }

  // Version 2 
  requestLoginv2(username: string, password: string) {
    /**
     * Request authentication from the AudienceView API
     * map the result to return only the results that we need
     *
     * @param username username
     * @param password password
     * @returns promise
     */

   const requestUrl = this.url + '/app/WebAPI/v2/session/authenticateUser';

   const formData: FormData = new FormData();
   formData.append('userid', username);
   formData.append('password', password);

   const jsonBody = {
     "userid": username,
     "password": password
   }
   const jsonBodyString = JSON.stringify(jsonBody);

   return fetch(requestUrl, {
      method: 'POST',
      body: jsonBodyString,
      headers: {'Content-Type': 'application/json'}
    })
    .then((responseData) => {
      /*
      this.storage.set('motorpointCustomerId', responseData).then((response) => {
        console.log('Saved Header');
      });
      */
      
      return responseData.json().then((json) => { console.log(json.body) })
    });

  }

  getCustomerDetails(customerId) {
    const requestUrl = this.url + '/app/WebAPI/v2/customer';

    const bodyData = {
      "actions": [
        {
          "method": "load",
          "params": {
            "Customer": {
              "customer_id": customerId
            }
          }
        }
      ],
      "objectName": "myCustomer",
      "get": [
        "Memberships"
      ]
    };
    var body = JSON.stringify(bodyData);

    return fetch(requestUrl, {
      method: 'POST',
      body: body,
      headers: {'Content-Type': 'application/json'}
    })
    .then((responseData) => {
      console.log(responseData);
      return responseData;
    });

  }


}
