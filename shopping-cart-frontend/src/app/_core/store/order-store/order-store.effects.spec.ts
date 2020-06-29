import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable, of} from 'rxjs';

import {OrderStoreEffects} from './order-store.effects';
import {OrderService} from "@core/services/order";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {initialState} from "@core/store/order-store/order-store.reducer";
import {SharedModule} from "@shared";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RootState} from "@core/store/root-state";
import {OrderItem} from "@core/model/order/order-item";
import {Product} from "@core/model/product/product";
import {submitOrder} from "@core/store/order-store/order-store.actions";
import {User} from "@core/model/order/user";

describe('OrderStoreEffects', () => {
  let actions$: Observable<any>;
  let effects: OrderStoreEffects;
  let orderService;
  let store: MockStore<RootState>;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    orderService = jasmine.createSpyObj(["submitOrder"]);
    orderService.submitOrder.and.returnValue(of([]));
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedModule
      ],
      providers: [
        OrderStoreEffects,
        {provide: OrderService, useValue: orderService},
        provideMockActions(() => actions$),
        provideMockStore({initialState})
      ]
    });
    store = TestBed.inject(MockStore);
    snackBar = TestBed.inject(MatSnackBar);
    effects = TestBed.inject(OrderStoreEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
  describe("submitOrderEffect", () => {
    it("should create the order out of the items ans and user and invoke the order service with it", () => {
      const orderItem: OrderItem = {
        product: {id: 1, color: "WHITE", size: "XL", available: 1} as Product,
        amount: 1
      };
      store.setState({
        products: null,
        orders: {
          ...initialState,
          currentOrder: {
            items: [orderItem],
            user: null
          }
        }
      });

      const payload: User = {age: 22, name: "Robert"};
      actions$ = of(submitOrder({payload}));

      effects.submitOrderEffect$.subscribe(() => {
        expect(orderService.submitOrder).toHaveBeenCalledWith(payload);
      });


    })
  })
});
