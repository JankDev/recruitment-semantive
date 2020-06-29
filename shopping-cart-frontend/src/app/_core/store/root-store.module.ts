import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '@env';
import {EffectsModule} from '@ngrx/effects';
import {OrderStoreModule} from "@core/store/order-store";
import {ProductStoreModule} from "@core/store/product-store";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([]),
    OrderStoreModule,
    ProductStoreModule
  ]
})
export class RootStoreModule {
}
