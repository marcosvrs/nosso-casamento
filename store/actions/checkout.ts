export enum CHECKOUT_ACTIONS {
    ADD_TO_CART = 'ADD_TO_CART',
    REMOVE_FROM_CART = 'REMOVE_FROM_CART',
    SET_GUEST = 'SET_GUEST',
    SET_VOWS = 'SET_VOWS'
};

export function addToCart(itemId: string) {
    return {
        type: CHECKOUT_ACTIONS.ADD_TO_CART,
        itemId: itemId
    };
}

export function removeFromCart(itemId: string) {
    return {
        type: CHECKOUT_ACTIONS.REMOVE_FROM_CART,
        itemId: itemId
    }
}

export function setGuest(guest: {
    name: string;
    email: string;
    address: string;
    phone: string;
}) {
    return {
        type: CHECKOUT_ACTIONS.SET_GUEST,
        guest: guest
    }
}

export function setVows(vows: string) {
    return {
        type: CHECKOUT_ACTIONS.SET_VOWS,
        vows
    }
}