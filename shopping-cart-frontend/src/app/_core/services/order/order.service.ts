import {Injectable} from '@angular/core';
import {Order} from "@core/model/order/order";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {OrderItem} from "@core/model/order/order-item";
import {environment} from "@env";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly ordersUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {
  }

  submitOrder(order: Order): Observable<OrderItem[]> {
    return this.http.post<OrderItem[]>(this.ordersUrl, order);
  }
}
