import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltresService {
  listeFiltres = [
    {
      nomFiltre: 'Genre',
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
      nomFiltre: 'Marque',
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
