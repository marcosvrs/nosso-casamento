import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import CheckoutNavigator from "./CheckoutNavigator";
import StackNavigator from "./StackNavigator";
import { Colors } from "../constants/Colors";

export default class BottomTabNavigator extends Component {
    private Tab = createBottomTabNavigator();

    render() {
        return <this.Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                activeTintColor: Colors.primary
            }}>
            <this.Tab.Screen name="List" component={StackNavigator} options={{
                tabBarIcon: ({ focused, color, size }) => <Ionicons name={`gift${focused ? '' : '-outline'}`} color={color} size={size} />
            }} />
            <this.Tab.Screen name="Checkout" component={CheckoutNavigator} options={{
                tabBarIcon: ({ focused, color, size }) => <Ionicons name={`cart${focused ? '' : '-outline'}`} color={color} size={size} />
            }} />
        </this.Tab.Navigator>;
    }
}