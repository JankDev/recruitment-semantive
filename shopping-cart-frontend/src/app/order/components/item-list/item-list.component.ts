import {Component, Input} from '@angular/core';
import {OrderItem} from "@core/model/order/order-item";

@Component({
  selector: 'order-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent {
  @Input() data: OrderItem[];

  displayedColumns = ['product', 'amount'];
}
