import { Injectable } from '@angular/core';
import {Montre} from "../../core/model/Montre.interface";
import {BehaviorSubject, Subject} from "rxjs";
import {Filtre, FiltreObject} from "../../core/model/Filtre.interface";
import {UtilsService} from "./utils.service";

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  panier: Montre[] = [];
  panierSubject = new Subject<Montre[]>()
  badgeShopItems = 0;
  badgeShopItemsSubject = new Subject<number>();
  montreWasDeleted = false;
  montreWasDeletedSubject = new Subject<boolean>();
  allMontres : Montre[] = [
    {
      id: 1,
      marque: 'omega',
      modele: 'pr100 sport chic',
      year: 1976,
      prix: 1490
    },
    {
      id: 2,
      marque: 'longines',
      modele: 'pr100 sport chic',
      year: 1976,
      prix: 1490
    },
    {
      id:3,
      marque: 'omega',
      modele: 'pr100 sport chic',
      year: 1976,
      prix: 1490
    },
    {
      id: 4,
      marque: 'longines',
      modele: 'pr100 sport chic',
      year: 1976,
      prix: 1490
    },
    {
      id: 5,
      marque: 'longines',
      modele: 'pr100 sport chic',
      year: 1976,
      prix: 1490
    },

    {
      id: 6,
      marque: 'omega',
      modele: 'pr100 sport chic',
      year: 1976,
      prix: 1490
    },
    {
      id: 7,
      marque: 'longines',
      modele: 'pr100 sport chic',
      year: 1976,
      prix: 1490
    },
    {
      id: 8,
      marque: 'omega',
      modele: 'pr100 sport chic',
      year: 1976,
      prix: 1490
    },
    {
      id: 9,
      marque: 'longines',
      modele: 'pr100 sport chic',
      year: 1976,
      prix: 1490
    },
    {
      id: 10,
      marque: 'longines',
      modele: 'pr100 sport chic',
      year: 1976,
      prix: 1490
    },

    {
      id: 11,
      marque: 'omega',
      modele: 'pr100 sport chic',
      year: 1976,
      prix: 1490
    },
    {
      id: 12,
      marque: 'longines',
      modele: 'pr100 sport chic',
      year: 1976,
      prix: 1490
    },
    {
      id: 13,
      marque: 'omega',
      modele: 'pr100 sport chic',
      year: 1976,
      prix: 1490
    }
  ];
  theme = 'theme-default';
  themeSubject = new BehaviorSubject<string>('theme-default')
  searchInProgress: string = '';
  searchingSubject = new BehaviorSubject<any>('');
  searchingbyMarque = new BehaviorSubject<string>('');
  categoriesFiltres : Filtre[] = []
  filtresActifs : string[] = [];
  resetAFilterSubject = new BehaviorSubject<any>('')

  constructor(private utilService: UtilsService) { }

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
    this.montreWasDeleted = true;
    this.panier.splice(this.panier.indexOf(montre, 1))
    this.badgeShopItems -= 1;
    this.panierSubject.next(this.panier)
    this.badgeShopItemsSubject.next(this.badgeShopItems)
    this.montreWasDeletedSubject.next(this.montreWasDeleted);
  }

  getAllMontres() : Montre[] {
    return this.allMontres;
  }

  getMontreById(idMontre: any) : Montre {
    return <Montre>this.allMontres.find(elm => elm.id === parseInt(idMontre));
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



  }
