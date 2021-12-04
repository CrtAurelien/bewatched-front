import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {TemplateGeneriqueComponent} from "./template-generique/template-generique.component";

const routes: Routes = [
  {
    path: '',
    component: TemplateGeneriqueComponent,
    children: [
      {
        path: '',
        component: HomePageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
