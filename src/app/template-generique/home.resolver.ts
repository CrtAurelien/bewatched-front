import {Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {Montre} from "../core/model/Montre.interface";
import {ShopService} from "../shared/services/shop.service";
import {Observable} from "rxjs";

@Injectable()
export class HomeResolver implements Resolve<Montre> {
  constructor(private shopsService: ShopService) {}
  resolve(): Observable<Montre> {
    return this.shopsService.getHomeMontre();
  }
}
