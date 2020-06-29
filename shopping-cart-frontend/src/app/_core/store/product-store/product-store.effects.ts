import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map} from 'rxjs/operators';
import {of} from 'rxjs';

import * as ProductStoreActions from './product-store.actions';
import {ProductService} from "@core/services/product";


@Injectable()
export class ProductStoreEffects {

  loadProductStores$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductStoreActions.loadProducts),
      concatMap(() => this.productService.getProducts().pipe(
        map(data => ProductStoreActions.loadProductsSuccess({payload: data})),
        catchError(error => of(ProductStoreActions.loadProductsFailure({payload: error}))))
      )
    );
  });


  constructor(private actions$: Actions,
              private productService: ProductService) {
  }

}
