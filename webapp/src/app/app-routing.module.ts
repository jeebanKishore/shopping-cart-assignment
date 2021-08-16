import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path : 'homepage', loadChildren : () => import('./homepage/homepage.module').then(m => m.HomepageModule), pathMatch: 'full' },
  { path : 'product-page', loadChildren : () => import('./product-page/product-page.module').then(m => m.ProductPageModule) },
  { path : 'accesscontrol', loadChildren : () => import('./accesscontrol/accesscontrol.module').then(m => m.AccesscontrolModule) },
  { path : '', loadChildren : () => import('./homepage/homepage.module').then(m => m.HomepageModule), pathMatch: 'full' },
  { path: '**', loadChildren : () => import('./homepage/homepage.module').then(m => m.HomepageModule), pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
