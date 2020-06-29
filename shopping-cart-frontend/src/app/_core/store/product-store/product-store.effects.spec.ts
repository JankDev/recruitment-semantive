import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';

import {ProductStoreEffects} from './product-store.effects';

describe('ProductStoreEffects', () => {
  let actions$: Observable<any>;
  let effects: ProductStoreEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductStoreEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ProductStoreEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
