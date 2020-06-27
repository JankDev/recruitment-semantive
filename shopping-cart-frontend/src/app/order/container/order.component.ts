import {Component, OnInit} from '@angular/core';
import {Product} from "@core/model/order/product";
import {select, Store} from "@ngrx/store";
import {RootState} from "@core/store/root-state";
import {OrderStoreActions, OrderStoreSelectors} from "@core/store/order-store";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  currentOrderItems$ = this.store.pipe(
    select(OrderStoreSelectors.selectCurrentOrder),
    map(order => order.items),
  );

  constructor(private store: Store<RootState>) {
  }

  ngOnInit(): void {
  }

  addOrder(product: Product): void {
    this.store.dispatch(OrderStoreActions.addItemToOrder({payload: product}));
  }
}
