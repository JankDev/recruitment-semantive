import {Product} from "@core/model/order/product";

export interface OrderItem {
  product: Product;
  amount: number;
}
