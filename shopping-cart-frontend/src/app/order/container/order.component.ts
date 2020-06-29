import {Component, OnInit} from '@angular/core';
import {Product} from "@core/model/product/product";
import {select, Store} from "@ngrx/store";
import {RootState} from "@core/store/root-state";
import {OrderStoreActions, OrderStoreSelectors} from "@core/store/order-store";
import {map} from "rxjs/operators";
import {User} from "@core/model/order/user";
import {ProductStoreActions, ProductStoreSelectors} from "@core/store/product-store";

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
  products$ = this.store.pipe(
    select(ProductStoreSelectors.selectProducts),
  );
  productColors$ = this.store.pipe(
    select(ProductStoreSelectors.selectProductColors)
  );
  productSizes$ = this.store.pipe(
    select(ProductStoreSelectors.selectProductSizes)
  );
  isLoading$ = this.store.pipe(
    select(OrderStoreSelectors.selectIsLoading)
  );

  constructor(private store: Store<RootState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(ProductStoreActions.loadProducts());
  }

  addItemToOrder(product: Product): void {
    this.store.dispatch(OrderStoreActions.addItemToOrder({payload: product}));
  }

  submitOrder(user: User): void {
    this.store.dispatch(OrderStoreActions.submitOrder({payload: user}));
  }
}
