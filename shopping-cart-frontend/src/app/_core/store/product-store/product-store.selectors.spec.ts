import * as fromProductStore from './product-store.reducer';
import {initialState, State} from './product-store.reducer';
import {selectProductStoreState} from './product-store.selectors';

describe('ProductStore Selectors', () => {
  let state: State;
  beforeEach(() => {
    state = initialState;
  })
  it('should select the feature state', () => {
    const result = selectProductStoreState({
      [fromProductStore.productStoreFeatureKey]: initialState
    });

    expect(result).toEqual(state);
  });
});
