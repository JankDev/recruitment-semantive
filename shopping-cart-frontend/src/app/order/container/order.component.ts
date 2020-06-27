import {Component, OnInit} from '@angular/core';
import {Product} from "@core/model/order/product";
import {select, Store} from "@ngrx/store";
import {RootState} from "@core/store/root-state";
import {OrderStoreActions, OrderStoreSelectors} from "@core/store/order-store";
import {map} from "rxjs/operators";
import {User} from "@core/model/order/user";

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
  isValidOrder$ = this.store.pipe(
    select(OrderStoreSelectors.selectCurrentOrder),
    map(order => order.items.length > 0)
  )

  constructor(private store: Store<RootState>) {
  }

  ngOnInit(): void {
  }

  addItemToOrder(product: Product): void {
    this.store.dispatch(OrderStoreActions.addItemToOrder({payload: product}));
  }

  submitOrder(user: User): void {
    this.store.dispatch(OrderStoreActions.submitOrder({payload: user}));
  }
}
