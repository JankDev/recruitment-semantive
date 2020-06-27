import {createAction, props} from '@ngrx/store';
import {Product} from "@core/model/order/product";

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
