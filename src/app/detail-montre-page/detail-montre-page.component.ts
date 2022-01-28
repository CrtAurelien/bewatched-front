import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {Montre} from "../core/model/Montre.interface";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-detail-montre-page',
  templateUrl: './detail-montre-page.component.html',
  styleUrls: ['./detail-montre-page.component.scss']
})
export class DetailMontrePageComponent implements OnInit {
  montre!: Montre;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('montre'));
  }

}
