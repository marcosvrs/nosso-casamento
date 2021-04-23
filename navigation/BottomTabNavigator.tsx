import React, { FunctionComponent } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";
import CartScreen from "../screens/CartScreen";
import { StackScreenProps } from "@react-navigation/stack";
import { RootState } from "../store/store";
import { ParamListBase } from "@react-navigation/routers";
import { CheckoutStackParamList } from "./CheckoutNavigator";
import AuthDrawerNavigator from "./AuthDrawerNavigator";
import HomeScreen from "../screens/HomeScreen";
import ItemsStackNavigator from "./ItemsStackNavigator";

export interface BottomTabParamList extends ParamListBase {
    AuthHome: undefined;
    AuthItems: undefined;
    AuthCart: undefined;
}

const BottomTabNavigator: FunctionComponent<StackScreenProps<CheckoutStackParamList, 'BottomTabNavigator'>> = () => {
    const BottomTab = createBottomTabNavigator<BottomTabParamList>();
    const checkoutItemsLength = useSelector<RootState, number>(state => state.checkout.checkoutItemsLength);

    return <BottomTab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
            showLabel: false,
            activeTintColor: Colors.accent
        }}
        screenOptions={{
            unmountOnBlur: true,
            tabBarBadgeStyle: {
                backgroundColor: Colors.background
            }
        }}>
        <BottomTab.Screen name="AuthHome" options={{
            tabBarIcon: ({ focused, color, size }) => <Ionicons name={`${Platform.OS === 'android' ? 'md' : 'ios'}-home${focused ? '' : '-outline'}`} color={color} size={size} />
        }}>
            {(props) => <AuthDrawerNavigator {...props} title="Home" homeScreen={HomeScreen} />}
        </BottomTab.Screen>
        <BottomTab.Screen name="AuthItems" options={{
            tabBarIcon: ({ focused, color, size }) => <Ionicons name={`${Platform.OS === 'android' ? 'md' : 'ios'}-gift${focused ? '' : '-outline'}`} color={color} size={size} />
        }}>
            {(props) => <AuthDrawerNavigator {...props} title="Lista de Presentes" headerShown={false} homeScreen={ItemsStackNavigator} />}
        </BottomTab.Screen>
        <BottomTab.Screen name="AuthCart" options={{
            tabBarIcon: ({ focused, color, size }) => <Ionicons name={`${Platform.OS === 'android' ? 'md' : 'ios'}-basket${focused ? '' : '-outline'}`} color={color} size={size} />,
            tabBarBadge: checkoutItemsLength <= 0 ? undefined : checkoutItemsLength
        }}>
            {(props) => <AuthDrawerNavigator {...props} title="Presentes Selecionados" homeScreen={CartScreen} />}
        </BottomTab.Screen>
    </BottomTab.Navigator>;
}

export default BottomTabNavigator