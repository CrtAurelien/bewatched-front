import {Component, Input, OnInit} from '@angular/core';
import {Filtre, FiltreObject} from "../../../core/model/Filtre.interface";
import {ShopService} from "../../../shared/services/shop.service";

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
  @Input()
  filtre!: Filtre;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
  }

  /**
   * Méthode permettant de remonter dans le service gérant les filtres, le filtre passé en paramètre
   * Active ou désactive le style de la custom checkbox
   * @param nomFiltre
   */
  activerOuDesactiverFiltre(filtre: FiltreObject) {
    filtre.estCoche = !filtre.estCoche;
    if(filtre.estCoche) {
      this.shopService.searchWithFilter(this.filtre, filtre)
    } else {
      this.shopService.removeAFilter(filtre)
    }
  }

  /**
   * Méthode lancée au clic sur le titre général d'un filtre
   */
  toggleFiltre() {
    this.showFilter = !this.showFilter
  }

}
