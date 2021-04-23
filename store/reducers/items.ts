import { Action } from "redux";
import Item from "../../models/item";
import { ITEMS_ACTIONS } from "../actions/items";
import createReducer from "../createReducer";

export interface ItemsState {
    itemList: { [key: string]: Item | undefined };
}

export interface SetItemAction extends Action<ITEMS_ACTIONS.SET_ITEM> {
    item: Item;
}

export interface FetchItemsAction extends Action<ITEMS_ACTIONS.FETCH_ITEMS> {
    itemList: { [key: string]: Item | undefined }
}

export interface DeleteItemAction extends Action<ITEMS_ACTIONS.DELETE_ITEM> {
    itemId: string;
}

function fetchItems(state: ItemsState, action: FetchItemsAction) {
    return {
        ...state,
        itemList: action.itemList
    }
}

function setItem(state: ItemsState, action: SetItemAction) {
    return {
        ...state,
        itemList: {
            ...state.itemList,
            [action.item.id]: action.item
        }
    }
}

function deleteItem(state: ItemsState, action: DeleteItemAction) {
    if (state.itemList[action.itemId] === undefined) {
        return state;
    }

    const { [action.itemId]: deletedItem, ...newItems } = state.itemList;

    return {
        ...state,
        itemList: newItems
    };
}

export default createReducer({ itemList: {} }, {
    [ITEMS_ACTIONS.FETCH_ITEMS]: fetchItems,
    [ITEMS_ACTIONS.SET_ITEM]: setItem,
    [ITEMS_ACTIONS.DELETE_ITEM]: deleteItem
})