import { Component, OnInit } from '@angular/core';
import {FiltresService} from "../../shared/services/filtres.service";

@Component({
  selector: 'app-filtres-mobile',
  templateUrl: './filtres-mobile.component.html',
  styleUrls: ['./filtres-mobile.component.scss']
})
export class FiltresMobileComponent implements OnInit {
  openFiltresMobile = false;
  listeFiltres: any[] = []


  constructor(private filtreService: FiltresService) { }

  ngOnInit(): void {
    this.listeFiltres = this.filtreService.getFiltres();
  }

  toggleFiltresMobiles() {
    this.openFiltresMobile = !this.openFiltresMobile;
  }
}
