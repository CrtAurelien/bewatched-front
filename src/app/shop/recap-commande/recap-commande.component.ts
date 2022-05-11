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
  totalPanier:number = 0;
  activeTemplatePanierVide = false;

  constructor(private shopService : ShopService, private utilService : UtilsService, private router: Router) {
    utilService.setActiveFlexSubject(true);
  }

  ngOnInit(): void {
    this.panier = this.shopService.getPanierEnCours()
    this.shopService.switchTheme('default')
    if(this.panier.length === 0) {
      this.shopService.initCustomData();
      this.panier = this.shopService.getPanierEnCours()
      if(this.panier.length === 0) {
        this.totalPanier = 0;
        this.activeTemplatePanierVide = true;
      } else {
        this.calculerTotalPanier();
        this.activeTemplatePanierVide = false;
      }

    }
    this.shopService.panierSubject.pipe(
      tap(data => {
        if(data.length > 0) {
          this.panier = data;
          this.activeTemplatePanierVide = false;
          this.calculerTotalPanier();
        } else {
          this.totalPanier = 0;
          this.activeTemplatePanierVide = true;
        }
      }), takeUntil(this.ngUnsubscribed)
    ).subscribe()
  }

  redirectToShop() {
    this.router.navigate(['shop'])
  }

  redirectToLivraison() {
    this.router.navigate(['commande'])
  }

  calculerTotalPanier() {
    this.panier.forEach(montre => {
      this.totalPanier += parseInt(montre.price) || 0
    })
    this.shopService.tarifCommande = this.totalPanier;
  }

}
