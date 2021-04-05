import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../constants/Colors";
import GuestScreen from "../screens/GuestScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import { getFocusedRouteNameFromRoute, RouteProp } from "@react-navigation/core";
import CheckoutStackParamList from "./CheckoutStackParamList";

export default class CheckoutNavigator extends Component {
    private Stack = createStackNavigator<CheckoutStackParamList>();

    render() {
        return <this.Stack.Navigator
            initialRouteName="BottomTabNavigator"
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
            <this.Stack.Screen
                name="BottomTabNavigator"
                component={BottomTabNavigator}
                options={({ route }) => ({
                    headerShown: getFocusedRouteNameFromRoute(route) === 'Cart'
                })} />
            <this.Stack.Screen name="Guest" component={GuestScreen} />
        </this.Stack.Navigator>;
    }
}