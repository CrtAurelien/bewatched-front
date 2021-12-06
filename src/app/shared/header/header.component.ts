import { Component, OnInit } from '@angular/core';
import {BurgerService} from "../services/burger-service.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showBurgerMenu = false;
  panierIsOpen = false;
  constructor(private burgerService: BurgerService) { }

  ngOnInit(): void {
  }

  toggleBurgerMenu() {
    this.showBurgerMenu = !this.showBurgerMenu;
    this.burgerService.setBurgerMenuIsOpen(this.showBurgerMenu);
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
