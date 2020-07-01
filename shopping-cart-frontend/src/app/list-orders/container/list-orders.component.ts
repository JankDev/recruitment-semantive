import {Component, OnInit} from '@angular/core';
import {RootState} from "@core/store/root-state";
import {select, Store} from "@ngrx/store";
import {OrderStoreActions, OrderStoreSelectors} from "@core/store/order-store";

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit {
  orders$ = this.store.pipe(
    select(OrderStoreSelectors.selectOrders)
  );

  constructor(private store: Store<RootState>) {
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.store.dispatch(OrderStoreActions.loadOrders());
  }
}
