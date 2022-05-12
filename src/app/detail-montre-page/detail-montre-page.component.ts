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
import {ActivatedRoute, Router} from "@angular/router";
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
  nomCoutureMobile = '';
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  constructor(private route: ActivatedRoute, private shopService: ShopService, private cd:ChangeDetectorRef, private router: Router) {
    this.montre = route.snapshot.data['montre'];
    shopService.switchTheme(this.montre.brand.name.toLowerCase())
  }



  ngOnInit(): void {
    if(this.montre.available) {
      this.urlImageLogoMontre += this.montre?.brand.name.toLowerCase() + '-logo.png';
      this.montreIsInCard = this.shopService.checkIfMontreIsInCard(this.montre);
      switch (this.montre.brand.name.toLowerCase()) {
        case 'omega':
          this.nomCoutureMobile = '../../assets/coutures-brown.png';
          break;
        case 'longines':
          this.nomCoutureMobile = '../../assets/coutures-blue.png';
          break;
        default :
          this.nomCoutureMobile = '../../assets/coutures-b&w.png';
          break;
      }
      this.shopService.montreWasDeletedSubject.pipe(
        tap(data => {
          if(data) {
            this.checkIfExists()
          }
        }), takeUntil(this.ngUnsubscribed)
      ).subscribe()
    } else {
      this.router.navigate(['/']);
    }

  }

  checkIfExists() {
    const isDeleted = this.shopService.getPanierEnCours().find(elm => elm.id === this.montre.id);
    if(!isDeleted) {
      this.montreIsInCard = false;
      this.textButton = "Ajouter au panier"
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
