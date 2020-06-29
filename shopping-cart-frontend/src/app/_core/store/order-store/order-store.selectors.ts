import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromOrderStore from './order-store.reducer';

export const selectOrderStoreState = createFeatureSelector<fromOrderStore.State>(
  fromOrderStore.orderStoreFeatureKey
);

export const selectCurrentOrder = createSelector(
  selectOrderStoreState,
  state => state.currentOrder
);
export const selectIsLoading = createSelector(
  selectOrderStoreState,
  state => state.isLoading
)
