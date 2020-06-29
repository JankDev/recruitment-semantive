import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, debounceTime, map, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';

import * as OrderStoreActions from './order-store.actions';
import {OrderService} from "@core/services/order";
import {RootState} from "@core/store/root-state";
import {select, Store} from "@ngrx/store";
import {Order} from "@core/model/order/order";
import {MatSnackBar} from "@angular/material/snack-bar";
import {successfulSubmitMessage} from "../../../../assets/messages";
import {selectCurrentOrder} from "@core/store/order-store/order-store.selectors";


@Injectable()
export class OrderStoreEffects {

  submitOrderEffect$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(OrderStoreActions.submitOrder),
        debounceTime(300),
        withLatestFrom(this.store.pipe(select(selectCurrentOrder))),
        map(([action, currentOrder]) => ({...currentOrder, user: action.payload} as Order)),
        concatMap(order => this.orderService.submitOrder(order).pipe(
          map(items => {
            this.snackBar.open(successfulSubmitMessage, null, {panelClass: ['mat-toolbar', 'mat-accent']});
            return OrderStoreActions.submitOrderSuccess({payload: items});
          }),
          catchError(err => {
            this.snackBar.open(err, null, {panelClass: ['mat-toolbar', 'mat-warn']});
            return of(OrderStoreActions.submitOrderFailure(err));
          })
          )
        )
      )
    }
  );


  constructor(private actions$: Actions,
              private orderService: OrderService,
              private store: Store<RootState>,
              private snackBar: MatSnackBar) {
  }

}
