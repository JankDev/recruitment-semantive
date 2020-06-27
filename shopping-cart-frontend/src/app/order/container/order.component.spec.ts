import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderComponent} from './order.component';
import {CoreModule} from "@core";
import {Product} from "@core/model/order/product";
import {ProductColor} from "@core/model/order/product-color.enum";
import {ProductSize} from "@core/model/order/product-size.enum";
import {Store} from "@ngrx/store";
import {RootState} from "@core/store/root-state";
import {OrderStoreActions} from "@core/store/order-store";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderComponent],
      imports: [
        BrowserAnimationsModule,
        CoreModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should dispatch the addItemToOrder action if child emits", () => {
    const store = jasmine.createSpyObj<Store<RootState>>('store', ['dispatch']);
    component = new OrderComponent(store);

    const product: Product = {color: ProductColor.BLACK, size: ProductSize.XL};
    component.addOrder(product);

    const expectedAction = OrderStoreActions.addItemToOrder({payload: product});
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
