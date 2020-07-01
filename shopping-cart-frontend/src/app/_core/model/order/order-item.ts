import {Product} from "@core/model/product/product";

export interface OrderItem {
  orderId?: number;
  product: Product;
  amount: number;
}
