import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../material";
import {AppLayoutComponent} from "./app-layout.component";
import {RouterModule} from "@angular/router";


@NgModule({
    declarations: [AppLayoutComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
    exports: [
        AppLayoutComponent
    ]
})
export class AppLayoutModule {
}
