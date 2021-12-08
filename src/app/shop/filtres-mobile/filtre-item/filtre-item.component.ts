import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-filtre-item',
  templateUrl: './filtre-item.component.html',
  styleUrls: ['./filtre-item.component.scss']
})
export class FiltreItemComponent implements OnInit {
  @Input()
  nomFiltre!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
