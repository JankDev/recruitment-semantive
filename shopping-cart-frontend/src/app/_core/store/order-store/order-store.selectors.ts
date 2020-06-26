import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOrderStore from './order-store.reducer';

export const selectOrderStoreState = createFeatureSelector<fromOrderStore.State>(
  fromOrderStore.orderStoreFeatureKey
);
