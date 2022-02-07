import { Component, OnInit } from '@angular/core';
import {Montre} from "../core/model/Montre.interface";
import {ShopService} from "../shared/services/shop.service";
import {Subject, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  listeMontres: Montre[] = []
  nombreMontres = 0;
  ngUnsubscribed$ = new Subject();
  finalListeMontre : any[] = [];


  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    // On fait une copie de l'objet get par le service, car d'autre component travaillent avec cette liste
    // Sans le JSON PARSE / STRINGIFY l'instance de l'objet est partagée partout.
    this.listeMontres =  JSON.parse(JSON.stringify(this.shopService.getAllMontres()));
    this.nombreMontres = this.listeMontres.length;
    this.createListesMontre();
    this.shopService.searchingSubject.pipe(
      tap(data => {
        if(data !== '') {
          this.filterMontresWithSearch(data)
        } else {
          this.reset();
        }

      }), takeUntil(this.ngUnsubscribed$)
    ).subscribe()
  }

  createListesMontre() {
    const nbBoucle = (this.listeMontres.length + 1) / 5;
    for(let i = 0; i < nbBoucle; i++) {
      const sousListe = this.listeMontres.splice(0, 5);
      this.finalListeMontre.push(sousListe);
    }
  }

  filterMontresWithSearch(data : string) {
    let listeTmp : Montre[] =  JSON.parse(JSON.stringify(this.shopService.getAllMontres()));
    this.finalListeMontre = []
    let newListeMontre : Montre[] = [];
    let searchInMarque : Montre[] = [];
    let searchInRef : Montre[]= [];
    searchInMarque = listeTmp.filter(elm => elm.marque.includes(data));
    if(searchInMarque.length === 0) {
      searchInRef = listeTmp.filter(elm => elm.modele.includes(data))
    }
    newListeMontre = searchInMarque.concat(searchInRef);
    this.listeMontres = newListeMontre;
    this.nombreMontres = this.listeMontres.length;
    this.createListesMontre();
  }

  reset() {

  }




}
