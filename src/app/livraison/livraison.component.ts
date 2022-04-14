import { Component, OnInit } from '@angular/core';
import {ICreateOrderRequest, IPayPalConfig} from "ngx-paypal";

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.scss']
})
export class LivraisonComponent implements OnInit {
  public payPalConfig!: IPayPalConfig;
  constructor() { }

  ngOnInit(): void {
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
