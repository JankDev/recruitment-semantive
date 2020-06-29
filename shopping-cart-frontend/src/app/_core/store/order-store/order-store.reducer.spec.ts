import {initialState, reducer} from './order-store.reducer';
import {OrderStoreActions} from "@core/store/order-store/index";
import {Product} from "@core/model/product/product";
import {User} from "@core/model/order/user";

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
      const product = {color: "BLACK", size: "XL"} as Product;
      const action = OrderStoreActions.addItemToOrder({payload: product});

      const result = reducer(initialState, action);

      expect(result.currentOrder.items).toContain({product, amount: 1});
    });
    it("should increase the amount of the product in OrderItem if the product has been picked already", () => {
      const product = {color: "BLACK", size: "XL"} as Product;
      const action = OrderStoreActions.addItemToOrder({payload: product});

      const populatedState = reducer(initialState, action);

      const result = reducer(populatedState, action);

      expect(result.currentOrder.items).toEqual([{product, amount: 2}]);
    });
  })
  describe("submitOrder(Success|Failure) action", () => {
    it("should change isLoading to true", () => {
      const user = {name: "Robert", age: 20} as User;
      const action = OrderStoreActions.submitOrder({payload: user});

      const result = reducer(initialState, action);

      expect(result.isLoading).toBeTrue();
    });
    it("should change isLoading to false if successful and clear the current order", () => {
      const action = OrderStoreActions.submitOrderSuccess({payload: null});

      const result = reducer(initialState, action);

      expect(result.isLoading).toBeFalse();
      expect(result.currentOrder.items).toEqual([]);
      expect(result.currentOrder.user).toEqual(null);
    });
    it("should change isLoading to false and set error if failure", () => {
      const error = "Error";
      const action = OrderStoreActions.submitOrderFailure({error});

      const result = reducer(initialState, action);

      expect(result.isLoading).toBeFalse();
      expect(result.error).toEqual(error);
    })
  })

});
