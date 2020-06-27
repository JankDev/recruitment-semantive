import {initialState, reducer} from './order-store.reducer';
import {OrderStoreActions} from "@core/store/order-store/index";
import {Product} from "@core/model/order/product";
import {ProductColor} from "@core/model/order/product-color.enum";
import {ProductSize} from "@core/model/order/product-size.enum";

describe('OrderStore Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
  describe('addItemToOrder action', () => {
    it("should create a new OrderItem with the actions payload if the product hasn't been picked yet", () => {
      const product = {color: ProductColor.BLACK, size: ProductSize.XL} as Product;
      const action = OrderStoreActions.addItemToOrder({payload: product});

      const result = reducer(initialState, action);

      expect(result.currentOrder.items).toContain({product, amount: 1});
    });
    it("should increase the amount of the product in OrderItem if the product has been picked already", () => {
      const product = {color: ProductColor.BLACK, size: ProductSize.XL} as Product;
      const action = OrderStoreActions.addItemToOrder({payload: product});

      const populatedState = reducer(initialState, action);

      const result = reducer(populatedState, action);

      expect(result.currentOrder.items).toEqual([{product, amount: 2}]);
    });
  })
});
