import {Component, OnInit, ViewChild} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {BurgerService} from "../shared/services/burger-service.service";
import {Subject, takeUntil, tap} from "rxjs";
import {ShopService} from "../shared/services/shop.service";
import {UtilsService} from "../shared/services/utils.service";
import {routeTransitionAnimations} from "../route-transition-animations";

@Component({
  selector: 'app-template-generique',
  templateUrl: './template-generique.component.html',
  styleUrls: ['./template-generique.component.scss'],
  animations: [routeTransitionAnimations]

})
export class TemplateGeneriqueComponent implements OnInit {
  @ViewChild('outlet')
  routerOutlet!: RouterOutlet;
  burgerIsOpen = false;
  ngUnsubscribe = new Subject()
  theme!: string;
  activeFlex!: boolean

  constructor(private burgerService: BurgerService, private shopService: ShopService, private utilService: UtilsService) {
  }

  ngOnInit(): void {
    this.shopService.initCustomData()
    this.utilService.activeFlexSubject.pipe(
      tap(data => {
        this.activeFlex = data;
      }), takeUntil(this.ngUnsubscribe)
    ).subscribe()
    this.burgerService.burgerIsOpenSubject.pipe(
      tap(data => {
        this.burgerIsOpen = data;
      }), takeUntil(this.ngUnsubscribe)
    ).subscribe()
    this.shopService.themeSubject.pipe(
      tap(data => {
        this.theme = data;
      }), takeUntil(this.ngUnsubscribe)
    ).subscribe()
  }

  prepareRoute(outlet: RouterOutlet){
    return outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState'];
  }

}
