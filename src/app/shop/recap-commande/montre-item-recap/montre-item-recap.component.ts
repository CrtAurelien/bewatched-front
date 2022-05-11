import {Component, Input, OnInit} from '@angular/core';
import {Montre} from "../../../core/model/Montre.interface";
import {ShopService} from "../../../shared/services/shop.service";

@Component({
  selector: 'app-montre-item-recap',
  templateUrl: './montre-item-recap.component.html',
  styleUrls: ['./montre-item-recap.component.scss']
})
export class MontreItemRecapComponent implements OnInit {
  @Input()
  montre!: Montre;
  pathImageDetail!: string;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    const photoDetail = this.montre.photos.find(elm => elm.isPhotoDetail);
    if(photoDetail)  {
      this.pathImageDetail = photoDetail.path
    }
  }

  deleteMontre() {
    this.shopService.removeToCart(this.montre);
  }

}
