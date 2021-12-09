import { Component, OnInit } from '@angular/core';
import {Montre} from "../../core/model/Montre.interface";

@Component({
  selector: 'app-liste-montres-shop',
  templateUrl: './liste-montres-shop.component.html',
  styleUrls: ['./liste-montres-shop.component.scss']
})
export class ListeMontresShopComponent implements OnInit {
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
    }

  ]

  constructor() { }

  ngOnInit(): void {
  }

}
