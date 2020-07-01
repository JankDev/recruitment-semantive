import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Product} from "@core/model/product/product";
import {User} from "@core/model/order/user";


@Component({
  selector: 'order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderFormComponent {
  @Input() isValidOrder: boolean;
  @Input() products: Product[];
  @Input() productColors: Set<string>;
  @Input() productSizes: Set<string>;
  @Input() isLoading: boolean;

  @Output() saveProduct = new EventEmitter<Product>();
  @Output() submitOrder = new EventEmitter<User>();

  maxAge = 100;
  minAge = 18;
  addressForm = this.fb.group({
    name: [null, [Validators.required, Validators.pattern("^[A-Z][a-zA-Z]*")]],
    age: [null, [Validators.required, Validators.min(this.minAge), Validators.max(this.maxAge)]],
    color: [null, Validators.required],
    size: [null, Validators.required]
  });

  constructor(private fb: FormBuilder) {
  }

  submit(): void {
    const user: User = {
      age: this.addressForm.controls["age"].value,
      name: this.addressForm.controls["name"].value
    }

    if (this.addressForm.valid) {
      this.submitOrder.emit(user);
      this.addressForm.reset();
    }
  }

  save(): void {
    const product = this.products.find(p => p.size === this.addressForm.controls['size'].value &&
      p.color === this.addressForm.controls['color'].value);
    this.saveProduct.emit(product);
  }
}
