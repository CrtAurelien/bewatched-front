import {Component, Input, OnInit} from '@angular/core';
import {Montre} from "../../core/model/Montre.interface";
import {ShopService} from "../../shared/services/shop.service";
import {Subject, takeUntil, tap} from "rxjs";
import {UtilsService} from "../../shared/services/utils.service";

@Component({
  selector: 'app-recap-commande',
  templateUrl: './recap-commande.component.html',
  styleUrls: ['./recap-commande.component.scss']
})
export class RecapCommandeComponent implements OnInit {
  panier : Montre[] = [];
  ngUnsubscribed = new Subject();

  constructor(private shopService : ShopService, private utilService : UtilsService) {
    utilService.setActiveFlexSubject(false);
  }

  ngOnInit(): void {
    this.panier = this.shopService.getPanierEnCours()
    this.shopService.panierSubject.pipe(
      tap(data => {
        this.panier = data;
      }), takeUntil(this.ngUnsubscribed)
    ).subscribe()
  }
}
