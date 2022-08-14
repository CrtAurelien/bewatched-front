import {Component, Input, OnInit} from '@angular/core';
import {Montre} from "../../../core/model/Montre.interface";
import {ShopService} from "../../services/shop.service";
import {Accessory} from "../../../core/model/Accessory.interface";

@Component({
  selector: 'app-accessory-item-panier',
  templateUrl: './accessory-item-panier.component.html',
  styleUrls: ['./accessory-item-panier.component.scss']
})
export class AccessoryItemPanierComponent implements OnInit {
  @Input()
  accessory!: Accessory
  pathImageDetail!: string;

  constructor(private shopService : ShopService) { }

  ngOnInit(): void {
    if(this.accessory.photos) {
      this.accessory.photos.forEach(photo => {
        if(photo.isPhotoDetail) {
          this.pathImageDetail = photo.path;
        }
      })
    }

  }

  supprimerMontre() {
    this.shopService.removeToCartAccessories(this.accessory);
  }

}
