import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Product} from "@core/model/order/product";
import {ProductSize} from "@core/model/order/product-size.enum";
import {ProductColor} from "@core/model/order/product-color.enum";

@Component({
  selector: 'order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent {
  @Output() saveProduct = new EventEmitter<Product>()
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

  onSubmit() {
    alert('Thanks!');
  }

  save(): void {
    const product: Product = {
      color: this.addressForm.controls['color'].value,
      size: this.addressForm.controls['size'].value
    }
    this.saveProduct.emit(product);
  }
}
