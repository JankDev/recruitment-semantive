import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "orders"},
  {path: "order", loadChildren: () => import("./order/order.module").then(m => m.OrderModule)},
  {path: "orders", loadChildren: () => import("./list-orders/list-orders.module").then(m => m.ListOrdersModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
