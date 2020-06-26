import {Action, createReducer, on} from '@ngrx/store';
import * as OrderStoreActions from './order-store.actions';
import {Order} from "@core/store/order-store/order";

export const orderStoreFeatureKey = 'orderStore';

export interface State {
  orders: Order[];
  isLoading: boolean;
  error: string;
}

export const initialState: State = {
  orders: [],
  isLoading: false,
  error: null
};


export const reducer = createReducer(
  initialState,

  on(OrderStoreActions.loadOrderStores, state => state),
  on(OrderStoreActions.loadOrderStoresSuccess, (state, action) => state),
  on(OrderStoreActions.loadOrderStoresFailure, (state, action) => state),
);

