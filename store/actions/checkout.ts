export enum CHECKOUT_ACTIONS {
    ADD_TO_CART = 'ADD_TO_CART',
    REMOVE_FROM_CART = 'REMOVE_FROM_CART'
};

export const addToCart = (itemId: string) => {
    return {
        type: CHECKOUT_ACTIONS.ADD_TO_CART,
        itemId: itemId
    };
}

export const removeFromCart = (itemId: string) => {
    return {
        type: CHECKOUT_ACTIONS.REMOVE_FROM_CART,
        itemId: itemId
    }
}