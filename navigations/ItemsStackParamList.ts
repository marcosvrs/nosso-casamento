import { ParamListBase } from "@react-navigation/routers";

export default interface ItemsStackParamList extends ParamListBase {
    ItemList: undefined;
    NewItem: undefined;
    Item: {
        itemId: string
    }
}