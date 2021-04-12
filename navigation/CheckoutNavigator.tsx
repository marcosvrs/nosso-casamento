import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../constants/Colors";
import GuestScreen from "../screens/GuestScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import { getFocusedRouteNameFromRoute, RouteProp } from "@react-navigation/core";
import CheckoutStackParamList from "./CheckoutStackParamList";
import PaymentScreen from "../screens/PaymentScreen";

export default class CheckoutNavigator extends Component {
    private Stack = createStackNavigator<CheckoutStackParamList>();

    render() {
        return <this.Stack.Navigator
            initialRouteName="BottomTabNavigator"
            screenOptions={{
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
            <this.Stack.Screen
                name="BottomTabNavigator"
                component={BottomTabNavigator}
                options={({ route }) => ({
                    headerShown: getFocusedRouteNameFromRoute(route) === 'Cart',
                    title: 'Presentes Selecionados'
                })} />
            <this.Stack.Screen name="Guest" component={GuestScreen} options={{
                title: 'Dados Pessoais'
            }} />
            <this.Stack.Screen name="Payment" component={PaymentScreen} options={{
                title: 'Pagamento'
            }} />
        </this.Stack.Navigator>;
    }
}