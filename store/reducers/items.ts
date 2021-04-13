import { Action } from "redux";
import Item from "../../models/item";
import { ITEMS_ACTIONS } from "../actions/items";
import createReducer from "../createReducer";

export interface ItemsState {
    itemList: { [key: string]: Item | undefined };
}

export interface ItemsAction extends Action<ITEMS_ACTIONS.SET_ITEM> {
    item: Item;
}

export interface ItemListAction extends Action<ITEMS_ACTIONS.FETCH_ITEMS> {
    itemList: { [key: string]: Item | undefined }
}

function fetchItems(state: ItemsState, action: ItemListAction) {
    return {
        ...state,
        itemList: action.itemList
    }
}

function setItem(state: ItemsState, action: ItemsAction) {
    return {
        ...state,
        itemList: {
            ...state.itemList,
            [action.item.id]: action.item
        }
    }
}

export default createReducer({ itemList: {} }, {
    [ITEMS_ACTIONS.FETCH_ITEMS]: fetchItems,
    [ITEMS_ACTIONS.SET_ITEM]: setItem
})