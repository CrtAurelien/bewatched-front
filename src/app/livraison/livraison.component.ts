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
    this.commande.valueChanges.subscribe(data => {
      this.openPaypalModule();
    })
  }

  openPaypalModule() {
    if(this.commande.valid) {
      this.showPaypalBtn = true;
      this.constituerObjetCommande();
    } else {
      this.showPaypalBtn = false;
    }
  }

  constituerObjetCommande() {
    const commandeEnCours = {
      watches: this.constituerObjetMontreCommande(),
      totalPaiement: this.tarifCommande,
      emailClient: this.commande.controls['email'].value,
      phone: this.commande.controls['telephone'].value,
      nomClient: this.commande.controls['nom'].value,
      prenomClient: this.commande.controls['prenom'].value,
      adresse: this.constituerObjetAdresseCommande(),
      codePostal:  this.commande.controls['codePostal'].value,
      ville: this.commande.controls['ville'].value,
      pays:  this.commande.controls['pays'].value
    }
    this.shopService.commande = commandeEnCours;
    this.shopService.toggleCommandIsValidSubject(true);
  }

  constituerObjetMontreCommande() : any[] {
    let watches: any[] = [];
    this.panier.forEach(montre => {
      let config = {
        name: montre.model,
        watchesId: montre.id,
        quantity: '1',
      }
      watches.push(config)
    })
    return watches
  }

  constituerObjetAdresseCommande(): string {
    let adresse: string = ''
      adresse += this.commande.controls['numEtageAppart'].value + ' ' + this.commande.controls['numEtNomRue'].value
    return adresse;
  }

}
