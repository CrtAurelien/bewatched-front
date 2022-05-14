import { Component, OnInit } from '@angular/core';
import {Montre} from "../core/model/Montre.interface";
import {ShopService} from "../shared/services/shop.service";
import {last, Observable, Subject, take, takeUntil, tap} from "rxjs";
import {UtilsService} from "../shared/services/utils.service";
import {FiltreObject} from "../core/model/Filtre.interface";
import {BurgerService} from "../shared/services/burger-service.service";
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  listeMontres: Montre[] = [];
  nombreMontres = 0;
  ngUnsubscribed = new Subject();
  finalListeMontre : any[] = [];
  listeSearchEnCours : Montre[] = [];
  isLoading = false;
  noMontresAvailable = false;
  servorError = false;

  constructor(private shopService: ShopService, private utilService: UtilsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.shopService.switchTheme('default')
    this.shopService.getAllMontres().pipe(
      tap((data)  => {
        this.servorError = false;
        this.listeMontres = [...data] as Montre[]
        this.shopService.allMontres = data;
        this.nombreMontres = this.listeMontres.length;
        this.isLoading = false;
        let nbNombreAvailable = 0;
        this.listeMontres.forEach(montre => {
          if(montre.available) {
            nbNombreAvailable += 1;
          }
        })
        if(nbNombreAvailable > 0) {
          this.noMontresAvailable = false;
          this.createListesMontre();
        } else {
          this.noMontresAvailable= true;
        }
      }), takeUntil(this.ngUnsubscribed)
    ).subscribe(_ => {},
        error => {
      this.servorError = true;
    })

    this.shopService.searchingSubject.pipe(
      tap(data => {
        if(data !== '') {
          this.searchByFilter(data);
        }
      }), takeUntil(this.ngUnsubscribed)
    ).subscribe()

    this.shopService.resetSubject.subscribe(data => {
      if(data) {
        this.reset()
      }
    })

    this.shopService.resetAFilterSubject.pipe(
      tap(data => {
        if(data !== '') {
          this.removeFilter(data);
        }
      }), takeUntil(this.ngUnsubscribed)
    ).subscribe()
  }

  createListesMontre() {
    let nbBoucle = 0;
    if (this.listeMontres.length >= 5){
      nbBoucle = Math.round((this.listeMontres.length + 1) / 5);
    }else{
      nbBoucle = ((this.listeMontres.length + 1) / 5);
    }
    for(let i = 0; i < nbBoucle; i++) {
      const sousListe = this.listeMontres.splice(0, 5);
      this.finalListeMontre.push(sousListe);
    }
  }


  searchByFilter(filtreObj: FiltreObject){
    // Recuperer la categorie du filtre en cours
    const categorieFiltreEnCours = this.shopService.getCategorieFiltre(filtreObj.nom);
    // recuperer tous les filtres actuellement actif
    let allFiltreActifs = this.shopService.getFiltresActifs();
    if(allFiltreActifs.length > 0) {
      this.startSearching(allFiltreActifs, filtreObj.nom);
    }

  }

  reset() {
    this.listeMontres =  JSON.parse(JSON.stringify(this.shopService.allMontres));
    this.nombreMontres = this.listeMontres.length;
    this.finalListeMontre = [];
    this.createListesMontre();
  }

  startSearching(filtre : any[], lastFilter : string) {
    let newListeMontre : Montre[] = [];
    // On recuperer dans une variable tmp la liste de toutes les montres
    let allMontresDisponibles =  [...JSON.parse(JSON.stringify(this.shopService.allMontres))];
    let resultatMarque : any[]= [];
    let resultatYears: any[] = [];
    let resultatsMouvement: any[] = [];
    filtre.forEach(filter => {
      if(this.shopService.getCategorieFiltre(filter) === 'marque') {
        const filterFormate = this.utilService.removeDiacritics(filter).toLowerCase();
        resultatMarque.push(allMontresDisponibles.filter(elm => this.utilService.removeDiacritics(elm?.brand?.name)?.toLowerCase().includes(filterFormate)))
      }
      if(this.shopService.getCategorieFiltre(filter) === 'annee') {
        resultatYears.push(allMontresDisponibles.filter(elm => elm.year === parseInt(filter)))
      }
      if(this.shopService.getCategorieFiltre(filter) === 'mouvement') {
        const filterFormate = this.utilService.removeDiacritics(filter).toLowerCase();
        const filtreMovementEnum = this.formatMovmentFilter(filterFormate)
        resultatsMouvement.push(allMontresDisponibles.filter(elm => elm.movement.toLowerCase().includes(filtreMovementEnum)))
      }
    })
    resultatMarque.forEach(listeresult => {
      listeresult?.forEach((resultat : Montre) => {
        if(!newListeMontre.includes(resultat)) {
          newListeMontre.push(resultat)
        }
      })
    })
    resultatYears.forEach(listeresult => {
      listeresult?.forEach((resultat : Montre) => {
        if(!newListeMontre.includes(resultat)) {
          newListeMontre.push(resultat)
        }
      })
    })
    resultatsMouvement.forEach(listeresult => {
      listeresult?.forEach((resultat : Montre) => {
        if(!newListeMontre.includes(resultat)) {
          newListeMontre.push(resultat)
        }
      })
    })

  this.listeMontres = newListeMontre
    this.finalListeMontre = [];
    this.nombreMontres = this.listeMontres.length;
    this.createListesMontre();
  }

  formatMovmentFilter(filtre: string): string {
    switch (filtre) {
      case 'Manuel':
        return 'manual'
      default:
        return ''
    }

  }

  removeFilter(filtreObj: FiltreObject) {
    let allFiltreActifs = this.shopService.getFiltresActifs();
    // si deja present, on veut supprimer le filtre
    if(allFiltreActifs.length === 0) {
      this.reset()
    } else {
      this.startSearching(allFiltreActifs, filtreObj.nom)
    }
  }
}
