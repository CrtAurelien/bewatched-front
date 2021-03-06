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
  montreIsDeleted = false;
  ngUnsubscribed = new Subject()
  @Input()
  loadingMode!: boolean;
  pathImageDetailMontre! : string;
  @Input()
  displayImg = true;
  @Input()
  mobileViewDetail = false;


  constructor(private shopService: ShopService, private router: Router) { }

  ngOnInit(): void {
    const photoDetail = this.montre.photos.find(elm => elm.isPhotoDetail);
    if(photoDetail) {
      this.pathImageDetailMontre = photoDetail.path;
    }
    this.montreIsAdd = this.shopService.getPanierEnCours().find(elm => elm.id === this.montre.id ) ? true : false
    this.shopService.montreWasDeletedSubject.pipe(
      tap(data => {
        if(data) {
          this.checkIfMontreWasDeleted()
        }
      }), takeUntil(this.ngUnsubscribed)
    ).subscribe()
  }

  ajouterMontre(montre: Montre) {
    this.shopService.addToCart(montre);
    this.montreIsAdd = !this.montreIsAdd
  }

  navigateToDetailMontre() {
    this.router.navigate(['/detail', this.montre.id]);
  }

  checkIfMontreWasDeleted() {
    const isDeleted = this.shopService.getPanierEnCours().find(elm => elm.id === this.montre.id);
    if(!isDeleted) {
      this.montreIsAdd = false;
    }
  }



}
