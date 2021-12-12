import {Component, Input, OnInit} from '@angular/core';
import {Montre} from "../../../core/model/Montre.interface";
import {ShopService} from "../../services/shop.service";

@Component({
  selector: 'app-montre-item-panier',
  templateUrl: './montre-item-panier.component.html',
  styleUrls: ['./montre-item-panier.component.scss']
})
export class MontreItemPanierComponent implements OnInit {
  @Input()
  montre!: Montre
  montreIsDeleted = false;

  constructor(private shopService : ShopService) { }

  ngOnInit(): void {
  }

  supprimerMontre(montre: Montre) {
    this.shopService.removeToCart(montre);
    this.montreIsDeleted = !this.montreIsDeleted
  }
}
