import { ParamListBase } from "@react-navigation/routers";

export default interface ItemsStackParamList extends ParamListBase {
    ItemList: undefined;
    SetItem: {
        itemId?: string
    };
    Item: {
        itemId: string
    }
}