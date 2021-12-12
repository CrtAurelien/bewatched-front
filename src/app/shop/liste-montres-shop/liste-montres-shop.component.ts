import {Component, Input, OnInit} from '@angular/core';
import {Montre} from "../../core/model/Montre.interface";

@Component({
  selector: 'app-liste-montres-shop',
  templateUrl: './liste-montres-shop.component.html',
  styleUrls: ['./liste-montres-shop.component.scss']
})
export class ListeMontresShopComponent implements OnInit {
  @Input()
  listeMontres!: Montre[]


  constructor() { }

  ngOnInit(): void {
  }

}
