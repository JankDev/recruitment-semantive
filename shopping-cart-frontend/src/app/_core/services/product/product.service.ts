import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "@core/model/product/product";
import {environment} from "@env";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly productsUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }
}
