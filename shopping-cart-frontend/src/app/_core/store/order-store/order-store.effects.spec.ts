import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable, of, throwError} from 'rxjs';

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
import {OrderStoreActions} from "@core/store/order-store/index";

describe('OrderStoreEffects', () => {
  let actions$: Observable<any>;
  let effects: OrderStoreEffects;
  let orderService;
  let store: MockStore<RootState>;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    orderService = jasmine.createSpyObj("orderService", ["submitOrder, getAllOrders"]);
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
      orderService.submitOrder.and.returnValue(of([]));
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
  });

  describe("loadOrdersEffect", () => {
    it("should dispatch the loadOrdersSuccessAction if service returned array", () => {
      orderService.getAllOrders.and.returnValue(of([]));
      effects.loadOrdersEffect$.subscribe(action => {
        expect(action.type).toEqual(OrderStoreActions.loadOrdersSuccess.type);
      })
    });

    it("should dispatch the loadOrdersSuccessFailure if service threw an error", () => {
      orderService.getAllOrders.and.returnValue(throwError(new Error()));
      effects.loadOrdersEffect$.subscribe(action => {
        expect(action.type).toEqual(OrderStoreActions.loadOrdersFailure.type);
      })
    });
  });


});
