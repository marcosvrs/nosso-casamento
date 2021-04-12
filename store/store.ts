import { Action, createStore } from "redux";
import checkoutReducer, { CheckoutState } from "./reducers/checkout";
import itemsReducer, { ItemsState } from "./reducers/items";

export interface RootState {
    items: ItemsState;
    checkout: CheckoutState;
}

const store = createStore((state: RootState = {}, action: Action): RootState => ({
    items: itemsReducer(state.items, action, state),
    checkout: checkoutReducer(state.checkout, action, state)
}));

export default store;