import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { MotorpointServiceService } from '../motorpoint-service.service';
var parseString = require('xml2js').parseString;

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

  constructor(
    private loadingController: LoadingController,
    private mpService: MotorpointServiceService,
    private toastController: ToastController
    ) {}


  submitLoginForm() {
    this.createLoadingController();

    this.mpService.requestLogin(this.emailInput, this.passwordInput).then((loginResponseObject) => {

      const parentThis = this;
      parseString(loginResponseObject, function (err, result) {
        if(result.response.result[0].status == 0)
        {
          console.log(result.response.data[0].customer_id[0])
          parentThis.loadingController.dismiss();
        }
      });
      
    })

  }

  getCustomerDetails() {
    //this.mpService.getCustomerDetails()
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

}
