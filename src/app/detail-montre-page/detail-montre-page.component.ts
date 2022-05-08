import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit, ViewChild
} from '@angular/core';
import {Location} from "@angular/common";
import {Montre} from "../core/model/Montre.interface";
import {ActivatedRoute} from "@angular/router";
import {ShopService} from "../shared/services/shop.service";
import {Subject, takeUntil, tap} from "rxjs";
import {SwiperComponent} from "swiper/angular";
import SwiperCore, { Navigation, Autoplay, Thumbs } from "swiper";

SwiperCore.use([Navigation, Autoplay, Thumbs]);

@Component({
  selector: 'app-detail-montre-page',
  templateUrl: './detail-montre-page.component.html',
  styleUrls: ['./detail-montre-page.component.scss']
})
export class DetailMontrePageComponent implements OnInit{
  thumbsSwiper: any;
  montre!: Montre;
  urlImageLogoMontre = ''
  montreIsInCard! : boolean;
  montreIsDeleted = false;
  textButton = "Ajouter au panier";
  ngUnsubscribed = new Subject();
  idMontre = this.route.snapshot.paramMap.get('montre');
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  constructor(private route: ActivatedRoute, private shopService: ShopService, private cd:ChangeDetectorRef) { }



  ngOnInit(): void {
    this.shopService.getMontreById(this.idMontre).pipe(
      tap(data => {
        this.montre = data as Montre
        this.shopService.switchTheme(this.montre.brand.name.toLowerCase())
      }), takeUntil(this.ngUnsubscribed)
    ).subscribe()
    this.urlImageLogoMontre += this.montre?.brand.name.toLowerCase() + '-logo.png';
    this.montreIsInCard = this.shopService.checkIfMontreIsInCard(this.montre);
    this.shopService.montreWasDeletedSubject.pipe(
      tap(data => {
        if(data) {
          this.checkIfExists()
        }
      }), takeUntil(this.ngUnsubscribed)
    ).subscribe()
  }

  checkIfExists() {
    const exists = this.shopService.checkIfMontreIsInCard(this.montre)
    if(!exists) {
      this.montreIsInCard = false;
    }
  }

  shopButton(montre: Montre){
    if (this.montreIsInCard) {
      this.shopService.removeToCart(montre);
      this.textButton = "Ajouter au panier"
    }else {
      this.shopService.addToCart(montre);
      this.textButton = "Supprimer du panier"
    }
    this.montreIsInCard = !this.montreIsInCard
    this.cd.detectChanges()
  }


  ngAfterContentInit() {
    // this.shopService.switchTheme(this.montre.marque)
  }

}
