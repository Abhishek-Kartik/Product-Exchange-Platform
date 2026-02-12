import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { MyProductsComponent } from './pages/my-products/my-products.component';
import { ManageProductComponent } from './pages/manage-product/manage-product.component';
import { BorrowedProductListComponent } from './pages/borrowed-product-list/borrowed-product-list.component';
import { ReturnedProductsComponent } from './pages/returned-products/returned-products.component';
import { AuthGuard } from 'src/app/services/guard/auth.guard';

const routes: Routes = [
  {
    path:'',
    component: MainComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path: '',
        component: ProductListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'my-products',
        component: MyProductsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'manage',
        component: ManageProductComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'manage/:productId',
        component: ManageProductComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'borrowed-products',
        component: BorrowedProductListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'returned-products',
        component: ReturnedProductsComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
