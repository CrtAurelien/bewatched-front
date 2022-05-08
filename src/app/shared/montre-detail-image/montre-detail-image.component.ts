import {Component, Input, OnInit} from '@angular/core';
import {Montre, Photo} from "../../core/model/Montre.interface";

@Component({
  selector: 'app-montre-detail-image',
  templateUrl: './montre-detail-image.component.html',
  styleUrls: ['./montre-detail-image.component.scss']
})
export class MontreDetailImageComponent implements OnInit {
  @Input()
  montre!: Montre
  pathImageDetailMontre!: string;

  constructor() { }

  ngOnInit(): void {
    const photoDetail = this.montre.photos.find(elm => elm.isPhotoDetail);
    console.log(photoDetail)
    if(photoDetail)  {
      this.pathImageDetailMontre = photoDetail.path
    }
  }

}
