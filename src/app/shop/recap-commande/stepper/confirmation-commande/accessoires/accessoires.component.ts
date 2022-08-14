import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Accessory} from "../../../../../core/model/Accessory.interface";
import {ShopService} from "../../../../../shared/services/shop.service";
import {Montre} from "../../../../../core/model/Montre.interface";

@Component({
  selector: 'app-accessoires',
  templateUrl: './accessoires.component.html',
  styleUrls: ['./accessoires.component.scss']
})
export class AccessoiresComponent implements OnInit {
  popAccessoryPicture: any;
  accessoryIsOpen = false;
  accessoryIsAdd!: boolean;
  @Input()
  accessory!: Accessory;
  @Input()
  totalPanier!: number

  constructor(private shopService: ShopService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {

  }

  openEcrinsPictures(pop: any) {
    this.accessoryIsOpen = !this.accessoryIsOpen;
    this.popAccessoryPicture = pop;
    if(this.accessoryIsOpen) {
      pop.show();
    } else {
      pop.hide();
    }
  }

  shopButton(){
   // if (this.montreIsInCard) {
     // this.shopService.removeToCart(montre);
    //  this.textButton = "Ajouter au panier"
  //  }else {

      this.shopService.addToCartAccessory(this.accessory);
    //  this.textButton = "Supprimer du panier"
  //  }
   // this.montreIsInCard = !this.montreIsInCard
    this.cd.detectChanges()
  }

  deleteButton() {
    this.shopService.removeToCartAccessories(this.accessory);
    this.cd.detectChanges()
  }


}
