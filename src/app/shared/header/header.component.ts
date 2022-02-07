import {Component, HostListener, OnInit} from '@angular/core';
import {BurgerService} from "../services/burger-service.service";
import {ShopService} from "../services/shop.service";
import {Subject, takeUntil, tap} from "rxjs";
import {Montre} from "../../core/model/Montre.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showBurgerMenu = false;
  panierIsOpen = false;
  ngUnsubscribe$ = new Subject();
  badgePanier = 0;
  panier: Montre[] = [];
  pop: any;
  constructor(private burgerService: BurgerService, private shopService: ShopService, private router: Router) { }


  ngOnInit(): void {
    this.shopService.badgeShopItemsSubject.pipe(
      tap(data => {
        this.badgePanier = data;
      }), takeUntil(this.ngUnsubscribe$)
    ).subscribe();
    this.shopService.panierSubject.pipe(
      tap(data => {
        this.panier = data;
      }), takeUntil(this.ngUnsubscribe$)
    ).subscribe()
  }

  toggleBurgerMenu() {
    this.showBurgerMenu = !this.showBurgerMenu;
    this.burgerService.setBurgerMenuIsOpen(this.showBurgerMenu);
  }

  openPanier(pop: any) {
    this.panierIsOpen = !this.panierIsOpen;
    this.pop = pop;
    if(this.panierIsOpen) {
      pop.show();
    } else {
      pop.hide();
    }
  }

  goToRecapPanier() {
    this.router.navigate(['recapitulatif-panier']);
    this.openPanier(this.pop);
  }

  onHidden(): void {
    if(this.panierIsOpen) {
      this.panierIsOpen = !this.panierIsOpen;
    }
  }

  search(event: any) {
    this.shopService.searching(event.target.value);}

}
