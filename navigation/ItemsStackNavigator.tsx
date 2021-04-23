import React, { FunctionComponent } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../constants/Colors";
import IconButton from "../components/IconButton";
import ItemListScreen from "../screens/ItemListScreen";
import SetItemScreen from "../screens/SetItemScreen";
import ItemDetailScreen from "../screens/ItemDetailScreen";
import { useDispatch, useSelector } from "react-redux";
import User from "../models/user";
import { RootState } from "../store/store";
import { ParamListBase } from "@react-navigation/routers";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { AuthDrawerParamList } from "./AuthDrawerNavigator";
import { StyleSheet, View } from "react-native";
import { deleteItem } from "../store/actions/items";

export interface ItemsStackParamList extends ParamListBase {
    ItemList: undefined;
    SetItem: {
        itemId?: string
    };
    Item: {
        itemId: string
    }
}

const ItemsStackNavigator: FunctionComponent<DrawerScreenProps<AuthDrawerParamList, 'Home'>> = () => {
    const Stack = createStackNavigator<ItemsStackParamList>();

    const dispatch = useDispatch();
    const { user } = useSelector<RootState, {
        user?: User;
    }>(state => ({ user: state.auth.user }));

    return <Stack.Navigator
        initialRouteName="ItemList"
        screenOptions={{
            title: 'Lista de Presentes',
            headerStyle: {
                backgroundColor: Colors.background
            },
            headerTitleStyle: {
                fontFamily: 'poppins-bold',
                fontSize: 24,
                color: 'white'
            },
            headerTintColor: 'white',
            headerBackTitleVisible: false
        }}>
        <Stack.Screen name="ItemList" component={ItemListScreen} options={({ navigation }) => ({
            headerLeft: (headerProps: {
                tintColor?: string;
            }) => <IconButton {...headerProps} icon="menu" onPress={() => navigation.toggleDrawer()} />,
            headerRight: (headerProps: {
                tintColor?: string;
            }) => user ? <IconButton {...headerProps} icon="add-circle" onPress={() => navigation.navigate('SetItem')} /> : undefined
        })} />
        <Stack.Screen name="SetItem" options={{
            title: 'New Item'
        }} component={SetItemScreen} />
        <Stack.Screen
            name="Item"
            component={ItemDetailScreen} options={({ navigation, route }) => ({
                headerRight: (headerProps: {
                    tintColor?: string;
                }) => user ? <View style={{ flexDirection: 'row' }}>
                    <IconButton {...headerProps} icon="create" onPress={() => navigation.navigate('SetItem', { itemId: route.params?.itemId })} />
                    <IconButton {...headerProps} icon="remove-circle" onPress={() => dispatch(deleteItem(user.token, route.params?.itemId))} />
                </View> : undefined
            })} />
    </Stack.Navigator>;
}

export default ItemsStackNavigator