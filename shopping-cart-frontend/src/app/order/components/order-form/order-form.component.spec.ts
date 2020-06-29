import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderFormComponent} from './order-form.component';
import {SharedModule} from "@shared";
import {Product} from "@core/model/product/product";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('OrderFormComponent', () => {
  let component: OrderFormComponent;
  let fixture: ComponentFixture<OrderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderFormComponent],
      imports: [
        SharedModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it("should emit product on save button click", () => {
    spyOn(component.saveProduct, "emit");

    const product: Product = {color: "BLACK", size: "XL"};
    component.addressForm.setValue({
      name: "adam",
      age: 20,
      size: product.size,
      color: product.color
    })

    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('#save-button');
    button.dispatchEvent(new Event('click'));


    fixture.detectChanges();

    expect(component.saveProduct.emit).toHaveBeenCalledWith(product);
  });
});
