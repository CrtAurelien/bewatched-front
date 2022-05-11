import {AfterContentInit, AfterViewChecked, Component, OnInit} from '@angular/core';
import { Swiper } from 'swiper';
import {ShopService} from "../services/shop.service";
import {Montre} from "../../core/model/Montre.interface";


@Component({
  selector: 'app-liste-montres',
  templateUrl: './liste-montres.component.html',
  styleUrls: ['./liste-montres.component.scss']
})
export class ListeMontresComponent implements OnInit {
  listeMontre: Montre[] = []
  displayLoader = false;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.displayLoader = true;
    this.shopService.getAllMontres().subscribe(
      data => {
        this.listeMontre = data;
        this.displayLoader = false;
      }
    )
  }

}
