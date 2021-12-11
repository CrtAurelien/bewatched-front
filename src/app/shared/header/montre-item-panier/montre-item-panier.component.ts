import {Component, Input, OnInit} from '@angular/core';
import {Montre} from "../../../core/model/Montre.interface";

@Component({
  selector: 'app-montre-item-panier',
  templateUrl: './montre-item-panier.component.html',
  styleUrls: ['./montre-item-panier.component.scss']
})
export class MontreItemPanierComponent implements OnInit {
  @Input()
  montre!: Montre

  constructor() { }

  ngOnInit(): void {
  }

}
