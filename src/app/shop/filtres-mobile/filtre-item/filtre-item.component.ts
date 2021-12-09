import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-filtre-item',
  templateUrl: './filtre-item.component.html',
  styleUrls: ['./filtre-item.component.scss']
})
export class FiltreItemComponent implements OnInit {
  @Input()
  nomFiltre!: string;
  @Input()
  values: any;
  @Input()
  type!: string;
  showFilter = false;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Méthode permettant de remonter dans le service gérant les filtres, le filtre passé en paramètre
   * Active ou désactive le style de la custom checkbox
   * @param nomFiltre
   */
  activerOuDesactiverFiltre(filtre: any) {
    filtre.estCoche = !filtre.estCoche;
  }

  /**
   * Méthode lancée au clic sur le titre général d'un filtre
   */
  toggleFiltre() {
    this.showFilter = !this.showFilter
  }

}
