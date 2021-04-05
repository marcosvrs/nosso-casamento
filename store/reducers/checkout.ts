import { CartItem } from "../../models/cartItem";
import { CHECKOUT_ACTIONS } from "../actions/checkout";

const initialState: {
    checkoutItems: { [key: string]: CartItem };
    checkoutItemsLength: number;
} = {
        checkoutItems: {},
        checkoutItemsLength: 0
};

const checkoutReducer = (state = initialState, action, root) => {
    switch (action.type) {
        case CHECKOUT_ACTIONS.ADD_TO_CART:
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

        case CHECKOUT_ACTIONS.REMOVE_FROM_CART:
            if (state.checkoutItems[action.itemId] === undefined) {
                return state;
            }

            const { [action.itemId]: deletedCartItem, ...newCartItems } = state.checkoutItems;
            state.checkoutItems = newCartItems;
            state.checkoutItemsLength -= 1;

            return { ...state };
        default:
            return state;
    }
}

export default checkoutReducer;