import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderComponent} from './order.component';
import {CoreModule} from "@core";
import {Product} from "@core/model/product/product";
import {RootState} from "@core/store/root-state";
import {OrderStoreActions, OrderStoreSelectors} from "@core/store/order-store";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {MemoizedSelector} from "@ngrx/store";
import * as fromOrderState from "@core/store/order-store/order-store.reducer";
import {Order} from "@core/model/order/order";

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let store: MockStore<RootState>
  let currentOrder = {
    items: [{amount: 1, product: {color: "BLACK", size: "XL"}}],
    user: null
  };
  let initialState: RootState;
  let mockCurrentOrderSelector: MemoizedSelector<fromOrderState.State, Order>;

  beforeEach(() => {
    initialState = {
      products: null,
      orders: {
        currentOrder,
        error: null,
        isLoading: false,
        orders: []
      }

    };
    TestBed.configureTestingModule({
      declarations: [OrderComponent],
      imports: [
        BrowserAnimationsModule,
        CoreModule
      ],
      providers: [
        provideMockStore({initialState})
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(OrderComponent);
    store = TestBed.inject(MockStore);
    mockCurrentOrderSelector = store.overrideSelector(
      OrderStoreSelectors.selectCurrentOrder,
      currentOrder
    );

    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should dispatch the addItemToOrder action if child emits", () => {
    spyOn(store, "dispatch")
    const product: Product = {color: "BLACK", size: "XL"};
    component.addItemToOrder(product);

    const expectedAction = OrderStoreActions.addItemToOrder({payload: product});
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it("should load the current order items", () => {
    const subscription = component.currentOrderItems$.subscribe(data => expect(data).toEqual(currentOrder.items));

    subscription.unsubscribe();
  })
});
