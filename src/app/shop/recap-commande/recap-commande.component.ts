import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Montre} from "../../core/model/Montre.interface";
import {ShopService} from "../../shared/services/shop.service";
import {Subject, takeUntil, tap} from "rxjs";
import {UtilsService} from "../../shared/services/utils.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Accessory} from "../../core/model/Accessory.interface";

@Component({
  selector: 'app-recap-commande',
  templateUrl: './recap-commande.component.html',
  styleUrls: ['./recap-commande.component.scss']
})
export class RecapCommandeComponent implements OnInit {
  panier : Montre[] = [];
  accessoriesPanier: Accessory[] = [];
  ngUnsubscribed = new Subject();
  totalPanier:number = 0;
  activeTemplatePanierVide = false;
  cgvControl = new FormGroup({
    checkCGV: new FormControl(false, Validators.required),
  })
  hasError = false;
  ecrinIsAdd = false;

  constructor(private shopService : ShopService, private utilService : UtilsService, private router: Router) {
    shopService.switchTheme('default')
    utilService.setActiveFlexSubject(true);
  }

  ngOnInit(): void {
    this.panier = this.shopService.getPanierEnCours()
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

      this.cgvControl.valueChanges.subscribe( _=> {
        this.hasError = false;
      })

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

    this.shopService.accessoiresCommandeSubject.pipe(
      tap(data => {
        this.accessoriesPanier = data;
        this.activeTemplatePanierVide = false;
        this.calculerTotalAccessoire();
      }), takeUntil(this.ngUnsubscribed)
    ).subscribe()
  }

  redirectToShop() {
    this.router.navigate(['shop'])
  }

  redirectToLivraison() {
    if(this.cgvControl.controls['checkCGV'].value) {
      this.router.navigate(['commande'])
    } else {
      this.hasError = true;
    }
  }

  calculerTotalPanier() {
    let totalTemp = 0;
    this.panier.forEach(montre => {
      totalTemp += parseInt(montre.price) || 0
    })
    this.totalPanier = totalTemp;
    this.shopService.updateTarifCommande(this.totalPanier);
  }

  calculerTotalAccessoire() {
    let totalTemp = 0;
    this.panier.forEach(montre => {
      totalTemp += parseInt(montre.price) || 0
    })
    this.accessoriesPanier.forEach(accessory => {
      if(!!accessory.quantity && accessory.quantity > 1) {
        for(let i =0; i< accessory.quantity; i++) {
          totalTemp += accessory.price
        }
      } else {
        totalTemp += accessory.price
      }
    })
    this.totalPanier = totalTemp;
    this.shopService.updateTarifCommande(this.totalPanier);
  }



}
