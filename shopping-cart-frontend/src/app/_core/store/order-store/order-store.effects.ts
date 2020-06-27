import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';

import * as OrderStoreActions from './order-store.actions';


@Injectable()
export class OrderStoreEffects {

  loadOrderStores$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrderStoreActions.loadOrderStores),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => OrderStoreActions.loadOrderStoresSuccess({payload: data})),
          catchError(error => of(OrderStoreActions.loadOrderStoresFailure({error}))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
