import React, { Component } from "react";
import { createStackNavigator, StackScreenProps } from "@react-navigation/stack";
import Colors from "../constants/Colors";
import ItemsStackParamList from "./ItemsStackParamList";
import AddButton from "../components/AddButton";
import ItemListScreen from "../screens/ItemListScreen";
import NewItemScreen from "../screens/NewItemScreen";
import ItemDetailScreen from "../screens/ItemDetailScreen";

export default class ItemsStackNavigator extends Component<StackScreenProps<ItemsStackParamList, 'BottomTabNavigator'>> {
    private Stack = createStackNavigator<ItemsStackParamList>();

    render() {
        return <this.Stack.Navigator
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
            <this.Stack.Screen name="ItemList" component={ItemListScreen} options={({ navigation }) => ({
                headerRight: (headerProps: {
                    tintColor?: string;
                }) => <AddButton {...headerProps} onPress={() => navigation.navigate('NewItem')} />
            })} />
            <this.Stack.Screen name="NewItem" options={{
                title: 'New Item'
            }} component={NewItemScreen} />
            <this.Stack.Screen
                name="Item"
                component={ItemDetailScreen} />
        </this.Stack.Navigator>;
    }
}