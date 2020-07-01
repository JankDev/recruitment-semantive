import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Order} from "@core/model/order/order";

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {
  @Input() orders: Order[];

  @Output() search = new EventEmitter<void>();

  displayedColumns = ['user', 'createdDate'];
  dateFormat = 'HH:mm dd.MM.yyyy';

  searchOrders(): void {
    this.search.emit();
  }
}
