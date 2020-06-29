import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';

import {ProductStoreEffects} from './product-store.effects';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ProductStoreEffects', () => {
  let actions$: Observable<any>;
  let effects: ProductStoreEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
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
