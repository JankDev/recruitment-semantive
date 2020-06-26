import { createAction, props } from '@ngrx/store';

export const loadOrderStores = createAction(
  '[OrderStore] Load OrderStores'
);

export const loadOrderStoresSuccess = createAction(
  '[OrderStore] Load OrderStores Success',
  props<{ data: any }>()
);

export const loadOrderStoresFailure = createAction(
  '[OrderStore] Load OrderStores Failure',
  props<{ error: any }>()
);
