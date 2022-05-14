import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UtilsService} from "../shared/services/utils.service";
import {ShopService} from "../shared/services/shop.service";
import {Montre} from "../core/model/Montre.interface";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, AfterViewChecked {
  clickGoToShop = false;
  montreToDisplay!: Montre;
  btnDesktop! : any;
  montreEnAvant!: Observable<Montre>;


  constructor(private router: Router, private utilService: UtilsService, private shopService: ShopService, private route: ActivatedRoute) {
    utilService.setActiveFlexSubject(true)
    this.montreToDisplay = route.snapshot.data['montreEnAvant'];
  }

  ngOnInit(): void {
    this.shopService.switchTheme('default')
    this.shopService.resetAllFilters();
  }

  ngAfterViewChecked() {
    if(!this.btnDesktop) {
      this.btnDesktop = document.getElementById('btn-desktop');
      this.btnDesktop.addEventListener('animationend', (ev: any) => {
        if (ev.animationName === 'boutonDesktop') {
          this.router.navigate(['shop'])
        }
      })
    }
  }

  goToShop() {
    this.clickGoToShop = true;
  }

  navigateToShop() {
    this.router.navigate(['shop'])
  }



}
