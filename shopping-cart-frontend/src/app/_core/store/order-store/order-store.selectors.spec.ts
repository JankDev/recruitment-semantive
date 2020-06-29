import {
  selectCurrentOrder,
  selectIsLoading,
  selectOrderStoreState
} from "@core/store/order-store/order-store.selectors";
import * as fromOrderStore from "@core/store/order-store/order-store.reducer";
import {orderStoreFeatureKey, State} from "@core/store/order-store/order-store.reducer";

describe('OrderStore Selectors', () => {
  let state: State;

  beforeEach(() => {
    state = fromOrderStore.initialState;
  })
  describe("selectOrderStoreState", () => {
    it('should select the feature state', () => {
      const result = selectOrderStoreState({
        [fromOrderStore.orderStoreFeatureKey]: state
      });

      expect(result).toEqual(state);
    });
  });
  describe("selectCurrentOrder", () => {
    it("should return the current order with its items", () => {
      const orderItem = {amount: 1, product: {color: "BLACK", size: "XL"}};
      state = {
        ...state,
        currentOrder: {
          user: null,
          items: [orderItem]
        }
      }

      const result = selectCurrentOrder({
        [fromOrderStore.orderStoreFeatureKey]: state
      });

      expect(result.items).toContain(orderItem);
    })
  });
  describe("selectIsLoading", () => {
    it("should return isLoading", () => {
        state = {
          ...state,
          isLoading: true
        }

        const result = selectIsLoading({
          [orderStoreFeatureKey]: state
        })

        expect(result).toBeTrue();
      }
    );
  })
});
