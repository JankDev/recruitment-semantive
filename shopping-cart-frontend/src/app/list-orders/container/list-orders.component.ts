import {Component, OnInit} from '@angular/core';
import {RootState} from "@core/store/root-state";
import {select, Store} from "@ngrx/store";
import {OrderStoreActions, OrderStoreSelectors} from "@core/store/order-store";
import {map} from "rxjs/operators";
import {OrderTableItem} from "../components/order-list";

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit {
  orders$ = this.store.pipe(
    select(OrderStoreSelectors.selectOrders),
    map(orders => orders.map(order => ({order, isExpanded: order.items || false} as OrderTableItem))),
  );

  constructor(private store: Store<RootState>) {
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.store.dispatch(OrderStoreActions.loadOrders());
  }

  loadOrderInformation(orderId: number): void {
    this.store.dispatch(OrderStoreActions.displayOrderInformation({payload: orderId}));
  }
}
