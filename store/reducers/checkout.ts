import { Action } from "redux";
import { CartItem } from "../../models/cartItem";
import { CHECKOUT_ACTIONS } from "../actions/checkout";
import createReducer from "../createReducer";
import { RootState } from "../store";

export interface CheckoutState {
    checkoutItems: { [key: string]: CartItem | undefined };
    checkoutItemsLength: number;
}

interface CheckoutAction<T extends CHECKOUT_ACTIONS> extends Action<T> {
    itemId: string;
}

function addToCart(state: CheckoutState, action: CheckoutAction<CHECKOUT_ACTIONS.ADD_TO_CART>, root: RootState) {
    if (state.checkoutItems[action.itemId] !== undefined) {
        return state;
    }

    const fetchItem = root.items.itemList[action.itemId];
    if (fetchItem === undefined) {
        return state;
    }

    state.checkoutItems[action.itemId] = fetchItem;
    state.checkoutItemsLength += 1;

    return { ...state };
}

function removeFromCart(state: CheckoutState, action: CheckoutAction<CHECKOUT_ACTIONS.REMOVE_FROM_CART>) {
    if (state.checkoutItems[action.itemId] === undefined) {
        return state;
    }

    const { [action.itemId]: deletedCartItem, ...newCartItems } = state.checkoutItems;
    state.checkoutItems = newCartItems;
    state.checkoutItemsLength -= 1;

    return { ...state };
}

export default createReducer({
    checkoutItems: {},
    checkoutItemsLength: 0
}, {
    [CHECKOUT_ACTIONS.ADD_TO_CART]: addToCart,
    [CHECKOUT_ACTIONS.REMOVE_FROM_CART]: removeFromCart
});