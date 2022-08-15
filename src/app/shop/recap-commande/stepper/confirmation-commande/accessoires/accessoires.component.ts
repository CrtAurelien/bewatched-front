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
  activeMessageMaxQuantity = false;

  constructor(private shopService: ShopService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    if(this.shopService.checkIfAccessoryIsInCard(this.accessory) !== undefined) {
      this.accessory = this.shopService.checkIfAccessoryIsInCard(this.accessory) || this.accessory;
    }
    this.shopService.accessoryUpdateSubject.subscribe(data => {
      if(data.id === this.accessory.id) {
        this.accessory = data;
      }
    })

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
    if(this.accessory.quantity && this.accessory.quantity === 14) {
      this.activeMessageMaxQuantity = true;
    }
    this.shopService.addToCartAccessory(this.accessory);
    this.cd.detectChanges()

  }

  deleteButton() {
    this.shopService.removeToCartAccessories(this.accessory);
    this.activeMessageMaxQuantity = false;
    if(this.shopService.checkIfAccessoryIsInCard(this.accessory) === undefined) {
      this.accessory.quantity = 0;
    }
    this.cd.detectChanges()
  }


}
