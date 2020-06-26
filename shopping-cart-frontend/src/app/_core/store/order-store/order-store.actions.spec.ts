import * as fromOrderStore from './order-store.actions';

describe('loadOrderStores', () => {
  it('should return an action', () => {
    expect(fromOrderStore.loadOrderStores().type).toBe('[OrderStore] Load OrderStores');
  });
});
