import {Component, Input, OnInit} from '@angular/core';
import {Montre} from "../../../core/model/Montre.interface";

@Component({
  selector: 'app-montre-item-recap',
  templateUrl: './montre-item-recap.component.html',
  styleUrls: ['./montre-item-recap.component.scss']
})
export class MontreItemRecapComponent implements OnInit {
  @Input()
  montre!: Montre;
  pathImageDetail!: string;

  constructor() { }

  ngOnInit(): void {
    const photoDetail = this.montre.photos.find(elm => elm.isPhotoDetail);
    if(photoDetail)  {
      this.pathImageDetail = photoDetail.path
    }
  }

}
