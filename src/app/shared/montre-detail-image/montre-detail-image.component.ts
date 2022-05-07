import {Component, Input, OnInit} from '@angular/core';
import {Montre} from "../../core/model/Montre.interface";

@Component({
  selector: 'app-montre-detail-image',
  templateUrl: './montre-detail-image.component.html',
  styleUrls: ['./montre-detail-image.component.scss']
})
export class MontreDetailImageComponent implements OnInit {
  @Input()
  montre!: Montre

  constructor() { }

  ngOnInit(): void {
  }

}
