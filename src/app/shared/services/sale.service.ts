import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Sale} from "../../core/model/Sale.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  urlSale = "https://bewatched.fr/api-bewatched/public/api/sale"

  constructor(private http: HttpClient) { }

  postSale(sale: Sale) : Observable<any>{
    return this.http.post(this.urlSale, sale);
  }

}
