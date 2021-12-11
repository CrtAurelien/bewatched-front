import { Injectable } from '@angular/core';
import {Montre} from "../../core/model/Montre.interface";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  panier: Montre[] = [];
  panierSubject = new Subject<Montre[]>()
  badgeShopItems = 0;

  constructor() { }

  addToCart(montre: Montre) {
    this.panier.push(montre);
  }

}
