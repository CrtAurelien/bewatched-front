import {Component, OnInit, ViewChild} from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-template-generique',
  templateUrl: './template-generique.component.html',
  styleUrls: ['./template-generique.component.scss']
})
export class TemplateGeneriqueComponent implements OnInit {
  @ViewChild('outlet')
  routerOutlet!: RouterOutlet;

  constructor() { }

  ngOnInit(): void {
  }

}
