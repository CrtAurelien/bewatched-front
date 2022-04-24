import { Component, OnInit } from '@angular/core';
import {Montre} from "../core/model/Montre.interface";
import {ShopService} from "../shared/services/shop.service";
import {last, Observable, Subject, take, takeUntil, tap} from "rxjs";
import {UtilsService} from "../shared/services/utils.service";
import {FiltreObject} from "../core/model/Filtre.interface";
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

  constructor(private shopService: ShopService, private utilService: UtilsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.shopService.getAllMontres().pipe(
      tap((data)  => {
        this.listeMontres = [...data] as Montre[]
        this.shopService.allMontres = data;
        this.nombreMontres = this.listeMontres.length;
        this.isLoading = false;
        this.createListesMontre();
      }), takeUntil(this.ngUnsubscribed)
    ).subscribe()

    this.shopService.searchingSubject.pipe(
      tap(data => {
        if(data !== '') {
          this.searchByFilter(data);
        }
      }), takeUntil(this.ngUnsubscribed)
    ).subscribe()


    this.shopService.resetAFilterSubject.pipe(
      tap(data => {
        if(data !== '') {
          this.removeFilter(data);
        }
      }), takeUntil(this.ngUnsubscribed)
    ).subscribe()
  }

  createListesMontre() {
    const nbBoucle = Math.round((this.listeMontres.length + 1) / 5);
    console.log(nbBoucle)
    for(let i = 0; i < nbBoucle; i++) {
      console.log('on boucle')
      const sousListe = this.listeMontres.splice(0, 5);
      this.finalListeMontre.push(sousListe);
    }
    console.log(this.finalListeMontre)
  }


  searchByFilter(filtreObj: FiltreObject){
    // Recuperer la categorie du filtre en cours
    const categorieFiltreEnCours = this.shopService.getCategorieFiltre(filtreObj.nom);
    // recuperer tous les filtres actuellement actif
    let allFiltreActifs = this.shopService.getFiltresActifs();
    this.startSearching(allFiltreActifs, filtreObj.nom);

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
    filtre.forEach(filter => {
      if(this.shopService.getCategorieFiltre(filter) === 'marque') {
        const filterFormate = this.utilService.removeDiacritics(filter).toLowerCase();
        console.log(allMontresDisponibles)
        resultatMarque.push(allMontresDisponibles.filter(elm => this.utilService.removeDiacritics(elm.brand.name)?.toLowerCase().includes(filterFormate)))
      }
    })
    resultatMarque.forEach(listeresult => {
      listeresult?.forEach((resultat : Montre) => {
        newListeMontre.push(resultat)
      })
    })

    this.listeMontres = newListeMontre;
    this.finalListeMontre = [];
    this.nombreMontres = this.listeMontres.length;
    this.createListesMontre();
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
