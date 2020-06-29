import * as fromProductStore from './product-store.actions';

describe('loadProductStores', () => {
  it('should return an action', () => {
    expect(fromProductStore.loadProducts().type).toBe('[ProductStore] Load ProductStores');
  });
});
