import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Montre} from "../../../core/model/Montre.interface";
import {ShopService} from "../../../shared/services/shop.service";
import {ICreateOrderRequest, IPayPalConfig} from "ngx-paypal";
import {UtilsService} from "../../../shared/services/utils.service";
import {Sale} from "../../../core/model/Sale.interface";
import {Accessory} from "../../../core/model/Accessory.interface";
import {SaleService} from "../../../shared/services/sale.service";
import {MatStepper, MatStepperModule} from "@angular/material/stepper";
import {Router} from "@angular/router";

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
  displayMsgErreurCreateSale = false

  constructor(private _formBuilder: FormBuilder, private router: Router, private saleService: SaleService, private shopService: ShopService, private utilService: UtilsService) {}

  ngOnInit(): void {
    this.shopService.cgvControlCheckedSubject.subscribe(data => {
      this.canGoingToLivraisonInfo = data;
    })
    this.shopService.commandIsValidSubject.subscribe(data => {
      this.initConfig();
      this.showPaypalBtn = data;
    })

  }



  private initConfig(): void {
    const tarifCommande =  this.shopService.tarifCommande;
    this.tarifCommandeFormate = this.utilService.retournerArrondiNSignificatif(tarifCommande);
    this.payPalConfig = {
      currency: 'CHF',
      clientId: 'AZh2cb-Hpm75h2-4fz9uEfe17vJ5fTF2QOF3TR0y4_QRvtDcQAF0RgBKOJ7pX9VHDFInUdiGe84nk03m',
      createOrderOnClient: (data) => <ICreateOrderRequest><any>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'CHF',
              value: this.tarifCommandeFormate,
              breakdown: {
                item_total: {
                  currency_code: 'CHF',
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
        sessionStorage.removeItem('panier');
        // POST commande
        this.router.navigate(['confirmation'])
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
          currency_code: 'CHF',
          value:montre.price,
        },
      }
      configItem.push(config)
    })
    return configItem
  }

  emitCommmande(stepper: MatStepper) {
    let saleToPost: Sale;
    saleToPost = {
      price: this.totalPanier,
      firstname: this.shopService.commande.nomClient,
      lastname: this.shopService.commande.prenomClient,
      address: this.shopService.commande.adresse,
      zipcode: this.shopService.commande.codePostal,
      city: this.shopService.commande.ville,
      country: this.shopService.commande.pays,
      email: this.shopService.commande.emailClient,
      phone: this.shopService.commande.phone
    }
    saleToPost.watchesSale = [];
    this.panier.forEach((montre: Montre) => {
      saleToPost.watchesSale?.push({
        id: montre.id
      })
    })
    stepper.next()
    /**this.saleService.postSale(saleToPost).subscribe(data => {

    }, error => {
      this.displayMsgErreurCreateSale = true;
    })*/


  }

}
