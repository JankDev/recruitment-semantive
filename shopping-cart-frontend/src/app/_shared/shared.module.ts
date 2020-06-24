import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "./material";
import {AppLayoutModule} from "./app-layout";


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AppLayoutModule
  ],
  exports: [
    MaterialModule,
    AppLayoutModule
  ]
})
export class SharedModule {
}
