import { Component, OnInit } from '@angular/core';
import {Montre} from "../core/model/Montre.interface";
import {ShopService} from "../shared/services/shop.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  listeMontres: Montre[] = []
  nombreMontres = 0;

  finalListeMontre : any[] = [];


  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    // On fait une copie de l'objet get par le service, car d'autre component travaillent avec cette liste
    // Sans le JSON PARSE / STRINGIFY l'instance de l'objet est partagée partout.
    this.listeMontres =  JSON.parse(JSON.stringify(this.shopService.getAllMontres()));
    this.nombreMontres = this.listeMontres.length;
    this.createListesMontre()
  }

  createListesMontre() {
    const nbBoucle = (this.listeMontres.length + 1) / 5;
    for(let i = 0; i < nbBoucle; i++) {
      const sousListe = this.listeMontres.splice(0, 5);
      this.finalListeMontre.push(sousListe);
    }
  }




}
