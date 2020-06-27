import {createAction, props} from '@ngrx/store';
import {Product} from "@core/model/order/product";
import {User} from "@core/model/order/user";

export const loadOrderStores = createAction(
  '[OrderStore] Load OrderStores'
);

export const loadOrderStoresSuccess = createAction(
  '[OrderStore] Load OrderStores Success',
  props<{ payload: any }>()
);

export const loadOrderStoresFailure = createAction(
  '[OrderStore] Load OrderStores Failure',
  props<{ error: any }>()
);

export const addItemToOrder = createAction(
  '[OrderStore] Add Item To Order',
  props<{ payload: Product }>()
)

export const submitOrder = createAction(
  '[OrderStore] Submit Order',
  props<{ payload: User }>()
);

export const submitOrderSuccess = createAction(
  '[OrderStore] Submit Order Success',
  props<{ payload: any }>()
);

export const submitOrderFailure = createAction(
  '[OrderStore] Submit Order Failure',
  props<{ error: any }>()
);
