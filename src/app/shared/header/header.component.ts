import {ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import {BurgerService} from "../services/burger-service.service";
import {ShopService} from "../services/shop.service";
import {Subject, take, takeUntil, tap} from "rxjs";
import {Brand, Montre} from "../../core/model/Montre.interface";
import {Router} from "@angular/router";
import {Accessory} from "../../core/model/Accessory.interface";

// GSAP
import { gsap } from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {MotionPathPlugin} from "gsap/MotionPathPlugin";
import {Filtre, FiltreObject} from "../../core/model/Filtre.interface";
import {FiltresService} from "../services/filtres.service";
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);


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
  searchMarque = ''
  inputCertif = '';
  allMontresForSearch: Montre[] = [];
  searchResult: Montre[] = [];
  searchMarqueResult : Brand[] = [];
  toggleMobileSearch = false;
  resultatSearchCertificat!: any;
  noCertificatFound = false;
  accessories: Accessory[]= [];
  activeNewHeader = false;

  constructor(private burgerService: BurgerService, private cd: ChangeDetectorRef, private filtreService: FiltresService, private shopService: ShopService, private router: Router) { }


  ngOnInit(): void {
    gsap.to("#navbar", {
      scrub: 1,
      opacity:1,
      motionPath: {
        path: [{y: 0}]
      },
      transitionDuration: 0.7,
    })

    if(this.panier.length === 0) {
      this.shopService.initCustomData();
      this.panier = this.shopService.getPanierEnCours()
      this.badgePanier = this.shopService.badgeShopItems;
      this.accessories = this.shopService.accessoiresCommande;
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
    this.shopService.accessoiresCommandeSubject.subscribe(data => {
      this.accessories = data;
    })
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

  searchCertificat() {
    const montreCertif = this.allMontresForSearch.find(elm => elm.certificat?.toLowerCase() === ('BW-' + this.inputCertif).toLowerCase());
    if(montreCertif) {
      this.resultatSearchCertificat = montreCertif;
      this.noCertificatFound = false;
    } else {
      this.resultatSearchCertificat = null;
      this.noCertificatFound = true;
    }
  }

  onHidden(): void {
    if(this.panierIsOpen) {
      this.panierIsOpen = !this.panierIsOpen;
    }
  }

  onHiddenCertif(): void {
    if(this.certifIsOpen) {
      this.certifIsOpen = !this.certifIsOpen;
      this.resultatSearchCertificat = null;
      this.noCertificatFound = false;
      this.inputCertif = ''
    }
  }

  /**
   * Methode qui lance la recherche globale
   * @param event
   */
  search(event: any) {
    this.searchString = event.target.value;
    this.searchResult = this.shopService.generalSearch(this.searchString, this.allMontresForSearch);
    this.searchMarque = event.target.value
    this.searchMarqueResult = this.shopService.brandSearch(this.searchString, [...this.allMontresForSearch])
    console.log(this.searchMarqueResult)
  }

  test(name: string) {
    let filtre: FiltreObject = {
      name: name,
      estCoche: true
    }
    let test = this.filtreService.getFiltres().find(elm => elm.nom === 'Marque');
    this.shopService.filtreWanted = test;
    this.shopService.filterValueSelected = filtre;
    this.shopService.setredirectToSearchMarque(true);
    this.router.navigate(['shop']);


  }

  createCertif(event :any) {
    this.noCertificatFound = false;
    this.inputCertif = event.target.value;
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
