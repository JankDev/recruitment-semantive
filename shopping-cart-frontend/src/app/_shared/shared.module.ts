import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "./material";
import {AppLayoutModule} from "./app-layout";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AppLayoutModule,
    ReactiveFormsModule,
  ],
  exports: [
    MaterialModule,
    AppLayoutModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule {
}
