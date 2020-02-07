import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators'; 
import { LocalStorageService } from './local-storage.service';
import xml2js from 'xml2js';
let parseString = xml2js.parseString;

declare var require: any;

const axios = require('axios');
axios.default;
const axiosCookieJarSupport = require('axios-cookiejar-support');
axiosCookieJarSupport.default;
const tough = require('tough-cookie');

axiosCookieJarSupport(axios);
axios.defaults.jar = new tough.CookieJar();

const cookieJar = new tough.CookieJar();

@Injectable({
  providedIn: 'root'
})
export class MotorpointServiceService {
  url;
  port;

  constructor(private http: HttpClient, private storage: Storage, private localStorage: LocalStorageService) {
    this.localStorage.getPort().then((port) => {
      if(port !== undefined && port !== null)
      {
        this.url = 'https://motorpointarenanottingham.com:'+port;
      }
      else {
        this.url = 'https://motorpointarenanottingham.com';
      }
    })
    
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

   const requestUrl = '/app/WebAPI/session/authenticateUser';

   const formData: FormData = new FormData();
   formData.append('userid', username);
   formData.append('password', password);

   const bodyForm = 'userid=' + username + '&password=' + password +'&GET=customer_id';

  
   return fetch(requestUrl, {
      method: 'POST',
      body: bodyForm,
      credentials: 'include',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then((responseData) => {
      responseData.headers.forEach(console.log);
      return responseData.text();
    })
    .then((responseDataObject) => {
      return responseDataObject;
    })
    

  }

  async requestLoginHttp(username: string, password: string) {

    const requestUrl = this.url + '/app/WebAPI/session/authenticateUser';

    const formData: FormData = new FormData();
    formData.append('userid', username);
    formData.append('password', password);
    formData.append('GET', 'customer_id');

    return this.http.post(requestUrl, formData, { observe: 'response', responseType: 'text', withCredentials: true }).subscribe((resp: HttpResponse<any>) => {
      console.log(resp.headers)
    });
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
      withCredentials: true,
      credentials: 'same-origin',
      mode: 'no-cors',
      jar: cookieJar
    };

    return await axios.post(requestUrl, bodyForm, axiosConfig).then((responseData) => {
      console.log(responseData);
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
    const requestUrl = '/app/WebAPI/v2/customer';

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
    
    return fetch(requestUrl, {
      method: 'POST',
      body: body,
      credentials: 'include',
      headers: {'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json'}
    })
    .then((responseData) => {
      return responseData;
    });
    

  }

  async getCustomerDetailsAxios(customerId) {
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

    
    let axiosConfig = {
      headers: {
          "Content-Type":"application/json;charset=utf-8",
          "Accept":"*/*"
      },
      mode: 'no-cors',
      withCredentials: true,
      credentials: 'same-origin',
      jar: cookieJar
    };

    return await axios.post(requestUrl, body, axiosConfig).then((responseData) => {
      return responseData;
    })
    .then((responseDataObject) => {
      return responseDataObject.data;
    })
    

  }


  showToughCookies() {

    /*
    cookieJar.setCookie('test=1234; path=/; domain=localhost.test', 'http://localhost.test', function(err, cookie) {
      console.log(cookie);
      console.log(err);
    });
    */


    cookieJar.getCookies('https://motorpointarenanottingham.com',function(err,cookies) {
      console.log(cookies);
    });
  }


}
