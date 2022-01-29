import {Component, Input, OnInit} from '@angular/core';
import {Montre} from "../../../core/model/Montre.interface";
import {ShopService} from "../../../shared/services/shop.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-montre-item',
  templateUrl: './montre-item.component.html',
  styleUrls: ['./montre-item.component.scss']
})
export class MontreItemComponent implements OnInit {
  @Input()
  montre!: Montre
  montreIsAdd = false;


  constructor(private shopService: ShopService, private router: Router) { }

  ngOnInit(): void {
  }

  ajouterMontre(montre: Montre) {
    this.shopService.addToCart(montre);
    this.montreIsAdd = !this.montreIsAdd
  }

  navigateToDetailMontre() {
    this.router.navigate(['/detail', this.montre.id]);
  }



}
