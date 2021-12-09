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
import {MatSelectModule} from "@angular/material/select";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FiltresMobileComponent } from './shop/filtres-mobile/filtres-mobile.component';
import { FiltreItemComponent } from './shop/filtres-mobile/filtre-item/filtre-item.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { ListeMontresShopComponent } from './shop/liste-montres-shop/liste-montres-shop.component';
import { MontreItemComponent } from './shop/liste-montres-shop/montre-item/montre-item.component';

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
    ListeMontresShopComponent,
    MontreItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PopoverModule.forRoot(),
    MatCheckboxModule,
    SwiperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
