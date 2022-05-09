import { Component, OnInit } from '@angular/core';
import {ICreateOrderRequest, IPayPalConfig} from "ngx-paypal";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.scss']
})
export class LivraisonComponent implements OnInit {
  public payPalConfig!: IPayPalConfig;
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
  constructor() { }

  ngOnInit(): void {
    this.commande.valueChanges.subscribe(data => {
      console.log(this.commande.valid)
    })
    this.initConfig()
  }
  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: '10',
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value:'10',
                }
              }
            },
            items: [
              {
                name: 'name',
                quantity: '1',
                unit_amount: {
                  currency_code: 'EUR',
                  value: '10',
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'horizontal',
        color: 'black',
        shape: 'pill'
      },
      onApprove: (data, actions) => {
      },
      onClientAuthorization: (data) => {
        // SUCCESS
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

}
