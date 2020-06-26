import {Product} from "@core/store/order-store/product";

export interface Order {
  product: Product;
  amount: number;
}
