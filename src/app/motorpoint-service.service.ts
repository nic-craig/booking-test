import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import axios from 'axios';

/*
//const axiosCookieJarSupport = require('axios-cookiejar-support').default;
import axiosCookieJarSupport from 'axios-cookiejar-support';
//const tough = require('tough-cookie');
import tough from 'tough-cookie';

axios.defaults.withCredentials = true
axiosCookieJarSupport(axios);

const cookieJar = new tough.CookieJar();
*/

@Injectable({
  providedIn: 'root'
})
export class MotorpointServiceService {
  url = 'https://motorpointarenanottingham.com:8060';

  constructor(private http: HttpClient, private storage: Storage) {

  }


  async requestLogin(username: string, password: string) {
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

   /*
   let axiosConfig = {
      headers: {
          "Content-Type":"application/x-www-form-urlencoded;charset=utf-8",
      },
      withCredentials: true,
      credentials: 'same-origin'
    };

    return await axios.post(requestUrl, bodyForm, axiosConfig).then((responseData) => {
      return responseData;
    })
    .then((responseDataObject) => {
      return responseDataObject.data;
    })
    */

  
   return fetch(requestUrl, {
      method: 'POST',
      body: bodyForm,
      credentials: 'include',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then((responseData) => {
      responseData.headers.forEach(function(val, key) { console.log(key + ' -> ' + val); });
      return responseData.text();
    })
    .then((responseDataObject) => {
      return responseDataObject;
    })
    

  }

  async requestLoginAxios(username: string, password: string) {
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
   
   let axiosConfig = {
      headers: {
          "Content-Type":"application/x-www-form-urlencoded;charset=utf-8",
          "Accept":"/*/"
      },
      withCredentials: true
    };

    return await axios.post(requestUrl, bodyForm, axiosConfig).then((responseData) => {
      return responseData;
    })
    .then((responseDataObject) => {
      return responseDataObject.data;
    })

  }


  // Version 2 when AV is upgraded 
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
      return responseData.json().then((json) => { console.log(json.body) })
    });

  }

  async getCustomerDetails(customerId) {
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
        "Memberships",
        "Contacts"
      ]
    };
    var body = JSON.stringify(bodyData);

    /*
    let axiosConfig = {
      headers: {
          "Content-Type":"application/json;charset=utf-8",
      },
      withCredentials: true,
      crossdomain: true,
      credentials: 'same-origin'
    };

    return await axios.post(requestUrl, body, axiosConfig).then((responseData) => {
      return responseData;
    })
    .then((responseDataObject) => {
      return responseDataObject.data;
    })
    */

    
    return fetch(requestUrl, {
      method: 'POST',
      body: body,
      credentials: 'include',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
    })
    .then((responseData) => {
      return responseData;
    });
    

  }


}
