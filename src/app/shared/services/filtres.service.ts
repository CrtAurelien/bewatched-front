import { Injectable } from '@angular/core';
import {Filtre} from "../../core/model/Filtre.interface";
import {HttpClient} from "@angular/common/http";
import {Brand} from "../../core/model/Montre.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FiltresService {
  urlApiFiltres = 'https://bewatched.fr/api-bewatched/public/api/brands'
  listeBrands: Brand[] = [];
  listeFiltres : Filtre[] = [
    {
      nom: 'Marque',
      values: []
    },
    {
      nom: 'Années',
      values: [
        {
          name: '1950',
          estCoche: false
        },
        {
          name: '1960',
          estCoche: false
        },
        {
          name: '1970',
          estCoche: false
        },
        {
          name: '1980',
          estCoche: false
        },
        {
          name: '1990',
          estCoche: false
        }
      ]
    },
    {
      nom: 'Mouvement',
      values: [
        {
          name: 'Automatique',
          estCoche: false
        },
        {
          name: 'Manuel',
          estCoche: false
        },
        {
          name: 'Quartz',
          estCoche: false
        }
      ]
    }
  ]

  constructor(private http: HttpClient) { }

  getFiltres(): any[] {
    return this.listeFiltres
  }

  getMarquesBdd(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.urlApiFiltres);
  }

}
