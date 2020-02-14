import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { MotorpointServiceService } from '../motorpoint-service.service';
import { LocalStorageService } from '../local-storage.service';
import { CookieService } from 'ngx-cookie-service';

import xml2js from 'xml2js';
let parseString = xml2js.parseString;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  emailInput: string = "peter.parker@test.com";
  passwordInput: string = "avenger1";
  isLoggedIn: boolean = false;
  loading;
  fullname = "";
  isGettingUserDetails = true;
  firstName = "[USERNAME]";

  constructor(
    private loadingController: LoadingController,
    private mpService: MotorpointServiceService,
    private toastController: ToastController,
    private localStorageService: LocalStorageService,
    private cookieService: CookieService
    ) {
      console.log("Port: ", this.cookieService.get("port").length);
      if(this.cookieService.get("port").length == 0)
      {
        this.cookieService.set("port", "8060");
        this.localStorageService.setPort();
      }

      this.localStorageService.getLoggedIn().then((authenticatedStatus) => {
        if(authenticatedStatus)
        {
          this.isLoggedIn = true;
          this.getCustomerDetails();
        }
      });
    }


  async submitLoginForm() {
    this.createLoadingController();

    await this.mpService.requestLogin(this.emailInput, this.passwordInput).then((loginResponseObject) => {

      const parentThis = this;
      parseString(loginResponseObject, function (err, result) {
        if(result.response.result[0].status == 0)
        {
          parentThis.localStorageService.saveCustomerId(result.response.data[0].customer_id[0]).then((response) => {
            parentThis.isLoggedIn = true;
            parentThis.isGettingUserDetails = true;
            parentThis.loadingController.dismiss();
            parentThis.localStorageService.setIsLoggedIn(true);
          })
        }
        
        if(result.response.result[0].status == 6)
        {
          parentThis.loadingController.dismiss();
          parentThis.presentToast("Your login doesn't appear to be correct - please try again.");
        }

        if(result.response.result[0].status == 99)
        {
          parentThis.loadingController.dismiss();
          parentThis.presentToast("Your login has expired - please try again.");
        }
      });
      
    })

  }

  showCustomerDetails() {
    
  }

  async getCustomerDetails() {
    this.localStorageService.getCustomerId().then((customerId) => {
      this.mpService.getCustomerDetails(customerId).then((customerObject) => {
        this.mpService.checkValidAuth(customerObject);
        const customerContactId = customerObject['data']['Customer::default_contact_id']['standard'];
        //$json['data']['Contacts'][$customerContactId]['first_name']['standard'];
        this.firstName = customerObject['data']['Contacts'][customerContactId]['first_name']['standard'];
        this.isGettingUserDetails = false;
      })
    })
    
  }

  getCustomerMemberships() {
    this.createLoadingController();
    this.localStorageService.getCustomerId().then((customerId) => {
      this.mpService.getCustomerMemberships(customerId).then((customerObject) => {
        console.log(customerObject);
        this.loadingController.dismiss();
      })
    })
    
  }

  async presentToast(messageText) {
    const toast = await this.toastController.create({
      message: messageText,
      duration: 2000
    });
    toast.present();
  }

  async createLoadingController()
  {
    const loading = await this.loadingController.create({
      message:'Checking Details..',
      spinner: 'dots'
    });

    return await loading.present();
  }

  async changeCookie() {
    this.mpService.showToughCookies();
  }

}
