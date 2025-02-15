import {createReducer, on} from '@ngrx/store';
import * as OrderStoreActions from './order-store.actions';
import {Order} from "@core/model/order/order";
import {OrderItem} from "@core/model/order/order-item";

export const orderStoreFeatureKey = 'orderStore';

export interface State {
  orders: Order[];
  currentOrder: Order,
  isLoading: boolean;
  error: string;
}

export const initialState: State = {
  orders: [],
  currentOrder: {
    items: [],
    user: null
  },
  isLoading: false,
  error: null
};


export const reducer = createReducer(
  initialState,
  on(OrderStoreActions.loadOrders, (state, action) => ({
    ...state,
    isLoading: true
  })),
  on(OrderStoreActions.loadOrdersSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    orders: action.payload
  })),
  on(OrderStoreActions.loadOrdersFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.payload
  })),
  on(OrderStoreActions.addItemToOrder, (state, action) => {
    const orderItemIndex = state.currentOrder.items.findIndex(item => JSON.stringify(item.product) === JSON.stringify(action.payload));
    const items = state.currentOrder.items;

    if (orderItemIndex >= 0) {
      const orderItem = items[orderItemIndex];

      const newItems = items.slice();
      newItems[orderItemIndex] = {product: orderItem.product, amount: orderItem.amount + 1};

      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          items: newItems
        }
      }

    } else {
      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          items: [...items, {product: action.payload, amount: 1} as OrderItem]
        }
      };
    }

  }),
  on(OrderStoreActions.submitOrder, (state, action) => {
    return {
      ...state,
      isLoading: true
    }
  }),
  on(OrderStoreActions.submitOrderSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      currentOrder: {
        items: [],
        user: null
      }
    }
  }),
  on(OrderStoreActions.submitOrderFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error
  })),
  on(OrderStoreActions.displayOrderInformation, (state, action) => ({
    ...state,
    isLoading: true
  })),
  on(OrderStoreActions.displayOrderInformationSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    orders: state.orders.map(order => {
      if (order.id === action.payload[0].orderId) {
        return {
          ...order,
          items: action.payload
        }
      }
      return order;
    })
  })),
  on(OrderStoreActions.displayOrderInformationFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.payload
  }))
);

