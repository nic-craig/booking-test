import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  emailInput: string;
  passwordInput: string;

  constructor(private loadingController: LoadingController) {}


  submitLoginForm() {
    console.log("Form Submitted!");
    this.createLoadingController();
  }

  async createLoadingController()
  {
    const loading = await this.loadingController.create({
      message:'Checking Details..',
      spinner: 'dots'
    });

    loading.present();
  }

}
