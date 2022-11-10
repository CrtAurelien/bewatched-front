import { Injectable } from '@angular/core';
import {Filtre} from "../../core/model/Filtre.interface";
import {HttpClient} from "@angular/common/http";
import {Brand} from "../../core/model/Montre.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FiltresService {
  urlApiFiltresMarque = 'https://bewatched.fr/api-bewatched/public/api/brands'
  urlApiFiltresAnnee = 'https://bewatched.fr/api-bewatched/public/api/years'
  listeBrands: Brand[] = [];
  listeYears: string[] = [];
  listeFiltres : Filtre[] = [
    {
      nom: 'Marque',
      values: []
    },
    {
      nom: 'Années',
      values: [
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
    return this.http.get<Brand[]>(this.urlApiFiltresMarque);
  }

  getYearsBdd(): Observable<string[]> {
    return this.http.get<string[]>(this.urlApiFiltresAnnee);
  }

}
