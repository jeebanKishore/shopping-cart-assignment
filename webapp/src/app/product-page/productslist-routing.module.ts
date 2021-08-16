import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductPageComponent } from './product-page.component';
import { ProductlistComponent } from './productlist/productlist.component';

const routes: Routes = [
    { path: '', component : ProductPageComponent },
    { path : ':cID', component : ProductlistComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProductsListRoutingModule{

}
