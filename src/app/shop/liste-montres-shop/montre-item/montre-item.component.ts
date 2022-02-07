import {Component, Input, OnInit} from '@angular/core';
import {Montre} from "../../../core/model/Montre.interface";
import {ShopService} from "../../../shared/services/shop.service";
import {Router} from "@angular/router";
import {Subject, takeUntil, tap} from "rxjs";
import {isSame} from "ngx-bootstrap/chronos";

@Component({
  selector: 'app-montre-item',
  templateUrl: './montre-item.component.html',
  styleUrls: ['./montre-item.component.scss']
})
export class MontreItemComponent implements OnInit {
  @Input()
  montre!: Montre
  montreIsAdd = false;
  ngUnsubscribed$ = new Subject()


  constructor(private shopService: ShopService, private router: Router) { }

  ngOnInit(): void {
    this.shopService.montreWasDeletedSubject.pipe(
      tap(data => {
        if(data) {
          this.cheifIfMontreWasDeleted()
        }
      }), takeUntil(this.ngUnsubscribed$)
    ).subscribe()
  }

  ajouterMontre(montre: Montre) {
    this.shopService.addToCart(montre);
    this.montreIsAdd = !this.montreIsAdd
  }

  navigateToDetailMontre() {
    this.router.navigate(['/detail', this.montre.id]);
  }

  cheifIfMontreWasDeleted() {
    const isDeleted = this.shopService.getPanierEnCours().find(elm => elm === this.montre);
    if(!isDeleted) {
      this.montreIsAdd = false;
    }
  }



}
