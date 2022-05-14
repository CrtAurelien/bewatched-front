import { Component, OnInit } from '@angular/core';
import {FiltresService} from "../../shared/services/filtres.service";
import {ShopService} from "../../shared/services/shop.service";
import {Subject, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-filtres-dsktop',
  templateUrl: './filtres-dsktop.component.html',
  styleUrls: ['./filtres-dsktop.component.scss']
})
export class FiltresDsktopComponent implements OnInit {
  listeFiltres: any[] = [];
  openFiltresMobile = false;
  showFilterReset = false;
  ngUnsubscribed = new Subject();

  constructor(private filtreSerice: FiltresService, private shopService: ShopService) { }

  ngOnInit(): void {
    this.listeFiltres = this.filtreSerice.getFiltres();
    this.shopService.searchingSubject.pipe(
      tap(data => {
        if(data !== '') {
          this.showFilterReset = true
        }
      }), takeUntil(this.ngUnsubscribed)
    ).subscribe()
    this.shopService.resetSubject.subscribe(data => {
      if(data){
        this.showFilterReset = false;
      }
    })
  }

  toggleFiltresMobiles() {
    this.openFiltresMobile = !this.openFiltresMobile;
  }

  resetFilters() {
    this.shopService.resetAllFilters();
  }

}
