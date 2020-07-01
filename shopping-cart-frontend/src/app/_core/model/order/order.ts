import {OrderItem} from "@core/model/order/order-item";
import {User} from "@core/model/order/user";

export interface Order {
  id?: number;
  items?: OrderItem[];
  user: User;
  createdDate?: Date;
}
