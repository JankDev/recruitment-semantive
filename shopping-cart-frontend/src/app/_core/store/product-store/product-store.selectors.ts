import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromProductStore from './product-store.reducer';

export const selectProductStoreState = createFeatureSelector<fromProductStore.State>(
  fromProductStore.productStoreFeatureKey
);

export const selectProducts = createSelector(
  selectProductStoreState,
  state => state.products
)
export const selectProductSizes = createSelector(
  selectProductStoreState,
  state => state.productSizes
)
export const selectProductColors = createSelector(
  selectProductStoreState,
  state => state.productColors
)
