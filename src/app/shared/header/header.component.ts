import {ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import {BurgerService} from "../services/burger-service.service";
import {ShopService} from "../services/shop.service";
import {Subject, take, takeUntil, tap} from "rxjs";
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
  certifIsOpen = false;
  ngUnsubscribe$ = new Subject();
  badgePanier = 0;
  panier: Montre[] = [];
  pop: any;
  popCertif: any;
  searchString = '';
  allMontresForSearch: Montre[] = [];
  searchResult: Montre[] = [];
  toggleMobileSearch = false;
  constructor(private burgerService: BurgerService, private cd: ChangeDetectorRef, private shopService: ShopService, private router: Router) { }


  ngOnInit(): void {
    if(this.panier.length === 0) {
      this.shopService.initCustomData();
      this.panier = this.shopService.getPanierEnCours()
      this.badgePanier = this.panier.length;
    }
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
    if(this.shopService.allMontres.length > 0) {
      this.allMontresForSearch = this.shopService.allMontres;
    } else {
      this.shopService.getAllMontres().pipe(
        tap(data => {
          this.allMontresForSearch = data;
        }), takeUntil(this.ngUnsubscribe$)
      ).subscribe()
    }
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

  openCertif(pop: any) {
    this.certifIsOpen = !this.certifIsOpen;
    this.popCertif = pop;
    if(this.certifIsOpen) {
      pop.show();
    } else {
      pop.hide();
    }
  }

  goToRecapPanier() {
    this.router.navigate(['recapitulatif-panier']);
    this.openPanier(this.pop);
    if (this.showBurgerMenu){
      this.toggleBurgerMenu();
    }
  }

  onHidden(): void {
    if(this.panierIsOpen) {
      this.panierIsOpen = !this.panierIsOpen;
    }
  }

  /**
   * Methode qui lance la recherche globale
   * @param event
   */
  search(event: any) {
    this.searchString = event.target.value;
    this.searchResult = this.shopService.generalSearch(this.searchString, this.allMontresForSearch);
  }

  deleteSearch() {
    this.searchString = '';
    this.searchResult = [];
  }

  redirectHome() {
    this.router.navigate(['/']);
  }

  redirectMontreDetailFromSearch(montreId: number) {
    this.toggleMobileSearch = false;
    if (this.showBurgerMenu){
      this.toggleBurgerMenu();
    }
    this.deleteSearch()
    this.redirectTo('/detail/'+montreId);
  }

  redirectTo(uri:string){
    this.toggleMobileSearch = false;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate([uri]));
  }

  toggleSearchMobile() {
    if (window.matchMedia("(max-width: 768px)").matches) {
      this.toggleMobileSearch = !this.toggleMobileSearch;
    }

  }

}
