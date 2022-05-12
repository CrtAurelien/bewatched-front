import {Component, Input, OnInit} from '@angular/core';
import {ShopService} from "../../../shared/services/shop.service";
import {Filtre, FiltreObject} from "../../../core/model/Filtre.interface";

@Component({
  selector: 'app-filtre-item-desktop',
  templateUrl: './filtre-item-desktop.component.html',
  styleUrls: ['./filtre-item-desktop.component.scss']
})
export class FiltreItemDesktopComponent implements OnInit {
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
    this.toggleFiltre();
  }

  /**
   * Méthode lancée au clic sur le titre général d'un filtre
   */
  toggleFiltre() {
    this.showFilter = !this.showFilter
  }

}
