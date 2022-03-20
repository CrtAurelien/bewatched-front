import { Injectable } from '@angular/core';
import {Filtre} from "../../core/model/Filtre.interface";

@Injectable({
  providedIn: 'root'
})
export class FiltresService {
  listeFiltres : Filtre[] = [
    {
      nom: 'Genre',
      values: [
        {
          nom: 'Homme',
          estCoche: false
        },
        {
          nom: 'Femme',
          estCoche: false
        }
      ]
    },
    {
      nom: 'Marque',
      values: [
        {
          nom: 'Oméga',
          estCoche: false
        },
        {
          nom: 'Tissot',
          estCoche: false
        },
        {
          nom: 'Longines',
          estCoche: false
        }
      ]
    },
    {
      nom: 'Années',
      values: [
        {
          nom: '1950',
          estCoche: false
        },
        {
          nom: '1960',
          estCoche: false
        },
        {
          nom: '1970',
          estCoche: false
        },
        {
          nom: '1980',
          estCoche: false
        },
        {
          nom: '1990',
          estCoche: false
        }
      ]
    },
    {
      nom: 'Mouvement',
      values: [
        {
          nom: 'Automatique',
          estCoche: false
        },
        {
          nom: 'Manuel',
          estCoche: false
        },
        {
          nom: 'Quartz',
          estCoche: false
        }
      ]
    }
  ]

  constructor() { }

  getFiltres(): any[] {
    return this.listeFiltres
  }
}
