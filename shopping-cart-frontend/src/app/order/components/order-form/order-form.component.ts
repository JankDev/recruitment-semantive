import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Product} from "@core/model/order/product";
import {ProductSize} from "@core/model/order/product-size.enum";
import {ProductColor} from "@core/model/order/product-color.enum";
import {User} from "@core/model/order/user";

@Component({
  selector: 'order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent {
  @Input() isValidOrder: boolean;

  @Output() saveProduct = new EventEmitter<Product>();
  @Output() submitOrder = new EventEmitter<User>();

  addressForm = this.fb.group({
    name: [null, Validators.required],
    age: [null, Validators.required],
    color: [null, Validators.required],
    size: [null, Validators.required]
  });

  productSizes = Object.values(ProductSize);
  productColors = Object.values(ProductColor);

  constructor(private fb: FormBuilder) {
  }

  submit(): void {
    const user: User = {
      age: this.addressForm.controls["age"].value,
      name: this.addressForm.controls["name"].value
    }

    this.submitOrder.emit(user);
  }

  save(): void {
    const product: Product = {
      color: this.addressForm.controls['color'].value,
      size: this.addressForm.controls['size'].value
    }
    this.saveProduct.emit(product);
  }
}
