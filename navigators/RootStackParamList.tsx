import { ParamListBase } from "@react-navigation/routers";

export default interface RootStackParamList extends ParamListBase {
    Home: undefined;
    NewItem: undefined;
    Item: {
        itemId: string
    }
}