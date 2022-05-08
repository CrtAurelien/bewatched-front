import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {ShopService} from "../shared/services/shop.service";

@Injectable({
  providedIn: 'root'
})

export class LivraisonGuard implements CanActivate {


  constructor(private shopService: ShopService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.shopService.panier.length === 0) {
      this.router.navigate(['/'])
    }
    return true;
  }

}
