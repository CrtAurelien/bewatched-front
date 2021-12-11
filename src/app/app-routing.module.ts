import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {TemplateGeneriqueComponent} from "./template-generique/template-generique.component";
import {ShopComponent} from "./shop/shop.component";
import {ContactComponent} from "./contact/contact.component";
import {OurStoryComponent} from "./our-story/our-story.component";

const routes: Routes = [
  {
    path: '',
    component: TemplateGeneriqueComponent,
    children: [
      {
        path: '',
        component: HomePageComponent
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
        path: 'contact',
        component: ContactComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
