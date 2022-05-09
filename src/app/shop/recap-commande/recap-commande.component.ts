import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Montre} from "../../core/model/Montre.interface";
import {ShopService} from "../../shared/services/shop.service";
import {Subject, takeUntil, tap} from "rxjs";
import {UtilsService} from "../../shared/services/utils.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recap-commande',
  templateUrl: './recap-commande.component.html',
  styleUrls: ['./recap-commande.component.scss']
})
export class RecapCommandeComponent implements OnInit {
  panier : Montre[] = [];
  ngUnsubscribed = new Subject();
  totalPanier! :number;

  constructor(private shopService : ShopService, private utilService : UtilsService, private router: Router) {
    utilService.setActiveFlexSubject(false);
  }

  ngOnInit(): void {
    this.panier = this.shopService.getPanierEnCours()
    if(this.panier.length === 0) {
      this.shopService.initCustomData();
      this.panier = this.shopService.getPanierEnCours()
      this.calculerTotalPanier();
    }
    this.shopService.panierSubject.pipe(
      tap(data => {
        if(data.length > 0) {
          this.panier = data;
          console.log(data);
          this.calculerTotalPanier();
        }
      }), takeUntil(this.ngUnsubscribed)
    ).subscribe()
  }



  redirectToLivraison() {
    this.router.navigate(['commande'])
  }

  calculerTotalPanier() {
    this.panier.forEach(montre => {
      this.totalPanier = parseInt(montre.price)
      console.log("total :", this.totalPanier)
    })
  }

}
