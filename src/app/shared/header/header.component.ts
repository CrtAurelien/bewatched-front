import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showBurgerMenu = false;
  panierIsOpen = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggleBurgerMenu() {
    this.showBurgerMenu = !this.showBurgerMenu
  }

  openPanier(pop: any) {
    this.panierIsOpen = !this.panierIsOpen;
    if(this.panierIsOpen) {
      pop.show();
    } else {
      pop.hide();
    }

  }

}
