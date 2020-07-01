import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Order} from "@core/model/order/order";
import {animate, state, style, transition, trigger} from "@angular/animations";

export interface OrderTableItem {
  order: Order;
  isExpanded: boolean;
}

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrderListComponent {
  @Input() orderRows: OrderTableItem[];

  @Output() search = new EventEmitter<void>();
  @Output() expand = new EventEmitter<number>();

  displayedColumns = ['user', 'createdDate'];
  dateFormat = 'HH:mm dd.MM.yyyy';

  searchOrders(): void {
    this.search.emit();
  }

  expandOrderRow(row: OrderTableItem): void {
    if (!row.isExpanded) {
      this.expand.emit(row.order.id);
    }

    row.isExpanded = !row.isExpanded;
  }
}
