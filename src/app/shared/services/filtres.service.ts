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
          nom: 'Femme',
          estCoche: false
        },
        {
          nom: 'Homme',
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
    }
  ]

  constructor() { }

  getFiltres(): any[] {
    return this.listeFiltres
  }
}
