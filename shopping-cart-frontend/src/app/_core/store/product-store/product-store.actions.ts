import {createAction, props} from '@ngrx/store';
import {Product} from "@core/model/product/product";

export const loadProducts = createAction(
  '[ProductStore] Load Products'
);

export const loadProductsSuccess = createAction(
  '[ProductStore] Load Products Success',
  props<{ payload: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[ProductStore] Load Products Failure',
  props<{ payload: string }>()
);
