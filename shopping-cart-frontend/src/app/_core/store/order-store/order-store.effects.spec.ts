import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { OrderStoreEffects } from './order-store.effects';

describe('OrderStoreEffects', () => {
  let actions$: Observable<any>;
  let effects: OrderStoreEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderStoreEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(OrderStoreEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
