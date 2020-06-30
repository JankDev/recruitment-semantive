import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListOrdersComponent} from "./container";


const routes: Routes = [
  {path: "", component: ListOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListOrdersRoutingModule {
}
