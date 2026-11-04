import { Component, OnInit } from '@angular/core';
import { IonIcon, IonCol, IonGrid, IonRow, ModalController, IonItem, IonLabel, IonNote, IonList} from '@ionic/angular';

import { addIcons } from 'ionicons';
import { alert, beer, airplane, barbell, handLeft, hardwareChip, cafe, flash, bulb, cog, desktop,
         server, globe, rocket, shieldCheckmark, trophy, diamond, planet, ribbon } from 'ionicons/icons';

import itemsData from '../../../assets/data/items.json';

export interface Item {
  name: string;
  description: string;
  price: number;
  icon: string;
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  imports: [IonIcon, IonCol, IonGrid, IonRow, IonItem, IonLabel, IonNote, IonList],
})
export class ShopComponent  implements OnInit {

  clicks:number = 0;
  items: Item[] = [];
  
  constructor(private modalCtrl: ModalController) {
    addIcons({ alert, beer, airplane, barbell, flash, handLeft, hardwareChip, cafe, bulb, cog, desktop,
           server, globe, rocket, shieldCheckmark, trophy, diamond, planet, ribbon });
   }

  ngOnInit() {
    this.items = itemsData.items;
    this.clicks = Number(localStorage.getItem('clicks'));
  }

  buyItem(item: Item){
    return this.modalCtrl.dismiss(item, 'buy');
  }

}
