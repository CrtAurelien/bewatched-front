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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    TemplateGeneriqueComponent,
    ListeMontresComponent,
    ShopComponent,
    MontreDetailImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PopoverModule.forRoot(),
    SwiperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
