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
  badgeShopItemsSubject = new Subject<number>()

  constructor() { }

  /**
   * Cette méthode ajouter au panier la montre passée en paramètre
   * Et met à jour le badge du panier
   * @param montre
   */
  addToCart(montre: Montre) {
    // TODO verfier si la montre est déjà présente dans la panier
    this.panier.push(montre);
    this.badgeShopItems += 1;
    this.panierSubject.next(this.panier);
    this.badgeShopItemsSubject.next(this.badgeShopItems);
  }

  removeToCart(montreParam: Montre) {
    // TODO supprimer du panier
  }

}