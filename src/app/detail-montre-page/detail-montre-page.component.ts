import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {Montre} from "../core/model/Montre.interface";
import {ActivatedRoute} from "@angular/router";
import {ShopService} from "../shared/services/shop.service";

@Component({
  selector: 'app-detail-montre-page',
  templateUrl: './detail-montre-page.component.html',
  styleUrls: ['./detail-montre-page.component.scss']
})
export class DetailMontrePageComponent implements OnInit {
  montre!: Montre;
  urlImageLogoMontre = ''

  constructor(private route: ActivatedRoute, private shopService: ShopService) { }

  ngOnInit(): void {
    const idMontre = this.route.snapshot.paramMap.get('montre');
    if(idMontre) {
      console.log(this.shopService.getAllMontres())
      this.montre = this.shopService.getMontreById(idMontre);
      this.urlImageLogoMontre += this.montre?.marque.toLowerCase() + '-logo.png';
    }
  }

}
