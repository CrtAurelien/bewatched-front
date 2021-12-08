import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filtres-mobile',
  templateUrl: './filtres-mobile.component.html',
  styleUrls: ['./filtres-mobile.component.scss']
})
export class FiltresMobileComponent implements OnInit {
  openFiltresMobile = false;
  listeFiltres = [
    {
      nomFiltre: 'Genre',
      values: [
        {
          nom: 'Femme'
        },
        {
          nom: 'Homme'
        }
      ]
    }
  ]


  constructor() { }

  ngOnInit(): void {
  }

  toggleFiltresMobiles() {
    this.openFiltresMobile = !this.openFiltresMobile;
  }
}
