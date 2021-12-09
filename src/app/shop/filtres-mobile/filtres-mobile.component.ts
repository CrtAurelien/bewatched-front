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
          nom: 'Femme',
          estCoche: false
        },
        {
          nom: 'Homme',
          estCoche: false
        }
      ]
    },
    {
      nomFiltre: 'Marque',
      values: [
        {
          nom: 'Oméga',
          estCoche: false
        },
        {
          nom: 'Tissot',
          estCoche: false
        },
        {
          nom: 'Longines',
          estCoche: false
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
