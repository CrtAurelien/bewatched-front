import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Montre} from "../../../core/model/Montre.interface";
import {ShopService} from "../../../shared/services/shop.service";
import {ICreateOrderRequest, IPayPalConfig} from "ngx-paypal";
import {UtilsService} from "../../../shared/services/utils.service";

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
  @Input()
  panier!: Montre[];
  @Input()
  totalPanier!: number;
  @Input()
  activeTemplatePanierVide!: boolean;
  @Input()
  hasError!: boolean;
  canGoingToLivraisonInfo = false;
  showPaypalBtn = false;
  payPalConfig!: IPayPalConfig;
  tarifCommandeFormate!: number;

  constructor(private _formBuilder: FormBuilder, private shopService: ShopService, private utilService: UtilsService) {}

  ngOnInit(): void {
    this.shopService.cgvControlCheckedSubject.subscribe(data => {
      this.canGoingToLivraisonInfo = data;
    })
    this.shopService.commandIsValidSubject.subscribe(data => {
      this.showPaypalBtn = data;
    })
    this.initConfig();
  }



  private initConfig(): void {
    const tarifCommande =  this.shopService.tarifCommande;
    this.tarifCommandeFormate = this.utilService.retournerArrondiNSignificatif(tarifCommande);
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest><any>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: this.tarifCommandeFormate,
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: this.tarifCommandeFormate,
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


}
