import {initialState, reducer, State} from './order-store.reducer';
import {OrderStoreActions} from "@core/store/order-store/index";
import {Product} from "@core/model/product/product";
import {User} from "@core/model/order/user";
import {Order} from "@core/model/order/order";
import {OrderItem} from "@core/model/order/order-item";

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
  describe("loadOrders(Success|Failure)", () => {
    it("should change isLoading to true", () => {
      const action = OrderStoreActions.loadOrders();

      const result = reducer(initialState, action);

      expect(result.isLoading).toBeTrue();
    });
    it("should change isLoading to false if successful and set the orders in the state", () => {
      const orders = [{user: null, items: [], createdDate: new Date()} as Order];
      const action = OrderStoreActions.loadOrdersSuccess({payload: orders});

      const result = reducer(initialState, action);

      expect(result.isLoading).toBeFalse();
      expect(result.orders).toEqual(orders);
    });
    it("should change isLoading to false and set error if failure", () => {
      const error = "Error";
      const action = OrderStoreActions.loadOrdersFailure({payload: error});

      const result = reducer(initialState, action);

      expect(result.isLoading).toBeFalse();
      expect(result.error).toEqual(error);
    })
  });
  describe("displayOrderInformation", () => {
    it("should set the items of an order with a given id and set isLoading to false if successful", () => {
      const order: Order = {id: 1, items: [], createdDate: null, user: null};
      const payload = [{orderId: order.id, amount: 2, product: null} as OrderItem];
      const action = OrderStoreActions.displayOrderInformationSuccess({payload});

      const state: State = {
        ...initialState,
        orders: [order]
      }

      const result = reducer(state, action);

      expect(result.orders[0].items).toEqual(payload);
    })
  })

});
