import { ITEMS } from "../../data/dummy-items";
import Item from "../../models/item";

const initialState: {
    itemList: { [key: string]: Item };
} = { itemList: ITEMS };

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default itemsReducer;