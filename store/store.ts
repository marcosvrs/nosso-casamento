import { createStore } from "redux";
import checkoutReducer from "./reducers/checkout";
import itemsReducer from "./reducers/items";

const store = createStore((state = {}, action) => ({
    items: itemsReducer(state.items, action, state),
    checkout: checkoutReducer(state.checkout, action, state)
}));

export default store;