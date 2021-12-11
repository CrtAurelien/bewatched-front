import { Component, OnInit } from '@angular/core';
import {FiltresService} from "../../shared/services/filtres.service";

@Component({
  selector: 'app-filtres-dsktop',
  templateUrl: './filtres-dsktop.component.html',
  styleUrls: ['./filtres-dsktop.component.scss']
})
export class FiltresDsktopComponent implements OnInit {
  listeFiltres: any[] = [];
  openFiltresMobile = false;

  constructor(private filtreSerice: FiltresService) { }

  ngOnInit(): void {
    this.listeFiltres = this.filtreSerice.getFiltres();
  }

  toggleFiltresMobiles() {
    this.openFiltresMobile = !this.openFiltresMobile;
  }

}
