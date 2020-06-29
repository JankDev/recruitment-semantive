import {Product} from "@core/model/product/product";

export interface OrderItem {
  product: Product;
  amount: number;
}
