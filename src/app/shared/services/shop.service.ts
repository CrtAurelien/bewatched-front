import { Injectable } from '@angular/core';
import {Montre} from "../../core/model/Montre.interface";
import {BehaviorSubject, Observable, Subject, tap} from "rxjs";
import {Filtre, FiltreObject} from "../../core/model/Filtre.interface";
import {UtilsService} from "./utils.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  panier: Montre[] = [];
  panierSubject = new BehaviorSubject<Montre[]>(this.panier)
  badgeShopItems = 0;
  badgeShopItemsSubject = new Subject<number>();
  montreWasDeleted = false;
  montreWasDeletedSubject = new Subject<boolean>();
  urlMontres = "http://localhost:8888/bewatched/public/api/watches"
  urlDetailMontre = "http://localhost:8888/bewatched/public/api/watch/"
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
  }

  removeToCart(montre: Montre) {
    if (this.badgeShopItems > 0){
      // TODO verfier si la montre est déjà présente dans la panier
      this.montreWasDeleted = true;
      this.panier.splice(this.panier.indexOf(montre, 1))
      this.badgeShopItems -= 1;
      this.panierSubject.next(this.panier)
      this.badgeShopItemsSubject.next(this.badgeShopItems)
      this.montreWasDeletedSubject.next(this.montreWasDeleted);
    }
  }

  getAllMontres() : Observable<Montre[]>{
    return this.http.get<Montre[]>(this.urlMontres);
  }

  checkIfMontreIsInCard(montre: Montre):boolean{
    const isInCard = this.getPanierEnCours().find(elm => elm.id === montre.id)
    return !!isInCard;
  }

  getMontreById(id: any): Observable<Montre>{
    const url = `${this.urlDetailMontre}${id}`;
    return this.http.get<Montre>(url);
  }

  switchTheme(marqueMontre: string) {
    switch (marqueMontre) {
      case 'omega':
        this.prevenirChangementTheme('theme-default')
        break;
      case 'longines':
        this.prevenirChangementTheme('theme-longines')
        break;
      case 'tissot':
        this.prevenirChangementTheme('theme-tissot')
        break
      default:
        this.prevenirChangementTheme('theme-default')
        break;
    }
  }

  getPanierEnCours() : Montre[] {
    return this.panier
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

  removeAFilter(filtre: FiltreObject) {
    this.filtresActifs.splice(this.filtresActifs.indexOf(filtre.nom), 1);
    this.resetAFilterSubject.next(filtre);
  }

  getCategorieFiltre(nomFiltre: string) : string{
    switch (nomFiltre) {
      case 'Oméga':
      case 'Longines':
      case 'Tissot':
        return 'marque'
      default:
        return ''
    }
  }

  getFiltresActifs() : string[] {
    return this.filtresActifs
  }


  generalSearch(stringSearch: string, listeMontre: Montre[]): Montre[] {
    const filterByName = [...listeMontre.filter(elm => this.utilService.removeDiacritics(elm.model).toLowerCase().includes(stringSearch))];
    const filterByBrand = [...listeMontre.filter(elm => this.utilService.removeDiacritics(elm.brand.name).toLowerCase().includes(stringSearch))];
    const searchResult = [...new Set([...filterByName ,...filterByBrand])]
    return searchResult
  }


  }
