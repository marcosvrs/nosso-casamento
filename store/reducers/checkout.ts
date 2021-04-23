import { Action } from "redux";
import { CartItem } from "../../models/cartItem";
import { CHECKOUT_ACTIONS } from "../actions/checkout";
import createReducer from "../createReducer";
import { RootState } from "../store";

export interface CheckoutState {
    checkoutItems: { [key: string]: CartItem | undefined };
    guest: {
        name: string;
        email: string;
        address: string;
        phone: string;
    };
    vows: string;
    checkoutItemsLength: number;
    totalAmount: number;
}

interface CartAction extends Action<CHECKOUT_ACTIONS.ADD_TO_CART | CHECKOUT_ACTIONS.REMOVE_FROM_CART> {
    itemId: string;
}

interface GuestAction extends Action<CHECKOUT_ACTIONS.SET_GUEST> {
    guest: {
        name: string;
        email: string;
        address: string;
        phone: string;
    };
}

interface VowsAction extends Action<CHECKOUT_ACTIONS.SET_VOWS> {
    vows: string;
}

function addToCart(state: CheckoutState, action: CartAction, root: RootState) {
    if (state.checkoutItems[action.itemId] !== undefined) {
        return state;
    }

    const fetchItem = root.items.itemList[action.itemId];
    if (fetchItem === undefined) {
        return state;
    }

    state.checkoutItems[action.itemId] = fetchItem;
    state.totalAmount += fetchItem.value;
    state.checkoutItemsLength += 1;

    return { ...state };
}

function removeFromCart(state: CheckoutState, action: CartAction) {
    if (state.checkoutItems[action.itemId] === undefined) {
        return state;
    }

    const { [action.itemId]: deletedCartItem, ...newCartItems } = state.checkoutItems;
    state.checkoutItems = newCartItems;
    state.totalAmount -= deletedCartItem?.value ?? 0;
    state.checkoutItemsLength -= 1;

    return { ...state };
}

function setGuest(state: CheckoutState, action: GuestAction) {
    return {
        ...state,
        guest: action.guest
    };
}

function setVows(state: CheckoutState, action: VowsAction) {
    return {
        ...state,
        vows: action.vows
    };
}

export default createReducer({
    checkoutItems: {},
    guest: {
        name: '',
        email: '',
        address: '',
        phone: ''
    },
    vows: '',
    checkoutItemsLength: 0,
    totalAmount: 0
}, {
    [CHECKOUT_ACTIONS.ADD_TO_CART]: addToCart,
    [CHECKOUT_ACTIONS.REMOVE_FROM_CART]: removeFromCart,
    [CHECKOUT_ACTIONS.SET_GUEST]: setGuest,
    [CHECKOUT_ACTIONS.SET_VOWS]: setVows
})