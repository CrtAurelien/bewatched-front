import {Component, OnInit, ViewChild} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {BurgerService} from "../shared/services/burger-service.service";
import {Subject, takeUntil, tap} from "rxjs";

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

  constructor(private burgerService: BurgerService) { }

  ngOnInit(): void {
    this.burgerService.burgerIsOpenSubject.pipe(
      tap(data => {
        this.burgerIsOpen = data;
      }), takeUntil(this.ngUnsubscribe)
    ).subscribe()
  }

}
