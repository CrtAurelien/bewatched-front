import { Injectable } from '@angular/core';
import {Montre} from "../../core/model/Montre.interface";
import {BehaviorSubject, Observable, Subject, tap} from "rxjs";
import {Filtre, FiltreObject} from "../../core/model/Filtre.interface";
import {UtilsService} from "./utils.service";
import {HttpClient} from "@angular/common/http";
import {Accessory} from "../../core/model/Accessory.interface";

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  panier: Montre[] = [];
  accessoiresCommande: Accessory[] = [];
  panierSubject = new BehaviorSubject<Montre[]>(this.panier)
  accessoiresCommandeSubject = new BehaviorSubject<Accessory[]>(this.accessoiresCommande)
  badgeShopItems = 0;
  badgeShopItemsSubject = new Subject<number>();
  montreWasDeleted = false;
  accessoryWasDeleted = false;
  montreWasDeletedSubject = new Subject<boolean>();
  accessoryWasDeletedSubject = new Subject<boolean>();
  urlMontres = "https://bewatched.fr/api-bewatched/public/api/watches"
  urlDetailMontre = "https://bewatched.fr/api-bewatched/public/api/watch/"
  urlHomeMontre = "https://bewatched.fr/api-bewatched/public/api/watch/home"
  urlAccessories = "https://bewatched.fr/api-bewatched/public/api/accessories"
  allMontres : Montre[] = [];
  montresSave: Montre[] = [];
  theme = 'theme-default';
  themeSubject = new BehaviorSubject<string>('theme-default')
  searchInProgress: string = '';
  searchingSubject = new BehaviorSubject<any>('');
  searchingbyMarque = new BehaviorSubject<string>('');
  categoriesFiltres : Filtre[] = []
  filtresActifs : string[] = [];
  resetAFilterSubject = new BehaviorSubject<any>('')
  montreMiseEnAvant!: Montre;
  redirectFromSearch = false;
  redirectFromSearchSubject = new Subject<boolean>();
  resetSubject = new Subject<boolean>();
  tarifCommande: number = 0;
  tarifCommandeSubject = new Subject<number>();
  montreIsInCard! : boolean;
  textButton = "Ajouter au panier";
  cgvControlChecked = false;
  cgvControlCheckedSubject = new Subject<boolean>()
  commandIsValid = false;
  commandIsValidSubject = new Subject<boolean>();
  commande: any;
  updateTarifCommandeSubject = new Subject<number>()
  accessoryUpdateSubject = new Subject<Accessory>()


  constructor(private utilService: UtilsService, private http: HttpClient) { }

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
    sessionStorage.setItem('panier', JSON.stringify(this.panier));
  }


  /**
   * Cette méthode ajouter au panier la montre passée en paramètre
   * Et met à jour le badge du panier
   * @param montre
   */
  addToCartAccessory(accessory: Accessory) {
    // TODO verfier si la montre est déjà présente dans la panier
    const accessoireDejaAjoute = this.accessoiresCommande.find(elm => elm.id === accessory.id)
    if(accessoireDejaAjoute) {
      if(accessoireDejaAjoute.quantity) {
        accessoireDejaAjoute.quantity += 1
      }
    } else {
      accessory.quantity = 1;
      this.accessoiresCommande.push(accessory);
    }
    this.badgeShopItems += 1;
    this.accessoryUpdateSubject.next(accessory);
    this.accessoiresCommandeSubject.next(this.accessoiresCommande);
    this.badgeShopItemsSubject.next(this.badgeShopItems);
    console.log(this.accessoiresCommande);
    sessionStorage.setItem('accessories', JSON.stringify(this.accessoiresCommande));
  }

  toggleCgvControlChecked(value: boolean) {
    this.cgvControlChecked = value;
    this.cgvControlCheckedSubject.next(this.cgvControlChecked);
  }

  toggleCommandIsValidSubject(value: boolean) {
    this.commandIsValid = value;
    this.commandIsValidSubject.next(this.commandIsValid);
  }

  updateTarifCommande(value: number) {
    this.tarifCommande = value;
    this.tarifCommandeSubject.next(this.tarifCommande);
  }


  removeToCart(montre: Montre) {
    if (this.badgeShopItems > 0){
      // TODO verfier si la montre est déjà présente dans la panier
      this.montreWasDeleted = true;
      this.panier.splice(this.panier.indexOf(montre, 1))
      this.badgeShopItems -= 1;
      if(this.panier.length === 0) {
        sessionStorage.removeItem('accessories');
      }
      this.panierSubject.next(this.panier)
      this.badgeShopItemsSubject.next(this.badgeShopItems)
      this.montreWasDeletedSubject.next(this.montreWasDeleted);

      sessionStorage.setItem('panier', JSON.stringify(this.panier));
    }
  }

  removeToCartAccessories(accessory: Accessory) {
    if (this.badgeShopItems > 0){
      // TODO verfier si la montre est déjà présente dans la panier
      this.accessoryWasDeleted = true;
      let accessoryContext = this.accessoiresCommande.find(elm => elm.id === accessory?.id);
      if(!!accessoryContext?.quantity && accessoryContext.quantity > 1) {
        accessoryContext.quantity -= 1;
        if(accessoryContext.quantity === 0) {
          this.accessoiresCommande.splice(this.accessoiresCommande.indexOf(accessory, 1))
        }
      } else {
        this.accessoiresCommande.splice(this.accessoiresCommande.indexOf(accessory, 1))
      }
      this.badgeShopItems -= 1;
      if(this.accessoiresCommande.length === 0) {
        sessionStorage.removeItem('accessories');
      }
      this.accessoiresCommandeSubject.next(this.accessoiresCommande)
      this.badgeShopItemsSubject.next(this.badgeShopItems)
      this.accessoryWasDeletedSubject.next(this.accessoryWasDeleted);
      sessionStorage.setItem('accessories', JSON.stringify(this.panier));
    }
  }

  getAllMontres() : Observable<Montre[]>{
    return this.http.get<Montre[]>(this.urlMontres);
  }

  getAccessories(): Observable<Accessory[]> {
    return this.http.get<Accessory[]>(this.urlAccessories);
  }

  checkIfMontreIsInCard(montre: Montre):boolean{
    const isInCard = this.getPanierEnCours().find(elm => elm.id === montre.id)
    return !!isInCard;
  }

  checkIfAccessoryIsInCard(accessory: Accessory): Accessory | undefined {
    const accessoryInCard = this.accessoiresCommande.find(elm => elm.id === accessory.id);
    if(!!accessoryInCard) {
      accessory = accessoryInCard
    }
    return accessoryInCard
  }

  getMontreById(id: any): Observable<Montre>{
    const url = `${this.urlDetailMontre}${id}`;
    return this.http.get<Montre>(url);
  }

  getHomeMontre(): Observable<Montre> {
    return this.http.get<Montre>(this.urlHomeMontre);
  }

  switchTheme(theme: string) {
    switch (theme) {
      case 'omega':
        this.prevenirChangementTheme('theme-omega')
        break;
      case 'longines':
        this.prevenirChangementTheme('theme-longines')
        break;
      case 'tissot':
        this.prevenirChangementTheme('theme-tissot')
        break
      case 'jaeger lecoultre':
        this.prevenirChangementTheme('theme-jaeger')
        break
      default:
        this.prevenirChangementTheme('theme-default')
        break;
    }
  }

  getPanierEnCours() : Montre[] {
    return this.panier
  }

  initCustomData() {
    const storage = sessionStorage.getItem('panier')
    const storageAccessories = sessionStorage.getItem('accessories');
    let badgeTmp = 0;
    if(storage) {
      this.panier = JSON.parse(storage) as Montre[]
      badgeTmp = this.panier.length;
      this.panierSubject.next(this.panier);
    }
    if(storageAccessories) {
      this.accessoiresCommande = JSON.parse(storageAccessories) as Accessory[]
      this.accessoiresCommande.forEach(accessory => {
        badgeTmp += accessory.quantity || 1;
      })
      this.accessoiresCommandeSubject.next(this.accessoiresCommande);
    }
    this.badgeShopItems = badgeTmp;
    console.log(this.badgeShopItems);
    this.badgeShopItemsSubject.next(this.badgeShopItems);
  }

  prevenirChangementTheme(theme: string) {
    this.theme = theme;
    this.themeSubject.next(this.theme)
  }

  searchWithFilter(filtre: Filtre, nomFiltreActive: FiltreObject) {
    if(!this.filtresActifs.find(elm => elm === nomFiltreActive.nom)) {
      this.filtresActifs.push(nomFiltreActive.nom);
    }
    this.searchingSubject.next(nomFiltreActive)
  }

  resetFilter() {
    this.filtresActifs = [];
  }
  resetAllFilters() {
    this.filtresActifs = [];
    this.resetSubject.next(true)
  }

  removeAFilter(filtre: FiltreObject) {
    this.filtresActifs.splice(this.filtresActifs.indexOf(filtre.nom), 1);
    this.resetAFilterSubject.next(filtre);
  }

  getCategorieFiltre(nomFiltre: string) : string{
    switch (nomFiltre) {
      case 'Oméga':
      case 'Longines':
      case 'Jaeger Lecoultre':
      case 'Tissot':
      case 'Zénith':
      case 'LIP':
      case 'Seiko':
      case 'Autres':
        return 'marque'
      case '1950':
      case '1960':
      case '1970':
      case '1980':
      case '1990':
        return 'annee'
      case 'Manuel':
        return 'mouvement'
      default:
        return ''
    }
  }

  getFiltresActifs() : string[] {
    return this.filtresActifs
  }


  generalSearch(stringSearch: string, listeMontre: Montre[]): Montre[] {
    const searchFormate = this.utilService.removeDiacritics(stringSearch).toLowerCase();
    const filterByName = [...listeMontre.filter(elm => this.utilService.removeDiacritics(elm.model).toLowerCase().includes(searchFormate))];
    const filterByBrand = [...listeMontre.filter(elm => this.utilService.removeDiacritics(elm.brand.name).toLowerCase().includes(searchFormate))];
    const searchResult = [...new Set([...filterByName ,...filterByBrand])]
    return searchResult
  }

  setRedirectFromSearch(value: boolean) {
    this.redirectFromSearch = value;
    this.redirectFromSearchSubject.next(this.redirectFromSearch);
  }

  }
