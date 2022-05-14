import { Component, OnInit } from '@angular/core';
import {ICreateOrderRequest, IPayPalConfig} from "ngx-paypal";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ShopService} from "../shared/services/shop.service";
import {Montre} from "../core/model/Montre.interface";
import {UtilsService} from "../shared/services/utils.service";

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.scss']
})
export class LivraisonComponent implements OnInit {
  tarifCommande!: number;
  tarifCommandeFormate!: any;
  public payPalConfig!: IPayPalConfig;
  showPaypalBtn = false;
  panier! : Montre[];
  commande = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    numEtNomRue: new FormControl('', Validators.required),
    numEtageAppart: new FormControl(''),
    infoSupp: new FormControl(''),
    codePostal: new FormControl('', Validators.required),
    ville: new FormControl('', Validators.required),
    pays: new FormControl('', Validators.required),
    telephone: new FormControl('',  [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
  });
  constructor(private shopService: ShopService, private utilService: UtilsService) { }

  ngOnInit(): void {
    this.tarifCommande =  this.shopService.tarifCommande;
    this.panier = this.shopService.getPanierEnCours();
    this.initConfig()
  }
  private initConfig(): void {
    this.tarifCommandeFormate = this.utilService.retournerArrondiNSignificatif(this.tarifCommande);
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: this.tarifCommandeFormate,
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value:this.tarifCommandeFormate,
                }
              }
            },
            items: this.createMontreItemPaypal()
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {

      },
      onApprove: (data, actions) => {
      },
      onClientAuthorization: (data) => {
        // SUCCESS
      },
      onCancel: (data, actions) => {
      },
      onError: err => {
      },
      onClick: (data, actions) => {
      },
    };
  }

  createMontreItemPaypal(): any[] {
    let configItem: any[] = [];
    this.panier.forEach(montre => {
      let config = {
        name: montre.model,
        quantity: '1',
        unit_amount: {
          currency_code: 'EUR',
          value:montre.price,
        },
      }
      configItem.push(config)
    })
    return configItem
  }

  openPaypalModule() {
      this.showPaypalBtn = this.commande.valid;
  }

}
