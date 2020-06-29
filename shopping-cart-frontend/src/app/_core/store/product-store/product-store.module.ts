import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from "@ngrx/effects";
import {productStoreFeatureKey, reducer} from "@core/store/product-store/product-store.reducer";
import {ProductStoreEffects} from "@core/store/product-store/product-store.effects";
import {StoreModule} from "@ngrx/store";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(productStoreFeatureKey, reducer),
    EffectsModule.forFeature([ProductStoreEffects])
  ]
})
export class ProductStoreModule {
}
