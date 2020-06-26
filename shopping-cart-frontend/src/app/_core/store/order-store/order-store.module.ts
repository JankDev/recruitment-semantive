import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {orderStoreFeatureKey, reducer} from "@core/store/order-store/order-store.reducer"
import {EffectsModule} from "@ngrx/effects";
import {OrderStoreEffects} from "@core/store/order-store/order-store.effects";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(orderStoreFeatureKey, reducer),
    EffectsModule.forFeature([OrderStoreEffects])
  ]
})
export class OrderStoreModule {
}
