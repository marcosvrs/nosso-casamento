import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { FetchItemsAction, SetItemAction } from "../reducers/items";
import { fetchItems as fetchItemsService, setItem as setItemService, deleteItem as deleteItemService } from "../../services/FirestoreItemsService";

export enum ITEMS_ACTIONS {
    SET_ITEM = 'SET_ITEM',
    FETCH_ITEMS = 'FETCH_ITEMS',
    DELETE_ITEM = 'DELETE_ITEM'
};

export function fetchItems() {
    return async (dispatch: ThunkDispatch<{}, {}, FetchItemsAction>) => {
        dispatch({
            type: ITEMS_ACTIONS.FETCH_ITEMS,
            itemList: await fetchItemsService()
        });
    }
}

export function setItem(token: string, item: { id?: string; name: string; value: number; image: string; description?: string; }) {
    return async (dispatch: ThunkDispatch<{}, {}, SetItemAction>) => {
        dispatch({
            type: ITEMS_ACTIONS.SET_ITEM,
            item: await setItemService(token, item)
        });
    };
}

export function deleteItem(token: string, itemId: string) {
    return async (dispatch: ThunkDispatch<{}, {}, Action<ITEMS_ACTIONS.DELETE_ITEM>>) => {
        dispatch({
            type: ITEMS_ACTIONS.DELETE_ITEM,
            itemId: await deleteItemService(token, itemId)
        })
    };
}