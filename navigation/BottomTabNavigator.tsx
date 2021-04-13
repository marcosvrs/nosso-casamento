import React, { FunctionComponent } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ItemsStackNavigator from "./ItemsStackNavigator";
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";
import CartScreen from "../screens/CartScreen";
import { StackScreenProps } from "@react-navigation/stack";
import CheckoutStackParamList from "./CheckoutStackParamList";
import BottomTabStackParamList from "./BottomTabStackParamList";
import HomeScreen from "../screens/HomeScreen";
import { RootState } from "../store/store";

interface BottomTabNavigatorProps extends StackScreenProps<CheckoutStackParamList, 'BottomTabNavigator'> {
}

const BottomTabNavigator: FunctionComponent<BottomTabNavigatorProps> = () => {
    const Tab = createBottomTabNavigator<BottomTabStackParamList>();
    const checkoutItemsLength = useSelector<RootState, number>(state => state.checkout.checkoutItemsLength);

    return <Tab.Navigator
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
        <Tab.Screen name="Home" component={HomeScreen} options={{
            tabBarIcon: ({ focused, color, size }) => <Ionicons name={`${Platform.OS === 'android' ? 'md' : 'ios'}-home${focused ? '' : '-outline'}`} color={color} size={size} />
        }} />
        <Tab.Screen name="Items" component={ItemsStackNavigator} options={{
            tabBarIcon: ({ focused, color, size }) => <Ionicons name={`${Platform.OS === 'android' ? 'md' : 'ios'}-gift${focused ? '' : '-outline'}`} color={color} size={size} />
        }} />
        <Tab.Screen name="Cart" component={CartScreen} options={{
            tabBarIcon: ({ focused, color, size }) => <Ionicons name={`${Platform.OS === 'android' ? 'md' : 'ios'}-basket${focused ? '' : '-outline'}`} color={color} size={size} />,
            tabBarBadge: checkoutItemsLength <= 0 ? undefined : checkoutItemsLength
        }} />
    </Tab.Navigator>;
}

export default BottomTabNavigator