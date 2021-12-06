import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BurgerService {
  burgerIsOpen = false;
  burgerIsOpenSubject = new Subject<boolean>()

  constructor() { }

  setBurgerMenuIsOpen(isOpen: boolean) {
    this.burgerIsOpen = isOpen;
    this.burgerIsOpenSubject.next(this.burgerIsOpen);
  }

}
