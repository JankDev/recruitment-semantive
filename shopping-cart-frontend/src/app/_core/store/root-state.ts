import * as fromOrderState from "./order-store/order-store.reducer";
import * as fromProductState from "./product-store/product-store.reducer";

export interface RootState {
  orders: fromOrderState.State;
  products: fromProductState.State;
}
