import * as fromOrderStore from './order-store.reducer';
import { selectOrderStoreState } from './order-store.selectors';

describe('OrderStore Selectors', () => {
  it('should select the feature state', () => {
    const result = selectOrderStoreState({
      [fromOrderStore.orderStoreFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
