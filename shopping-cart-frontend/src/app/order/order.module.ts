import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrderRoutingModule} from './order-routing.module';
import {SharedModule} from "@shared";
import {OrderFormComponent} from './components/order-form';
import {ItemListComponent} from './components/item-list';
import {OrderComponent} from "./container";


@NgModule({
  declarations: [
    OrderFormComponent,
    ItemListComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
  ]
})
export class OrderModule {
}
