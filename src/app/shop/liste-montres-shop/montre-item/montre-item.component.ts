import {Component, Input, OnInit} from '@angular/core';
import {Montre} from "../../../core/model/Montre.interface";
import {ShopService} from "../../../shared/services/shop.service";
import {MontreItemPanierComponent} from "../../../shared/header/montre-item-panier/montre-item-panier.component";

@Component({
  selector: 'app-montre-item',
  templateUrl: './montre-item.component.html',
  styleUrls: ['./montre-item.component.scss']
})
export class MontreItemComponent implements OnInit {
  @Input()
  montre!: Montre
  montreIsAdd = false;


  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
  }

  ajouterMontre(montre: Montre) {
    this.shopService.addToCart(montre);
    this.montreIsAdd = !this.montreIsAdd
  }

}
