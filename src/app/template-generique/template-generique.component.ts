import {Component, OnInit, ViewChild} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {BurgerService} from "../shared/services/burger-service.service";
import {Subject, takeUntil, tap} from "rxjs";
import {ShopService} from "../shared/services/shop.service";

@Component({
  selector: 'app-template-generique',
  templateUrl: './template-generique.component.html',
  styleUrls: ['./template-generique.component.scss']
})
export class TemplateGeneriqueComponent implements OnInit {
  @ViewChild('outlet')
  routerOutlet!: RouterOutlet;
  burgerIsOpen = false;
  ngUnsubscribe = new Subject()
  theme!: string;

  constructor(private burgerService: BurgerService, private shopService: ShopService) { }

  ngOnInit(): void {
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

}
