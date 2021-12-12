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
      marque: 'oméga',
      modele: 'pr100 sport chic',
      prix: 1490
    },
    {
      marque: 'longines',
      modele: 'pr100 sport chic',
      prix: 1490
    },
    {
      marque: 'oméga',
      modele: 'pr100 sport chic',
      prix: 1490
    },
    {
      marque: 'longines',
      modele: 'pr100 sport chic',
      prix: 1490
    },
    {
      marque: 'longines',
      modele: 'pr100 sport chic',
      prix: 1490
    },

    {
      marque: 'oméga',
      modele: 'pr100 sport chic',
      prix: 1490
    },
    {
      marque: 'longines',
      modele: 'pr100 sport chic',
      prix: 1490
    },
    {
      marque: 'oméga',
      modele: 'pr100 sport chic',
      prix: 1490
    },
    {
      marque: 'longines',
      modele: 'pr100 sport chic',
      prix: 1490
    },
    {
      marque: 'longines',
      modele: 'pr100 sport chic',
      prix: 1490
    },

    {
      marque: 'oméga 1',
      modele: 'pr100 sport chic',
      prix: 1490
    },
    {
      marque: 'longines 1',
      modele: 'pr100 sport chic',
      prix: 1490
    },
    {
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
