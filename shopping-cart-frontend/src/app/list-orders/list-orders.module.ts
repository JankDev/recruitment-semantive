import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ListOrdersRoutingModule} from './list-orders-routing.module';
import {ListOrdersComponent} from './container';
import {OrderListComponent} from './components/order-list';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {SharedModule} from "@shared";


@NgModule({
  declarations: [ListOrdersComponent, OrderListComponent],
  imports: [
    CommonModule,
    ListOrdersRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    SharedModule
  ]
})
export class ListOrdersModule {
}
