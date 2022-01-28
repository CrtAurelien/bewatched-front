import { Component, OnInit } from '@angular/core';
import {Montre} from "../core/model/Montre.interface";
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  listeMontres: Montre[] = [
    {
      id: 1,
      marque: 'oméga',
      modele: 'pr100 sport chic',
      prix: 1490
    },
    {
      id: 2,
      marque: 'longines',
      modele: 'pr100 sport chic',
      prix: 1490
    },
    {
      id:3,
      marque: 'oméga',
      modele: 'pr100 sport chic',
      prix: 1490
    },
    {
      id: 4,
      marque: 'longines',
      modele: 'pr100 sport chic',
      prix: 1490
    },
    {
      id: 5,
      marque: 'longines',
      modele: 'pr100 sport chic',
      prix: 1490
    },

    {
      id: 6,
      marque: 'oméga',
      modele: 'pr100 sport chic',
      prix: 1490
    },
    {
      id: 7,
      marque: 'longines',
      modele: 'pr100 sport chic',
      prix: 1490
    },
    {
      id: 8,
      marque: 'oméga',
      modele: 'pr100 sport chic',
      prix: 1490
    },
    {
      id: 9,
      marque: 'longines',
      modele: 'pr100 sport chic',
      prix: 1490
    },
    {
      id: 10,
      marque: 'longines',
      modele: 'pr100 sport chic',
      prix: 1490
    },

    {
      id: 11,
      marque: 'oméga 1',
      modele: 'pr100 sport chic',
      prix: 1490
    },
    {
      id: 12,
      marque: 'longines 1',
      modele: 'pr100 sport chic',
      prix: 1490
    },
    {
      id: 13,
      marque: 'oméga 1',
      modele: 'pr100 sport chic',
      prix: 1490
    }
  ]
  nombreMontres = 0;

  finalListeMontre : any[] = [];


  constructor() { }

  ngOnInit(): void {
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
