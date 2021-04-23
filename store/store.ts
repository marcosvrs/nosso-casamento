import { Action, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { AuthState } from "./reducers/auth";
import checkoutReducer, { CheckoutState } from "./reducers/checkout";
import itemsReducer, { ItemsState } from "./reducers/items";
import authReducer from "./reducers/auth";

export interface RootState {
    items: ItemsState;
    checkout: CheckoutState;
    auth: AuthState;
}

const store = createStore((state: RootState = {}, action: Action): RootState => ({
    items: itemsReducer(state.items, action, state),
    checkout: checkoutReducer(state.checkout, action, state),
    auth: authReducer(state.auth, action, state)
}), applyMiddleware(thunk))

export default store