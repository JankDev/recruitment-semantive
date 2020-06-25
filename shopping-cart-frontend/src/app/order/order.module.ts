import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrderRoutingModule} from './order-routing.module';
import {SharedModule} from "@shared";
import {OrderComponent} from './container';
import { ItemListComponent } from './components/item-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [OrderComponent, ItemListComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ]
})
export class OrderModule { }
