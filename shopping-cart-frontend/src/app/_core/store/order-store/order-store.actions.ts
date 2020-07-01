import {createAction, props} from '@ngrx/store';
import {Product} from "@core/model/product/product";
import {User} from "@core/model/order/user";
import {OrderItem} from "@core/model/order/order-item";
import {Order} from "@core/model/order/order";

export const loadOrders = createAction(
  '[OrderStore] Load Orders'
);

export const loadOrdersSuccess = createAction(
  '[OrderStore] Load Orders Success',
  props<{ payload: Order[] }>()
);

export const loadOrdersFailure = createAction(
  '[OrderStore] Load Orders Failure',
  props<{ payload: string }>()
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
  props<{ payload: OrderItem[] }>()
);

export const submitOrderFailure = createAction(
  '[OrderStore] Submit Order Failure',
  props<{ error: string }>()
);

export const displayOrderInformation = createAction(
  '[OrderStore] Display Order Information',
  props<{ payload: number }>()
)

export const displayOrderInformationSuccess = createAction(
  '[OrderStore] Display Order Information Success',
  props<{ payload: OrderItem[] }>()
)

export const displayOrderInformationFailure = createAction(
  '[OrderStore] Display Order Information Failure',
  props<{ payload: string }>()
)
