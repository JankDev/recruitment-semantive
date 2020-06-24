import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../material";
import {AppLayoutComponent} from "./app-layout.component";


@NgModule({
  declarations: [AppLayoutComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
})
export class AppLayoutModule {
}
