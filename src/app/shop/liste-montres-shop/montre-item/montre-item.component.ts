import {Component, Input, OnInit} from '@angular/core';
import {Montre} from "../../../core/model/Montre.interface";

@Component({
  selector: 'app-montre-item',
  templateUrl: './montre-item.component.html',
  styleUrls: ['./montre-item.component.scss']
})
export class MontreItemComponent implements OnInit {
  @Input()
  montre!: Montre

  constructor() { }

  ngOnInit(): void {
  }

}
