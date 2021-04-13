import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import Item from "../../models/item";
import { ItemsAction } from "../reducers/items";

export enum ITEMS_ACTIONS {
    SET_ITEM = 'SET_ITEM',
    FETCH_ITEMS = 'FETCH_ITEMS'
};

export function fetchItems() {
    return async (dispatch: ThunkDispatch<{}, {}, Action<ITEMS_ACTIONS.FETCH_ITEMS>>) => {
        const response = await fetch(`${process.env.API_URL}/items.json`);

        if (!response.ok) {
            throw new Error(response.statusText === '' ? `Something went wrong: ${response.status}` : response.statusText);
        }

        const responseData = await response.json();
        const itemList = {};

        Object.entries(responseData).forEach(([key, value]) =>
            itemList[key] = new Item(key, value.name, +value.value, value.image, value.description)
        );

        dispatch({
            type: ITEMS_ACTIONS.FETCH_ITEMS,
            itemList
        });
    }
}

export function setItem(item: { id?: string; name: string; value: number; image: string; description?: string; }) {
    return async (dispatch: ThunkDispatch<{}, {}, ItemsAction>) => {
        const response = await fetch(`${process.env.API_URL}/items${item.id ? `/${item.id}` : ''}.json`, {
            method: item.id ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });

        if (!response.ok) {
            throw new Error(response.statusText === '' ? `Something went wrong: ${response.status}` : response.statusText);
        }

        const responseData = await response.json();

        dispatch({
            type: ITEMS_ACTIONS.SET_ITEM,
            item: new Item(item.id ?? responseData.name, item.name, item.value, item.image, item.description)
        });
    };
}