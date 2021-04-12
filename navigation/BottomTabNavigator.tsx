import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ItemsStackNavigator from "./ItemsStackNavigator";
import Colors from "../constants/Colors";
import { connect, ConnectedProps } from "react-redux";
import CartScreen from "../screens/CartScreen";
import { StackScreenProps } from "@react-navigation/stack";
import CheckoutStackParamList from "./CheckoutStackParamList";
import BottomTabStackParamList from "./BottomTabStackParamList";
import HomeScreen from "../screens/HomeScreen";

const connector = connect((state) => ({ checkoutItemsLength: state.checkout.checkoutItemsLength }));

interface BottomTabNavigatorProps extends StackScreenProps<CheckoutStackParamList, 'BottomTabNavigator'>, ConnectedProps<typeof connector> {
}

class BottomTabNavigator extends Component<BottomTabNavigatorProps> {
    private Tab = createBottomTabNavigator<BottomTabStackParamList>();

    render() {
        return <this.Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                showLabel: false,
                activeTintColor: Colors.accent
            }}
            screenOptions={{
                tabBarBadgeStyle: {
                    backgroundColor: Colors.background
                }
            }}>
            <this.Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({ focused, color, size }) => <Ionicons name={`home${focused ? '' : '-outline'}`} color={color} size={size} />
            }} />
            <this.Tab.Screen name="Items" component={ItemsStackNavigator} options={{
                tabBarIcon: ({ focused, color, size }) => <Ionicons name={`gift${focused ? '' : '-outline'}`} color={color} size={size} />
            }} />
            <this.Tab.Screen name="Cart" component={CartScreen} options={{
                tabBarIcon: ({ focused, color, size }) => <Ionicons name={`basket${focused ? '' : '-outline'}`} color={color} size={size} />,
                tabBarBadge: this.props.checkoutItemsLength <= 0 ? undefined : this.props.checkoutItemsLength
            }} />
        </this.Tab.Navigator>;
    }
}

export default connector(BottomTabNavigator);