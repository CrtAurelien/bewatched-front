import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  clickGoToShop = false;


  constructor(private router: Router) { }

  ngOnInit(): void {
    const btnDesktop = document.getElementById('btn-desktop');
    if(btnDesktop) {
      btnDesktop.addEventListener('animationend', (ev) => {
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
