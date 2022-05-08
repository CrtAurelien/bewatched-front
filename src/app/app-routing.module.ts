import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {TemplateGeneriqueComponent} from "./template-generique/template-generique.component";
import {ShopComponent} from "./shop/shop.component";
import {ContactComponent} from "./contact/contact.component";
import {OurStoryComponent} from "./our-story/our-story.component";
import {DetailMontrePageComponent} from "./detail-montre-page/detail-montre-page.component";
import {RecapCommandeComponent} from "./shop/recap-commande/recap-commande.component";
import {CgvComponent} from "./cgv/cgv.component";
import {MentionsLegalesComponent} from "./mentions-legales/mentions-legales.component";
import {PrivacyPoliciesComponent} from "./privacy-policies/privacy-policies.component";
import {LivraisonComponent} from "./livraison/livraison.component";
import {LivraisonGuard} from "./livraison/livraison.guard";
import {HomeResolver} from "./template-generique/home.resolver";
import {DetailMontreResolver} from "./detail-montre-page/detail-montre.resolver";

const routes: Routes = [
  {
    path: '',
    component: TemplateGeneriqueComponent,
    resolve: {
      montreEnAvant: HomeResolver
    },
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'shop',
        component: ShopComponent
      },
      {
        path: 'our-story',
        component: OurStoryComponent
      },
      {
        path: 'conditions-generales-vente',
        component: CgvComponent
      },
      {
        path: 'mentions-legales',
        component: MentionsLegalesComponent
      },
      {
        path: 'politique-de-confidentialite',
        component: PrivacyPoliciesComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'detail/:montre',
        component: DetailMontrePageComponent,
        resolve: {
          montre: DetailMontreResolver
        }
      },
      {
        path: 'recapitulatif-panier',
        component: RecapCommandeComponent
      },
      {
        path: 'commande',
        component: LivraisonComponent,
        canActivate: [LivraisonGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
