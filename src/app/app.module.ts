import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TemplateGeneriqueComponent } from './template-generique/template-generique.component';
import { ListeMontresComponent } from './shared/liste-montres/liste-montres.component';
import {SwiperModule} from "swiper/angular";
import { ShopComponent } from './shop/shop.component';
import {PopoverModule} from "ngx-bootstrap/popover";
import { MontreDetailImageComponent } from './shared/montre-detail-image/montre-detail-image.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FiltresMobileComponent } from './shop/filtres-mobile/filtres-mobile.component';
import { FiltreItemComponent } from './shop/filtres-mobile/filtre-item/filtre-item.component';
import { ContactComponent } from './contact/contact.component';
import { OurStoryComponent } from './our-story/our-story.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { ListeMontresShopComponent } from './shop/liste-montres-shop/liste-montres-shop.component';
import { MontreItemComponent } from './shop/liste-montres-shop/montre-item/montre-item.component';
import { MontreItemPanierComponent } from './shared/header/montre-item-panier/montre-item-panier.component';
import { FiltresDsktopComponent } from './shop/filtres-dsktop/filtres-dsktop.component';
import { FiltreItemDesktopComponent } from './shop/filtres-dsktop/filtre-item-desktop/filtre-item-desktop.component';
import { DetailMontrePageComponent } from './detail-montre-page/detail-montre-page.component';
import { RecapCommandeComponent } from './shop/recap-commande/recap-commande.component';
import { MontreItemRecapComponent } from './shop/recap-commande/montre-item-recap/montre-item-recap.component';
import {HttpClientModule} from "@angular/common/http";
import { CgvComponent } from './cgv/cgv.component';
import { PrivacyPoliciesComponent } from './privacy-policies/privacy-policies.component';
import { MentionsLegalesComponent } from './mentions-legales/mentions-legales.component';
import {NgxPayPalModule} from "ngx-paypal";
import {LivraisonComponent} from "./livraison/livraison.component";
import {HomeResolver} from "./template-generique/home.resolver";
import {DetailMontreResolver} from "./detail-montre-page/detail-montre.resolver";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ErreurTechniqueComponent } from './erreur-technique/erreur-technique.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoaderComponent } from './shared/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    TemplateGeneriqueComponent,
    ListeMontresComponent,
    ShopComponent,
    MontreDetailImageComponent,
    FiltresMobileComponent,
    FiltreItemComponent,
    ContactComponent,
    OurStoryComponent,
    ListeMontresShopComponent,
    MontreItemComponent,
    MontreItemPanierComponent,
    FiltresDsktopComponent,
    FiltreItemDesktopComponent,
    DetailMontrePageComponent,
    RecapCommandeComponent,
    MontreItemRecapComponent,
    CgvComponent,
    PrivacyPoliciesComponent,
    MentionsLegalesComponent,
    LivraisonComponent,
    ErreurTechniqueComponent,
    PageNotFoundComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PopoverModule.forRoot(),
    MatCheckboxModule,
    SwiperModule,
    NgxPayPalModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HomeResolver, DetailMontreResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
