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
    this.listeFiltres = [...new Set(this.filtreSerice.getFiltres())];
    this.filtreSerice.getMarquesBdd().pipe(
      tap(data => {
        if(this.filtreSerice.listeBrands.length === 0) {
          let filtresMarques = this.listeFiltres.find(elm => elm.nom === 'Marque')
          this.filtreSerice.listeBrands = data;
          if(data && data.length > 0) {
            data.forEach(marque => {
              const objectMarque = {
                name: marque.name,
                estCoche: false
              }
              filtresMarques.values.push(objectMarque)
            })
          }
        }

      }), takeUntil(this.ngUnsubscribed)
    ).subscribe()

    this.filtreSerice.getYearsBdd().pipe(
      tap(data => {
        let filtresYears = this.listeFiltres.find(elm => elm.nom === 'Années')
        this.filtreSerice.listeYears = data;
        if(data && data.length > 0) {
          data.forEach(years => {
            const objectMarque = {
              name: years,
              estCoche: false
            }
            filtresYears.values.push(objectMarque)
          })
        }
      }), takeUntil(this.ngUnsubscribed)
    ).subscribe()

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
