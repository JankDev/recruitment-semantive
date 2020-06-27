import {selectCurrentOrder, selectOrderStoreState} from "@core/store/order-store/order-store.selectors";
import * as fromOrderStore from "@core/store/order-store/order-store.reducer";
import {State} from "@core/store/order-store/order-store.reducer";
import {ProductColor} from "@core/model/order/product-color.enum";
import {ProductSize} from "@core/model/order/product-size.enum";

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
      const orderItem = {amount: 1, product: {color: ProductColor.BLACK, size: ProductSize.XL}};
      state = {
        ...state,
        currentOrder: {
          items: [orderItem]
        }
      }

      const result = selectCurrentOrder({
        [fromOrderStore.orderStoreFeatureKey]: state
      });

      expect(result.items).toContain(orderItem);
    })
  })
});
