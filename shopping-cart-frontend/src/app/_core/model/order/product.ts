import {ProductColor} from "@core/model/order/product-color.enum";
import {ProductSize} from "@core/model/order/product-size.enum";

export interface Product {
  id?: number;
  color: ProductColor;
  size: ProductSize;
}
