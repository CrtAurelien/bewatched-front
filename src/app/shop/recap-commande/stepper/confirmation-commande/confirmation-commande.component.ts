import {Component, Input, OnInit} from '@angular/core';
import {Montre} from "../../../../core/model/Montre.interface";
import {ShopService} from "../../../../shared/services/shop.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-confirmation-commande',
  templateUrl: './confirmation-commande.component.html',
  styleUrls: ['./confirmation-commande.component.scss']
})
export class ConfirmationCommandeComponent implements OnInit {
  @Input()
  panier!: Montre[];
  ecrinIsAdd = false;
  @Input()
  totalPanier!: number;
  @Input()
  activeTemplatePanierVide!: boolean;
  @Input()
  hasError!: boolean;
  cgvControl = new FormGroup({
    checkCGV: new FormControl(false, Validators.required),
  })

  constructor(private shopService: ShopService, private router: Router) { }

  ngOnInit(): void {
  }

  addEcrins() {
    if(!this.ecrinIsAdd) {
      this.totalPanier += 5.00;
    } else {
      this.totalPanier -= 5.00;
    }
    this.ecrinIsAdd = !this.ecrinIsAdd;
    this.shopService.tarifCommande = this.totalPanier;
  }

  redirectToShop() {
    this.router.navigate(['shop'])
  }

  redirectToLivraison() {
    if(this.cgvControl.controls['checkCGV'].value) {
      this.router.navigate(['commande'])
    } else {
      this.hasError = true;
    }
  }


}
