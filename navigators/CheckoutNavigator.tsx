import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Colors } from "../constants/Colors";
import RootStackParamList from "./RootStackParamList";
import CartScreen from "../screens/CartScreen";

export default class CheckoutNavigator extends Component {
    private Stack = createStackNavigator<RootStackParamList>();

    render() {
        return <this.Stack.Navigator
            initialRouteName="Cart"
            screenOptions={{
                title: 'Checkout',
                headerStyle: {
                    backgroundColor: Colors.background
                },
                headerTitleStyle: {
                    fontFamily: 'poppins-bold',
                    fontSize: 24,
                    color: 'white'
                }
            }}>
            <this.Stack.Screen name="Cart" component={CartScreen} />
        </this.Stack.Navigator>;
    }
}