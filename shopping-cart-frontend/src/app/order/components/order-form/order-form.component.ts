import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent {
  addressForm = this.fb.group({
    name: [null, Validators.required],
    age: [null, Validators.required],
    color: [null, Validators.required],
    size: [null, Validators.required]
  });

  shirtSizes = ["S", "M", "L", "XL"]
  shirtColors = ["green", "red", "blue", "white"];

  constructor(private fb: FormBuilder) {
  }

  onSubmit() {
    alert('Thanks!');
  }
}
