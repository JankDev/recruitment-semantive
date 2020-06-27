import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderComponent} from './order.component';
import {CoreModule} from "@core";
import {Product} from "@core/model/order/product";
import {ProductColor} from "@core/model/order/product-color.enum";
import {ProductSize} from "@core/model/order/product-size.enum";
import {RootState} from "@core/store/root-state";
import {OrderStoreActions} from "@core/store/order-store";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MockStore, provideMockStore} from "@ngrx/store/testing";

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let store: MockStore<RootState>
  let currentOrder = {
    items: [{amount: 1, product: {color: ProductColor.BLACK, size: ProductSize.XL}}],
    user: null
  };
  let initialState: RootState = {
    orders: {
      currentOrder,
      error: null,
      isLoading: false,
      orders: []
    }
  }

  beforeEach(() => {
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    store = TestBed.inject(MockStore);
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
    const product: Product = {color: ProductColor.BLACK, size: ProductSize.XL};
    component.addItemToOrder(product);

    const expectedAction = OrderStoreActions.addItemToOrder({payload: product});
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it("should load the current order items", () => {
    const subscription = component.currentOrderItems$.subscribe(data => expect(data).toEqual(currentOrder.items));

    subscription.unsubscribe();
  })
});
