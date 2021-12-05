import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showBurgerMenu = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggleBurgerMenu() {
    this.showBurgerMenu = !this.showBurgerMenu
    const burger = document.getElementById('burgerMenu');
    if(burger) {
      burger.classList.add('animate__animated', 'animate__fadeInDown')
    }

  }

}
