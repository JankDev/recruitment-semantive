import {Component, OnInit} from '@angular/core';
import {Product} from "@core/model/order/product";
import {Store} from "@ngrx/store";
import {RootState} from "@core/store/root-state";
import {OrderStoreActions} from "@core/store/order-store";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  constructor(private store: Store<RootState>) {
  }

  ngOnInit(): void {
  }

  addOrder(product: Product): void {
    this.store.dispatch(OrderStoreActions.addItemToOrder({payload: product}));
  }
}
