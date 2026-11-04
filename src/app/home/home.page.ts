import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
  ToastController, IonCol, IonGrid, IonRow, ModalController } from '@ionic/angular';

import { ShopComponent } from './shop/shop.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCol, IonGrid, IonRow],
})
export class HomePage implements OnInit{

  contador:number = 0;
  
  //Modifiers
  extra_clicks:number = 0;


  available_items: string[] = []; // Items from JSON
  enabled_items: string[] = []; // Bought Items

  constructor(private toastController: ToastController, private modalCtrl: ModalController, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.contador = Number(localStorage.getItem('clicks'));
    this.extra_clicks = Number(localStorage.getItem('extra_clicks'));
  }

  async openShop(){
    const modal = await this.modalCtrl.create({
      component: ShopComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (data.price <= this.contador){

      if (role === 'buy') {
      console.log(JSON.stringify(data));
      
        if(data.name === "Dedo Entrenado"){
          this.extra_clicks++;
          localStorage.setItem("extra_clicks", String(this.extra_clicks));
          this.restarClicks(data.price);
        }
      }

    }

    this.cdr.detectChanges();
    //window.location.reload();
    
  }

  contadorClicks(){
    // Incrementa el contador de clicks
    this.contador++;
    this.contador = this.contador + this.extra_clicks;
    
    console.log(this.contador);
    this.updateLocalStorageClicks();
  }

  async MostrarMensaje(msg:string){
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000,
      position: 'middle',
    });

    await toast.present();
  }

  restarClicks(num_clicks:number){
    this.contador = this.contador - num_clicks;
    this.updateLocalStorageClicks();
  }

  updateLocalStorageClicks(){
    localStorage.setItem('clicks', String(this.contador)); 
  }

}
