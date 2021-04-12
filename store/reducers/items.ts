import { ITEMS } from "../../data/dummy-items";
import Item from "../../models/item";
import createReducer from "../createReducer";

export interface ItemsState {
    itemList: { [key: string]: Item | undefined };
}

export default createReducer({ itemList: ITEMS }, {
    test: (state: ItemsState) => state
});