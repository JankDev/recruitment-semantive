import * as fromOrderState from "./order-store/order-store.reducer";

export interface RootState {
  orders: fromOrderState.State
}
