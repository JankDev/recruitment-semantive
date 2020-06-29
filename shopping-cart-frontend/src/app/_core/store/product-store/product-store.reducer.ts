import {createReducer, on} from '@ngrx/store';
import * as ProductStoreActions from './product-store.actions';
import {Product} from "@core/model/product/product";

export const productStoreFeatureKey = 'productStore';

export interface State {
  products: Product[];
  productColors: Set<string>;
  productSizes: Set<string>;
  isLoading: boolean;
  error: string;
}

export const initialState: State = {
  products: [],
  productColors: new Set(),
  productSizes: new Set(),
  isLoading: false,
  error: null
};


export const reducer = createReducer(
  initialState,

  on(ProductStoreActions.loadProducts, state => ({
    ...state,
    isLoading: true,
  })),
  on(ProductStoreActions.loadProductsSuccess, (state, action) => ({
    ...state,
    products: action.payload,
    productColors: new Set(action.payload.map(p => p.color)),
    productSizes: new Set(action.payload.map(p => p.size)),
    isLoading: false
  })),
  on(ProductStoreActions.loadProductsFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.payload
  })),
);

