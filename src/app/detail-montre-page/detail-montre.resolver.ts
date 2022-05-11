import {Injectable} from "@angular/core";
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Montre} from "../core/model/Montre.interface";
import {ShopService} from "../shared/services/shop.service";
import {Observable} from "rxjs";

@Injectable()
export class DetailMontreResolver implements Resolve<Montre> {
  constructor(private shopsService: ShopService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Montre> {
    const idMontre = route.params['montre'];
    return this.shopsService.getMontreById(idMontre);
  }
}
